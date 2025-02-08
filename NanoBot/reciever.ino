#include <RF24.h>
#include <string.h>

RF24 radio(7, 8);

const byte address[6] = "00001";
const char passwd[] = "yrrf74388t5nyfdlzbvwu1ruv48!";

void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.openReadingPipe(0, address);
  radio.setPALevel(RF24_PA_MAX);
  radio.startListening();
  pinMode(4, OUTPUT);
}

void loop() {
  delay(300);
  char text[32] = "";
  if(radio.available()) {
    radio.read(&text, sizeof(text));
    if(strcmp(passwd, text) == 0) {
      digitalWrite(4, LOW);
      //Serial.println(text);
    }
    else
      digitalWrite(4, HIGH);
  }
  else if(!radio.available())
    digitalWrite(4, HIGH);
}