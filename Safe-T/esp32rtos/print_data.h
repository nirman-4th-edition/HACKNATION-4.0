#pragma once

extern float beatsPerMinute;
extern int beatAvg;
extern float temperatureC;
extern float temperatureF;
extern int32_t spo2;
extern int32_t spo2HeartRate;

void printSketch(void * parameter) {
    for (;;) {
        Serial.print("Avg BPM= ");
        Serial.print(beatAvg);
        Serial.print(" TempC= ");
        Serial.print(temperatureC, 2);
        Serial.print(temperatureF, 2);
        Serial.print(", SPO2=");
        Serial.println(spo2);
        delay(1000);
    }
}