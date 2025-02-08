import { GoogleGenerativeAI } from "@google/generative-ai";

// Load the Gemini API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

// Function to summarize prescription text
export const summarizeText = async (text) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Summarize the following prescription in simple, understandable language for a normal person:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return response;
  } catch (error) {
    console.error("Error summarizing text:", error);
    return "Failed to generate summary.";
  }
};
