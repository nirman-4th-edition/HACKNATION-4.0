import express from 'express';
import Anthropic from "@anthropic-ai/sdk";
import { uuid } from "uuidv4";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

async function searchDoctors(departments, specializations) {
    try {
        console.log("Searching for doctors...");
        
      const doctors = await Doctor.find({
        $or: [
          { department: { $in: departments } },
          { specialization: { $in: specializations } }
        ]
      });
  
      console.log("Doctors found:", doctors);
      return doctors;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      return [];
    }
  }

// Initialize Anthropic client with error handling
let anthropic;
try {
    anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
    });
} catch (error) {
    console.error('Failed to initialize Anthropic client:', error);
    process.exit(1);
}

// In-memory storage for chat sessions
const chatSessions = new Map();

// Enhanced JSON validation function with better type checking
const isValidResponse = (response) => {
    try {
        const json = JSON.parse(response);
        
        // Basic validation
        if (!json.type || !json.message) return 0;
        
        // Validate based on type
        switch (json.type) {
            case "question":
                return 1;
                
            case "call":
                return 2;
                
            case "book":
                // Enhanced validation for book type
                if (!json.data) return 0;
                
                const {
                    department,
                    specialization,
                    patientData
                } = json.data;
                
                if (!department || !specialization || !patientData) return 0;
                
                const isValid = 
                    typeof department === "string" &&
                    Array.isArray(specialization) &&
                    patientData &&
                    typeof patientData.symptoms === "string" &&
                    ["mild", "moderate", "severe"].includes(patientData.severity) &&
                    typeof patientData.duration === "string" &&
                    patientData.recommendation &&
                    typeof patientData.recommendation.warning === "string";
                
                return isValid ? 3 : 0;
                
            default:
                return 0;
        }
    } catch (error) {
        console.error('Response validation error:', error);
        return 0;
    }
};



// Chat endpoint with improved error handling and response processing
router.post('/chat', async (req, res) => {

    const SYSTEM_PROMPT = "You are a medical information and triage chatbot. Your primary role is to gather information, provide general health guidance, and direct users to appropriate medical care. You must ALWAYS respond in one of three JSON formats:\n\n1. For questions and information gathering:\n```json\n{\n    \"type\": \"question\",\n    \"message\": \"<your question or information>\",\n    \"data\": null\n}\n```\n\n2. For emergencies requiring immediate attention:\n```json\n{\n    \"type\": \"call\",\n    \"message\": \"<urgent instruction>\",\n    \"data\": null\n}\n```\n\n3. For medical recommendations and appointments:\n```json\n{\n    \"type\": \"book\",\n    \"message\": \"<recommendation including probable diagnosis (don't say if it's something severe or life threatening ) otcMedicine warning>\",\n    \"data\": {\n        \"department\": \"<department name>\",\n        \"specialization\": [\"<relevant specialties>\"],\n        \"patientData\": {\n            \"symptoms\": \"<symptom description>\",\n            \"severity\": \"<mild/moderate/severe>\",\n            \"duration\": \"<duration>\",\n            \"recommendation\": {\n                \"otcMedicine\": \"<if applicable>\",\n                \"warning\": \"This is an AI chatbot recommendation. Please consult a healthcare professional for proper medical advice.\",\n                \"followUp\": \"<follow-up instructions>\"\n            }\n        }\n    }\n}\n```\n\nCORE RULES:\n1. For mild symptoms (headache, minor cold):\n   - Recommend General OPD\n   - Provide basic OTC guidance\n   - Include clear warnings about AI limitations\n\n2. For moderate symptoms:\n   - Recommend appropriate specialty\n   - Suggest timely consultation\n\n3. For severe symptoms:\n   - Use \"call\" type immediately\n   - Provide emergency instructions\n\n4. Always include:\n   - AI warning disclaimer\n   - Clear follow-up instructions\n   - General OPD recommendation for mild cases\n\nEMERGENCY TRIGGERS (use \"call\" type):\n- Chest pain\n- Difficulty breathing\n- Severe bleeding\n- Stroke symptoms\n- Loss of consciousness\n- Severe allergic reactions\n\nSEVERITY GUIDELINES:\n- Minimal: OTC + General OPD recommendation\n- Mild: General OPD\n- Moderate: Specific department\n- Severe: Immediate emergency response\n\nDEPARTMENT ROUTING:\n1. General OPD: Minor ailments, routine checkups\n2. Specialty Departments: Only for clear specialty needs\n3. Emergency: Life-threatening conditions\n\nRemember: Always err on the side of General OPD for mild symptoms rather than specialized departments.\nstrictly follow the the above format "
    console.log(SYSTEM_PROMPT);
    
    try {
        let { message, chatId } = req.body;

        // Validate input
        if (!message?.trim()) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Generate new chatId if not provided
        if (!chatId) {
            chatId = uuid();
        }

        // Initialize or get chat history
        if (!chatSessions.has(chatId)) {
            chatSessions.set(chatId, []);
        }
        const chatHistory = chatSessions.get(chatId);

        // Add user message to history
        chatHistory.push({
            role: 'user',
            content: [{ type: 'text', text: message }]
        });

        // Get response from Anthropic
        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 8192,
            temperature: 1,
            system: SYSTEM_PROMPT,
            messages: chatHistory
        });

        // Validate response exists
        if (!response?.content?.[0]?.text) {
            throw new Error('Invalid response from Anthropic');
        }

        // Add assistant's response to history
        chatHistory.push({
            role: 'assistant',
            content: response.content
        });

        // Validate response format
        const validationType = isValidResponse(response.content[0].text);
        if (!validationType) {
            return res.status(400).json({ 
                error: 'Invalid response format. Please refresh and try again.',
                chatId
            });
        }

        // Update chat session
        chatSessions.set(chatId, chatHistory);

        // Handle different response types
        if (validationType === 1 || validationType === 2) {
            // Question or Call type
            return res.json({
                response: JSON.parse(response.content[0].text),
                chatId
            });
        } else {
            // Book type - parse for additional processing
            const json = JSON.parse(response.content[0].text);
            
            const department = json.data.department;
            const specialization = json.data.specialization;

            // Search for doctors based on department and specialization
            const doctors = await searchDoctors(department, specialization);



            
            return res.json({
                response: JSON.parse(response.content[0].text),
                chatId,
                doctors
            });
        }

    } catch (error) {
        console.error('Chat error:', error);
        return res.status(500).json({ 
            error: 'Internal server error', 
            details: process.env.NODE_ENV === 'development' ? error.message : undefined 
        });
    }
});

// Get chat history endpoint with improved error handling
router.get('/chat/:chatId', (req, res) => {
    try {
        const { chatId } = req.params;
        const chatHistory = chatSessions.get(chatId);
        
        if (!chatHistory) {
            return res.status(404).json({ error: 'Chat session not found' });
        }
        
        return res.json({ chatHistory });
    } catch (error) {
        console.error('Get chat history error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Add chat history cleanup endpoint
router.delete('/chat/:chatId', (req, res) => {
    try {
        const { chatId } = req.params;
        chatSessions.delete(chatId);
        return res.json({ message: 'Chat history cleared successfully' });
    } catch (error) {
        console.error('Delete chat history error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;