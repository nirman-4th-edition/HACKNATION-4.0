import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from langchain.prompts import PromptTemplate

load_dotenv()

class LessonPlanGenerator:
    def __init__(self):
        self.api_key = os.getenv('GROQ_API_KEY')
        if not self.api_key:
            raise ValueError("GROQ_API_KEY not found in environment variables.")
        self.model_name = "llama-3.1-8b-instant"
        self.temperature = 0.8
        self.prompt_template = """
You are a professional lesson planner.
Generate a detailed lesson plan for the subject of {subject} on the topic of {topic}.
This lesson is intended for {grade} students and will last for {duration}.
The following are the learning objectives: {learning_objectives}.
Return the results as Markdown and don't return class size.
This is how the user wants the plan to be customized: {customization}. Return the result as Markdown.
"""

    def build_prompt(self, data):
        """Builds the prompt using the provided data."""
        try:
            prompt = PromptTemplate(
                input_variables=['subject', 'topic', 'grade', 'duration', 'learning_objectives', 'customization'],
                template=self.prompt_template  # use the singular "template" argument
            )
            filled_prompt = prompt.format(
                subject=data.get('subject'),
                topic=data.get('topic'),
                grade=data.get('grade'),
                duration=data.get('duration'),
                learning_objectives=data.get('learning_objectives'),
                customization=data.get('customization', '')
            )
            return filled_prompt
        except Exception as e:
            print("Error building prompt:", e)
            raise e

    def setup_model(self):
        """Initializes the LLM and its parser."""
        try:
            model = ChatGroq(
                model=self.model_name,
                groq_api_key=self.api_key,
                temperature=self.temperature
            )
            parser = StrOutputParser()
            output = model | parser
            return output
        except Exception as e:
            print("Error setting up model and parser:", e)
            raise e

    def stream_lesson_plan(self, data):
        """
        Yields chunks of the lesson plan as they are generated.
        If an error occurs, it yields an error message.
        """
        try:
            prompt_str = self.build_prompt(data)
        except Exception as e:
            error_msg = f"Error in building prompt: {e}"
            print(error_msg)
            yield error_msg
            return

        try:
            output = self.setup_model()
        except Exception as e:
            error_msg = f"Error setting up LLM: {e}"
            print(error_msg)
            yield error_msg
            return

        try:
            # Attempt to stream the result if the LLM supports streaming.
            try:
                for chunk in output.stream_invoke(prompt_str):
                    yield chunk
            except AttributeError:
                # Fallback: invoke synchronously and yield each line.
                lesson_plan = output.invoke(prompt_str)
                for line in lesson_plan.splitlines(keepends=True):
                    yield line
        except Exception as e:
            error_msg = f"Error during LLM invocation: {e}"
            print(error_msg)
            yield error_msg

    def generate_lesson_plan(self, data):
        """Convenience method to generate and return the full lesson plan as a string."""
        plan = ""
        for chunk in self.stream_lesson_plan(data):
            plan += chunk
        return plan