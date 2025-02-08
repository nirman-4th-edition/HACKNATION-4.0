# import time
# #
# # from blackbox_ai import get_status
# # from mainai import res_give
# #
# # res = dict(res_give())
# #
# # temp=90
# # humid=90
# # hrtbt=90
# # spo2=10
# # body_temp=12
# #
# # while True:
# #     sts = get_status(temp, humid, hrtbt, spo2, body_temp, res["Body_Temp_Upper"], res["Body_Temp_lower"], res["Humidity_Upper"], res["Humidity_Lower"], res["Heart_Rate_Upper"],
# #                  res["Heart_Rate_Lower"], res["SpO2_Upper"], res["SpO2_Lower"], res["Surrounding_lower_temp"], res["Surrounding_upper_temp"])
# #     time.sleep(1)

import time
import requests

from blackbox_ai import get_status
from mainai import res_give

FIREBASE_URL = 'https://nirman-572e8-default-rtdb.asia-southeast1.firebasedatabase.app'


def fetch_sensor_data():
    try:
        band_data = requests.get(f"{FIREBASE_URL}/BandData.json").json()
        factory_sensor = requests.get(f"{FIREBASE_URL}/FactorySensor.json").json()

        hrtbt = band_data.get("heartRate", 90)
        spo2 = band_data.get("spo2", 10)
        body_temp = band_data.get("temperature", 12)
        temp = factory_sensor.get("Temperature", 90)
        humid = factory_sensor.get("Humidity", 90)
        return temp, humid, hrtbt, spo2, body_temp
    except Exception as e:
        print("Error fetching data from Firebase:", e)
        return 90, 90, 90, 10, 12


res = dict(res_give())

while True:
    temp, humid, hrtbt, spo2, body_temp = fetch_sensor_data()
    sts = get_status(
        temp, humid, hrtbt, spo2, body_temp,
        res["Body_Temp_Upper"], res["Body_Temp_lower"],
        res["Humidity_Upper"], res["Humidity_Lower"],
        res["Heart_Rate_Upper"], res["Heart_Rate_Lower"],
        res["SpO2_Upper"], res["SpO2_Lower"],
        res["Surrounding_lower_temp"], res["Surrounding_upper_temp"]
    )
    post_url = f"{FIREBASE_URL}/ledStatus.json"
    try:
        response = requests.put(post_url, json=sts)
        if response.status_code in [200, 201]:
            print("ledStatus updated successfully:", sts)
        else:
            print("Error updating ledStatus:", response.text)
    except Exception as ex:
        print("Exception in updating ledStatus:", ex)
    print(sts)
    print(temp, humid, hrtbt, spo2, body_temp)
    print()
    time.sleep(1)