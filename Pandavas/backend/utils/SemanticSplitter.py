from langchain_experimental.text_splitter import SemanticChunker
from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_openai.embeddings import OpenAIEmbeddings

class SemanticSplitter:
    def __init__(self, model_name="sentence-transformers/all-MiniLM-L6-v2", threshold_type="percentile"):
        self.embedding_model = HuggingFaceEmbeddings(model_name=model_name)

        valid_threshold_types = ["percentile", "standard_deviation", "interquartile", "gradient"]
        if threshold_type not in valid_threshold_types:
            raise ValueError(f"Invalid breakpoint_threshold_type '{threshold_type}'. Choose from {valid_threshold_types}")
        
        self.threshold_type = threshold_type
        self.splitter = SemanticChunker(self.embedding_model, breakpoint_threshold_type=self.threshold_type) # SemanticChunker(OpenAIEmbeddings())

    def split_transcript(self, transcript):
        docs=self.splitter.create_documents([transcript])
        print(len(docs))
        return docs
