#pragma once

extern float beatsPerMinute;
extern int beatAvg;
extern float temperatureC;
extern int32_t spo2;

bool sosActive = false;
String ledColor = "";

#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

#define WIFI_SSID "SOA UNIVERSITY"
#define WIFI_PASSWORD "iter@bh1"
#define API_KEY "AIzaSyDllNdo2g-d-JiYguXYvxrFe3pIzj7f_Zg"
#define DATABASE_URL "https://nirman-572e8-default-rtdb.asia-southeast1.firebasedatabase.app/"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
bool signupOK = false;

void firebaseSketch(void * parameter) {
    Serial.begin(115200);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        vTaskDelay(300 / portTICK_PERIOD_MS);
    }
    Serial.println();
    Serial.println("Connected to Wi-Fi");
    config.api_key = API_KEY;
    config.database_url = DATABASE_URL;
    config.token_status_callback = tokenStatusCallback;
    if (Firebase.signUp(&config, &auth, "", "")) {
        signupOK = true;
    } else {
        Serial.printf("%s\n", config.signer.signupError.message.c_str());
    }
    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);
    bool lastSosState = sosActive;
    static unsigned long lastSensorUpdate = 0;
    for (;;) {
        if (Firebase.ready() && signupOK) {
            if (sosActive != lastSosState) {
                if (sosActive) {
                    Serial.println("SOS detected, updating Firebase...");
                    if (!Firebase.RTDB.setBool(&fbdo, "sos", true)) {
                        Serial.println("Failed to update sos true");
                        Serial.println(fbdo.errorReason());
                    }
                } else {
                    Serial.println("SOS cleared, updating Firebase...");
                    if (!Firebase.RTDB.setBool(&fbdo, "sos", false)) {
                        Serial.println("Failed to update sos false");
                        Serial.println(fbdo.errorReason());
                    }
                }
                lastSosState = sosActive;
            }
            if (!sosActive) {
                if (Firebase.RTDB.getString(&fbdo, "ledStatus")) {
                    String fetchedColor = fbdo.stringData();
                    if (fetchedColor != ledColor) {
                        ledColor = fetchedColor;
                        Serial.println("LED Status: " + ledColor);
                    }
                } else {
                    Serial.println("Failed to read ledStatus");
                    Serial.println(fbdo.errorReason());
                }
            }
            if (millis() - lastSensorUpdate > 1000) {
                lastSensorUpdate = millis();
                FirebaseJson json;
                json.set("heartRate", beatAvg);
                json.set("spo2", spo2);
                json.set("temperature", temperatureC);
                if (!Firebase.RTDB.setJSON(&fbdo, "/BandData", &json)) {
                    Serial.println("Failed to update BandData");
                    Serial.println(fbdo.errorReason());
                } else {
                    Serial.println("BandData updated");
                }
            }
        }
        vTaskDelay(200 / portTICK_PERIOD_MS);
    }
}