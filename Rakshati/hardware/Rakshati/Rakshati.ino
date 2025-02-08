#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <Wire.h>
#include <MPU6050.h>
#include <LoRa.h>

#define TILT_SENSOR_PIN 5
#define RXPin 4
#define TXPin 3
#define GPSBaud 9600
#define SS 15
#define RST 16
#define DI0 2

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* apiUrl = "https://api.callmebot.com/whatsapp.php?phone=6372866610&text=";

TinyGPSPlus gps;
SoftwareSerial gpsSerial(RXPin, TXPin);
WiFiClient client;
MPU6050 mpu;

unsigned int tiltCount = 0;
const unsigned int tiltThreshold = 5;
bool carFlipped = false;
unsigned long noTiltStartTime = 0;
bool noTiltDetected = false;

void setup() {
    pinMode(TILT_SENSOR_PIN, INPUT);
    Serial.begin(115200);
    gpsSerial.begin(GPSBaud);
    
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
    
    Wire.begin();
    mpu.initialize();
    if (!mpu.testConnection()) {
        Serial.println("MPU6050 connection failed");
    }
    
    LoRa.setPins(SS, RST, DI0);
    if (!LoRa.begin(915E6)) {
        Serial.println("LoRa initialization failed");
    }
}

void loop() {
    while (gpsSerial.available() > 0) {
        gps.encode(gpsSerial.read());
    }
    
    int tiltState = digitalRead(TILT_SENSOR_PIN);
    int16_t ax, ay, az, gx, gy, gz;
    mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
    
    if (carFlipped) {
        if (tiltState == LOW) {
            if (!noTiltDetected) {
                noTiltDetected = true;
                noTiltStartTime = millis();
            } else if (millis() - noTiltStartTime >= 10000) {
                Serial.println("Resetting System...");
                carFlipped = false;
                tiltCount = 0;
                noTiltDetected = false;
            }
        } else {
            noTiltDetected = false;
        }
        return;
    }
    
    if (tiltState == HIGH || abs(ax) > 16000 || abs(ay) > 16000) {
        Serial.println("Tilt Detected!");
        tiltCount++;
        
        if (tiltCount >= tiltThreshold) {
            Serial.println("Car Flipped!");
            Serial.println("Calling ambulance and nearest PCR van for evacuation...");
            Serial.println("Sending Car location...");
            Serial.println("Sending message to family members...");
            
            if (gps.location.isValid()) {
                String latitude = String(gps.location.lat(), 6);
                String longitude = String(gps.location.lng(), 6);
                Serial.println("Latitude: " + latitude);
                Serial.println("Longitude: " + longitude);
                sendWhatsAppMessage(latitude, longitude);
                sendLoRaMessage(latitude, longitude);
            } else {
                Serial.println("GPS Signal Not Available");
            }
            carFlipped = true;
        }
    } else {
        tiltCount = 0;
        Serial.println("No Tilt");
    }
    
    delay(500);
}

void sendWhatsAppMessage(String latitude, String longitude) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        String message = "Car flipped! Location: https://www.google.com/maps?q=" + latitude + "," + longitude;
        String fullUrl = apiUrl + message;
        fullUrl.replace(" ", "%20");
        
        http.begin(client, fullUrl);
        int httpResponseCode = http.GET();
        
        if (httpResponseCode > 0) {
            Serial.println("Message sent successfully");
        } else {
            Serial.println("Failed to send message");
        }
        http.end();
    } else {
        Serial.println("WiFi not connected");
    }
}

void sendLoRaMessage(String latitude, String longitude) {
    LoRa.beginPacket();
    LoRa.print("Car flipped! Location: https://www.google.com/maps?q=");
    LoRa.print(latitude);
    LoRa.print(",");
    LoRa.print(longitude);
    LoRa.endPacket();
    Serial.println("LoRa Message Sent");
}
