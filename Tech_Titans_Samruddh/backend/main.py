# Dependencies
import numpy as np
import keras
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.applications.vgg16 import preprocess_input
from keras.applications.vgg16 import decode_predictions
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from keras.applications.vgg16 import VGG16
import tensorflow as tf

# def predict(img_path):
def getPrediction(filename):
    model = tf.keras.models.load_model("abc.hdf5")
    
    # Load and preprocess the image
    img = load_img('static/' + filename, target_size=(180, 180))
    img = img_to_array(img)
    img = img / 255.0  # Normalize the image
    img = np.expand_dims(img, axis=0)  # Add batch dimension

    # Get predictions
    category = model.predict(img)
    
    # Assuming binary classification with two classes
    # If your model outputs probabilities for two classes
    predicted_class = np.argmax(category[0])  # Get the index of the class with the highest probability
    probability = category[0][predicted_class]  # Get the probability of the predicted class

    # Determine the label based on the predicted class
    if predicted_class == 1:
        answer = "Recycle"
    else:
        answer = "Organic"

    # Convert results to strings
    answer = str(answer)
    probability_results = str(probability)

    values = [answer, probability_results, filename]
    return values[0], values[1], values[2]
