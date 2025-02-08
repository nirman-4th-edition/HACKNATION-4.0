import express from "express";
import { Room } from "../models/index.js";

const router = express.Router();

router.get("/getroom/:roomID", async (req, res) => {
  try {
    const { roomID } = req.params;
    const room = await Room.findOne({ roomLink: roomID });
    res.json({ message: "Room found", room });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
