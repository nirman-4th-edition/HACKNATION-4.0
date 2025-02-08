import { Request, Response } from "express";
import UserProfile from "../models/UserProfile";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  console.log("Login request received:", req.body);
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      res.status(400).json({ message: "Email and Name are required" });
      return;
    }

    let user = await UserProfile.findOne({ email });

    if (!user) {
      // If user doesn't exist, create a new profile
      const profileId = `profile-${Date.now()}`;
      user = new UserProfile({ profileId, name, email, residenceType: "urban", annualIncome: 0, age: 0, numberOfDependants: 0 });
      await user.save();
    }

    res.status(200).json({ profileId: user.profileId });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
