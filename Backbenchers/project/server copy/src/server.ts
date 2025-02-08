import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";  // Routes for login
import profile from "./routes/profile";  // Routes for handling user profiles

dotenv.config({ path: './.env' });
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Use routes
app.use("/auth", authRoutes);  // Login-related routes
app.use("/profile", profile);  // Profile-related routes

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";
//const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI is not defined in .env');
}
// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log('Error Connecting to MongoDB',err));

  const PORT = 5000;  // Force port 5000
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  