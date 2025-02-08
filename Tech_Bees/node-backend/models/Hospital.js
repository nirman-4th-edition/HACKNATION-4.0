import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const hospitalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    registration_number: {
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
    phone_number: {
      type: Number,
      required: true,
    },
    website: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      required: true,
    },
    specialist_in: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "hospital",
    },
  },
  {
    timestamps: true,
  }
);

hospitalSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id, sub: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const Hopital = mongoose.model("Hospital", hospitalSchema);
export default Hopital;
