    import axios from 'axios';

    const API_BASE_URL = "http://localhost:5001";

    export const summarizeVideo = async (videoUrl) => {
        const response = await axios.post(`${API_BASE_URL}/summarize`, { video_url: videoUrl });
        return response.data;
    };

    export const chatWithAI = async (message) => {
        const response = await axios.post(`${API_BASE_URL}/chat`, { message });
        return response.data;
    };

    export const summarizePdf = async (formData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/summarize_pdf`, formData);
            return response.data;
        } catch (error) {
            console.error('Error during summarization:', error);
            throw error;
        }
    };

    export const summarizeWeb = async (url) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/summarize_web`, { url });
            return response.data;
        } catch (error) {
            console.error("Error calling summarizeWeb API:", error);
            throw error;
        }
    };

    export const PDFuploadPdfs = async (formData) => {
        return await axios.post(`${API_BASE_URL}/upload_pdf`, formData);
    };

    export const uploadPdfs = async (formData) => {
        return await axios.post(`${API_BASE_URL}/upload`, formData);
    };

    export const generateQuiz = async (difficulty, mode, numQuestions) => {
        return await axios.post(`${API_BASE_URL}/quiz`, { difficulty, mode, num_questions: numQuestions });
    };

    export const gradeQuiz = async (mode, responses, correctAnswers = null) => {
        return await axios.post(`${API_BASE_URL}/grade`, {
            mode,
            responses,
            correct_answers: mode === "choice" ? correctAnswers : undefined,
        });
    };

