keywords = ['NP-completeness', 'PSPACE-complete', 'acceptance', 'algorithm', 'algorithmic', 'analysis', 'approximation',
 'approximation', 'approximation', 'assessment', 'basis', 'bounds', 'brute', 'classes', 'complexity',
 'computational', 'computation', 'conjectures', 'constraints', 'decision', 'deferred', 'design', 'dynamic',
 'efficiency', 'evaluation', 'exponential', 'exploration', 'feasibility', 'force', 'formulation',
 'gale-shapley', 'graph-based', 'greedy', 'hardness', 'heuristic', 'hierarchy', 'independent', 'instances',
 'limits', 'lists', 'matching', 'models', 'network', 'optimization', 'performance', 'polynomial',
 'preference', 'problem', 'problems', 'programming', 'pspace-complete', 'reduction', 'schemes', 'search',
 'set', 'solution', 'space', 'stability', 'stable', 'strategies', 'testing', 'theoretical', 'theory',
 'time', 'trade-offs', 'tractability', 'trees', 'validation', 'worst-case']

# Create an empty set to hold unique words
unique_words = set()

# Split each phrase into words and add them to the set
for phrase in keywords:
    words = phrase.split()
    for word in words:
        unique_words.add(word.lower())

# Convert the set to a sorted list
result = sorted(unique_words)

print(result)
