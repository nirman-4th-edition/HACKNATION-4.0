import { Hospital } from "../models/index.js";

import bcryptjs from "bcryptjs";

import { asyncError } from "../middlewares/error.js";
import { sendToken, cookieOptions } from "../utils/helper.js";

export const registerHospital = asyncError(async (req, res, next) => {
  const {
    name,
    address,
    phone_number,
    email,
    password,
    registration_number,
    specialist_in,
  } = req.body;

  if (
    !name ||
    !address ||
    !phone_number ||
    !email ||
    !password ||
    !registration_number ||
    !specialist_in
  )
    return next(new Error("Please fill all the fields"));

  const hashedPassword = await bcryptjs.hash(password, 12);

  const hospital = await Hospital.create({
    name,
    address,
    phone_number,
    email,
    password: hashedPassword,
    registration_number,
    specialist_in,
  });

  sendToken(hospital, res, "Hospital registered successfully", 201);
});

export const loginHospital = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new Error("Please enter email and password"));

  const hospital = await Hospital.findOne({ email }).select("+password");

  if (!hospital || !(await bcryptjs.compare(password, hospital.password)))
    return next(new Error("Invalid credentials"));

  sendToken(hospital, res, "Hospital logged in successfully", 200);
});

export const getHospitalProfile = asyncError(async (req, res, next) => {
  const hospital = await Hospital.findById(req.hospital._id);

  return res.status(200).json({
    success: true,
    user: hospital,
  });
});

export const logoutHospital = asyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    ...cookieOptions,
  });
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
