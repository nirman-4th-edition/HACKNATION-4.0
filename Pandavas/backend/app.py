import os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
import tensorflow as tf
print("Current Working Directory:", os.getcwd())

from dotenv import load_dotenv
from flask import Flask, request, jsonify, Response, flash
from flask_cors import CORS
from PyPDF2 import PdfMerger
from flask_mail import Mail, Message
import psycopg2
from psycopg2.extras import RealDictCursor
import datetime
from flask_sqlalchemy import SQLAlchemy

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

from modules.pdf_processor import PDFProcessor
from modules.youtube_processor import YouTubeSummarizer
from modules.web_processor import WebPageSummarizer
from modules.handleQuiz import QuizGenerator
from modules.chatbot import ChatBot 
from modules.handleLessonPlan import LessonPlanGenerator

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

UPLOAD_FOLDER_PDF = "uploads_pdf"
os.makedirs(UPLOAD_FOLDER_PDF, exist_ok=True)

UPLOAD_FOLDER_QUIZ = "uploads_quiz"
os.makedirs(UPLOAD_FOLDER_QUIZ, exist_ok=True)

yt_summarizer = YouTubeSummarizer()
pdf_summarizer = PDFProcessor(groq_api_key=GROQ_API_KEY)
webpage_summarizer = WebPageSummarizer(groq_api_key=GROQ_API_KEY)
quiz_generator = QuizGenerator()
bot = ChatBot()
plan_generator = LessonPlanGenerator()


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


def get_db_connection():
    return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)


# ----------------------------
# PDF Summarizer endpoints (using UPLOAD_FOLDER_PDF)
# ----------------------------

@app.route("/upload_pdf", methods=["POST"])
def upload_pdf_summarizer():
    if "pdfs" not in request.files:
        return jsonify({"error": "No files uploaded"}), 400

    files = request.files.getlist("pdfs")
    
    merged_pdf_path = os.path.join(UPLOAD_FOLDER_PDF, "merged.pdf")
    try:
        merger = PdfMerger()
        for file in files:
            file_path = os.path.join(UPLOAD_FOLDER_PDF, file.filename)
            file.save(file_path)
            merger.append(file_path)
        merger.write(merged_pdf_path)
        merger.close()
        return jsonify({"message": "PDFs uploaded and merged successfully for Summarization", "path": merged_pdf_path})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/summarize_pdf", methods=["GET"])
def summarize_pdf():
    merged_pdf_path = os.path.join(UPLOAD_FOLDER_PDF, "merged.pdf")
    if not os.path.exists(merged_pdf_path):
        return jsonify({"error": "No merged PDF found for summarization"}), 400

    def generate():
        for chunk in pdf_summarizer.stream_summarize_pdf(merged_pdf_path):
            yield chunk

    return Response(generate(), mimetype="text/plain")


# ----------------------------
# Quiz endpoints (using UPLOAD_FOLDER_QUIZ)
# ----------------------------

@app.route("/upload", methods=["POST"])
def upload_pdf_quiz():
    if "pdfs" not in request.files:
        return jsonify({"error": "No files uploaded"}), 400

    files = request.files.getlist("pdfs")
    merged_pdf_path = os.path.join(UPLOAD_FOLDER_QUIZ, "merged_quiz.pdf")
    try:
        merger = PdfMerger()
        for file in files:
            file_path = os.path.join(UPLOAD_FOLDER_QUIZ, file.filename)
            file.save(file_path)
            merger.append(file_path)
        merger.write(merged_pdf_path)
        merger.close()
        return jsonify({"message": "PDFs uploaded and merged successfully for Quiz", "path": merged_pdf_path})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/quiz", methods=["POST"])
def quiz():
    data = request.json
    difficulty = data.get("difficulty")
    mode = data.get("mode")
    num_questions = min(int(data.get("num_questions", 10)), 20)
    merged_pdf_path = os.path.join(UPLOAD_FOLDER_QUIZ, "merged_quiz.pdf")
    if not os.path.exists(merged_pdf_path):
        return jsonify({"error": "No merged PDF found for quiz"}), 400
    quiz_data = quiz_generator.generate_quiz(merged_pdf_path, difficulty, mode, num_questions)
    return jsonify({"quiz": quiz_data})


# ----------------------------
# Other endpoints (video, web, grade, contact, etc.)
# ----------------------------

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


@app.route("/grade", methods=["POST"])
def grade():
    data = request.json
    mode = data.get("mode")
    responses = data.get("responses")
    student_name = data.get("student_name", "Anonymous")
    try:
        if mode == "choice":
            correct_answers = data.get("correct_answers")
            score = sum(1 for q, ans in responses.items() if ans == correct_answers[q])
            total = len(correct_answers)
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("INSERT INTO grades (student_name, score, total) VALUES (%s, %s, %s)",
                        (student_name, score, total))
            conn.commit()
            cur.close()
            conn.close()
            return jsonify({"score": score, "total": total})
        elif mode == "paragraph":
            graded_responses = quiz_generator.grade_paragraph_answers(responses)
            score = sum(resp["grade"] for resp in graded_responses.values())
            total = len(graded_responses) * 10  # Max 10 per question
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("INSERT INTO grades (student_name, score, total) VALUES (%s, %s, %s)",
                        (student_name, score, total))
            conn.commit()
            cur.close()
            conn.close()
            return jsonify({"graded_responses": graded_responses})
        return jsonify({"error": "Invalid mode"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/grades", methods=["GET"])
def get_grades():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM grades ORDER BY timestamp DESC")
    grades = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify({"grades": grades})


# ----------------------------
# Todo Endpoints
# ----------------------------

@app.route("/api/todos", methods=["GET"])
def get_todos():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        # Order tasks by priority descending (highest first)
        cur.execute("SELECT * FROM todos ORDER BY priority DESC;")
        todos = cur.fetchall()
        return jsonify(todos), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()


@app.route("/api/todos", methods=["POST"])
def create_todo():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "No todo text provided."}), 400

    todo_text = data.get("text")
    priority = data.get("priority", 0)
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO todos (text, priority) VALUES (%s, %s) RETURNING id, text, priority;",
            (todo_text, priority)
        )
        new_todo = cur.fetchone()
        conn.commit()
        return jsonify(new_todo), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()


