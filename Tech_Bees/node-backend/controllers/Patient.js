import { Patient, Appointment, Doctor } from "../models/index.js";
import bcryptjs from "bcryptjs";

import { asyncError } from "../middlewares/error.js";
import ErrorHandler from "../utils/error.js";
import { cookieOptions, sendToken } from "../utils/helper.js";
import { stripe } from "../index.js";

export const registerPatient = asyncError(async (req, res, next) => {
  const {
    name,
    email,
    password,
    gender,
    contact_number,
    dob,
    blood_group,
    height,
    weight,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !gender ||
    !contact_number ||
    !dob ||
    !blood_group ||
    !height ||
    !weight
  ) {
    return next(new ErrorHandler("Please fill in all fields"));
  }

  const hashedPassword = await bcryptjs.hash(password, 12);

  let patient = await Patient.create({
    name,
    email,
    password: hashedPassword,
    gender,
    contact_number,
    dob,
    blood_group,
    height,
    weight,
  });

  sendToken(patient, res, "Patient registered successfully", 201);
});

export const loginPatient = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please fill in all fields"));

  const patient = await Patient.findOne({ email }).select("+password");

  if (!patient || !(await bcryptjs.compare(password, patient.password)))
    return next(new ErrorHandler("Invalid credentials"));

  sendToken(patient, res, "Patient logged in successfully", 200);
});

export const logoutPatient = asyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    ...cookieOptions,
  });

  res.status(200).json({
    success: true,
    message: "Patient logged out successfully",
  });
});

export const getPatientProfile = asyncError(async (req, res, next) => {
  const patient = await Patient.findById(req.patient._id);

  res.status(200).json({
    success: true,
    user: patient,
  });
});

export const updatePatientProfile = asyncError(async (req, res, next) => {
  const { name, contact_number, blood_group, height, weight } = req.body;

  const patient = await Patient.findById(req.patient._id);
  if (!patient) return next(new ErrorHandler("Patient not found", 404));

  patient.name = name || patient.name;
  patient.contact_number = contact_number || patient.contact_number;
  patient.blood_group = blood_group || patient.blood_group;
  patient.height = height || patient.height;
  patient.weight = weight || patient.weight;

  await patient.save();

  return res.status(200).json({
    success: true,
    message: "Patient profile updated successfully",
    user: patient,
  });
});

export const getAppointments = asyncError(async (req, res, next) => {
  const patient = await Patient.findById(req.patient._id).populate({
    path: "appointments",
    populate: [
      {
        path: "doctor",
        select: "name email contact_number",
      },
      {
        path: "roomId",
        select: "roomLink",
      },
    ],
  });

  const appointments = patient.appointments.filter(
    (apt) => apt.status === "completed"
  );

  if (!patient) return next(new ErrorHandler("Patient not found", 404));

  res.status(200).json({
    success: true,
    appointments: appointments || [],
  });
});

export const requestAppointment = asyncError(async (req, res, next) => {
  const {
    date,
    time,
    description,
    prev_health_condition,
    specialization,
    paymentIntentId,
    concern,
  } = req.body;

  if (
    !prev_health_condition ||
    !date ||
    !time ||
    !description ||
    !specialization ||
    !paymentIntentId ||
    !concern
  )
    return next(new ErrorHandler("Please fill in all fields"));

  const patient = await Patient.findById(req.patient._id);

  if (!patient) return next(new ErrorHandler("Patient not found", 404));

  let doctors = await Doctor.find({ specialization });

  if (doctors.length === 0)
    return next(new ErrorHandler("No doctors available for this concern", 404));

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status !== "succeeded")
    return next(new ErrorHandler("Payment not successful", 400));

  const appointment = await Appointment.create({
    patient: patient._id,
    date,
    time,
    description,
    prev_health_condition,
    concern,
    paymentStatus: "paid",
    paymentDetails: {
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount_received / 100,
      currency: paymentIntent.currency,
    },
    specialization: specialization,
  });

  patient.appointments.push(appointment._id);

  for (let doctor of doctors) {
    doctor.appointments.push(appointment._id);
    await doctor.save();
  }

  await patient.save();

  return res.status(201).json({
    success: true,
    message: "Appointment requested successfully",
    appointment,
  });
});

export const getDoctors = asyncError(async (req, res, next) => {
  const doctors = await Doctor.find({});

  res.status(200).json({
    success: true,
    doctors,
  });
});

export const predictPaid = asyncError(async (req, res, next) => {
  const patient = await Patient.findById(req.patient._id);

  if (!patient) return next(new ErrorHandler("Patient not found", 404));

  patient.pankrison_paid_trial = 1;

  await patient.save();

  return res.status(200).json({
    success: true,
    message: "Patient Parkinson paid trial activated successfully",
  });
});
