import threading
import time
import random
import RPi.GPIO as GPIO

BRAKE_PIN = 18
LEFT_TURN_PIN = 24
RIGHT_TURN_PIN = 25
GPIO.setmode(GPIO.BCM)
GPIO.setup(BRAKE_PIN, GPIO.OUT)
GPIO.setup(LEFT_TURN_PIN, GPIO.OUT)
GPIO.setup(RIGHT_TURN_PIN, GPIO.OUT)

class CollisionAvoidanceSystem:
    def __init__(self):
        self.running = True

    def stop(self):
        self.running = False

class ForwardCollisionWarning(threading.Thread):
    def __init__(self, system):
        super().__init__()
        self.system = system

    def run(self):
        while self.system.running:
            if random.randint(1, 100) > 90:
                if random.randint(1, 100) <= 30:
                    GPIO.output(BRAKE_PIN, GPIO.HIGH)
                    time.sleep(2)
                    GPIO.output(BRAKE_PIN, GPIO.LOW)
                    self.system.stop()
            time.sleep(1)

class LaneKeepingSystem(threading.Thread):
    def __init__(self, system):
        super().__init__()
        self.system = system

    def run(self):
        while self.system.running:
            if random.randint(1, 100) > 85:
                if random.randint(1, 100) <= 40:
                    if random.choice([True, False]):
                        GPIO.output(LEFT_TURN_PIN, GPIO.HIGH)
                        time.sleep(1)
                        GPIO.output(LEFT_TURN_PIN, GPIO.LOW)
                    else:
                        GPIO.output(RIGHT_TURN_PIN, GPIO.HIGH)
                        time.sleep(1)
                        GPIO.output(RIGHT_TURN_PIN, GPIO.LOW)
            time.sleep(1)

if __name__ == "__main__":
    system = CollisionAvoidanceSystem()
    fcw_thread = ForwardCollisionWarning(system)
    lks_thread = LaneKeepingSystem(system)

    fcw_thread.start()
    lks_thread.start()

    try:
        time.sleep(30)
    except KeyboardInterrupt:
        pass

    system.stop()
    fcw_thread.join()
    lks_thread.join()
    GPIO.cleanup()
