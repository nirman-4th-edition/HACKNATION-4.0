#include <Servo.h>
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

// Firebase configuration
FirebaseConfig firebaseConfig;
FirebaseAuth firebaseAuth;

// Wi-Fi credentials
#define WIFI_SSID "Redmi Note 9"
#define WIFI_PASSWORD "123456789"

// Sensor pins
#define SENSOR1_PIN 12            // D6
#define SENSOR2_PIN 13            // D7
#define SENSOR3_PIN 14            // D5
#define ADDITIONAL_SENSOR_PIN 16  // D0

// Servo pins
#define HORIZONTAL_SERVO_PIN 5  // D1
#define VERTICAL_SERVO_PIN 4    // D2
#define CAMERA_SERVO_PIN 2      // D4  // New Camera Servo

// Water pump relay pin
#define WATER_PUMP_RELAY_PIN 0  // D3

Servo horizontalServo;
Servo verticalServo;
FirebaseData firebaseData;
Servo cameraServo;

void setup() {
  // Initialize serial communication for debugging
  Serial.begin(9600);

  // Initialize sensors
  pinMode(SENSOR1_PIN, INPUT);
  pinMode(SENSOR2_PIN, INPUT);
  pinMode(SENSOR3_PIN, INPUT);
  pinMode(ADDITIONAL_SENSOR_PIN, INPUT);

  // Initialize servos
  horizontalServo.attach(HORIZONTAL_SERVO_PIN);
  verticalServo.attach(VERTICAL_SERVO_PIN);
  cameraServo.attach(CAMERA_SERVO_PIN);

  // Initialize relay for water pump
  pinMode(WATER_PUMP_RELAY_PIN, OUTPUT);
  digitalWrite(WATER_PUMP_RELAY_PIN, LOW);  // Ensure water pump is off

  // Move servos to initial position
  horizontalServo.write(0);
  verticalServo.write(0);
  cameraServo.write(0);

  // Connect to Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected to Wi-Fi");

  // Initialize Firebase
  firebaseConfig.host = "ai-vechile-default-rtdb.firebaseio.com";
  firebaseConfig.signer.tokens.legacy_token = "y6EFGHYSWpMWYU7ITSTnBNk6GSEjxX3BI716lJIB";
  Firebase.begin(&firebaseConfig, &firebaseAuth);
}

void loop() {
  // Read sensor values
  int sensor1State = digitalRead(SENSOR1_PIN);
  int sensor2State = digitalRead(SENSOR2_PIN);
  int sensor3State = digitalRead(SENSOR3_PIN);

  if (sensor1State == LOW || sensor2State == LOW || sensor3State == LOW) {
    // Fire detected by one of the sensors
    handleSensorBasedServoControl(sensor1State, sensor2State, sensor3State);
  } else {
    // No fire detected, reset object value if previously set
    static bool objectSet = false;
    if (Firebase.getInt(firebaseData, "/commands/object")) {
      if (firebaseData.intData() == 1) {
        Firebase.setInt(firebaseData, "/commands/object", 0);
        objectSet = false;
        Serial.println("Object reset to 0 as fire is no longer detected.");
      }
    }

    // Check for remote control via Firebase
    handleRemoteServoControl();
  }

  delay(100);  // Small delay to avoid rapid movement and false triggering
}

void handleSensorBasedServoControl(int sensor1State, int sensor2State, int sensor3State) {
  if (sensor1State == LOW) {
    Serial.println("1st sensor detected");
    cameraServo.write(25);
    delay(2000);

    horizontalServo.write(55);  // Move to 40°
    delay(500);                 // Wait for servo to reach position
    moveVerticalServoAndCheck();
  } else if (sensor2State == LOW) {
    Serial.println("2nd sensor detected");
    cameraServo.write(50);
    delay(2000);

    horizontalServo.write(110);  // Move to 110°
    delay(500);                  // Wait for servo to reach position
    moveVerticalServoAndCheck();
  } else if (sensor3State == LOW) {
    Serial.println("3rd sensor detected");
    cameraServo.write(75);
    delay(2000);

    horizontalServo.write(180);  // Move to 180°
    delay(500);                  // Wait for servo to reach position
    moveVerticalServoAndCheck();
  } else {
    Serial.println("Fire Not Detected");
    digitalWrite(WATER_PUMP_RELAY_PIN, LOW);
    horizontalServo.write(0);
    verticalServo.write(0);
    Firebase.setInt(firebaseData, "/commands/object", 0);
  }
}

void handleRemoteServoControl() {
  // Retrieve remote control values from Firebase
  if (Firebase.getInt(firebaseData, "/commands/dirX")) {
    int xValue = firebaseData.intData();
    Serial.print("Remote X: ");
    Serial.println(xValue);
    horizontalServo.write(xValue);  // Move horizontal servo based on remote input
  }

  if (Firebase.getInt(firebaseData, "/commands/dirY")) {
    int yValue = firebaseData.intData();
    Serial.print("Remote Y: ");
    Serial.println(yValue);
    verticalServo.write(yValue);  // Move vertical servo based on remote input
  }

  if (digitalRead(ADDITIONAL_SENSOR_PIN) == LOW) {
    Serial.println("Fire detected by additional sensor, stopping vertical servo");
    activateWaterPump();
    return;
  }
}

void moveVerticalServoAndCheck() {
  Firebase.setInt(firebaseData, "/commands/object", 1);
  for (int angle = 0; angle <= 60; angle += 10) {
    verticalServo.write(angle);
    delay(500);

    if (digitalRead(ADDITIONAL_SENSOR_PIN) == LOW) {
      Serial.println("Fire detected by additional sensor, stopping vertical servo");
      activateWaterPump();
      return;
    }
  }

  Firebase.setInt(firebaseData, "/commands/object", 0);  // Ensure reset
  Serial.println("Fire extinguished, resetting object to 0.");
  verticalServo.write(0);  // Reset position after sweep
}

void activateWaterPump() {
  digitalWrite(WATER_PUMP_RELAY_PIN, HIGH);
  delay(2000);  // Run the pump for 2 seconds
  digitalWrite(WATER_PUMP_RELAY_PIN, LOW);
}