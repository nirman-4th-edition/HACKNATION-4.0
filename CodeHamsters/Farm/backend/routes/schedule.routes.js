import { Router } from "express";
import { createSchedule } from "../controllers/schedule.controller.js";

const router = Router();

router.post("/", createSchedule);

export default router;
