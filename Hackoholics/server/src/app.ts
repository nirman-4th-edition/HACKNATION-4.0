import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth";
import adminRoutes from "./routes/adminControls";
import userRoutes from "./routes/user";
import getDetailsRoutes from "./routes/details";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3031;

app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5174",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

app.use("/api/auth", authRoutes);
app.use("/api/details", getDetailsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.DBURI as string)
  .then(() => {
    console.log("Connected to Database !");
    app.listen(PORT, () => {
      console.log(`API running at http://localhost:${PORT}/`);
    });
  })
  .catch((err) => console.error(err));
