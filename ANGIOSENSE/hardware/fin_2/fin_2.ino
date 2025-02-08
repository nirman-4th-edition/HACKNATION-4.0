#include <Wire.h>
#include "I2Cdev.h"
#include "MPU6050.h"
#include <OneWire.h>
#include <DallasTemperature.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

#define ECG_LO_PLUS 32
#define ECG_LO_MINUS 33
#define ECG_OUTPUT 34
#define PULSE_SENSOR 35
#define TEMP_SENSOR 14

const char *ssid  = "YZ";
const char *password = "pallu1600";
const char AWS_IOT_ENDPOINT[] = "a1nwvk9vl6f9df-ats.iot.us-east-1.amazonaws.com";

#define AWS_IOT_PUBLISH_TOPIC "device/data"
#define AWS_IOT_SUBSCRIBE_TOPIC "device/command"

static const char AWS_CERT_CA[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs
N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv
o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU
5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy
rqXRfboQnoZsG4q5WTP468SQvvG5
-----END CERTIFICATE-----

)EOF";

// Device Certificate
static const char AWS_CERT_CRT[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIDWjCCAkKgAwIBAgIVAPDRVWerOn71V9YFxeHbJlmkmR+LMA0GCSqGSIb3DQEB
CwUAME0xSzBJBgNVBAsMQkFtYXpvbiBXZWIgU2VydmljZXMgTz1BbWF6b24uY29t
IEluYy4gTD1TZWF0dGxlIFNUPVdhc2hpbmd0b24gQz1VUzAeFw0yNTAyMDUyMDIz
MjRaFw00OTEyMzEyMzU5NTlaMB4xHDAaBgNVBAMME0FXUyBJb1QgQ2VydGlmaWNh
dGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDSxYQ2C7pjcLK1j6VQ
43A5dUYdY9I6RnGUejQRLlxBKGqOCY617VxbJ7EoW3Gtw0PlPy56z7pRfhWvgYrH
lqefqAmVORqtlrpIh7gDfbTarCpqIKmHXSqP7hWtjEiwZGlVTfHOXWFZ6YFBrDww
946KhY545JHrVi5FXjlecbZrGW+gyjxC7NEZmcdcuiM+GlsUq3gklqDYA5TxFkwh
WQueyeyZx4Oavbr6OQj2u8gl0aaeK5y58sgAEeJURZe3VzFRFMYrzjVRlUlH742t
AJfq/WZgPFitKz/+1oX2JxphMsTXddDYYk6+ukv/+/wiBajqqf9q6uz9iIS2pH6P
F2epAgMBAAGjYDBeMB8GA1UdIwQYMBaAFIsIh0i0iWdtfJ9Dt+tPaHCKzy8FMB0G
A1UdDgQWBBQOIGLbSIUhUjjSNJfLkbDHgXvGhTAMBgNVHRMBAf8EAjAAMA4GA1Ud
DwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAQEAgthPk4bIJyg9hHgFb/JfPm9R
4TQ3rlEPDqc5QR5izbTyh0Tje3MHK3OLqbFrxCVHopRIwFcCgU/N0a7gHrXwleGy
iJg2V19BRYkNxS6JQLjTtHM8wkwDFzWHSQv4fnaU1gJMgsXjo/V41goo8e2ADHRd
dWB1eoY+D+kSTqz36IkBazL38vrkwLlRqfkJUskEnU40vuPM1RfQGoMtnpUaZHqT
ZRfnOa0LnRFrmGFk2+GsnfB4U4vL1UXND8eIiv6k8l5jzdGM4n5U+C9v1FhOv0HN
ACvaWJnbKMVDXrqgRAV6uCErax9nTQKDw8pHZEYMQ08SGzs8gf8c1RFLEE4PQg==
-----END CERTIFICATE-----


)EOF";

