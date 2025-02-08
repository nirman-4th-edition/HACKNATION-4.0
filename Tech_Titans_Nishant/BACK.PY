from flask import Flask, render_template, request, jsonify
from encologic import analyze_query, chatbot_greeting, session_data
import mysql.connector

app = Flask(__name__)

# Database connection
def connect_db():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="demo"
    )
    return conn

# Home route
@app.route('/')
def home():
    return render_template('front.html')

# Greeting endpoint
@app.route('/greeting', methods=['GET'])
def greeting():
    greeting_message = chatbot_greeting()
    return jsonify(greeting_message)

# Chatbot query endpoint
@app.route('/query', methods=['POST'])
def query():
    data = request.json
    user_query = data.get('query', '')

    if not user_query:
        return jsonify({"error": "No query provided. Please provide a valid query."}), 400

    # Process the query using analyze_query()
    result = analyze_query(user_query)

    # If the session resets, return the greeting message
    if session_data.get("current_step") == "start":
        greeting_message = chatbot_greeting()
        return jsonify(greeting_message)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
