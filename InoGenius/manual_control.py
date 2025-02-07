import RPi.GPIO as GPIO
from pynput import keyboard
from time import sleep
import threading

in1 = 24
in2 = 23
in3 = 22
in4 = 27
enA = 25
enB = 26

GPIO.setmode(GPIO.BCM)
GPIO.setup(in1, GPIO.OUT)
GPIO.setup(in2, GPIO.OUT)
GPIO.setup(in3, GPIO.OUT)
GPIO.setup(in4, GPIO.OUT)
GPIO.setup(enA, GPIO.OUT)
GPIO.setup(enB, GPIO.OUT)

GPIO.output(in1, GPIO.LOW)
GPIO.output(in2, GPIO.LOW)
GPIO.output(in3, GPIO.LOW)
GPIO.output(in4, GPIO.LOW)

pwm_left = GPIO.PWM(enA, 1000)
pwm_right = GPIO.PWM(enB, 1000)

pwm_left.start(50)
pwm_right.start(50)

print("\n")
print("Use Keyboard Arrow Keys for Control:")
print("Press 'q' to exit.")
print("\n")

moving_forward = False
moving_backward = False
turning_left = False
turning_right = False

def on_press(key):
    global moving_forward, moving_backward, turning_left, turning_right

    try:
        if key == keyboard.Key.up:
            moving_forward = True
            print("Moving Backward", end="\r")
        elif key == keyboard.Key.down:
            moving_backward = True
            print("Moving Forward", end="\r")
        elif key == keyboard.Key.left:
            turning_left = True
            print("Turning Left", end="\r")
        elif key == keyboard.Key.right:
            turning_right = True
            print("Turning Right", end="\r")
        elif key == keyboard.Key.esc:
            print("\nExiting...")
            return False

    except AttributeError:
        pass

def on_release(key):
    global moving_forward, moving_backward, turning_left, turning_right

    if key == keyboard.Key.up:
        moving_forward = False
    elif key == keyboard.Key.down:
        moving_backward = False
    elif key == keyboard.Key.left:
        turning_left = False
    elif key == keyboard.Key.right:
        turning_right = False

listener = keyboard.Listener(on_press=on_press, on_release=on_release)

def motor_control():
    try:
        while True:
            if moving_forward:
                GPIO.output(in1, GPIO.LOW)
                GPIO.output(in2, GPIO.HIGH)
                GPIO.output(in3, GPIO.LOW)
                GPIO.output(in4, GPIO.HIGH)
                pwm_left.ChangeDutyCycle(50)
                pwm_right.ChangeDutyCycle(50)

                if turning_left:
                    print("Turning Left While Moving Forward", end="\r")
                    pwm_left.ChangeDutyCycle(30)
                    pwm_right.ChangeDutyCycle(50)
                elif turning_right:
                    print("Turning Right While Moving Forward", end="\r")
                    pwm_right.ChangeDutyCycle(30)
                    pwm_left.ChangeDutyCycle(50)

            elif moving_backward:
                GPIO.output(in1, GPIO.HIGH)
                GPIO.output(in2, GPIO.LOW)
                GPIO.output(in3, GPIO.HIGH)
                GPIO.output(in4, GPIO.LOW)
                pwm_left.ChangeDutyCycle(50)
                pwm_right.ChangeDutyCycle(50)

            elif turning_left:
                print("Turning Left", end="\r")
                GPIO.output(in1, GPIO.LOW)
                GPIO.output(in2, GPIO.LOW)
                GPIO.output(in3, GPIO.HIGH)
                GPIO.output(in4, GPIO.LOW)
                pwm_left.ChangeDutyCycle(30)
                pwm_right.ChangeDutyCycle(50)

            elif turning_right:
                print("Turning Right", end="\r")
                GPIO.output(in1, GPIO.HIGH)
                GPIO.output(in2, GPIO.LOW)
                GPIO.output(in3, GPIO.LOW)
                GPIO.output(in4, GPIO.LOW)
                pwm_right.ChangeDutyCycle(30)
                pwm_left.ChangeDutyCycle(50)

            else:
                GPIO.output(in1, GPIO.LOW)
                GPIO.output(in2, GPIO.LOW)
                GPIO.output(in3, GPIO.LOW)
                GPIO.output(in4, GPIO.LOW)
                pwm_left.ChangeDutyCycle(0)
                pwm_right.ChangeDutyCycle(0)
                print("Stopped  ", end="\r")

            sleep(0.1)

    except KeyboardInterrupt:
        print("\nInterrupted!")

    finally:
        GPIO.cleanup()
        print("GPIO Cleaned Up.")

listener_thread = threading.Thread(target=listener.start)
listener_thread.daemon = True
listener_thread.start()

motor_control()
