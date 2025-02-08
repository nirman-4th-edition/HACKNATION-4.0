#include "touch_button.h"
#include "firebase_connection.h"
#include "led_func.h"
#include "heart_rate.h"
#include "spo2.h"
#include "print_data.h"

void setup()
{
    Serial.begin(115200);
    xTaskCreatePinnedToCore(touchSketch, "taskName", 8192, NULL, 1, NULL, 1);
    xTaskCreatePinnedToCore(firebaseSketch, "taskName", 8192, NULL, 1, NULL, 1);
    xTaskCreatePinnedToCore(ledSketch, "taskName", 8192, NULL, 1, NULL, 1);
    xTaskCreatePinnedToCore(bpmSketch, "BPM Task", 8192, NULL, 1, NULL, 1);
    xTaskCreatePinnedToCore(spo2Sketch, "SpO2 Task", 8192, NULL, 1, NULL, 1);
    xTaskCreatePinnedToCore(printSketch, "Print Task", 4096, NULL, 1, NULL, 1);
}

void loop()
{
}