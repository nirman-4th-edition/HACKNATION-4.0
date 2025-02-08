import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { IStudent, IUser } from "../types/collections";
import ApiResponse, { response } from "../types/response";
// import { switchDB } from "../utils/db";
import User from "../models/User";
import Student from "../models/Student";
import Admin from "../models/Admin";
import HR from "../models/HR";
import Company from "../models/Company";

export const register = async (req: Request, res: Response): Promise<any> => {
  let user: IUser | null = null;
  try {
    const { name, username, email, password, branch, section } = req.body; // check the sequence (should match with the frontend)

    // Check if all fields are provided
    if (!name || !username || !email || !password || !branch || !section) {
      return res
        .status(400)
        .json({ ...response, error: "All fields are required." });
    }

    // get database key
    const key = Number("20" + username.substring(0, 2));
    // switchDB("SOA_ITER", key.toString());

    // Check if the user already exists
    const existingUser = await User.findOne({ username }); //
    if (existingUser) {
      return res.status(400).json({
        ...response,
        error: "User already exists with this username.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = uuidv4();

    // Create and save the new user
    user = new User({
      _id: userId,
      username,
      password: hashedPassword,
      role: "student",
    });
    await user.save();

    const student = new Student({
      _id: username, // registration no
      userId: user._id,
      admissionYear: key,
      name,
      email,
      section,
      branch,
      feedback: [],
      companies: [],
      placedAt: [],
    });
    await student.save();

    const token = jwt.sign(
      { id: user._id, username: student._id, role: "student" },
      process.env.JWT_SECRET || "your_secret_key"
    );
    // user_id: UUID, regd_no: regd_No, role: student

    res.status(201).json({
      ...response,
      success: true,
      message: "User registered successfully",
      data: {
        token,
        user: {
          name,
          regd_No: username,
          branch,
          section,
          email,
        },
      },
    });
  } catch (err: Error | any | null) {
    if (user) {
      await user.deleteOne();
    }
    res.status(500).json({ ...response, error: err.message });
  }
};

export const registerHr = async (req: Request, res: Response): Promise<any> => {
  let user: IUser | null = null;
  try {
    const { name, email, password, company } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !company) {
      return res
        .status(400)
        .json({ ...response, error: "All fields are required." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username: email });
    if (existingUser) {
      return res.status(400).json({
        ...response,
        error: "User already exists with this email.",
      });
    }
    const companyObject = await Company.findOne({ name: company });
    if (!companyObject) {
      return res.status(404).json({ ...response, error: "Company not found." });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = uuidv4();

    // Create and save the new user
    user = new User({
      _id: userId,
      username: email,
      password: hashedPassword,
      role: "hr",
    });
    await user.save();
    
    const hr = new HR({
      userId: user._id,
      email,
      companyId: companyObject._id,
      name,
    });
    await hr.save();

    const token = jwt.sign(
      { id: user._id, username: email, role: "hr" },
      process.env.JWT_SECRET || "your_secret_key"
    );

    res.status(201).json({
      ...response,
      success: true,
      message: "User registered successfully",
      data: {
        token,
        user: {
          name,
          email,
          companyId: companyObject._id,
          username: email,
          role: "hr",
        },
      },
    });
  } catch (err: Error | any | null) {
    if (user) {
      await user.deleteOne();
    }
    res.status(500).json({ ...response, error: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body;

    // Check if all fields are provided
    if (!username || !password) {
      return res
        .status(400)
        .json({ ...response, error: "Username and password are required." });
    }

    // get database key
    const key = Number("20" + username.substring(0, 2)) + 4;
    // switchDB("SOA_ITER", key.toString());

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ ...response, error: "Invalid username or password." });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ ...response, error: "Invalid password." });
    }

    if (user.role === "student") {
      const student = await Student.findOne({ _id: username });
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, username: username, role: user.role },
        process.env.JWT_SECRET || "your_secret_key"
      );

      res.status(200).json({
        ...response,
        success: true,
        message: "User logged in successfully",
        data: {
          token,
          user: {
            name: student?.name,
            regd_no: username,
            branch: student?.branch,
            section: student?.section,
            email: student?.email,
          },
        },
      });
    } else if (user.role === "admin") {
      const admin = await Admin.findOne({ userId: user._id });
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role, username: admin?.email },
        process.env.JWT_SECRET || "your_secret_key"
      );
      res.status(200).json({
        ...response,
        success: true,
        message: "User logged in successfully",
        data: {
          token,
          user: {
            name: admin?.name,
            username,
            email: username,
            role: user.role,
          },
        },
      });
    } else if (user.role === "hr") {
      const hr = await HR.findOne({ userId: user._id });
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role, username: hr?.email },
        process.env.JWT_SECRET as string
      );
      const company = await Company.findOne({ _id: hr?.companyId });
      res.status(200).json({
        ...response,
        success: true,
        message: "User logged in successfully",
        data: {
          token,
          user: {
            name: hr?.name,
            email: hr?.email,
            companyName: company?.name,
            username,
            role: user.role,
          },
        },
      });
    }
  } catch (err: Error | any | null) {
    res.status(500).json({ ...response, error: err.message });
  }
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(400)
      .json({ ...response, error: "Authorization token is required." });
  }
  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_secret_key"
    );
    if (!decoded) {
      return res.status(400).json({ ...response, error: "Invalid token." });
    }
    const { id, role, username } = decoded;
    if (role === "student") {
      const student = await Student.findOne({ _id: username });
      if (!student) {
        return res
          .status(404)
          .json({ ...response, error: "Student not found." });
      }
      res.status(200).json({
        ...response,
        success: true,
        data: {
          user: {
            name: student.name,
            regd_no: student._id,
            branch: student.branch,
            section: student.section,
            email: student.email,
            role,
          },
        },
      });
    } else if (role === "admin") {
      const admin = await Admin.findOne({ email: username });
      if (!admin) {
        return res.status(404).json({ ...response, error: "Admin not found." });
      }
      res.status(200).json({
        ...response,
        success: true,
        data: {
          user: {
            name: admin.name,
            username,
            email: username,
            role,
          },
        },
      });
    } else if (role === "hr") {
      const hr = await HR.findOne({ email: username });
      if (!hr) {
        return res.status(404).json({ ...response, error: "HR not found." });
      }
      const company = await Company.findOne({ _id: hr.companyId });
      res.status(200).json({
        ...response,
        success: true,
        data: {
          user: {
            name: hr.name,
            email: hr.email,
            companyName: company?.name,
            username,
            role,
          },
        },
      });
    }
  } catch (err: Error | any | null) {
    res.status(500).json({ ...response, error: err.message });
  }
};
