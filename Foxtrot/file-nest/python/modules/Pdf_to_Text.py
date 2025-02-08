import PyPDF2
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string

# Ensure necessary resources are downloaded
nltk.download('stopwords')
nltk.download('punkt')

stop_words = set(stopwords.words('english'))

def extract_text_from_pdf(pdf_file: str) -> str:
    with open(pdf_file, 'rb') as pdf:
        reader = PyPDF2.PdfReader(pdf, strict=False)
        pdf_text = []
        for page in reader.pages:
            content = page.extract_text()
            pdf_text.append(content)
        
        text = " ".join(pdf_text)
        return text

if __name__ == '__main__':
    text = extract_text_from_pdf('modules\sample.pdf')

# Tokenize the text
words = word_tokenize(text)

# Remove stopwords and punctuation
without_stop_words_and_punctuation = [
    w for w in words if w.lower() not in stop_words and w not in string.punctuation
]

print(without_stop_words_and_punctuation)