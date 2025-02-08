import express from "express";

import { loginHospital, registerHospital, getHospitalProfile, logoutHospital } from "../controllers/Hospital.js";

import { isAuthenticatedHospital } from "../middlewares/auth.js";
import { isEmailExists } from "../middlewares/email.js";

const router = express.Router();

router.post("/login", loginHospital);
router.post("/register", isEmailExists, registerHospital);
router.get("/profile", isAuthenticatedHospital, getHospitalProfile);
router.get("/logout", isAuthenticatedHospital, logoutHospital);

export default router;
