import PyPDF2
import re
from collections import defaultdict

# Enhanced category keywords with more variations
CATEGORIES = {
    "Travel": ["transport", "petrol", "fuel", "filling", "auto", "cab", "bus"],
    "Dining/Food": ["cafe", "restaurant", "tiffin", "diner", "food", "momos", "burger", "bites", 
                   "amore", "omfed", "betel", "shop", "eat"],
    "Utilities": ["electricity", "mobile", "recharge", "jio", "airtel", "bill"],
    "Entertainment": ["netflix", "movie", "pvr", "game", "show"],
    "Transfer/Payment": ["received", "paid to", "payment"],
}

def extract_pdf_content(file):
    content = ""
    try:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            content += page.extract_text() or ""
    except Exception as e:
        print(f"Error reading PDF: {e}")
    return content

def parse_phonepe_statement(content):
    transactions = []
    # Pattern to match PhonePe transactions
    pattern = r"((?:Jan|Feb) \d{2}, 2025)\s*(?:\d{2}:\d{2} [AP]M)\s*(DEBIT|CREDIT)\s*₹([\d,]+(?:\.\d{2})?)(.*?)(?=(?:Jan|Feb) \d{2}, 2025|\Z)"
    
    matches = re.finditer(pattern, content, re.DOTALL)
    
    for match in matches:
        date, txn_type, amount, details = match.groups()
        # Clean amount string and convert to float
        amount = float(amount.replace(',', ''))
        
        # Extract payee name from details
        payee_match = re.search(r"(?:Paid to|Received from)\s+(.+?)(?:\s*Transaction ID|$)", details)
        payee = payee_match.group(1).strip() if payee_match else "Unknown"
        
        transactions.append({
            "date": date,
            "type": txn_type,
            "amount": amount,
            "payee": payee,
            "details": details.strip()
        })
    
    return transactions

def categorize_transaction(transaction):
    # Convert details to lowercase for case-insensitive matching
    details_lower = transaction["details"].lower()
    payee_lower = transaction["payee"].lower()
    
    # Skip categorizing CREDIT transactions
    if transaction["type"] == "CREDIT":
        return "Income"
    
    # Check each category's keywords
    for category, keywords in CATEGORIES.items():
        for keyword in keywords:
            if keyword in details_lower or keyword in payee_lower:
                return category
            
    # Special cases based on actual transactions in statement
    if "recharge" in details_lower or "mobile" in details_lower:
        return "Utilities"
    elif any(word in payee_lower for word in ["mama", "bhai", "received"]):
        return "Income"
        
    return "Others"

def analyze_expenses(content):
    # Parse transactions
    transactions = parse_phonepe_statement(content)
    
    # Initialize categorization results
    categorized = defaultdict(list)
    category_totals = defaultdict(float)
    
    # Categorize each transaction
    for txn in transactions:
        category = categorize_transaction(txn)
        categorized[category].append(txn)
        if category != "Income":  # Only sum debits for expense categories
            category_totals[category] += txn["amount"] if txn["type"] == "DEBIT" else 0
    
    # Calculate total income
    total_income = sum(txn["amount"] for txn in transactions if txn["type"] == "CREDIT")
    
    return {
        "detailed_categories": {cat: [{
            "date": t["date"],
            "amount": t["amount"],
            "payee": t["payee"],
            "type": t["type"]
        } for t in txns] for cat, txns in categorized.items()},
        "category_totals": dict(category_totals),
        "total_income": total_income,
        "total_expenses": sum(category_totals.values())
    }

def print_analysis(pdf_path):
    # First extract content from PDF
    content = extract_pdf_content(pdf_path)
    if not content:
        print("Error: Could not extract content from PDF")
        return
        
    # Then analyze the content
    analysis = analyze_expenses(content)
    
    print("\n=== Expense Analysis ===")
    print("\nCategory Totals:")
    for category, total in analysis["category_totals"].items():
        print(f"{category}: ₹{total:.2f}")
        
    print(f"\nTotal Income: ₹{analysis['total_income']:.2f}")
    print(f"Total Expenses: ₹{analysis['total_expenses']:.2f}")
    
    print("\nDetailed Breakdown by Category:")
    for category, transactions in analysis["detailed_categories"].items():
        print(f"\n{category}:")
        for txn in transactions:
            print(f"  {txn['date']} - {txn['payee']}: ₹{txn['amount']:.2f} ({txn['type']})")

if __name__ == "__main__":
    pdf_path = "C:/Users/VICTUS/Desktop/PhonePe_Statement_Jan2025_Feb2025.pdf"
    print_analysis(pdf_path)