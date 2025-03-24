// constants won't change. They're used here to set pin numbers:
const int buttonPin1 = 2;  // the number of the pushbutton pin
const int buttonPin2 = 3;
const int ledPin = 13;    // the number of the LED pin
const int ledPin2 = 12;    // the number of the LED pin

// variables will change:
int buttonState = 0;  // variable for reading the pushbutton status
int buttonState2 = 0;

int ledState = LOW;  // ledState used to set the LED
int lastButtonState = LOW;  // the previous reading from the input pin
int lastButtonState2 = LOW;  // the previous reading from the input pin

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 50;    // the debounce time; increase if the output flickers

// Generally, you should use "unsigned long" for variables that hold time
// The value will quickly become too large for an int to store
unsigned long previousMillis = 0;  // will store last time LED was updated

// constants won't change:
const long interval = 1000;  // interval at which to blink (milliseconds)
const long interval2 = 100;  // interval at which to blink (milliseconds)

void setup() {
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  // initialize the LED pin as an output:
  pinMode(ledPin2, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin1, INPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin2, INPUT);
}

void loop() {
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin1);
  buttonState2 = digitalRead(buttonPin2);

  if (buttonState != lastButtonState) {
    lastDebounceTime = millis();
  } else if (buttonState2 != lastButtonState2) {
    lastDebounceTime = millis();
  }

  if (millis() - lastDebounceTime > debounceDelay) {

    // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
    if (buttonState == HIGH) {
      // turn LED on:
      unsigned long currentMillis = millis();
      if (currentMillis - previousMillis >= interval) {
        // save the last time you blinked the LED
        previousMillis = currentMillis;

        // if the LED is off turn it on and vice-versa:
        if (ledState == LOW) {
          ledState = HIGH;
        } else {
          ledState = LOW;
        }
    }

    // set the LED with the ledState of the variable:
    digitalWrite(ledPin, ledState);
    } else if (buttonState2 == HIGH) {
      // turn LED on:
      unsigned long currentMillis = millis();
      if (currentMillis - previousMillis >= interval2) {
        // save the last time you blinked the LED
        previousMillis = currentMillis;

        // if the LED is off turn it on and vice-versa:
        if (ledState == LOW) {
          ledState = HIGH;
        } else {
          ledState = LOW;
        }
    }

    // set the LED with the ledState of the variable:
    digitalWrite(ledPin2, ledState);
    } else {
      // turn LED off:
      digitalWrite(ledPin, LOW);
      digitalWrite(ledPin2, LOW);
      previousMillis = 0;
      ledState = LOW;
    }
  }

  lastButtonState = buttonState;
  lastButtonState2 = buttonState2;
}