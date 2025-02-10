import re
import os
import asyncio
import numpy as np
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
from crawl4ai.content_filter_strategy import PruningContentFilter
from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator
from langchain.prompts import PromptTemplate
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain_chroma import Chroma
from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI

from langchain.agents import initialize_agent, AgentType
from langchain_community.tools import ArxivQueryRun, WikipediaQueryRun, DuckDuckGoSearchRun
from langchain_community.utilities import WikipediaAPIWrapper, ArxivAPIWrapper

from utils.SemanticSplitter import SemanticSplitter

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

class AIAgent:
    def __init__(self, groq_api_key):
        search = DuckDuckGoSearchRun(name="Search")
        api_wrapper_wiki = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=250)
        wiki = WikipediaQueryRun(api_wrapper=api_wrapper_wiki)

        api_wrapper_arxiv = ArxivAPIWrapper(top_k_results=1, doc_content_chars_max=250)
        arxiv = ArxivQueryRun(api_wrapper=api_wrapper_arxiv)
        self.tools = [search, arxiv, wiki]
        self.summarizer = WebPageSummarizer(groq_api_key=groq_api_key)

    def search_and_summarize(self, query):
        agent = initialize_agent(
            self.tools,
            self.summarizer.llm,
            agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
            verbose=True,
            handle_parsing_errors=True
        )
        response = agent.run(query)

        url_match = re.search(r'(https?://[^\s]+)', response)
        if url_match:
            url = url_match.group(1)
            print("Extracted URL:", url)
        else:
            raise ValueError("No URL found in the agent's output.")

        # Use the summarizer to fetch and summarize the webpage at the URL
        summary = self.summarizer.summarize_page(url)
        return summary


class WebPageSummarizer:
    def __init__(self, groq_api_key, db_path="./chroma_db"):
        self.embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        self.memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
        self.vectorstore = Chroma(persist_directory=db_path, embedding_function=self.embedding_model)
        self.llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0.6, openai_api_key=OPENAI_API_KEY)
        self.splitter = SemanticSplitter()
        self.retrieval_chain = ConversationalRetrievalChain.from_llm(
            self.llm, retriever=self.vectorstore.as_retriever(), memory=self.memory
        )

    async def fetch_page_content(self, url):
        md_generator = DefaultMarkdownGenerator(
            content_filter=PruningContentFilter(threshold=0.4, threshold_type="fixed")
        )

        browser_conf = BrowserConfig(
            browser_type="chromium",
            headless=False,
            ignore_https_errors=True,
            java_script_enabled=True,
            verbose=True,
            text_mode=True,
            light_mode=True
        )

        run_conf = CrawlerRunConfig(
            cache_mode=CacheMode.BYPASS,
            markdown_generator=md_generator,
            word_count_threshold=10,
            exclude_external_links=True,
            remove_overlay_elements=True,
            verbose=True,
            scan_full_page=True,
            simulate_user=True,
            exclude_social_media_links=True,
            stream=True,
        )

        print("Fetching Page Content")
        try:
            async with AsyncWebCrawler(config=browser_conf) as crawler:
                result = await crawler.arun(
                    url=url,
                    config=run_conf
                )
                print(f"Page Content Fetched {result.markdown}")
            text = result.markdown
            if not result.success:
                print("Error:", result.error_message)
                print(f"Status code: {result.status_code}")
            else:
                print("Content:", result.markdown[:500])
                for link in result.links["internal"]:
                    print(f"Internal link: {link['href']}")
        except Exception as e:
            raise RuntimeError(f"Crawl4AI failed to fetch page content: {e}")

        if not text:
            raise RuntimeError("Crawl4AI did not return any text content.")

        text = re.sub(r"\s+", " ", text)
        return text.strip()

    def store_chunks(self, chunks: list):
        self.vectorstore.add_texts(chunks)

    # To ask follow up questions like in a chatbot
    def retrieve_relevant_context(self, query, k=4):
        results = self.vectorstore.similarity_search(query, k=k)
        context = "\n".join([doc.page_content for doc in results])
        return context

    def summarize_page(self, url):
        print("Summarizing")
        text = asyncio.run(self.fetch_page_content(url))
        if not text:
            raise ValueError("No textual content found on the page.")

        chunks = self.splitter.split_transcript(text)
        if not chunks:
            raise ValueError("Failed to split the page text into chunks.")

        # Summarize each chunk using one template
        chunk_summaries = []
        for idx, chunk in enumerate(chunks, 1):
            c_prompt = PromptTemplate(
                input_variables=["chunk"],
                template="""Summarize the following passage concisely in 50-100 words in first person perspective:
{chunk}
"""
            )
            chunk_prompt = c_prompt.format(chunk=chunk)
            response = self.llm.invoke(input=chunk_prompt)
            chunk_summary = response.content if hasattr(response, 'content') else str(response)
            chunk_summaries.append(chunk_summary)

        # Combine the chunk summaries and create the final overall summary using a single template
        combined_summary_text = "\n".join(chunk_summaries)
        final_prompt = PromptTemplate(
            input_variables=["combined_summary_text"],
            template="""Based on the following summarized parts of a webpage,
provide a concise overall summary of the entire webpage using bullet points and tables where necessary in markdown. Do not mention the chunk numbers, and answer as if you were a teacher in first person perspective:

"{combined_summary_text}"
"""
        )
        final_prompt_template = final_prompt.format(combined_summary_text=combined_summary_text)
        print("Final summarizing")
        final_summary = self.llm.invoke(input=final_prompt_template)
        self.store_chunks([final_summary])
        return final_summary

    def summarize_page_stream(self, url):
        print("Summarizing (streaming)")
        text = asyncio.run(self.fetch_page_content(url))
        if not text:
            raise ValueError("No textual content found on the page.")

        chunks = self.splitter.split_transcript(text)
        if not chunks:
            raise ValueError("Failed to split the page text into chunks.")

        # Summarize each chunk using a single template
        chunk_summaries = []
        for idx, chunk in enumerate(chunks, 1):
            c_prompt = PromptTemplate(
                input_variables=["chunk"],
                template="""Summarize the following passage concisely in 20-50 words:
                {chunk}
                """
            )
            chunk_prompt = c_prompt.format(chunk=chunk)
            chunk_summary = self.llm.invoke(input=chunk_prompt)
            chunk_summaries.append(chunk_summary.content)
            print(f"Chunk {idx} summary: {chunk_summary.content}")

        # Combine the chunk summaries and generate the final overall summary
        combined_summary_text = "\n".join(chunk_summaries)
        final_prompt = PromptTemplate(
            input_variables=["combined_summary_text"],
            template="""Based on the following summarized parts of a webpage,
provide a concise detailed overall summary of the entire webpage using bullet points where necessary in markdown(small markdown) and ignore promotions and pricings:

"{combined_summary_text}"
"""
        )
        final_prompt_template = final_prompt.format(combined_summary_text=combined_summary_text)
        final_summary = self.llm.invoke(input=final_prompt_template)
        yield f"{final_summary.content}"