import express from "express";
import connectDB from "./db/db.js";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Route Imports
import authRoutes from "./routes/auth.routes.js";
import scheduleRoutes from "./routes/schedule.routes.js";
import fertilizerRoutes from "./routes/fertilizer.routes.js";

// Mount Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/schedule", scheduleRoutes);
app.use("/api/v1/fertilizer", fertilizerRoutes);

// Health Check Endpoint
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "active", version: "1.0.0" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.statusCode || 500).json({
    success: false,
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// Database Connection & Server Start
connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Graceful Shutdown
    process.on("SIGINT", () => {
      console.log("Shutting down gracefully...");
      server.close(() => process.exit(0));
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });
