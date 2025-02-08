#pragma once

#include <Wire.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"  // Provides maxim_heart_rate_and_oxygen_saturation()

#define BUFFER_LENGTH 100

// Sensor instance for SpO2 measurements (separate from the heart rate sensor instance)
MAX30105 spo2Sensor;

// Data buffers and related variables for SpO2 calculation
uint32_t irBuffer[BUFFER_LENGTH];  // Infrared LED sensor data
uint32_t redBuffer[BUFFER_LENGTH]; // Red LED sensor data
int32_t bufferLength = BUFFER_LENGTH;
int32_t spo2;
int8_t validSPO2;
int32_t spo2HeartRate;  // Heart rate calculated from spo2 sensor
int8_t validHeartRate;

void spo2Sketch(void * parameter) {
    // Initialize I2C (Serial.begin() is assumed already in main setup)
    Wire.begin();

    if (!spo2Sensor.begin(Wire, I2C_SPEED_FAST)) {
        Serial.println("MAX30105 not found. Please check wiring/power.");
        while (1) { }
    }

    Serial.println("Sensor initialized for SpO2.");
    
    // Sensor configuration
    byte ledBrightness = 60;   // Options: 0 (Off) to 255 (50mA)
    byte sampleAverage = 4;    // Options: 1, 2, 4, 8, 16, 32
    byte ledMode = 2;          // Options: 1 = Red only, 2 = Red+IR, 3 = Red+IR+Green
    byte sampleRate = 100;     // Options: 50, 100, 200, 400, 800, 1000, 1600, 3200
    int pulseWidth = 411;      // Options: 69, 118, 215, 411
    int adcRange = 4096;       // Options: 2048, 4096, 8192, 16384

    spo2Sensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange);

    // Task loop for measuring SpO2 and spo2-derived heart rate
    for (;;) {
        // Collect BUFFER_LENGTH samples
        for (byte i = 0; i < bufferLength; i++) {
            while (spo2Sensor.available() == false) {
                spo2Sensor.check();
            }
            redBuffer[i] = spo2Sensor.getRed();
            irBuffer[i]  = spo2Sensor.getIR();
            spo2Sensor.nextSample();
        }

        // Calculate SpO2 and heart rate from the samples
        maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &spo2HeartRate, &validHeartRate);

        delay(1000);
    }
}