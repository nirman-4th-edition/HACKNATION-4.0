from fastapi import FastAPI, Request, File, Form, UploadFile, Body
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from datetime import datetime

import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.inception_v3 import preprocess_input
from PIL import Image

import tensorflow as tf
import os
import shutil
import joblib
import requests
import json

app = FastAPI()

'''Just provided for testing'''
app.mount("/image", StaticFiles(directory="images"), name="images")

os.makedirs("images", exist_ok=True)
'''Just provided for testing'''



'''Disease Prediction starts here I guess'''

@app.post("/predict-disease")
async def predict_disease(image: UploadFile = File(...)):

    filename = f"{image.filename.split('.')[0]}_{int(datetime.timestamp(datetime.now()))}{os.path.splitext(image.filename)[1]}"
    file_path = os.path.join("images", filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # '''
    model = load_model('plant_disease_model (1).h5', compile=False)
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    class_labels = {
        0: "Apple Scab", 1: "Apple Black Rot", 2: "Apple Cedar Rust", 3: "Apple Healthy",
        4: "Blueberry Healthy", 5: "Cherry Powdery Mildew", 6: "Cherry Healthy",
        7: "Corn Cercospora Leaf Spot", 8: "Corn Common Rust", 9: "Corn Northern Leaf Blight",
        10: "Corn Healthy", 11: "Grape Black Rot", 12: "Grape Esca", 13: "Grape Leaf Blight",
        14: "Grape Healthy", 15: "Orange Haunglongbing (Citrus Greening)",
        16: "Peach Bacterial Spot", 17: "Peach Healthy", 18: "Pepper Bell Bacterial Spot",
        19: "Pepper Bell Healthy", 20: "Potato Early Blight", 21: "Potato Late Blight",
        22: "Potato Healthy", 23: "Raspberry Healthy", 24: "Soybean Healthy",
        25: "Squash Powdery Mildew", 26: "Strawberry Leaf Scorch", 27: "Strawberry Healthy",
        28: "Tomato Bacterial Spot", 29: "Tomato Early Blight", 30: "Tomato Late Blight",
        31: "Tomato Leaf Mold", 32: "Tomato Septoria Leaf Spot", 33: "Tomato Spider Mites",
        34: "Tomato Target Spot", 35: "Tomato Mosaic Virus", 36: "Tomato Yellow Leaf Curl Virus",
        37: "Tomato Healthy"
    } 

    def convert_webp_to_jpg(img_path):
        if img_path.lower().endswith(".webp"):
            img = Image.open(img_path).convert("RGB")
            new_path = img_path.replace(".webp", ".jpg")
            img.save(new_path, "JPEG")
            return new_path
        return img_path 

    @tf.function(reduce_retracing=True)
    def make_prediction(img_array):
        return model(img_array)

    def predict_image(img_path):
        try:
            img_path = convert_webp_to_jpg(img_path)
            img = Image.open(img_path).convert("RGB")
            img = img.resize((299, 299))
            img_array = np.array(img, dtype=np.float32)
            img_array = np.expand_dims(img_array, axis=0) 
            img_array = preprocess_input(img_array)

            predictions = make_prediction(img_array)
            predicted_class_index = np.argmax(predictions)
            predicted_class_name = class_labels.get(predicted_class_index, "Unknown")

            return predicted_class_name
        except Exception as e:
            print(f"Error during prediction: {e}")
            return "Error"


            
    disease_name = predict_image(file_path)

    # '''

    # Currently we are simulating the response with a dummy response
    
    # disease_name = "Something"

    return {
        "disease_name": disease_name
    }

















'''Disease Prediction ends here I guess'''

'''Best Crop Prediction starts here I guess'''

@app.post("/predict-suitable-crop")
async def predict_suitable_crop(
    image: UploadFile = File(...),  
    location: str = Form(...),      
    temperature: float = Form(...), 
    moisture: float = Form(...),   
    weather: str = Form(...),      
    humidity: float = Form(...),    
    windSpeed: float = Form(...), 
    nitrogen: float = Form(...),    
    potassium: float = Form(...),   
    phosphorus: float = Form(...),    
    pHValue: float = Form(...),   
):
    print(f"Location: {location}")
    print(f"Temperature: {temperature}")
    print(f"Moisture: {moisture}")
    print(f"Weather: {weather}")
    print(f"Humidity: {humidity}")
    print(f"Wind Speed: {windSpeed}")
    print(f"Sodium: {nitrogen}")
    print(f"Potassium: {potassium}")
    print(f"Phosphorus: {phosphorus}")
    print(f"pH Value: {pHValue}")

    filename = f"{image.filename.split('.')[0]}_{int(datetime.timestamp(datetime.now()))}{os.path.splitext(image.filename)[1]}"
    file_path = os.path.join("images", filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)


    soil_model = tf.keras.models.load_model("soil_model.h5")
    soil_model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    class_names = {0: "Alluvial soil", 1: "Black Soil", 2: "Clay soil", 3: "Red soil"}


    # Helper Functions

    
        


        
    def predict_soil(image_path):
        image = tf.io.read_file(image_path)
        image = tf.image.decode_jpeg(image, channels=3)
        image = tf.image.resize(image, (150, 150))
        image = image / 255.0
        image = tf.expand_dims(image, axis=0)
        
        prediction = soil_model.predict(image)
        predicted_class = class_names[np.argmax(prediction)]
        
        print(f"Predicted Soil Type: {predicted_class}")
        return predicted_class


    def get_lat_lon(location, api_key):
        geocode_url = f"http://api.openweathermap.org/geo/1.0/direct?q={location}&limit=1&appid={api_key}"
        response = requests.get(geocode_url)
        
        if response.status_code != 200:
            return None, None
        
        data = response.json()
        if not data:
            return None, None
        
        return data[0]['lat'], data[0]['lon']
    

    def get_annual_rainfall_nasa(location, api_key):
        lat, lon = get_lat_lon(location, api_key)
        if lat is None or lon is None:
            return "Error fetching location coordinates"
        
        base_url = "https://power.larc.nasa.gov/api/temporal/daily/point"
        start_date = "20240101"  
        end_date = "20241231"    
        
        params = {
            "parameters": "PRECTOTCORR",
            "community": "AG",
            "longitude": lon,
            "latitude": lat,
            "start": start_date,
            "end": end_date,
            "format": "JSON"
        }
        
        response = requests.get(base_url, params=params)
        if response.status_code != 200:
            return "Error fetching NASA POWER data"
        
        data = response.json()
        rainfall_data = data.get("properties", {}).get("parameter", {}).get("PRECTOTCORR", {})

        if not rainfall_data:
            return "No rainfall data available"
        
        annual_rainfall = sum(rainfall_data.values())
        
        return f"{annual_rainfall:.2f}"
    

    def is_valid_input(ph, nitrogen, phosphorus, potassium, temperature, rainfall):
        valid_ranges = {
            "pH": (5.0, 8.0),
            "Nitrogen": (60, 250),
            "Phosphorus": (30, 120),
            "Potassium": (40, 200),
            "Temperature": (10, 40),
            "Rainfall": (400, 2600)
        }
        
        if not (valid_ranges["pH"][0] <= ph <= valid_ranges["pH"][1]):
            return False, "Invalid pH value"
        if not (valid_ranges["Nitrogen"][0] <= nitrogen <= valid_ranges["Nitrogen"][1]):
            return False, "Invalid Nitrogen value"
        if not (valid_ranges["Phosphorus"][0] <= phosphorus <= valid_ranges["Phosphorus"][1]):
            return False, "Invalid Phosphorus value"
        if not (valid_ranges["Potassium"][0] <= potassium <= valid_ranges["Potassium"][1]):
            return False, "Invalid Potassium value"
        if not (valid_ranges["Temperature"][0] <= temperature <= valid_ranges["Temperature"][1]):
            return False, "Invalid Temperature value"
        if not (valid_ranges["Rainfall"][0] <= rainfall <= valid_ranges["Rainfall"][1]):
            return False, "Invalid Rainfall value"
        
        return True, "Valid input"
    



    model = joblib.load("crop_prediction_model.pkl")
    label_encoder = joblib.load("soil_type_encoder.pkl")

    

    df = pd.read_csv("crop_dataset.csv")
    df['Soil Type'] = label_encoder.fit_transform(df['Soil Type'])
    X = df.drop(columns=['Crop'])




    def predict_crop(soil_type, ph, nitrogen, phosphorus, potassium, temperature, rainfall):
        if soil_type not in label_encoder.classes_:
            return "Invalid Soil Type"
        
        soil_encoded = label_encoder.transform([soil_type])[0]

        is_valid, message = is_valid_input(ph, nitrogen, phosphorus, potassium, temperature, rainfall)
        if not is_valid:
            return message

        input_data = pd.DataFrame([[soil_encoded, ph, nitrogen, phosphorus, potassium, temperature, rainfall]], 
                                columns=X.columns) 

        prediction = model.predict(input_data)[0]
        return prediction
    

    soil_type = predict_soil(file_path)

    api_key = "e0764678f022e498800e6d37b4c71475"
    rainfall = float(get_annual_rainfall_nasa(location, api_key)) 

    suitable_crop = predict_crop(soil_type, pHValue, nitrogen, phosphorus, potassium, temperature, rainfall)










    

    # Load the trained model and label encoder
    

    

    





    # For now, we simulate that with a dummy response.

    # suitable_crop = "Rice"

    return {
        "suitable_crop": suitable_crop,
        "location": location,
        "temperature": temperature,
        "moisture": moisture,
        "weather": weather,
        "humidity": humidity,
        "windSpeed": windSpeed,
        "nitrogen": nitrogen,   
        "potassium": potassium,
        "phosphorus": phosphorus,
        "pHValue": pHValue,
        "message": "Prediction completed",
    }




'''Weather Prediction ends here I guess'''

'''Fertiliser Recommender starts here'''
@app.post("/fertiliser-recommender")
async def fertiliser_recommender(nitrogen: float = Body(...), phosphorus: float = Body(...), potassium: float = Body(...), pH: float = Body(...), cropName: str = Body(...), temperature: float = Body(...), moisture: float = Body(...)):
    print(f"Nitrogen: {nitrogen}")
    print(f"Phosphorus: {phosphorus}")
    print(f"Potassium: {potassium}")
    print(f"pH: {pH}")
    print(f"Crop Name: {cropName}")
    print(f"Temperature: {temperature}")
    print(f"Moisture: {moisture}")
    
    def predict_fertilizer(nitrogen, phosphorus, potassium, pH, moisture, temperature, crop_name):
        model = joblib.load("fertilizer_model.pkl")
        scaler = joblib.load("scaler.pkl")
        crop_encoder = joblib.load("crop_encoder.pkl")
        fertilizer_encoder = joblib.load("fertilizer_encoder.pkl")
        
        crop_encoded = crop_encoder.transform([crop_name])[0]
        input_data = pd.DataFrame([[nitrogen, phosphorus, potassium, pH, moisture, temperature, crop_encoded]],
                                columns=["Nitrogen", "Phosphorus", "Potassium", "pH", "Moisture", "Temperature", "Crop"])
        
        input_data = scaler.transform(input_data)
        
        predicted_fertilizer = model.predict(input_data)
        fertilizer_name = fertilizer_encoder.inverse_transform(predicted_fertilizer)[0]
        
        return fertilizer_name


    recommended_fertiliser = predict_fertilizer(nitrogen, phosphorus, potassium, pH, moisture, temperature, cropName) 

    # Currently we are simulating the response with a dummy response
    
    # recommended_fertiliser = "Compost"
    
    return {
        "recommended_fertiliser": recommended_fertiliser
    }

'''Fertiliser Recommender ends here'''











'''Just provided for testing''' 
@app.post("/send-image")
async def upload_image(image: UploadFile = File(...)):
    filename = f"{image.filename.split('.')[0]}_{int(datetime.timestamp(datetime.now()))}{os.path.splitext(image.filename)[1]}"
    file_path = os.path.join("images", filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return JSONResponse(content={"image_url": f"http://localhost:8000/image/{filename}"})



@app.post("/test")
async def root(req: Request): 
    body = await req.json()
    name = body.get("name")

    output = "Nath" if name == "Shibam" else "Something else"

    return {
        "output": output
    }


@app.get("/hello")
def root():
    return {"message": "Hello World"}
'''Just provided for testing'''
