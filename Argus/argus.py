import os
from flask import Flask, jsonify, make_response, Response
from flask_cors import CORS, cross_origin
import sys
from waitress import serve
from threading import Thread
from ultralytics import YOLO
import cv2
from detectors import detectObjectsInFrame
import time

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


ALERT_STATUS = "none"
LATEST_GENERATED_FRAME = None

@app.route("/getAlertStatus", methods=["GET"])
@cross_origin()
def getAlertStatus():
    return make_response(jsonify({"status":ALERT_STATUS}), 200)


# Generate images from the processed video to stream
def gen():
    while True:
        ret, jpeg = cv2.imencode('.jpg', LATEST_GENERATED_FRAME)
        frame = jpeg.tobytes()
        time.sleep(0.1)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


@app.route("/getLastFrame", methods=["GET"])
@cross_origin()
def getStreams():

    if(ALERT_STATUS == 'none' or LATEST_GENERATED_FRAME.any() == False):
        return make_response(jsonify({"errReason":"Stream EOF or not found!"}), 404)
    
    return Response(gen(), mimetype="multipart/x-mixed-replace; boundary=frame")

def resetAlertFlag(cooldownTimeInSeconds = 10):
    global ALERT_STATUS
    while 1:
        time.sleep(cooldownTimeInSeconds)
        ALERT_STATUS = "none"




def main(showRealtimeFeedBacks = True):
    print("""
░█████╗░██████╗░░██████╗░██╗░░░██╗░██████╗
██╔══██╗██╔══██╗██╔════╝░██║░░░██║██╔════╝
███████║██████╔╝██║░░██╗░██║░░░██║╚█████╗░
██╔══██║██╔══██╗██║░░╚██╗██║░░░██║░╚═══██╗
██║░░██║██║░░██║╚██████╔╝╚██████╔╝██████╔╝
╚═╝░░╚═╝╚═╝░░╚═╝░╚═════╝░░╚═════╝░╚═════╝░
        
        ---  Control Terminal ---
""")
    
    weapon_detector_model = YOLO('./weights/weapons_detector/Normal_Compressed/weights/best.pt')
    fire_detector_model = YOLO('./weights/fire_detector/detect/train/weights/best.pt')

    videoCapture = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    videoCapture.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    videoCapture.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    fourcc = cv2.VideoWriter_fourcc('M','J','P','G')
    result_video_path = "processed_vid.mp4"
    out = cv2.VideoWriter(result_video_path, fourcc, 10.0, (1280, 720))

    global ALERT_STATUS, LATEST_GENERATED_FRAME

    while True:
        ret, frame = videoCapture.read()
        if not ret:
            break

        weaponsDetections = detectObjectsInFrame(frame, weapon_detector_model, color=(3,6,191))
        fireDetections = detectObjectsInFrame(weaponsDetections[1], fire_detector_model, color=(212,245,0))

        if(weaponsDetections[0] or fireDetections[0]):
            out.write(fireDetections[1])
            LATEST_GENERATED_FRAME = fireDetections[1]
            if(weaponsDetections[0] and fireDetections[0]):
                ALERT_STATUS = "chaos"
            elif(weaponsDetections[0]):
                ALERT_STATUS = "crime"
            elif(fireDetections[0]):
                ALERT_STATUS = "fire"
            else:
                ALERT_STATUS = "none"

        if(showRealtimeFeedBacks):
            cv2.imshow("Argus", fireDetections[1])
            if cv2.waitKey(24) == 13: #13 is the Enter Key
                break
    
    videoCapture.release()
    out.release()
    if(showRealtimeFeedBacks):
        cv2.destroyAllWindows()


if __name__ == "__main__":

    Thread(target=main, args=[True], name="Main Worker", daemon=True).start()
    Thread(target=resetAlertFlag, args=[15], name="Flag Reset Worker", daemon=True).start()

    try:
        bind_ip = sys.argv[1]
    except:
        bind_ip = "127.0.0.1"
    
    try:
        bind_port = sys.argv[2]
    except:
        bind_port = 5000
    print("API Server running on http://"+str(bind_ip)+":"+str(bind_port))
    serve(app, host=bind_ip, port=bind_port)