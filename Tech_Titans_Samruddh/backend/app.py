from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import numpy as np
import tensorflow as tf
from keras.preprocessing.image import load_img, img_to_array
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config['UPLOAD_FOLDER'] = 'static/'

# Load the trained model
model = tf.keras.models.load_model("abc.hdf5")

def get_prediction(filename):
    img_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    img = load_img(img_path, target_size=(180, 180))
    img = img_to_array(img) / 255.0
    img = np.expand_dims(img, axis=0)

    category = model.predict(img)
    predicted_class = np.argmax(category[0])
    probability = category[0][predicted_class]
    label = "Recycle" if predicted_class == 1 else "Organic"

    return label, float(probability)

@app.route('/classify', methods=['POST'])
def classify_waste():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    label, probability = get_prediction(filename)

    response = {
        "category": label,
        "probability": probability,
        "recommendations": [
            "Use separate bins for recyclable and organic waste.",
            "Avoid mixing wet and dry waste.",
            "Follow local recycling guidelines."
        ]
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, port=5000)


