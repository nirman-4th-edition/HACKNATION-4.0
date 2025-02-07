from fastapi import FastAPI, Request, File, Form, UploadFile
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from datetime import datetime

import os
import shutil


app = FastAPI()

'''Just provided for testing'''
# Serve static files
app.mount("/image", StaticFiles(directory="images"), name="images")

# Ensure the images directory exists
os.makedirs("images", exist_ok=True)
'''Just provided for testing'''



'''Disease Prediction starts here I guess'''

@app.post("/predict-disease")
async def predict_disease(image: UploadFile = File(...)):
    # Generate a unique filename with current timestamp

    filename = f"{image.filename.split('.')[0]}_{int(datetime.timestamp(datetime.now()))}{os.path.splitext(image.filename)[1]}"
    file_path = os.path.join("images", filename)
    
    # Save the file to the images directory

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    
    # Call the model to predict the disease
    # Currently we are simulating the response with a dummy response
    
    disease_name = "Something"

    return {
        "disease_name": disease_name
    }

















'''Disease Prediction ends here I guess'''

'''Weather Prediction starts here I guess'''

@app.post("/predict-suitable-crop")
async def predict_suitable_crop(
    image: UploadFile = File(...),  # Image file
    location: str = Form(...),      # Location
    temperature: float = Form(...), # Temperature
    moisture: float = Form(...),    # Soil Moisture
    weather: str = Form(...),       # Weather
    humidity: float = Form(...),    # Humidity
    windSpeed: float = Form(...),    # Wind Speed
):
    # Generate a unique filename with current timestamp

    filename = f"{image.filename.split('.')[0]}_{int(datetime.timestamp(datetime.now()))}{os.path.splitext(image.filename)[1]}"
    file_path = os.path.join("images", filename)
    
    # Save the file to the images directory

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    
    # Call the model to predict the suitable crop

    # Here you would typically call the model for predicting the suitable crop.
    # For now, we simulate that with a dummy response.

    suitable_crop = "Rice"  # Example: you would use your model logic here

    # Return the suitable crop along with other received data
    return {
        "suitable_crop": suitable_crop,
        "location": location,
        "temperature": temperature,
        "moisture": moisture,
        "weather": weather,
        "humidity": humidity,
        "windSpeed": windSpeed,
        "message": "Prediction completed",
    }




'''Weather Prediction ends here I guess'''










'''Just provided for testing''' 
@app.post("/send-image")
async def upload_image(image: UploadFile = File(...)):
    # Generate a unique filename with current timestamp

    filename = f"{image.filename.split('.')[0]}_{int(datetime.timestamp(datetime.now()))}{os.path.splitext(image.filename)[1]}"
    file_path = os.path.join("images", filename)
    
    # Save the file to the images directory

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    
    # Return the URL for accessing the image

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
