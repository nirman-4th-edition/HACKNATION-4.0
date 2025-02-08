import express from "express";
import { getRecommendation } from "../controllers/cropRecommendation.js";

const router = express.Router();

// Make sure the path matches the client request
router.get("/recommendation", getRecommendation);

export default router;