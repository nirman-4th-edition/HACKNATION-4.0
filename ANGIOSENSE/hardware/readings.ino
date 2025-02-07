#include <Wire.h>
#include "I2Cdev.h"
#include "MPU6050.h"
#include <OneWire.h>
#include <DallasTemperature.h>

#define ECG_LO_PLUS 32
#define ECG_LO_MINUS 33
#define ECG_OUTPUT 34
#define PULSE_SENSOR 35
#define TEMP_SENSOR 14

MPU6050 mpu;
OneWire oneWire(TEMP_SENSOR);
DallasTemperature tempSensor(&oneWire);

const unsigned long DATA_SAMPLE_PERIOD = 5000;
unsigned long lastSampleTime = 0;
int ecgValue = 0;

void setup() {
    Serial.begin(115200);
    Wire.begin();
    
    mpu.initialize();
    if (mpu.testConnection()) {
        Serial.println("MPU6050 connection successful");
    } else {
        Serial.println("MPU6050 connection failed");
    }
    
    tempSensor.begin();
    pinMode(ECG_LO_PLUS, INPUT);
    pinMode(ECG_LO_MINUS, INPUT);
    pinMode(ECG_OUTPUT, INPUT);
    pinMode(PULSE_SENSOR, INPUT);
}

void loop() {
    if (millis() - lastSampleTime >= DATA_SAMPLE_PERIOD) {
        lastSampleTime = millis();
        
        tempSensor.requestTemperatures();
        float temperatureC = tempSensor.getTempCByIndex(0);
        ecgValue = analogRead(ECG_OUTPUT);
        int pulseValue = analogRead(PULSE_SENSOR);

        Serial.println("===== SENSOR DATA =====");
        Serial.print("Temperature (°C): ");
        Serial.println(temperatureC);
        Serial.print("ECG Value: ");
        Serial.println(ecgValue);
        Serial.print("Pulse Value: ");
        Serial.println(pulseValue);
        Serial.println("=======================");
    }

    ecgValue = analogRead(ECG_OUTPUT);
    int pulseValue = analogRead(PULSE_SENSOR);
    
    Serial.print("ECG:"); Serial.print(ecgValue);
    Serial.print("\tPulse:"); Serial.println(pulseValue);

    delay(50); 
}
