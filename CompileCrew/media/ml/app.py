from flask import Flask, render_template, request, jsonify
import numpy as np
import cv2

app = Flask(__name__)

# Load the face detection model files.
modelFile = "res10_300x300_ssd_iter_140000_fp16.caffemodel"
configFile = "deploy.prototxt"
net = cv2.dnn.readNetFromCaffe(configFile, modelFile)

@app.route('/')
def index():
    # Render your HTML template (located in the "templates" folder)
    return render_template('take_exam.html', questions=[{'exam_code': 'CS101', 'question_text': 'What is Python?', 'question_type': 'mcq', 'get_options': ['A', 'B', 'C', 'D'] }])

@app.route('/process-frame/', methods=['POST'])
def process_frame():
    if 'frame' not in request.files:
        return jsonify({'result': 'No frame received'})
    
    file = request.files['frame']
    file_bytes = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    if image is None:
        return jsonify({'result': 'Invalid image'})
    
    (h, w) = image.shape[:2]
    blob = cv2.dnn.blobFromImage(cv2.resize(image, (300, 300)), 1.0,
                                 (300, 300), (104.0, 177.0, 123.0))
    net.setInput(blob)
    detections = net.forward()

    num_faces = 0
    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > 0.6:
            num_faces += 1

    result_msg = "All clear."
    if num_faces > 1:
        result_msg = "⚠️ SUSPICIOUS: Multiple Faces Detected!"
    
    return jsonify({'result': result_msg})

@app.route('/submit-exam', methods=['POST'])
def submit_exam():
    # Process exam submission here
    return "Exam submitted!"

@app.route('/receive_status/', methods=['POST'])
def receive_status():
    data = request.get_json()
    print("Status received:", data)
    return jsonify({'status': 'success', 'message': 'Status received'})

if __name__ == '__main__':
    app.run(debug=True)
