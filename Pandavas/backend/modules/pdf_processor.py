import os
from PyPDF2 import PdfReader
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain_core.documents import Document
from langchain_groq import ChatGroq
from utils.SemanticSplitter import SemanticSplitter

class PDFProcessor:
    def __init__(self, groq_api_key, db_path="pdf_chroma_db"):
        self.embedding_function = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        self.vectorstore = Chroma(persist_directory=db_path, embedding_function=self.embedding_function)
        self.memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
        self.llm = ChatGroq(groq_api_key=groq_api_key, model="llama-3.1-8b-instant")
        self.semantic_splitter = SemanticSplitter(threshold_type="standard_deviation")
        self.retrieval_chain = ConversationalRetrievalChain.from_llm(
            self.llm, retriever=self.vectorstore.as_retriever(), memory=self.memory
        )

    def extract_text_from_pdf(self, pdf_file):
        try:
            reader = PdfReader(pdf_file)
            texts = []
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    texts.append(page_text)
            return " ".join(texts)
        except Exception as e:
            return str(e)

    # Method that returns the full summary (if needed)
    def summarize_pdf(self, pdf_file):
        text = self.extract_text_from_pdf(pdf_file)
        if not text:
            return "Could not extract text from the PDF."
        semantic_chunks = self.semantic_splitter.split_transcript(text)
        summaries = []
        for chunk in semantic_chunks:
            prompt = f"Summarize concisely using points and tables where appropriate:\n{chunk}"
            summary_response = self.llm.invoke(prompt)
            summaries.append(summary_response.content)
        final_summary = "\n".join(summaries)
        self.vectorstore.add_documents([Document(page_content=final_summary, metadata={"source": os.path.basename(pdf_file)})])
        return final_summary

    # New streaming method: yield summary chunks one by one
    def stream_summarize_pdf(self, pdf_file):
        text = self.extract_text_from_pdf(pdf_file)
        if not text:
            yield "Could not extract text from the PDF."
            return
        semantic_chunks = self.semantic_splitter.split_transcript(text)
        for chunk in semantic_chunks:
            prompt = f"Summarize concisely using points and tables where appropriate:\n{chunk}"
            summary_response = self.llm.invoke(prompt)
            yield summary_response.content + "\n"

    def chat_with_pdf(self, query):
        if not query:
            return "Please provide a valid question."
        response = self.retrieval_chain.run(query)
        return response if response else "No relevant information found in the PDF."

    def reset_memory(self):
        self.memory.clear()
        return "Chat history has been reset."
