import { Hospital, Patient, Doctor } from "../models/index.js";
import { asyncError } from "./error.js";

export const isEmailExists = asyncError(async (req, res, next) => {

    const { email } = req.body;

    const [patient, doctor, hospital] = await Promise.all([
        Patient.findOne({ email }),
        Doctor.findOne({ email }),
        Hospital.findOne({ email })
    ]);

    if (patient || doctor || hospital)
        return res.status(400).json({ message: "Email already exists" });

    next();
})