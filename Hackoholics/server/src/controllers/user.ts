import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiResponse, { response } from "../types/response";
import HR from "../models/HR";
import Student from "../models/Student";
import Admin from "../models/Admin";
import User from "../models/User";

export const updatePassword = async (req: Request, res: Response): Promise<any> => {
    const { username, password, newPassword } = req.body;
    // extract token from header
    const token = req.headers.authorization?.split(" ")[1];
    if (!username || !password || !newPassword || !token) {
        return res.status(400).json({ ...response, error: "All fields are required." });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ ...response, error: "User not found." });
        }

        // decode the token and compare if the username from body is same as the username from token
        if (!token) {
            return res.status(400).json({ ...response, error: "Authorization token is required." });
        }
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decoded) {
            return res.status(400).json({ ...response, error: "Invalid Bearer token." });
        }
        if (decoded.username !== username) {
            return res.status(400).json({ ...response, error: "Access Denied !" });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ ...response, error: "Invalid credentials." });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ username }, { password: hashedPassword });

        return res.status(200).json({ ...response, success: true, message: "Password updated successfully." });
    } catch (error) {
        return res.status(500).json({ ...response, error });
    }
}

export const updateEmail = async (req: Request, res: Response): Promise<any> => {
    const { username, password, newEmail } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    try {
        if (!token) {
            return res.status(400).json({ ...response, error: "Authorization token is required." });
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        if(decoded.username != username) {
            return res.status(400).json({ ...response, error: "Access Denied !" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ ...response, error: "User not found." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ ...response, error: "Invalid credentials." });
        }
        // find if any other student or hr or admin has the same email
        let student = await Student.findOne({ email: newEmail });
        let hr = await HR.findOne({ email: newEmail });
        let admin = await Admin.findOne({ email: newEmail });
        if (student || hr || admin) {
            return res.status(400).json({ ...response, error: "Email already exists." });
        }

        if (user.role === "student") {
            student = await Student.findOne({ _id: username });
            if (!student) {
                return res.status(404).json({ ...response, error: "Student not found." });
            }
            student.email = newEmail;
            await student.save();
        } else if (user.role === "hr") {
            hr = await HR.findOne({ email: username });
            if (!hr) {
                return res.status(404).json({ ...response, error: "HR not found." });
            }
            user.username = newEmail;
            hr.email = newEmail;
            try {
                await user.save();
                await hr.save();
            } catch (error) {
                user.username = username; // Revert username change
                await user.save();
                return res.status(500).json({ ...response, error });
            }
        } else if (user.role === "admin") {
            admin = await Admin.findOne({ userId: user._id });
            if (!admin) {
                return res.status(404).json({ ...response, error: "Admin not found." });
            }
            user.username = newEmail;
            admin.email = newEmail;
            try {
                await user.save();
                await admin.save();
            } catch (error) {
                user.username = username; // Revert username change
                await user.save();
                return res.status(500).json({ ...response, error });
            }
        }
        return res.status(200).json({ ...response, success: true, message: "Email updated successfully" });
    } catch (error) {
        return res.status(500).json({ ...response, error });
    }
}