// Device Private Key
static const char AWS_CERT_PRIVATE[] PROGMEM = R"EOF(
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA0sWENgu6Y3CytY+lUONwOXVGHWPSOkZxlHo0ES5cQShqjgmO
te1cWyexKFtxrcND5T8ues+6UX4Vr4GKx5ann6gJlTkarZa6SIe4A3202qwqaiCp
h10qj+4VrYxIsGRpVU3xzl1hWemBQaw8MPeOioWOeOSR61YuRV45XnG2axlvoMo8
QuzRGZnHXLojPhpbFKt4JJag2AOU8RZMIVkLnsnsmceDmr26+jkI9rvIJdGmniuc
ufLIABHiVEWXt1cxURTGK841UZVJR++NrQCX6v1mYDxYrSs//taF9icaYTLE13XQ
2GJOvrpL//v8IgWo6qn/aurs/YiEtqR+jxdnqQIDAQABAoIBAAHIHaf/TWINz9Tt
E+6tHYO+1Arnjx1i/w7MQahrhegfGVd+CTDMgt1aZor6yuk3H1nOwOvU2bRapoBH
Tg8F3QDigMI8K1eQUJ7QVuPgqii3D9y5zfUQ+o0g7Bn9d5fWIXXRJNwjufDyol8V
v6SCUzgkjOHEvN8KaXW4qC9+MpaRKokEmaFNeJ6NOMBgsAytfbHhilgcNoMc6uOX
t46Cw3WiKwRosx70iRHYuCwzZOB/CPJ16zWzFQ/RuSpTirwIMpNRGbcHnXGME7KB
+zLaJ89I/K0EqtHnQ3rT0P4j1CDRRWcXWb4C1SnOboQ79Kj6ReypU3/kuXGGwnmb
/QKuLCkCgYEA/f/hYVVCOD4JEfYbjkkQYwALsrBcweJTrlJ1HHldIIuBjTlKXZ9z
l0SP72LzPjqx0IKPlInz9Dtp6SYJS2lFOYLKXBNc5G4p/RH5EXHhWBegLW5iawm4
eEBt3cGMVHGCR8uYVwLu9arALKcZfQzvxvXjgSHlqfk5QnVNlWhOlTMCgYEA1G56
k8+VYHjAKgiciTxp6ZVwiJ57M19O3DfDxjGKQcP5hBPpftzzQRtrK6LFRKezChhv
0sLOausb908t8e5yuhwSfITh2SGPsK1U41rXx/CR609/bsLVB3h+67D9iZDGkTYH
mnmwudKL/rFjeC6IEKhqAAg5Upy06zYI/hlMl7MCgYBQeW3TBMxCPYVqJ2t7nTKP
60fJiY8Z7rdMl9t69gjHcuvM7sXc+9QHrTVdRyCCKt6DjZooGb0tOFXKBL8VIXlJ
S2MJ4SihRzYOdE9Rc59N5c5eFocgGqhTkTY9+ECZ0IzSanMNvmQvebYBb7/nmt2t
T+KQ20iEne3CXKAEIlQjeQKBgQDIQcHSF610vUBCH84ZXVdmuNbWI7h2jFFWLkej
Tc5NAwb0KKVET9wNM2DLSO14NDMGwFSiNbzLdAnwELd6S1Ph+FbBBa+2tfm0DyJo
FZo3RKT6U/4Ilyilm0TiwP2xskZOW8W9LRyZgE8y8VyYzhy8v1b14srPAyVWWqEN
kSHwGwKBgQC/qtuzbXtzdDQTo7HRLz4UtE+gGqkbqAwmpn+A/JU1J8xRlDRPqfrJ
jVYdgNn1A9nQNEiwCJoSCmoD7KC74aKrpfqK2WWx5P74h8sqdK8FCfmv56+s7KzX
BrtMGl/V5LpSr0RjP9a5gxDXciCv0N4Tk6uV4s6UCGr+DE1Z9YpAlA==
-----END RSA PRIVATE KEY-----


)EOF";

MPU6050 mpu;
OneWire oneWire(TEMP_SENSOR);
DallasTemperature tempSensor(&oneWire);
WiFiClientSecure net;
PubSubClient client(net);

const unsigned long DATA_SAMPLE_PERIOD = 5000; 
unsigned long lastSampleTime = 0;

int ecgValue = 0;

void connectAWS() {
    WiFi.begin(ssid, password);
    Serial.println("Connecting to Wi-Fi...");
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting...");
    }
    Serial.println("Connected to WiFi");

    net.setCACert(AWS_CERT_CA);
    net.setCertificate(AWS_CERT_CRT);
    net.setPrivateKey(AWS_CERT_PRIVATE);
    client.setServer(AWS_IOT_ENDPOINT, 8883);

    Serial.println("Connecting to AWS IoT...");
    while (!client.connect("ECG_Device")) {
        Serial.print(".");
        delay(1000);
    }
    Serial.println("\nConnected to AWS IoT!");
    client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);
}

void publishMessage() {
    StaticJsonDocument<256> doc;
    
    tempSensor.requestTemperatures();
    float temperatureC = tempSensor.getTempCByIndex(0);
    ecgValue = analogRead(ECG_OUTPUT);
    int pulseValue = analogRead(PULSE_SENSOR);
    unsigned long timestamp = millis();

    Serial.println("===== SENSOR DATA =====");
    Serial.print("Temperature (°C): ");
    Serial.println(temperatureC);
    Serial.print("ECG Value: ");
    Serial.println(ecgValue);
    Serial.print("Pulse Value: ");
    Serial.println(pulseValue);
    Serial.print("Timestamp (ms): ");
    Serial.println(timestamp);
    Serial.println("=======================");

    doc["temperature"] = temperatureC;
    doc["ecg"] = ecgValue;
    doc["pulse"] = pulseValue;
    doc["timestamp"] = timestamp;

    char jsonBuffer[512];
    serializeJson(doc, jsonBuffer);

    client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
}

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

    connectAWS();
}

void loop() {
    if (!client.connected()) {
        connectAWS();
    }
    client.loop();
    
    if (millis() - lastSampleTime >= DATA_SAMPLE_PERIOD) {
        lastSampleTime = millis();
        publishMessage();
        Serial.println("Sensor data published to AWS IoT.");
    }

    ecgValue = analogRead(ECG_OUTPUT);
    int pulseValue = analogRead(PULSE_SENSOR);
    
    Serial.print("ECG:"); Serial.print(ecgValue);
    Serial.print("\tPulse:"); Serial.println(pulseValue);

    delay(50); 
}
