import { Schedule } from "../models/schedule.model.js";

export const createSchedule = async (req, res) => {
  try {
    const { date, time, address } = req.body;

    if (!date || !time || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const schedule = new Schedule({
      date,
      time,
      address,
    });

    await schedule.save();

    return res.status(201).json(schedule);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
