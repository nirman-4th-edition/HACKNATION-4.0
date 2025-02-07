#pragma once

const int touchPin = 32;
extern bool sosActive;

void touchSketch(void * parameter) {
    Serial.begin(115200);
    pinMode(touchPin, INPUT);
    delay(1000);
    for (;;) {
        bool touchDetected = digitalRead(touchPin);
        if (touchDetected) {
            if (!sosActive) {
                Serial.println("SOS detected, activating...");
                sosActive = true;
            }
        } else {
            if (sosActive) {
                Serial.println("SOS cleared.");
                sosActive = false;
            }
        }
        vTaskDelay(200 / portTICK_PERIOD_MS);
    }
}