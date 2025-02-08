import express from "express";
import {
  loginPatient,
  registerPatient,
  logoutPatient,
  getPatientProfile,
  getAppointments,
  requestAppointment,
  updatePatientProfile,
  getDoctors,
  predictPaid,
} from "../controllers/Patient.js";

import { isAuthenticatedPatient } from "../middlewares/auth.js";
import { isEmailExists } from "../middlewares/email.js";

const router = express.Router();

router.post("/register", isEmailExists, registerPatient);
router.post("/login", loginPatient);
router.get("/logout", isAuthenticatedPatient, logoutPatient);
router.get("/profile", isAuthenticatedPatient, getPatientProfile);
router.post("/update-profile", isAuthenticatedPatient, updatePatientProfile);
router.get("/appointments", isAuthenticatedPatient, getAppointments);
router.post("/request-appointment", isAuthenticatedPatient, requestAppointment);
router.get("/doctors", isAuthenticatedPatient, getDoctors);
router.post("/parkinson/predict-paid", isAuthenticatedPatient, predictPaid);

export default router;
