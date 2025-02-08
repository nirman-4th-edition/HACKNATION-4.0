
import PyPDF2
import nltk
from flask import Flask, requests, jsonify
from pytesseract import pytesseract
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from collections import defaultdict
from PIL import Image
from io import BytesIO
import string

# Ensure necessary resources are downloaded
nltk.download('stopwords')
nltk.download('punkt')

app = Flask(__name__)

# Set Tesseract Path (Update if needed)
TESSERACT_PATH = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
pytesseract.tesseract_cmd = TESSERACT_PATH

# Define Stopwords
stop_words = set(stopwords.words('english'))

# Predefined subjects and chapter mappings
subjects = {
    "CSW": {
        # Chapter 1: Introduction to Full Stack Development
        "CHAPTER-1": ["three-dimensional", "website", "development","full stack development", "model–view–controller", "mvc", "object-relational mapping", "orm", "javascript object notation", "json", "extensible markup language", "xml", "web services", "api-based architecture", "front-end technologies", "back-end technologies", "bootstrap", "jquery", "web application development", "restful apis", "simple object access protocol", "soap", "client-server model", "database tier", "persistence layer", "three-tier architecture", "java ee", "mysql", "sql server", "postgresql", "cloud deployment", "web hosting", "asynchronous communication", "web security", "front-end frameworks", "ui/ux design", "javascript libraries", "http protocol", "request-response cycle", "authentication mechanisms", "websockets", "browser rendering", "web development lifecycle", "scalability in web development", "cross-browser compatibility", "responsive web design", "progressive web applications", "pwa", "microservices architecture", "serverless computing", "domain name system", "dns", "load balancing", "web performance optimization", "content delivery networks", "cdn", "headless cms", "state management", "static site generation", "webassembly", "deployment pipelines"],
        #Chapter 2: Getting Started with Full Stack Development: A Project Idea
        "CHAPTER-2": ["html", "css", "javascript", "e-commerce", "entity relationship diagram", "erd", "uml class diagram", "uml", "flowchart", "page flow design", "api endpoints", "get vs post", "business logic", "user authentication", "payment gateway integration", "shopping cart functionality", "order processing flowchart", "vendor management", "admin dashboard", "product listing", "checkout process", "address management", "invoice generation", "data persistence", "middleware services", "caching strategies", "webhooks", "web scraping", "session management", "api rate limiting", "web analytics", "micro frontends", "rest vs graphql", "graphql", "api gateway", "oauth authentication", "secure token", "jwt", "json web token", "data encryption", "multi-tenant architecture", "ci/cd pipelines", "ci/cd", "docker containers", "kubernetes deployment", "api documentation", "version control system", "server-side rendering", "headless e-commerce", "subscription models", "websockets communication", "a/b testing", "seo optimization", "domain-driven design", "application logging", "performance benchmarking", "data backup strategies", "graph database integration"],
        #Chapter 3: Introduction to HyperText Markup Language (HTML)
        "CHAPTER-3": ["bootstrap", "development","hypertext markup language", "html", "html5", "document object model", "dom", "semantic html", "head element", "body element", "block elements", "inline elements", "meta tags", "div vs span", "form elements", "html attributes", "global attributes", "aria attributes", "html validation", "w3c standards", "html5 canvas", "svg vs png", "media queries", "video and audio", "web accessibility", "a11y", "html boilerplate", "favicon", "anchor tags", "unordered lists vs ordered lists", "table elements", "iframes", "html5 apis", "geolocation api", "web storage api", "indexeddb", "service workers", "progressive enhancement", "feature detection", "responsive images", "html forms security", "form validation", "placeholder vs label", "form auto-complete", "contenteditable attribute", "html entities", "canvas api", "html templating", "html minification", "html parsing", "html preloading", "html lazy loading", "shadow dom", "server-sent events", "sse", "web components"],
        #Chapter 4: Introduction to Cascading Style Sheets (CSS)
        "CHAPTER-4":[ "cascading style sheets", "css", "css3", "selectors", "specificity", "inheritance", "box model", "grid layout", "flexbox", "media queries", "pseudo-classes", "pseudo-elements", "variables", "preprocessors", "scss", "less", "bem", "block element modifier", "transitions", "animations", "keyframes", "shadows", "z-index", "positioning", "static", "relative", "absolute", "fixed", "sticky", "overflow handling", "clipping and masking", "grid areas", "blend modes", "filters", "clip-path", "aspect ratio", "counters", "sprites", "web fonts", "font face", "variable fonts", "writing modes", "multi-column layout", "shapes", "scroll snap", "logical properties", "backgrounds and borders", "gradients", "media feature detection", "prefers-color-scheme", "performance optimization", "houdini", "subgrid", "containment", "container queries", "breakpoints", "naming conventions"],
        #Chapter 5: Introduction to jQuery
        "CHAPTER-5":[ "jquery library", "jquery selectors", "$(document).ready()", "events", "event delegation", "chaining", "effects", "fadein", "fadeout", "slideup", "slidedown", "animation", "callback functions", "deferred objects", "ajax", "$.get()", "$.post()", "json parsing", "plugins", "ui", "mobile", "form validation", "datatables", "accordion", "autocomplete", "toggleclass()", "css()", "dimensions", "traversing methods", "parent-child relationship", "cloning", "dom manipulation", "prop() vs attr()", "scroll events", "interpolation", "template engines", "prototypes", "data attributes", "context", "memory leaks", "lazy loading", "performance optimization", "global variables", "debugging", "cdn", "vs vanilla js", "websockets", "intersection observer", "event bubbling", "namespacing", "widget factory", "ajax caching", "cross-origin requests"]
    },
    "AD": {

        # Chapter 1: ntroduction to Algorithmic Problems
        "CHAPTER-1": ['acceptance', 'algorithm', 'algorithmic', 'analysis', 'approximation', 'assessment', 'basis', 'bounds', 'brute', 'classes', 'complexity', 'computation', 'computational', 'conjectures', 'constraints', 'decision', 'deferred', 'design', 'dynamic', 'efficiency', 'evaluation', 'exploration', 'exponential', 'feasibility', 'force', 'formulation', 'gale-shapley', 'graph-based', 'greedy', 'hardness', 'heuristic', 'hierarchy', 'independent', 'instances', 'limits', 'lists', 'matching', 'models', 'network', 'np-completeness', 'optimization', 'performance', 'polynomial', 'preference', 'problem', 'problems', 'programming', 'pspace-complete', 'reduction', 'schemes', 'search', 'set', 'solution', 'space', 'stability', 'stable', 'strategies', 'testing', 'theoretical', 'theory', 'time', 'tractability', 'trade-offs', 'trees', 'validation', 'worst-case'],

        # Chapter 2: Mathematical Foundations and Analysis of Algorithms
        "CHAPTER-2": ['advanced', 'algorithm', 'algorithmic', 'algorithms', 'analysis', 'and', 'approximations', 'asymptotic', 'average-case', 'big-o', 'binary', 'bound', 'boundaries', 'bounding', 'bounds', 'classes', 'common', 'comparisons', 'complexity', 'computational', 'conquer', 'data', 'decision', 'divide', 'efficiency', 'exponential', 'factorial', 'function', 'functions', 'growth', 'heapify', 'heaps', 'hierarchical', 'iterative', 'limit', 'limits', 'logarithm', 'logarithmic', 'lower', 'methods', 'notation', 'np', 'optimization', 'p', 'performance', 'polynomial', 'priority', 'problem-solving', 'properties', 'question', 'queues', 'rates', 'recurrence', 'recursive', 'relations', 'running', 'scaling', 'searching', 'sorting', 'space', 'structural', 'structures', 'theorems', 'theoretical', 'time', 'tractability', 'trade-offs', 'trees', 'vs', 'worst-case'],
        # Chapter 3: Graphs and Fundamental Graph Algorithms
        "CHAPTER-3": ['adjacency', 'ai', 'algorithm', 'algorithms', 'applications', 'augmenting', 'bellman-ford', 'bfs', 'bipartite', 'breadth-first', 'clustering', 'coloring', 'components', 'compression', 'connected', 'connectivity', 'crawling', 'cycle', 'dense', 'depth-first', 'detection', 'dfs', 'dijkstra’s', 'directed', 'eulerian', 'flow', 'floyd-warshall', 'graph', 'graph-based', 'graphs', 'hamiltonian', 'heuristics', 'in', 'indexing', 'internet', 'isomorphism', 'kruskal’s', 'list', 'matching', 'matrix', 'minimum', 'models', 'network', 'networks', 'ordering', 'partitioning', 'path', 'paths', 'planarity', 'prim’s', 'problems', 'random', 'representation', 'residual', 'search', 'shortest', 'spanning', 'sparse', 'strongly', 'structures', 'testing', 'theorems', 'theory', 'topological', 'traversal', 'tree', 'undirected', 'walks', 'web'],
        # Chapter 4: Greedy Algorithms
        "CHAPTER-4": ['activity', 'algorithm', 'algorithms', 'allocation', 'analysis', 'and', 'approximate', 'approximation', 'argument', 'balancing', 'change', 'choice', 'clustering', 'coding', 'coin', 'coloring', 'compression', 'counterexample', 'cover', 'data', 'decision', 'depth-first', 'dynamic', 'event', 'exchange', 'fails', 'fractional', 'game', 'global', 'graph', 'greedy', 'heuristic', 'huffman', 'independent', 'interval', 'job', 'knapsack', 'kruskal’s', 'local', 'making', 'matching', 'matroids', 'maximal', 'minimum', 'optimal', 'optimization', 'optimum', 'path', 'prim’s', 'prioritization', 'priority', 'problem', 'programming', 'property', 'queue', 'ratio', 'recursive', 'scheduling', 'search', 'selection', 'set', 'shortest', 'solutions', 'sorting', 'spanning', 'strategy', 'subset', 'substructure', 'task', 'theory', 'traversal', 'tree', 'versus', 'weight'],
        # Chapter 5: Divide and ConquerI
        "CHAPTER-5": ['algorithm', 'algorithms', 'analysis', 'and', 'approach', 'binary', 'closest', 'combination', 'computation', 'conquer', 'convex', 'convolution', 'decomposition', 'depth', 'divide', 'efficiency', 'fast', 'fourier', 'geometric', 'hierarchical', 'hull', 'improvement', 'integer', 'karatsuba’s', 'logarithmic', 'master', 'match', 'matrix', 'merge', 'mergesort', 'multiplication', 'numerical', 'optimization', 'overlapping', 'pair', 'parallel', 'partitioning', 'pivoting', 'polynomial', 'problem', 'problem-solving', 'processing', 'quicksort', 'recurrence', 'recursion', 'recursive', 'reduction', 'relation', 'runtime', 'scaling', 'search', 'select', 'signal', 'sorting', 'strassen’s', 'strategy', 'subproblem', 'subproblems', 'theorem', 'transform', 'tree']

}
}
def extract_text_from_image(image_url):
    try:
        response = requests.get(image_url)
        if response.status_code != 200:
            return None, "Failed to download image."

        image = Image.open(BytesIO(response.content))
        text = pytesseract.image_to_string(image)
        return text.strip(), None
    except Exception as e:
        return None, str(e)


