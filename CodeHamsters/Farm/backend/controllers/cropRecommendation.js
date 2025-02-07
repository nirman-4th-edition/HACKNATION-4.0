import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// console.log("GEMINI API KEY:", process.env.GEMINI_API_KEY);

export const getRecommendation = async (req, res) => {
  // Set SSE headers first
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin":
      process.env.CLIENT_URL || "http://localhost:5173",
    "X-Accel-Buffering": "no", // Disable proxy buffering
  });

  // Add connection heartbeat
  const heartbeatInterval = setInterval(() => {
    res.write(":\n\n"); // SSE comment heartbeat
  }, 15000);

  try {
    // Validate and decode parameters
    const params = {
      location: decodeURIComponent(req.query.location),
      soilType: decodeURIComponent(req.query.soilType),
      weather: decodeURIComponent(req.query.weather),
      phLevel: decodeURIComponent(req.query.phLevel),
    };

    // Validate parameters
    if (Object.values(params).some((v) => !v)) {
      res.write(
        `event: error\ndata: ${JSON.stringify({
          code: 400,
          message: "All parameters are required",
        })}\n\n`
      );
      return res.end();
    }

    // Initialize model with enhanced configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.9,
      },
    });

    const prompt = `As an agricultural expert, suggest the best crops that will grow best according to the given data, excluding rice and wheat. Respond only in numbered format (1, 2, 3, 4, 5, 6, 7, 8...) with crop names:
      - Location: ${params.location}
      - Soil Type: ${params.soilType}
      - Weather: ${params.weather}
      - pH Level: ${params.phLevel}
      `;

    // Stream handling with proper chunk processing
    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      res.write(
        `data: ${JSON.stringify({
          chunk: text.replace(/\n/g, "\n\n"), // Preserve newlines
        })}\n\n`
      );

      // Force flush the buffer
      if (typeof res.flush === "function") res.flush();
    }

    res.write(
      `event: complete\ndata: ${JSON.stringify({
        status: "done",
        timestamp: Date.now(),
      })}\n\n`
    );
  } catch (error) {
    console.error("Server Error:", error);
    res.write(
      `event: error\ndata: ${JSON.stringify({
        code: error.status || 500,
        message: error.message.replace(/"/g, "'"), // Sanitize quotes
      })}\n\n`
    );
  } finally {
    clearInterval(heartbeatInterval);
    res.end();
  }
};
