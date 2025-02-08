from flask import Flask, request, jsonify
import openai
import cv2
import numpy as np
import google.generativeai as genai
import whisper_timestamped as whisper
import os
import base64
from PIL import Image
import pytesseract
from pydub import AudioSegment
from openvino import Core
# from google.cloud import speech
import io
from vosk import Model, KaldiRecognizer
import asyncio
import wave
from deepgram import Deepgram

dg_client = Deepgram(api_key=os.getenv("DEEPGRAM_API_KEY"))
app = Flask(__name__)
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

whisper_model = whisper.load_model("base")
model_xml = "face-detection-adas-0001.xml"
model_bin = "face-detection-adas-0001.bin"
ie = Core()
net = ie.read_model(model=model_xml, weights=model_bin)
exec_net = ie.compile_model(model=net, device_name="CPU")
input_blob = net.input(0)
out_blob = net.output(0)

head_pose_model_xml = "head-pose-estimation-adas-0001.xml"
head_pose_model_bin = "head-pose-estimation-adas-0001.bin"
head_pose_net = ie.read_model(model=head_pose_model_xml, weights=head_pose_model_bin)
head_pose_exec_net = ie.compile_model(model=head_pose_net, device_name="CPU")

head_pose_input_blob = head_pose_net.input(0)
yaw_output_blob = head_pose_net.output(0)   
pitch_output_blob = head_pose_net.output(1) 
roll_output_blob = head_pose_net.output(2)  

@app.route("/analyze_suspicious_activity", methods=["POST"])
def analyze_video():
    """Detects suspicious activities from the interview video and returns the processed frames."""
    file = request.files["file"]
    with open("temp_video.mp4", "wb") as buffer:
        buffer.write(file.read())

    cap = cv2.VideoCapture("temp_video.mp4")
    suspicious_detected = False
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_interval = int(fps * 5)  # Process every 5 seconds

    frame_count = 0
    processed_frames = []

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        frame_count += 1
        if frame_count % frame_interval != 0:
            continue

        (h, w) = frame.shape[:2]
        blob = cv2.dnn.blobFromImage(frame, size=(672, 384), ddepth=cv2.CV_8U)

        infer_request = exec_net.create_infer_request()
        infer_request.infer({input_blob.any_name: blob})
        result = infer_request.get_output_tensor(0).data

        faces_detected = 0
        for detection in result[0][0]:
            confidence = detection[2]
            if confidence > 0.5:
                faces_detected += 1
                xmin, ymin, xmax, ymax = int(detection[3] * w), int(detection[4] * h), int(detection[5] * w), int(detection[6] * h)
                cv2.rectangle(frame, (xmin, ymin), (xmax, ymax), (255, 0, 0), 2)

        if faces_detected != 1:
            suspicious_detected = True
            cv2.putText(frame, "Suspicious Activity!", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        if faces_detected == 1:
            face_roi = frame[ymin:ymax, xmin:xmax]
            if face_roi.size > 0:
                face_blob = cv2.dnn.blobFromImage(face_roi, size=(60, 60), ddepth=cv2.CV_32F)
                head_pose_request = head_pose_exec_net.create_infer_request()
                head_pose_request.infer({head_pose_input_blob.any_name: face_blob})

                yaw = head_pose_request.get_output_tensor(yaw_output_blob).data[0]
                pitch = head_pose_request.get_output_tensor(pitch_output_blob).data[0]

                # Mark suspicious if head is looking away (threshold: >20 degrees)
                if abs(yaw) > 20 or abs(pitch) > 20:
                    suspicious_detected = True
                    cv2.putText(frame, "Suspicious Head Movement!", (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        frame_filename = f"frame_{frame_count}.jpg"
        cv2.imwrite(frame_filename, frame)
        with open(frame_filename, "rb") as img_file:
            b64_string = base64.b64encode(img_file.read()).decode('utf-8')
            processed_frames.append(b64_string)
        os.remove(frame_filename)

    cap.release()

    response = {"suspicious_activity": suspicious_detected, "frames": processed_frames}
    return jsonify(response)



@app.route("/transcribe_audio", methods=["POST"])
def transcribe_audio():
    """Transcribes recorded audio response using Deepgram."""
    file = request.files["file"]

    # Save the uploaded audio file
    file_path = "temp_audio.wav"
    file.save(file_path)

    async def transcribe():
        with open(file_path, 'rb') as audio:
            source = {'buffer': audio, 'mimetype': 'audio/wav'}
            response = await dg_client.transcription.prerecorded(source, {'punctuate': True})
            return response

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(transcribe())

    transcript = result['results']['channels'][0]['alternatives'][0]['transcript']
    return jsonify({"transcription": transcript})

@app.route("/generate_questions", methods=["POST"])
def generate_questions():
    """Generates interview questions based on resume and job description using Gemini-1.5-Flash."""
    resume = request.form.get("resume")
    job_desc = request.form.get("job_desc")
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"Generate five interview questions based on this resume: {resume} and job description: {job_desc}."
    
    response = model.generate_content(prompt)
    
    return jsonify({"questions": response.text})
if __name__ == '__main__':
    app.run(port=8000)