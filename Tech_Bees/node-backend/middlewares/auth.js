import { Doctor, Patient, Hospital } from "../models/index.js";
import jwt from "jsonwebtoken";

import { asyncError } from "./error.js";
import ErrorHandler from "../utils/error.js";

export const isAuthenticatedPatient = asyncError(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) return next(new ErrorHandler("Please login to access this route", 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.patient = await Patient.findById(decoded._id);

    next();
})

export const isAuthenticatedDoctor = asyncError(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) return next(new ErrorHandler("Please login to access this route", 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.doctor = await Doctor.findById(decoded._id);

    next();
})

export const isAuthenticatedHospital = asyncError(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) return next(new ErrorHandler("Please login to access this route", 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.hospital = await Hospital.findById(decoded._id);

    next();
})