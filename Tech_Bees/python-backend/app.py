import pandas as pd
import numpy as np
import os
import librosa
import soundfile as sf
import joblib
from pydub import AudioSegment
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, verify_jwt_in_request
from pymongo import MongoClient
from bson import ObjectId

model = joblib.load("parkinsons_model.pkl")
scaler = joblib.load("scaler.pkl")
selected_features = ["MDVP:Fo(Hz)", "MDVP:Fhi(Hz)", "MDVP:Flo(Hz)", "MDVP:Jitter(%)", "MDVP:Shimmer"]

cancer_model = joblib.load("cancer_model.pkl")
cancer_scaler = joblib.load("cancer_scaler.pkl")

cancer_selected_features = ['mean radius', 'mean texture', 'mean perimeter', 'mean area', 'mean smoothness']

app = Flask(__name__)
CORS(app,supports_credentials=True, resources={r"/*": {"origins": "*"}})

MONGO_URI = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URI)
db = client["micronode"]
patient_collection = db["patients"]

app.config['JWT_SECRET_KEY'] = 'secretaditya'
jwt = JWTManager(app)


@app.before_request
def check_jwt():
    if request.endpoint not in ["login", "register"]:
        try:
            verify_jwt_in_request()
        except Exception as e:
            return jsonify({"error": "Unauthorized", "message": str(e)}), 401

@app.route("/predict/<user_id>", methods=["POST"])
@jwt_required()
def predict(user_id):
    data = request.json.get("features")
    
    if not data or len(data) != len(selected_features):
        return jsonify({"error": f"Provide all {len(selected_features)} features."}), 400
    
    patient = patient_collection.find_one({"_id": ObjectId(user_id)})
    if not patient:
        return jsonify({"error": "User not found"}), 404
    if patient["pankrison_paid_trial"] == 1:
        used = True
    elif patient["pankrison_model_trial"]  >= 3 :
        return jsonify({"error": "You have exhausted your free trials"}), 403
    else:
        used = False


    input_df = pd.DataFrame([data], columns=selected_features)
    
    input_scaled = scaler.transform(input_df)
    
    prediction = model.predict(input_scaled)
    result = "No Parkinson's" if prediction[0] == 0 else "Has Parkinson's"
    
    if used:
        patient_collection.update_one({"_id": ObjectId(user_id)}, {"$push": {"parkinson_records": {"features": data, "prediction": result}}, "$inc": {"pankrison_paid_trial": -1}})
    else:
        patient_collection.update_one({"_id": ObjectId(user_id)}, {"$push": {"parkinson_records": {"features": data, "prediction": result}}, "$inc": {"pankrison_model_trial": 1}})
    
    return jsonify({"prediction": result,"prediction_int": int(prediction[0])})

AudioSegment.converter = "C:\\ffmpeg\\bin\\ffmpeg.exe"

@app.route("/upload/<user_id>", methods=["POST"])
def upload(user_id):
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    patient = patient_collection.find_one({"_id": ObjectId(user_id)})
    if not patient:
        return jsonify({"error": "User not found"}), 404
    if patient["pankrison_paid_trial"] >= 1:
        used = True
    elif patient["pankrison_model_trial"]  >= 3:
        return jsonify({"error": "You have exhausted your free trials"}), 403
    else:
        used = False

    upload_dir = "uploads"
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)

    original_filename = os.path.join(upload_dir, file.filename)
    file.save(original_filename)

    converted_filename = os.path.join(upload_dir, "converted_audio.wav")
    try:
        audio = AudioSegment.from_file(original_filename)
        audio.export(converted_filename, format="wav")
        filename = converted_filename  
    except Exception as e:
        return jsonify({"error": "Audio conversion failed", "message": str(e)}), 500

    try:
        y, sr = librosa.load(filename, sr=None)
    except Exception as e:
        return jsonify({"error": "Failed to process audio file", "message": str(e)}), 500

    mfccs = np.mean(librosa.feature.mfcc(y=y, sr=sr, n_mfcc=5), axis=1)

    features_scaled = scaler.transform(mfccs.reshape(1, -1))

    prediction = model.predict(features_scaled)[0]
    result = "No Parkinson's" if prediction == 0 else "Has Parkinson's"
    if used:
        patient_collection.update_one(
            {"_id": ObjectId(user_id)},
            {
                "$push": {"parkinson_records": {"prediction": "No Parkinson's" if prediction == 0 else "Has Parkinson's"}},
                "$inc": {"pankrison_paid_trial": -1},
            }
        )
    else:
        patient_collection.update_one({"_id": ObjectId(user_id)}, {"$push": {"parkinson_records": { "prediction": result}}, "$inc": {"pankrison_model_trial": 1}})

    return jsonify({"prediction": result,"prediction_int": int(prediction)})

@app.route("/predict_cancer/<user_id>", methods=["POST"])
def predict_cancer(user_id):
    try:
        data = request.json.get("features")
        
        if not data or len(data) != len(cancer_selected_features):
            return jsonify({"error": f"Provide all {len(cancer_selected_features)} features."}), 400

        patient = patient_collection.find_one({"_id": ObjectId(user_id)})
        if not patient:
            return jsonify({"error": "User not found"}), 404

        if patient["cancer_paid_trial"] >= 1:
            used = True
        elif patient["cancer_model_trial"] >= 3:
            return jsonify({"error": "You have exhausted your free trials"}), 403
        else:
            used = False

        input_data_scaled = cancer_scaler.transform([np.array(data)])
        prediction = cancer_model.predict(input_data_scaled)[0]

        result = "Malignant (Cancer Present)" if prediction == 0 else "Benign (No Cancer)"

        if used:
            patient_collection.update_one(
                {"_id": ObjectId(user_id)},
                {
                    "$push": {"cancer_records": {"prediction": result, "features": data}},
                    "$inc": {"cancer_paid_trial": -1},
                }
            )
        else:
            patient_collection.update_one(
                {"_id": ObjectId(user_id)},
                {
                    "$push": {"cancer_records": {"prediction": result, "features": data}},
                    "$inc": {"cancer_model_trial": 1},
                }
            )

        return jsonify({"prediction": result, "prediction_int": int(prediction)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
 
if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0",port=5001)