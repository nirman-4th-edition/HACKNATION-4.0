import mongoose, { Schema } from "mongoose";
const scheduleSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },

    address: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Schedule = mongoose.model("Schedule", scheduleSchema);
