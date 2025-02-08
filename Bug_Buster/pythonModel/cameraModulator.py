import cv2
import numpy as np
import pygame
import time

# Initialize pygame mixer
pygame.mixer.init()

# Load the alarm sound
alarm_sound = pygame.mixer.Sound("alarm-sound.mp3")

# Configuration parameters
ACTUAL_FLAME_WIDTH_CM = 5.0  # Measure your flame source width in centimeters
FOCAL_LENGTH = 600.0         # Calibrate using: FOCAL_LENGTH = (KNOWN_WIDTH_PX * KNOWN_DISTANCE_CM) / ACTUAL_FLAME_WIDTH_CM

def detect_fire(frame):
    global last_fire_time, last_fire_coords, last_fire_distance
    
    # Convert frame to HSV color space
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    # Define HSV range for fire detection
    lower_fire = np.array([0, 50, 200])
    upper_fire = np.array([35, 255, 255])
    
    # Create a mask for fire color
    mask = cv2.inRange(hsv, lower_fire, upper_fire)
    
    # Apply noise reduction and enhancement
    mask = cv2.GaussianBlur(mask, (5, 5), 0)
    kernel = np.ones((3, 3), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_DILATE, kernel)
    
    # Find contours in the processed mask
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    fire_detected = False
    new_fire_coords = None
    distance_cm = 0

    if contours:
        # Select largest contour
        contour = max(contours, key=cv2.contourArea)
        area = cv2.contourArea(contour)
        
        if area > 50:
            x, y, w, h = cv2.boundingRect(contour)
            
            # Calculate fire characteristics
            aspect_ratio = float(w) / h
            hull = cv2.convexHull(contour)
            hull_area = cv2.contourArea(hull)
            solidity = float(area) / hull_area if hull_area > 0 else 0
            
            if 0.2 < aspect_ratio < 2 and solidity > 0.3:
                # Calculate coordinates (origin at top-left)
                frame_height, frame_width = frame.shape[:2]
                center_x = x + w // 2
                center_y = y + h // 2
                new_fire_coords = (center_x, center_y)
                
                # Calculate distance from camera
                if w > 0:
                    distance_cm = (ACTUAL_FLAME_WIDTH_CM * FOCAL_LENGTH) / w
                    distance_cm = round(distance_cm, 1)
                
                fire_detected = True
                
                # Update tracking information every 5 seconds
                if last_fire_coords is None or time.time() - last_fire_time >= 5:
                    last_fire_coords = new_fire_coords
                    last_fire_distance = distance_cm
                    last_fire_time = time.time()
                
                # Draw detection overlay
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
                info_text = f"Coordinates: {last_fire_coords}  Distance: {last_fire_distance}cm"
                cv2.putText(frame, info_text, (x, y - 10), 
                          cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

    if not fire_detected:
        last_fire_coords = None
        last_fire_distance = None

    return frame, fire_detected

# Initialize video capture
cap = cv2.VideoCapture(0)

# Global tracking variables
last_fire_coords = None
last_fire_distance = None
last_fire_time = 0
alarm_playing = False

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Process frame for fire detection
    processed_frame, fire_detected = detect_fire(frame)
    
    # Sound alarm if fire detected
    if fire_detected:
        if not alarm_playing:
            alarm_sound.play(-1)
            alarm_playing = True
        status_text = f"FIRE DETECTED! Location: {last_fire_coords} Distance: {last_fire_distance}cm"
    else:
        if alarm_playing:
            alarm_sound.stop()
            alarm_playing = False
        status_text = "No fire detected"
    
    # Display status
    cv2.putText(processed_frame, status_text, (10, 30),
               cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255) if fire_detected else (0, 255, 0), 2)
    cv2.imshow('Fire Detection System', processed_frame)

    # Exit on 'q' key
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Cleanup resources
if alarm_playing:
    alarm_sound.stop()
cap.release()
cv2.destroyAllWindows()
pygame.quit()