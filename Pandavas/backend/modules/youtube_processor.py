import os
# os.chdir(os.path.dirname(os.path.abspath(__file__)))

import re
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain

from utils.SemanticSplitter import SemanticSplitter
from utils.RemoveThink import RemoveThink

GROQ_API_KEY = os.getenv("GROQ_API_KEY")


class SummarizerAgent:
    def __init__(self, vectorstore):
        self.vectorstore = vectorstore
        self.semantic_splitter = SemanticSplitter(threshold_type="gradient")
        self.llm = ChatGroq(groq_api_key=GROQ_API_KEY, model="llama-3.1-8b-instant")
        self.think = RemoveThink()

        self.summarization_prompt = PromptTemplate(
            input_variables=["chunk"],
            template="""
                You are an expert summarization AI named StudyBuddy with a focus on brevity and clarity and make it short. 
                Summarize the following transcript chunk like a teacher:

                Chunk: {chunk}

                - Limit the summary to 50 words.  
                - Use bullet points to structure the information where applicable. 
                - Focus only on key details and main points. 
            """
        )

        self.final_summary_prompt = PromptTemplate(
            input_variables=["summaries"],
            template="""
                You are a professional AI named StudyBuddy specializing in concise, meaningful, structured and short summaries.  
                Combine the following partial summaries into a single, structured final summary.  

                - Ensure the final summary does not exceed 200 words.  
                - Use bullet points where necessary and create a short paragraph where necessary.
                - Group related information together and prioritize key details.
                - Avoid redundancies and focus on essential details.  

                Summaries:  
                {summaries}
            """
        )

    def summarize_chunk(self, chunk):
        prompt = self.summarization_prompt.format(chunk=chunk)
        response = self.llm.invoke(prompt)
        print(response)
        return response.content if hasattr(response, 'content') else str(response)

    def summarize_stream(self, transcript):
        semantic_chunks = self.semantic_splitter.split_transcript(transcript)
        for chunk in semantic_chunks:
            yield self.summarize_chunk(chunk)

class YouTubeSummarizer:
    def __init__(self, db_path="youtube_chroma_db"):
        embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        self.vectorstore = Chroma(persist_directory=db_path, embedding_function=embedding_model)
        self.summarizer_agent = SummarizerAgent(self.vectorstore)

    def extract_video_id(self, url):
        if "watch?v=" in url:
            return url.split("watch?v=")[-1].split("&")[0]
        elif "youtu.be/" in url:
            return url.split("youtu.be/")[-1].split("?")[0]
        return None

    def get_video_transcript(self, video_id):
        try:
            transcript = YouTubeTranscriptApi.get_transcript(video_id)
            return " ".join([entry["text"] for entry in transcript]), None
        except TranscriptsDisabled:
            return None, "Transcripts are disabled for this video."
        except Exception as e:
            return None, str(e)

    def summarize_video_stream(self, video_url):
        video_id = self.extract_video_id(video_url)
        if not video_id:
            yield "Invalid YouTube URL"
            return

        transcript, error = self.get_video_transcript(video_id)
        if error:
            yield error
            return

        for chunk in self.summarizer_agent.summarize_stream(transcript):
            yield chunk
