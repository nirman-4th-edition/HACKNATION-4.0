import os
import time
from typing import Generator

from langchain_community.document_loaders import PyPDFLoader
from utils.SemanticSplitter import SemanticSplitter

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate


class Config:
    def __init__(self):
        self.groq_api_key = os.getenv("GROQ_API_KEY")
        self.pdf_path = os.path.join("Question_bank", "Question_bank.pdf")


class DocumentLoader:
    def __init__(self, pdf_path: str):
        self.pdf_path = pdf_path

    def load_and_split(self):
        loader = PyPDFLoader(self.pdf_path)
        documents = loader.load()
        transcript = "\n".join([doc.page_content for doc in documents])

        splitter = SemanticSplitter()
        docs = splitter.split_transcript(transcript)
        return docs


class VectorStoreIndex:
    def __init__(self, documents, embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"):
        self.documents = documents
        self.embedding_model = embedding_model
        self.embeddings = HuggingFaceEmbeddings(model_name=self.embedding_model)
        self.vectorstore = FAISS.from_documents(self.documents, self.embeddings)

    def get_retriever(self, k: int = 3):
        return self.vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": k})


class LLMWrapper:
    def __init__(self, groq_api_key: str, model: str = "llama-3.1-8b-instant"):
        self.llm = ChatGroq(groq_api_key=groq_api_key, model=model)

    def invoke(self, prompt: str):
        return self.llm.invoke(prompt)


class PromptBuilder:
    def __init__(self):
        self.prompt_template = PromptTemplate(
            input_variables=["context", "question"],
            template = 
            """Your name is Buddy from StuddyBuddy behave like studdy buddy and answer in first person, you are a question answering helper that answers questions based on the context provided. Be professional. If the user asks anything out of context, make sure to be professional and let the user know that your primary purpose and tell them in short and dont mention the context.\n
            Make sure to answer in short. You dont have to introduce yourself unless asked.
            Context:\n{context}\n\n
            Question: {question}\n
            Answer:"""
        )


    def build(self, context: str, question: str) -> str:
        return self.prompt_template.format(context=context, question=question)


class ChatBot:
    def __init__(self):
        self.config = Config()
        loader = DocumentLoader(self.config.pdf_path)
        self.documents = loader.load_and_split()
        index = VectorStoreIndex(self.documents)
        self.retriever = index.get_retriever()
        self.llm_wrapper = LLMWrapper(self.config.groq_api_key)
        self.prompt_builder = PromptBuilder()

    def stream_answer(self, question: str) -> Generator[str, None, None]:
        relevant_docs = self.retriever.get_relevant_documents(question)

        if not relevant_docs or len(relevant_docs) == 0:
            default_msg = "Im StuddyBuddy the chatbot and i can only answer website related questions"
            yield default_msg
            return
        context = "\n".join([doc.page_content for doc in relevant_docs])

        prompt = self.prompt_builder.build(context, question)
        response = self.llm_wrapper.invoke(prompt)
        output = response.content if hasattr(response, 'content') else str(response)
        answer = output.strip()

        for word in answer.split():
            yield word + " "
            time.sleep(0.05)