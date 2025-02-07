from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import base64
import os
import io
from PIL import Image
import pdf2image
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Gemini AI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = Flask(__name__)
CORS(app)

def get_gemini_response(input_text, pdf_content, chat_history):
    model = genai.GenerativeModel('gemini-1.5-flash')
    # Include chat history in the input
    full_input = chat_history + [input_text, pdf_content[0]]
    response = model.generate_content(full_input)
    return response.text

def get_gemini_response_resume(input, pdf_content, prompt):
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content([input, pdf_content[0], prompt])
    return response.text

def input_pdf_setup(uploaded_file):
    if uploaded_file is not None:
        # Convert PDF to image
        images = pdf2image.convert_from_bytes(uploaded_file.read())
        first_page = images[0]
        # Convert image to bytes
        img_byte_arr = io.BytesIO()
        first_page.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()
        
        pdf_parts = [
            {
                "mime_type": "image/jpeg",
                "data": base64.b64encode(img_byte_arr).decode()
            }
        ]
        return pdf_parts
    else:
        raise FileNotFoundError("No file uploaded")

@app.route('/api/pdf-to-image', methods=['POST'])
def pdf_to_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    try:
        
        pdf_content = input_pdf_setup(file)
        return jsonify(pdf_content)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/gemini-response', methods=['POST'])
def gemini_response():

    data = request.get_json()
    input_text = data.get('inputText')
    pdf_content = data.get('pdfContent')
    chat_history = data.get('chatHistory')
    try:
        response_text = get_gemini_response(input_text, pdf_content, chat_history)
        return jsonify({'text': response_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/gemini-response-resume', methods=['POST'])
def gemini_response_resume():
    job_description = request.form['jobDescription']
    prompt = request.form['prompt']
    file = request.files['file']
    print(job_description, prompt, file)
    if not file:
        return jsonify({'error': 'No file uploaded'}), 400

    try:
        pdf_content = input_pdf_setup(file)
        response = get_gemini_response_resume(job_description, pdf_content, prompt)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
