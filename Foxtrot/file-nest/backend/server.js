import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";

import cors from "cors";

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

socketHandler(io);