def extract_text_from_pdf(pdf_url):
    try:
        response = requests.get(pdf_url)
        if response.status_code != 200:
            return None, "Failed to download PDF."

        pdf_reader = PyPDF2.PdfReader(BytesIO(response.content), strict=False)
        pdf_text = []
        for page in pdf_reader.pages:
            content = page.extract_text()
            pdf_text.append(content)
        
        text = " ".join(pdf_text)
        return text.strip(), None
    except Exception as e:
        return None, str(e)

def extract_keywords(text):
    if not text:
        return []
    
    words = word_tokenize(text)
    keywords = [w.lower().strip(string.punctuation) for w in words if w.lower() not in stop_words]
    return keywords

def get_most_relevant_subject_chapter(extracted_keywords):
    if not extracted_keywords:
        # return {"message": "No keywords extracted from the document."}
        return {"message" : "No matching subject or chapter found"}

    keyword_frequency = defaultdict(int)

    for subject, chapters in subjects.items():
        for chapter, keywords_list in chapters.items():
            for keyword in extracted_keywords:
                if keyword in [kw.lower() for kw in keywords_list]:
                    keyword_frequency[(subject, chapter)] += 1

    if not keyword_frequency:
        return {"message": "No matching subject or chapter found"}

    max_frequency = max(keyword_frequency.values(), default=0)
    best_matches = [
        {"Subject": subject, "Chapter": chapter, "Frequency": freq}
        for (subject, chapter), freq in keyword_frequency.items()
        if freq == max_frequency
    ]

    return best_matches[0] if best_matches else {"message": "No matching subject or chapter found"}


@app.route('/extract', methods=['POST'])
def extract():
    data = request.get_json()
    if not data or "url" not in data or "type" not in data:
        return jsonify({"error": "Both 'url' and 'type' (image/pdf) are required in JSON format"}), 400
    
    file_url = data["url"]
    file_type = data["type"].lower()
    print(file_type)


    if file_type == "image/png" or file_type == "image/jpeg" or file_type == "image/jpg" or file_type == "image":
        text, error = extract_text_from_image(file_url)
    elif file_type == "application/pdf":
        text, error = extract_text_from_pdf(file_url)
    else:
        return jsonify({"error": "Invalid file type. Use 'image' or 'pdf'"}), 400
    
    if error:
        return jsonify({"error": error}), 400
    
    extracted_keywords = extract_keywords(text)
    print(extracted_keywords)
    result = get_most_relevant_subject_chapter(extracted_keywords)
    print(result)
    return jsonify({
        "Result": result
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)