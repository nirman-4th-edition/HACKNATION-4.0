import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.exceptions import NotFittedError


def train_ai_model():
    df = pd.read_csv("train_data_updated.csv")

    X = df[["Gender", "Age", "Diabetes", "Asthma", "Heart_Disease"]]
    y = df[[
        "Body_Temp_Upper", "Body_Temp_lower", "Humidity_Upper", "Humidity_Lower", "AQI_Upper",
        "Heart_Rate_Upper", "Heart_Rate_Lower", "SpO2_Upper", "SpO2_Lower", "Surrounding_lower_temp",
        "Surrounding_upper_temp"
    ]]

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_scaled, y)

    return model, scaler


def predict_using_model(model, scaler, gender, age, diabetes, asthma, heart_disease):
    try:
        input_data = np.array([[gender, age, diabetes, asthma, heart_disease]])
        input_scaled = scaler.transform(input_data)

        prediction = model.predict(input_scaled)[0]

        return {
            "Body_Temp_Upper": prediction[0], "Body_Temp_lower": prediction[1],
            "Humidity_Upper": prediction[2], "Humidity_Lower": prediction[3],
            "AQI_Upper": prediction[4], "Heart_Rate_Upper": prediction[5],
            "Heart_Rate_Lower": prediction[6], "SpO2_Upper": prediction[7],
            "SpO2_Lower": prediction[8], "Surrounding_lower_temp": prediction[9],
            "Surrounding_upper_temp": prediction[10]
        }

    except NotFittedError:
        print("Scaler is not fitted. Train the model first.")
        return None
    except ValueError as e:
        print(f"ValueError: {e}. Ensure input values are numerical and in the correct format.")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None


