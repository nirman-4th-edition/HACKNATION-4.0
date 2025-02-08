# import requests
# from flask import Flask, request, jsonify
# from pytesseract import pytesseract
# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize
# from collections import defaultdict
# from PIL import Image
# from io import BytesIO
# import nltk

# # Ensure necessary resources are downloaded
# nltk.download('stopwords')
# nltk.download('punkt')

# app = Flask(__name__)

# # Set Tesseract Path (Update if needed)
# TESSERACT_PATH = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
# pytesseract.tesseract_cmd = TESSERACT_PATH

# # Define Stopwords
# stop_words = set(stopwords.words('english'))

# # Predefined subjects and chapter mappings
# subjects = {
#     "CSW": {
#         "CHAPTER-1": ["three-dimensional", "website", "development"],
#         "CHAPTER-2": ["html", "css", "javascript"],
#         "CHAPTER-3": ["bootstrap", "development"]
#     },
#     "AD": {
#         "CHAPTER-1": ["divide and conquer", "algorithm", "greedy"],
#         "CHAPTER-2": ["bfs", "dfs"],
#         "CHAPTER-3": ["sorting"]
#     }
# }

# def extract_text_from_image(image_url):
#     # Fetches image from URL and extracts text using OCR without saving to disk
#     try:
#         response = requests.get(image_url)
#         if response.status_code != 200:
#             return None, "Failed to download image."

#         image = Image.open(BytesIO(response.content))
#         text = pytesseract.image_to_string(image)
#         return text.strip(), None
#     except Exception as e:
#         return None, str(e)

# def extract_keywords(text):
#     # Tokenizes text and removes stopwords & punctuation"""
#     if not text:
#         return []
    
#     words = word_tokenize(text)
#     keywords = [w.lower().strip('.,!?') for w in words if w.lower() not in stop_words]
#     return keywords

# def get_most_relevant_subject_chapter(extracted_keywords):
#     # Maps extracted keywords to subjects & chapters

#     if not extracted_keywords:
#         return {"message": "No keywords extracted from the image."}

#     keyword_frequency = defaultdict(int)

#     # Count keyword occurrences
#     for subject, chapters in subjects.items():
#         for chapter, keywords_list in chapters.items():
#             for keyword in extracted_keywords:
#                 if keyword in [kw.lower() for kw in keywords_list]:
#                     keyword_frequency[(subject, chapter)] += 1  # Counter

#     if not keyword_frequency:
#         return {"message": "No matching subject or chapter found"}

#     # Find the most relevant chapter
#     max_frequency = max(keyword_frequency.values(), default=0)
#     best_matches = [
#         {"Subject": subject, "Chapter": chapter, "Frequency": freq}
#         for (subject, chapter), freq in keyword_frequency.items()
#         if freq == max_frequency
#     ]

#     return best_matches[0] if best_matches else {"message": "No matching subject or chapter found"}


# ## Flask Route

# @app.route('/extract', methods=['POST'])
# def extract():
#     data = request.get_json()

#     if not data or "url" not in data:
#         return jsonify({"error": "Image URL is required in JSON format"}), 400

#     image_url = data["url"]
#     text, error = extract_text_from_image(image_url)
#     if error:
#         return jsonify({"error": error}), 400

#     extracted_keywords = extract_keywords(text)
    
#     result = get_most_relevant_subject_chapter(extracted_keywords)

#     return jsonify({
#         # "Extracted Keywords": extracted_keywords,
#         "Result": result
#     })

# if __name__ == '__main__':
#     app.run(port=5000,debug=True)


