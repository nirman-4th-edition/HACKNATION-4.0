from collections import defaultdict

# Predefined subjects and chapter mappings
subjects = {
    "CSW": {
        "CHAPTER-1": ["Introduction", "Website", "Development"],
        "CHAPTER-2": ["HTML", "CSS", "JAVASCRIPT"],
        "CHAPTER-3": ["Bootstrap", "Development"]
    },
    "AD": {
        "CHAPTER-1": ["divide and conquer", "algorithm", "greedy"],
        "CHAPTER-2": ["bfs", "dfs"],
        "CHAPTER-3": ["sorting"]
    }
}

def get_most_relevant_subject_chapter(extracted_keywords):
    
    keyword_frequency = defaultdict(int) 

    # Count keyword occurrences 
    for subject, chapters in subjects.items():
        for chapter, keywords_list in chapters.items():
            for keyword in extracted_keywords:
                if keyword.lower() in [kw.lower() for kw in keywords_list]:
                    keyword_frequency[(subject, chapter)] += 1  # Counter

    if not keyword_frequency:
        return {"message": "No matching subject or chapter found"}

   
    max_frequency = max(keyword_frequency.values(), default=0)
    best_matches = [
        {"Subject": subject, "Chapter": chapter, "Frequency": freq}
        for (subject, chapter), freq in keyword_frequency.items()
        if freq == max_frequency
    ]

    # Return only the subject and chapter with the maximum frequency
    return best_matches[0] if best_matches else {"message": "No matching subject or chapter found"}


# Example input of 
extracted_keywords = ["html","divide and conquer"]

result = get_most_relevant_subject_chapter(extracted_keywords)

print(result)