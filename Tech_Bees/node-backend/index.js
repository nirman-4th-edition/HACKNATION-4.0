import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import { Server } from "socket.io";
import http from "http";

import { connectiToDB } from "./connection.js";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config();

export const stripe = new Stripe(process.env.STRIPE_API_SECRET);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const roomToUsersMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected: ${socket.id}`);

  socket.on("room:join", ({ room }) => {
    if (!roomToUsersMap.has(room)) {
      roomToUsersMap.set(room, new Set());
    }

    roomToUsersMap.get(room).add(socket.id);

    socket.join(room);
    io.to(room).emit("user:joined", {
      id: socket.id,
      users: [...roomToUsersMap.get(room)],
    });

    console.log(`User ${socket.id} joined room: ${room}`);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incoming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  socket.on("disconnect", () => {
    for (const [room, users] of roomToUsersMap.entries()) {
      if (users.has(socket.id)) {
        users.delete(socket.id);
        if (users.size === 0) {
          roomToUsersMap.delete(room);
        } else {
          io.to(room).emit("user:left", { id: socket.id, users: [...users] });
        }
        break;
      }
    }

    console.log(`Socket Disconnected: ${socket.id}`);
  });
});

server.listen(process.env.port, () => {
  connectiToDB();
  console.log(`server is running on port ${process.env.port}`);
});

import patientrouter from "./routes/patient.js";
import doctorrouter from "./routes/doctor.js";
import hospitalrouter from "./routes/hospital.js";
import { createPaymentIntent } from "./utils/helper.js";

app.use("/patient", patientrouter);
app.use("/doctor", doctorrouter);
app.use("/hospital", hospitalrouter);
app.post("/payment/create-payment-intent", createPaymentIntent);

app.use(errorMiddleware);
