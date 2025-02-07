#pragma once

#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"

MAX30105 particleSensor;
const byte RATE_SIZE = 4;
byte rates[RATE_SIZE];
byte rateSpot = 0;
long lastBeat = 0;
float beatsPerMinute = 0;
int beatAvg = 0;
unsigned long lastTempReadTime = 0;
float temperatureC = 0;
float temperatureF = 0;

void bpmSketch(void * parameter) {
    Wire.begin();
    if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
        Serial.println("MAX30105 not found. Check wiring.");
        while (1) { }
    }
    Serial.println("Place your index finger on the sensor.");
    particleSensor.setup();
    particleSensor.setPulseAmplitudeRed(0x0A);
    particleSensor.setPulseAmplitudeGreen(0);
    for (;;) {
        long irValue = particleSensor.getIR();
        if (checkForBeat(irValue)) {
            long delta = millis() - lastBeat;
            lastBeat = millis();
            beatsPerMinute = 60 / (delta / 1000.0);
            if (beatsPerMinute < 255 && beatsPerMinute > 20) {
                rates[rateSpot++] = (byte)beatsPerMinute;
                rateSpot %= RATE_SIZE;
                beatAvg = 0;
                for (byte x = 0; x < RATE_SIZE; x++) {
                    beatAvg += rates[x];
                }
                beatAvg /= RATE_SIZE;
            }
        }
        if (millis() - lastTempReadTime >= 5000) {
            temperatureC = particleSensor.readTemperature();
            temperatureF = particleSensor.readTemperatureF();
            lastTempReadTime = millis();
        }
        delay(20);
    }
}