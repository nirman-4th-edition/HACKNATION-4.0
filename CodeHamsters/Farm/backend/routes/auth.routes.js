import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = Router();

router.get("/me", protectRoute, getMe);
router.post("/register", register);
router.post("/login", login);

export default router;
