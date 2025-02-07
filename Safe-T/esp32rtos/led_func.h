#pragma once

const int redPin = 5;
const int greenPin = 18;
const int bluePin = 19;
extern bool sosActive;
extern String ledColor;

void controlLED(String color) {
    if (!sosActive) {
        if (color == "2") {
            digitalWrite(redPin, HIGH);
            digitalWrite(greenPin, LOW);
            digitalWrite(bluePin, LOW);
        } else if (color == "0") {
            digitalWrite(redPin, LOW);
            digitalWrite(greenPin, HIGH);
            digitalWrite(bluePin, LOW);
        } else if (color == "1") {
            digitalWrite(redPin, LOW);
            digitalWrite(greenPin, LOW);
            digitalWrite(bluePin, HIGH);
        } else {
            digitalWrite(redPin, LOW);
            digitalWrite(greenPin, LOW);
            digitalWrite(bluePin, LOW);
        }
    }
}

void blinkRedLED() {
    static unsigned long previousMillis = 0;
    const int interval = 50;
    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis >= interval) {
        previousMillis = currentMillis;
        int state = digitalRead(redPin);
        digitalWrite(redPin, !state);
        digitalWrite(greenPin, LOW);
        digitalWrite(bluePin, LOW);
    }
}

void ledSketch(void * parameter) {
    pinMode(redPin, OUTPUT);
    pinMode(greenPin, OUTPUT);
    pinMode(bluePin, OUTPUT);
    digitalWrite(redPin, LOW);
    digitalWrite(greenPin, LOW);
    digitalWrite(bluePin, LOW);
    for (;;) {
        if (sosActive) {
            blinkRedLED();
        } else {
            controlLED(ledColor);
        }
        vTaskDelay(200 / portTICK_PERIOD_MS);
    }
}