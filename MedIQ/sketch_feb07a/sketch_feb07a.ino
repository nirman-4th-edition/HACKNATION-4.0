#include <HX711.h>  // Include HX711 library

// Define GPIO pins for ESP32 Dev Module
const int LOADCELL_DT_PIN = 21;   // Data pin (ESP32)
const int LOADCELL_SCK_PIN = 22;  // Clock pin (ESP32)

HX711 scale;  // Create HX711 object

void setup() {
  Serial.begin(115200);  // Start serial communication
  Serial.println("Initializing HX711...");

  scale.begin(LOADCELL_DT_PIN, LOADCELL_SCK_PIN);  // Initialize HX711 

  // Wait for HX711 to be ready
  while (!scale.is_ready()) {
    Serial.println("Waiting for HX711...");
    delay(500);
  }

  scale.set_scale();  
  scale.tare();  // Reset scale to zero

  Serial.println("HX711 initialized. Place a known weight to calibrate.");
}

void loop() {
  if (scale.is_ready()) {

    long raw_reading = scale.read();  // Read raw data
    float weight = scale.get_units(5);  // Get weight (average of 5 readings)

    Serial.print("Raw reading: ");
    Serial.print(raw_reading);
    Serial.print(" | Weight: ");
    Serial.print(weight);
    Serial.println(" g");

    delay(1000);
  } 
  else {
    Serial.println("HX711 not detected.");
  }
}

// Calibration function
void calibrate(float known_weight) {
  long raw_reading = scale.read_average(20);
  float scale_factor = raw_reading / known_weight;
  scale.set_scale(scale_factor);
}
