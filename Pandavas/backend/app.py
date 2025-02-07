import os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
import tensorflow as tf
print("Current Working Directory:", os.getcwd())

from dotenv import load_dotenv
from flask import Flask, request, jsonify, Response, flash
from flask_cors import CORS
from flask_mail import Mail, Message



load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

from modules.youtube_processor import YouTubeSummarizer
from modules.web_processor import WebPageSummarizer

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv("EMAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("EMAIL_PASSWORD")
app.config['MAIL_DEFAULT_SENDER'] = os.getenv("MAIL_DEFAULT_SENDER")

CORS(app)
mail = Mail(app)

yt_summarizer = YouTubeSummarizer()
webpage_summarizer = WebPageSummarizer(groq_api_key=GROQ_API_KEY)


def send_email(name, email, message):
    try:
        msg = Message('Contact Form Submission',
                      sender=os.getenv("MAIL_USERNAME"),
                      recipients=[os.getenv("RECIPIENT_EMAIL")])
        msg.body = f"Name: {name}\nEmail: {email}\nMessage: {message}"
        mail.send(msg)
        return True
    except Exception as e:
        print(f"Email sending error: {e}")
        flash(f"An error occurred while sending email: {e}", 'error')
        return False
    

@app.route("/summarize", methods=["POST"])
def summarize_video():
    data = request.json
    video_url = data.get("video_url")
    video_id = yt_summarizer.extract_video_id(video_url)
    if not video_id:
        return jsonify({"error": "Invalid YouTube URL"}), 400

    def generate():
        for chunk in yt_summarizer.summarize_video_stream(video_url):
            yield chunk + "\n"

    return Response(generate(), content_type="text/plain", status=200)


@app.route("/summarize_web", methods=["POST"])
def summarize_web():
    data = request.json
    url = data.get("url")
    if not url:
        return jsonify({"error": "URL is required."}), 400
    try:
        def generate():
            for chunk in webpage_summarizer.summarize_page_stream(url):
                yield chunk + "\n"
        return Response(generate(), mimetype="text/plain")
    except Exception as e:
        return jsonify({"error": str(e)}), 500