@app.route("/api/todos/<int:todo_id>", methods=["PUT"])
def update_todo(todo_id):
    data = request.get_json()
    if not data or "text" not in data or "priority" not in data:
        return jsonify({"error": "Todo text and priority are required."}), 400

    todo_text = data.get("text")
    priority = data.get("priority")
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "UPDATE todos SET text = %s, priority = %s WHERE id = %s RETURNING id, text, priority;",
            (todo_text, priority, todo_id)
        )
        updated_todo = cur.fetchone()
        if updated_todo is None:
            return jsonify({"error": "Todo not found."}), 404
        conn.commit()
        return jsonify(updated_todo), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()


@app.route("/api/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "DELETE FROM todos WHERE id = %s RETURNING id, text, priority;",
            (todo_id,)
        )
        deleted_todo = cur.fetchone()
        if deleted_todo is None:
            return jsonify({"error": "Todo not found."}), 404
        conn.commit()
        return jsonify({"message": "Todo deleted.", "todo": deleted_todo}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    if not data or "question" not in data:
        return jsonify({"error": "No question provided."}), 400

    question = data["question"]

    def generate():
        for chunk in bot.stream_answer(question):
            yield chunk

    return Response(generate(), mimetype="text/plain")

@app.route('/lessonplan', methods=['POST'])
def lesson_plan():
    data = request.get_json()
    required_fields = ['subject', 'topic', 'grade', 'duration', 'learning_objectives']
    if not all(field in data and data[field] for field in required_fields):
        return jsonify({'error': 'Please fill out all required fields.'}), 400

    def generate():
        for chunk in plan_generator.stream_lesson_plan(data):
            yield chunk + "\n"

    return Response(generate(), mimetype="text/plain")


@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Invalid request data."}), 400

    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if send_email(name, email, message):
        return jsonify({"message": "Your message has been sent successfully!"}), 200
    else:
        return jsonify({"message": "There was an error sending your message. Please try again later."}), 500



# Forum------------------------------------------------------------
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123456@localhost/StuddyBuddy'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class User(db.Model):
    __tablename__ = 'users'  # Explicit table name
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Post(db.Model):
    __tablename__ = 'posts'  # Explicit table name
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.datetime.utcnow,
        onupdate=datetime.datetime.utcnow
    )
    # Establish relationship with Comment
    comments = db.relationship('Comment', backref='post', cascade="all, delete-orphan", lazy=True)

class Comment(db.Model):
    __tablename__ = 'comments'  # Explicit table name
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id', ondelete="CASCADE"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

# --- Setup Function (called manually) ---
def create_tables_and_default_user():
    """
    Creates all tables and inserts a default user (with id=1) if one doesn't exist.
    This ensures that when the frontend sends user_id=1, the foreign key constraint is valid.
    """
    db.create_all()
    if not User.query.get(1):
        default_user = User(
            id=1,  # Explicitly set ID to 1
            username='default_user',
            email='default@example.com',
            password='defaultpassword'  # In production, ensure passwords are hashed!
        )
        db.session.add(default_user)
        db.session.commit()

# --- Forum Routes ---
@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    data = [
        {
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'user_id': post.user_id,
            'created_at': post.created_at.isoformat(),
            'updated_at': post.updated_at.isoformat(),
            'comments': [
                {
                    'id': c.id,
                    'content': c.content,
                    'created_at': c.created_at.isoformat()
                } for c in post.comments
            ]
        }
        for post in posts
    ]
    return jsonify(data)

@app.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get_or_404(post_id)
    data = {
        'id': post.id,
        'title': post.title,
        'content': post.content,
        'user_id': post.user_id,
        'created_at': post.created_at.isoformat(),
        'updated_at': post.updated_at.isoformat(),
        'comments': [
            {
                'id': c.id,
                'content': c.content,
                'created_at': c.created_at.isoformat()
            } for c in post.comments
        ]
    }
    return jsonify(data)

@app.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    # Validate that the provided user exists.
    user = User.query.get(data.get('user_id'))
    if not user:
        return jsonify({'error': 'User not found.'}), 400

    new_post = Post(
        title=data.get('title'),
        content=data.get('content'),
        user_id=data.get('user_id')
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'Post created successfully'}), 201

@app.route('/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    data = request.get_json()
    post.title = data.get('title', post.title)
    post.content = data.get('content', post.content)
    db.session.commit()
    return jsonify({'message': 'Post updated successfully'})

@app.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted successfully'})

@app.route('/posts/<int:post_id>/comments', methods=['POST'])
def add_comment(post_id):
    post = Post.query.get_or_404(post_id)
    data = request.get_json()
    # Validate that the commenting user exists.
    user = User.query.get(data.get('user_id'))
    if not user:
        return jsonify({'error': 'User not found.'}), 400

    new_comment = Comment(
        post_id=post.id,
        user_id=data.get('user_id'),
        content=data.get('content')
    )
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({'message': 'Comment added successfully'}), 201


if __name__ == "__main__":
    with app.app_context():
        create_tables_and_default_user()
    print("Flask app running on http://localhost:5001")
    app.run(debug=True, use_reloader=False, port=5001)
