import express from "express";
import { verifyAadhaar } from "../controllers/aadhaar.controller.js";  // Import Aadhaar controller

const router = express.Router();

// Aadhaar verification route
router.post("/verify", verifyAadhaar);

export default router;
