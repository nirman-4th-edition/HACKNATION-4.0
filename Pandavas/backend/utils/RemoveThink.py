import re

class RemoveThink:
    def __init__(self):
        pass
        
    def clean_summary(summary):
        cleaned_summary = re.sub(r"<think>.*?</think>", "", summary, flags=re.DOTALL)
        return cleaned_summary.strip()