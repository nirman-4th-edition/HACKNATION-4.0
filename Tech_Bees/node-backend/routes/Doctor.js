import express from "express";

import {
  registerDoctor,
  loginDoctor,
  logoutDoctor,
  updateDoctorProfile,
  getDoctorProfile,
  approveAppointment,
  getDoctorAppointments,
  rejectAppointment,
  getAllAppointments,
} from "../controllers/Doctor.js";
import { isAuthenticatedDoctor } from "../middlewares/auth.js";
import { isEmailExists } from "../middlewares/email.js";

const router = express.Router();

router.post("/register", isEmailExists, registerDoctor);
router.post("/login", loginDoctor);
router.get("/logout", isAuthenticatedDoctor, logoutDoctor);
router.post("/update-profile", isAuthenticatedDoctor, updateDoctorProfile);
router.get("/profile", isAuthenticatedDoctor, getDoctorProfile);
router.post(
  "/approve-appointment/:id",
  isAuthenticatedDoctor,
  approveAppointment
);
router.post(
  "/reject-appointment/:id",
  isAuthenticatedDoctor,
  rejectAppointment
);
router.get("/appointments", isAuthenticatedDoctor, getDoctorAppointments);
router.get("/all-appointments", isAuthenticatedDoctor, getAllAppointments);

export default router;
