from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from datetime import datetime
import pandas as pd
from Ai_insights import AirthFinancialInsights

from expense_tracker import extract_pdf_content, analyze_expenses

app = Flask(__name__)
CORS(app)  

ALLOWED_EXTENSIONS = {'pdf'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def formatDate(dateStr):
    try:
        parsed_date = datetime.strptime(dateStr, "%b %d, %Y")
        formatted_date = parsed_date.strftime("%Y-%m-%d")
        return formatted_date
    except ValueError:
        return None

def save_pdf_data(data):
    try:
        response = requests.post('http://localhost:8000/api/expense', json = data)
        response.raise_for_status()
        return response

    except requests.exceptions.RequestException as e:
        print(f"Error saving extracted pdf data: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return None
    
def save_translations_data(data):
    try:
        response = requests.post('http://localhost:8000/api/transaction', json = data)
        response.raise_for_status()
        return response
    
    except requests.exceptions.RequestException as e:
        print(f"Error saving extracted pdf data: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return None

@app.route('/')
def home():
    return 'Welcome to Flask!'

@app.route('/api/upload_pdf/<id>', methods=['POST'])
def upload_pdf(id):
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'File must be a PDF'}), 400
    
    content = extract_pdf_content(file)
    analysis = analyze_expenses(content)

    print("\n=== Expense Analysis ===")
    print("\nCategory Totals:")
    for category, total in analysis["category_totals"].items():
        print(f"{category}: ₹{total:.2f}")
        
    print(f"\nTotal Income: ₹{analysis['total_income']:.2f}")
    print(f"Total Expenses: ₹{analysis['total_expenses']:.2f}")
    
    date=[]
    descriptions=[]
    amounts=[]
    type=[]
    categorys=[]

    print("\nDetailed Breakdown by Category:")
    for category, transactions in analysis["detailed_categories"].items():
        print(f"\n{category}:")
        if category != 'Income':
            for txn in transactions:
                date.append(formatDate(txn['date']))
                descriptions.append(txn['payee'])
                amounts.append(-txn['amount'])
                type.append(txn['type'])
                categorys.append(category)
    
    trxPayload = {
        'user_id': id,
        'date': date,
        'description': descriptions,
        'amount': amounts,
        'type': type,
        'category': categorys,
    }

    expPayload = {}
    expPayload['total_amount'] = analysis['total_expenses']
    expPayload['user_id'] = id

    categories = {
        'travel': 'Travel',
        'food': 'Dining/Food',
        'utilities': 'Utilities',
        'entertainment': 'Entertainment',
        'shopping': 'Shopping',
        'health': 'Health'
    }
    
    for payload_key, category_name in categories.items():
        if category_name in analysis['category_totals']:
            expPayload[payload_key] = analysis['category_totals'][category_name]
            
    expResponse = save_pdf_data(expPayload)
    trxResponse = save_translations_data(trxPayload)

    return jsonify({
        'message': 'File uploaded successfully',
        'expenses': expResponse.json()['expenses'],
    }), 200

@app.route('/api/ai-insights/<id>', methods=['GET']) 
def get_transaction(id):
    try:
        response = requests.get(f'http://localhost:8000/api/transaction/{id}')
        response.raise_for_status()
        data =  response.json()
        trx = pd.DataFrame(data)
        insights = AirthFinancialInsights().generate_complete_insights(trx)
        return jsonify(insights)
            
    except requests.exceptions.RequestException as e:
        print(f"Error getting transaction data: {e}")
        return None

if __name__ == '__main__':
    app.run(debug=True, port=5000)