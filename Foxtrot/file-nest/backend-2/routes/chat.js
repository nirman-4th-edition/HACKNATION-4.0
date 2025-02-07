import { Router } from "express";
import { tokenVerify } from "../middlewares/tokenVerify.js";
import { messageModel } from "../db/db.js";

const chatRouter = Router();

chatRouter.get("/all", tokenVerify, async (req, res) => {
  // Get all messages
  const room = req.headers.room;

  try {
    const messages = await messageModel.find({ room }).sort({ timestamp: 1 });
    return res.status(200).json({
      message: "Messages Fetched",
      data: messages,
    });
  } catch (error) {
    return res.json({
      message: "Error Fetching Messages",
      error: error.message,
    });
  }
});

export { chatRouter };