import requests
import PyPDF2
import nltk
from flask import Flask, request, jsonify
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
        # Chapter 1: Introduction to Algorithmic Problems
        "CHAPTER-1": ["stable matching problem", "gale-shapley algorithm", "preference lists", "deferred acceptance", 
            "matching stability", "independent set problem", "algorithmic complexity", "polynomial time", 
            "exponential time", "np-completeness", "pspace-complete", "greedy algorithm", "dynamic programming", 
            "network flow", "approximation algorithm", "combinatorial optimization", "graph-based problems", 
            "heuristic search", "algorithm design", "tractability", "decision problems", "problem reduction", 
            "algorithmic efficiency", "worst-case analysis", "approximation bounds", "search algorithms", 
            "computational models", "decision trees", "algorithm validation", "theoretical limits", "hardness classes", 
            "algorithmic heuristics", "algorithm formulation", "solution space exploration", "algorithm testing", 
            "polynomial hierarchy", "problem instances", "computational complexity theory", "approximation schemes", 
            "brute force methods", "algorithm performance", "feasibility analysis", "trade-offs in computation", 
            "heuristic strategies", "algorithm evaluation"],
        # Chapter 2: Mathematical Foundations and Analysis of Algorithms
        "CHAPTER-2": ["computational tractability", "growth rates", "asymptotic analysis", "big-o notation", 
            "common functions", "polynomial time efficiency", "logarithmic growth", "exponential complexity", 
            "recurrence relations", "algorithm performance", "algorithmic efficiency", "running time bounds", 
            "worst-case analysis", "average-case analysis", "time complexity", "space complexity", 
            "logarithm properties", "algorithm optimization", "bounding functions", "limit theorems", 
            "factorial growth", "recursive functions", "sorting algorithms", "divide and conquer", 
            "searching methods", "priority queues", "heaps and heapify", "binary trees", "complexity classes", 
            "decision boundaries", "p vs np question", "function growth comparisons", "algorithmic approximations", 
            "lower bound theorems", "computational limits", "efficiency trade-offs", "sorting complexity", 
            "advanced data structures", "theoretical algorithm analysis", "algorithm scaling", "iterative methods", 
            "algorithmic problem-solving", "hierarchical complexity", "computational bounds", "structural complexity"],
        # Chapter 3: Graphs and Fundamental Graph Algorithms
        "CHAPTER-3": ["graph theory", "graph representation", "adjacency list", "adjacency matrix", "graph traversal", 
            "breadth-first search", "bfs", "depth-first search","dfs", "directed graphs", "undirected graphs", 
            "graph connectivity", "strongly connected components", "topological ordering", "graph coloring", 
            "shortest path algorithm", "dijkstra’s algorithm", "bellman-ford algorithm", "floyd-warshall algorithm", 
            "minimum spanning tree", "prim’s algorithm", "kruskal’s algorithm", "cycle detection", "eulerian paths", 
            "hamiltonian paths", "graph applications", "flow networks", "bipartite graphs", "matching problems", 
            "residual graphs", "augmenting paths", "network flow algorithms", "graph isomorphism", "tree structures", 
            "graph compression", "random walks", "connectivity theorems", "planarity testing", "graph-based clustering", 
            "internet graph models", "web crawling algorithms", "graph partitioning", "sparse graphs", "dense graphs", 
            "graph indexing", "graph-based heuristics", "graph algorithms in ai"],
        # Chapter 4: Greedy Algorithms
        "CHAPTER-4": ["greedy algorithm", "local optimization", "global optimum", "matroids", "activity selection problem",
            "huffman coding", "shortest path", "minimum spanning tree", "kruskal’s algorithm", "prim’s algorithm",
            "set cover problem", "approximation algorithms", "fractional knapsack", "job scheduling",
            "greedy choice property", "optimal substructure", "exchange argument", "interval scheduling",
            "greedy heuristic", "decision making", "data compression", "task prioritization", "graph algorithms",
            "recursive greedy algorithm", "greedy fails counterexample", "sorting and selection", "coin change problem",
            "greedy matching", "greedy approximation ratio", "greedy versus dynamic programming", "graph coloring",
            "maximal independent set", "approximate solutions", "greedy depth-first search", "greedy scheduling",
            "weight balancing", "greedy strategy analysis", "graph traversal", "event selection",
            "greedy clustering", "heuristic optimization", "greedy game theory", "subset selection",
            "greedy search tree", "priority queue optimization", "greedy data allocation"],
        # Chapter 5: Divide and Conquer
        "CHAPTER-5": ["divide and conquer", "recurrence relation", "master theorem", "mergesort", "quicksort",
            "binary search", "strassen’s algorithm", "karatsuba’s algorithm", "closest pair problem",
            "fast fourier transform", "convex hull problem", "integer multiplication", "recursive decomposition",
            "divide and merge", "logarithmic depth recursion", "subproblem combination", "recursive sorting",
            "search tree decomposition", "merge strategy", "divide and select", "parallel processing",
            "recursive problem-solving", "logarithmic runtime", "polynomial recurrence", "fast multiplication",
            "matrix multiplication", "divide and search", "convolution theorem", "signal processing algorithm",
            "numerical computation", "quicksort pivoting", "recursion depth analysis", "overlapping subproblems",
            "geometric algorithms", "recursive approach", "fast computation", "subproblems optimization",
            "divide and match", "recursive efficiency", "hierarchical partitioning", "algorithm decomposition",
            "divide and transform", "recursive scaling", "reduction and conquer", "recursive improvement"]
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