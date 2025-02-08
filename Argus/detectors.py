import cv2

def detectObjectsInFrame(frame, yolo_model, color=(0,0,255)):
    results = yolo_model(frame)

    isAnyObjectsDetected = False

    for result in results:
        classes = result.names
        cls = result.boxes.cls
        conf = result.boxes.conf
        detections = result.boxes.xyxy

        for pos, detection in enumerate(detections):
            if conf[pos] >= 0.4:
                xmin, ymin, xmax, ymax = detection
                label = f"{classes[int(cls[pos])]} {conf[pos]:.2f}" 
                (w, h), _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 1)

                # Bounding Box
                cv2.rectangle(frame, (int(xmin), int(ymin)), (int(xmax), int(ymax)), color, 2)
                
                # Label
                cv2.rectangle(frame, (int(xmin), int(ymin) - 20), (int(xmin)+w+5, int(ymin)), color, -1)
                cv2.putText(frame, label, (int(xmin)+5, int(ymin) - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255,255,255), 1, cv2.LINE_AA)

                isAnyObjectsDetected = True

    return (isAnyObjectsDetected, frame)