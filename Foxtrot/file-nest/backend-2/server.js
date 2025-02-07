import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { chatRouter } from "./routes/chat.js";
import cors from "cors";
import { messageModel } from "./db/db.js";
import { socketHandler } from "./routes/socket.js";
import { filesRouter } from "./routes/files.js";
import { uploadRouter } from "./routes/upload.js";

import http from "http";
import { Server } from "socket.io";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app); // Create HTTP server

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow frontend access
    methods: ["GET", "POST"],
  },
});

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected Database");

  await server.listen(PORT);
  console.log(`Opened on port: ${PORT}`);
}

main();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/chat", chatRouter);
app.use("/files", filesRouter);
app.use("/upload", uploadRouter);

socketHandler(io);
