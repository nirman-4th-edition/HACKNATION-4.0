import cv2
import whisper
import subprocess
from deepface import DeepFace

# ---- Step 1: Load Video Instead of Live Camera ----
video_path = "/home/hustle/Videos/Autism Stimming Examples (Signs to Look For) - Autism Family (720p, h264) (1)"
cap = cv2.VideoCapture(video_path)

# ---- Step 2: Extract & Transcribe Speech ----
audio_path = "extracted_audio.wav"
subprocess.run(["ffmpeg", "-i", video_path, "-q:a", "0", "-map", "a", audio_path, "-y"])

# Load Whisper AI model
model = whisper.load_model("base")
transcription = model.transcribe(audio_path)
text = transcription["text"]
print("\n🔹 Transcribed Speech:\n", text)

# ---- Step 3: Analyze Emotions from Video ----
emotion_log = []
frame_count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame_count += 1

    try:
        analysis = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        emotion = analysis[0]['dominant_emotion']
        emotion_log.append(emotion)

        # Display the emotion on the video feed
        cv2.putText(frame, f"Emotion: {emotion}", (50, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    except:
        pass

    cv2.imshow("Emotion Analysis", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

# ---- Step 4: Generate Autism Behavior Report ----
print("\n🔹 Emotion Patterns:", emotion_log)

# Count occurrences of each emotion
from collections import Counter
emotion_count = Counter(emotion_log)

# Identify most common emotions
most_common_emotion = emotion_count.most_common(1)[0][0]
print("\n🔹 Most Frequent Emotion:", most_common_emotion)

# Detect speech repetition patterns
words = text.split()
word_count = Counter(words)
repetitive_words = [word for word, count in word_count.items() if count > 3]
print("\n🔹 Repetitive Speech Patterns:", repetitive_words)
