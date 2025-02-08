import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { specialization } from "../constants/data.js";

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
      enum: specialization,
    },
    license_number: {
      type: String,
      required: true,
    },
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    role: {
      type: String,
      default: "doctor",
    },
  },
  {
    timestamps: true,
  }
);

doctorSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id, sub: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
