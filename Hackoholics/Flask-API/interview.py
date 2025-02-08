import streamlit as st
import openvino.runtime as ov
import cv2
import numpy as np
import os
import deepgram
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GENAI_API_KEY = os.getenv("GENAI_API_KEY")
DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")

genai.configure(api_key=GENAI_API_KEY)

st.set_page_config(page_title="AI Interview System", layout="wide")

# Navigation
st.sidebar.title("AI Interview Assistant")
option = st.sidebar.radio("Select Functionality", ["Video Analysis", "Question Generation", "Audio Transcription"])

def analyze_video():
    st.title("Suspicious Activity Detection")
    uploaded_video = st.file_uploader("Upload a video", type=["mp4", "avi", "mov"])
    if uploaded_video:
        temp_video_path = "temp_video.mp4"
        with open(temp_video_path, "wb") as f:
            f.write(uploaded_video.read())
        st.video(temp_video_path)
        
        # Load OpenVINO Model
        model_path = "openvino_model.xml"
        core = ov.Core()
        model = core.read_model(model_path)
        compiled_model = core.compile_model(model, "CPU")
        
        cap = cv2.VideoCapture(temp_video_path)
        frame_skip = 5  # Process every 5th frame
        frame_count = 0
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            frame_count += 1
            if frame_count % frame_skip == 0:
                # Preprocess and infer
                resized_frame = cv2.resize(frame, (224, 224))
                input_tensor = np.expand_dims(resized_frame, axis=0)
                output = compiled_model(input_tensor)[0]
                # Assume simple threshold for demonstration
                suspicious = output[0][0] > 0.5
                if suspicious:
                    st.image(frame, caption="Suspicious Activity Detected", channels="BGR")
        cap.release()

def generate_questions():
    st.title("AI-Powered Question Generation")
    resume = st.file_uploader("Upload Resume (PDF)", type=["pdf"])
    job_desc = st.text_area("Enter Job Description")
    if st.button("Generate Questions"):
        if resume and job_desc:
            response = genai.generate_text(prompt=f"Generate interview questions for {job_desc} based on this resume: {resume.name}")
            st.write(response.text)

def transcribe_audio():
    st.title("Audio Transcription")
    uploaded_audio = st.file_uploader("Upload Audio File", type=["mp3", "wav", "m4a"])
    if uploaded_audio:
        temp_audio_path = "temp_audio.wav"
        with open(temp_audio_path, "wb") as f:
            f.write(uploaded_audio.read())
        
        st.audio(temp_audio_path)
        dg_client = deepgram.Deepgram(DEEPGRAM_API_KEY)
        with open(temp_audio_path, "rb") as audio:
            response = dg_client.transcription.sync_prerecorded(audio, {'punctuate': True})
        st.write(response['results']['channels'][0]['alternatives'][0]['transcript'])

if option == "Video Analysis":
    analyze_video()
elif option == "Question Generation":
    generate_questions()
elif option == "Audio Transcription":
    transcribe_audio()
