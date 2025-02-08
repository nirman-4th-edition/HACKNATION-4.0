import { Doctor, Appointment, Room } from "../models/index.js";
import bcryptjs from "bcryptjs";

import { sendToken, cookieOptions } from "../utils/helper.js";
import { asyncError } from "../middlewares/error.js";
import ErrorHandler from "../utils/error.js";

export const registerDoctor = asyncError(async (req, res, next) => {
  const {
    name,
    email,
    password,
    phone_number,
    gender,
    specialization,
    license_number,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !phone_number ||
    !specialization ||
    !license_number ||
    !gender
  )
    return next(new ErrorHandler("Please fill in all fields", 400));

  let hashedPassword = await bcryptjs.hash(password, 12);

  const doctor = await Doctor.create({
    name,
    email,
    password: hashedPassword,
    phone_number,
    gender,
    specialization,
    license_number,
  });

  // TODO:  verify the doctor's liceese number using any api

  sendToken(doctor, res, "Doctor registered successfully", 201);
});

export const loginDoctor = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please fill in all fields", 400));

  let doctor = await Doctor.findOne({ email }).select("+password");

  if (!doctor || !(await bcryptjs.compare(password, doctor.password)))
    return next(new ErrorHandler("Invalid credentials", 400));

  sendToken(doctor, res, "Doctor logged in successfully", 200);
});

export const logoutDoctor = asyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    ...cookieOptions,
  });

  res.status(200).json({
    success: true,
    message: "Doctor logged out successfully",
  });
});

export const getDoctorProfile = asyncError(async (req, res, next) => {
  const doctor = await Doctor.findById(req.doctor._id);

  res.status(200).json({
    success: true,
    user: doctor,
  });
});

export const updateDoctorProfile = asyncError(async (req, res, next) => {
  const { name, phone_number, gender, specialization } = req.body;

  let doctor = await Doctor.findById(req.doctor._id);

  if (!doctor) return next(new ErrorHandler("Doctor not found", 404));

  doctor.name = name || doctor.name;
  doctor.phone_number = phone_number || doctor.phone_number;
  doctor.gender = gender || doctor.gender;
  doctor.specialization = specialization || doctor.specialization;

  await doctor.save();

  return res.status(200).json({
    success: true,
    message: "Doctor profile updated successfully",
    user: doctor,
  });
});

export const getDoctorAppointments = asyncError(async (req, res, next) => {
  const doctor = await Doctor.findById(req.doctor._id).populate({
    path: "appointments",
    populate: [
      {
        path: "patient",
        select: "name email phone_number dob",
      },
      {
        path: "roomId",
        select: "roomLink",
      },
    ],
  });

  const appointments = doctor.appointments.filter(
    (appointment) => appointment.status === "completed"
  );

  return res.status(200).json({
    success: true,
    appointments: appointments,
  });
});

export const getAllAppointments = asyncError(async (req, res, next) => {
  const doctor = await Doctor.findById(req.doctor._id).populate({
    path: "appointments",
    populate: {
      path: "patient",
      select: "name email phone_number dob",
    },
  });

  let appointments = doctor.appointments.filter(
    (apt) => apt.status === "pending"
  );

  if (appointments.length === 0)
    return next(new ErrorHandler("No appointments found", 404));

  return res.status(200).json({
    success: true,
    appointments: appointments,
  });
});

export const approveAppointment = asyncError(async (req, res, next) => {
  const { id } = req.params;

  const appointment = await Appointment.findById(id);

  if (!appointment) return next(new ErrorHandler("Appointment not found", 404));

  if (appointment.doctor)
    return next(new ErrorHandler("Appointment already approved", 400));

  appointment.status = "completed";
  appointment.doctor = req.doctor._id;

  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const room = await Room.create({
    doctor: req.doctor._id,
    patient: appointment.patient,
    appointment: appointment._id,
    roomLink: result,
  });

  appointment.roomId = room._id;

  await appointment.save();

  return res.status(200).json({
    success: true,
    message: "Appointment approved successfully",
  });
});

export const rejectAppointment = asyncError(async (req, res, next) => {
  const { id } = req.params;

  const appointment = await Appointment.findById(id);

  if (!appointment) return next(new ErrorHandler("Appointment not found", 404));

  appointment.status = "cancelled";

  await Doctor.findByIdAndUpdate(req.doctor._id, {
    $pull: { appointments: appointment._id },
  });

  await appointment.save();

  return res.status(200).json({
    success: true,
    message: "Appointment rejected successfully",
  });
});
