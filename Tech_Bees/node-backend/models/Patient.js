import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    contact_number: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    blood_group: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
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
      default: "patient",
    },
    pankrison_model_trial: {
      type: Number,
      default: 0,
    },
    pankrison_paid_trial: {
      type: Number,
      default: 0,
    },
    cancer_paid_trial: {
      type: Number,
      default: 0,
    },
    parkinson_records: [
      {
        type: Object,
      },
    ],
    cancer_records: [
      {
        type: Object,
      },
    ],
    cancer_model_trial: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id, sub: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
