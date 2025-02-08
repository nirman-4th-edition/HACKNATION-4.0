import { Request, Response } from "express";
import { response } from "../types/response";
import Student from "../models/Student";
import Company from "../models/Company";
import Feedback from "../models/Feedback";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const addFeedback = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { studentIds, companyName, type, rating, comment } = req.body;
  if (!studentIds || !companyName || !type || !rating || !comment) {
    return res
      .status(400)
      .send({ ...response, error: "All fields are required." });
  }
  try {
    const students = await Student.find({ _id: { $in: studentIds } });
    if (!students.length || students.length !== studentIds.length) {
      return res.status(404).send({ ...response, error: "Student not found." });
    }

    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return res.status(404).send({ ...response, error: "Company not found." });
    }

    const feedback = new Feedback({
      studentId: studentIds,
      companyName,
      type,
      rating,
      comment,
    });

    await feedback.save();

    students.forEach(async (student) => {
      student.feedback.push(feedback._id as mongoose.Types.ObjectId);
      await student.save();
    });

    res.send({
      ...response,
      success: true,
      message: "Feedback added successfully.",
    });
  } catch (error) {
    res.status(500).send({ ...response, error });
  }
};

export const deleteFeedback = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { feedbackId } = req.body;
  if (!feedbackId) {
    return res
      .status(400)
      .send({ ...response, error: "Feedback ID required." });
  }
  try {
    const feedback = await Feedback.findOne({
      _id: feedbackId as mongoose.Types.ObjectId,
    });
    if (!feedback) {
      return res
        .status(404)
        .send({ ...response, error: "Feedback not found." });
    }
    await feedback.deleteOne();
    const student = await Student.findOne({ _id: feedback.studentId });
    if (student) {
      student.feedback = student.feedback.filter(
        (f) => f.toString() !== feedbackId
      );
      await student.save();
    }

    res.send({
      ...response,
      success: true,
      message: "Feedback deleted successfully.",
    });
  } catch (error) {
    res.status(500).send({ ...response, error });
  }
};

export const updateFeedback = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { feedbackId, type, rating, comment } = req.body;
  if (!feedbackId || !type || !rating || !comment) {
    return res
      .status(400)
      .send({ ...response, error: "All fields are required." });
  }
  try {
    const feedback = await Feedback.findOne({
      _id: feedbackId as mongoose.Types.ObjectId,
    });
    if (!feedback) {
      return res
        .status(404)
        .send({ ...response, error: "Feedback not found." });
    }
    feedback.type = type;
    feedback.rating = rating;
    feedback.comment = comment;
    await feedback.save();
    res.send({
      ...response,
      success: true,
      message: "Feedback updated successfully.",
    });
  } catch (error) {
    res.status(500).send({ ...response, error });
  }
};

//Called by Student
export const getFeedbacks = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const student = await Student.findOne({ _id: decoded.username }).populate({
      path: "feedback",
      select: "-studentId", // Exclude the studentId field from the populated feedback documents
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const feedbacksData = student.feedback;

    return res.status(200).json({
      success: true,
      data: feedbacksData,
      message: "Successfully fetched feedback",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ...response, error: "Internal Server Error" });
  }
};

//Called by Admin, HR and Student
export const getFeedback = async (req: Request, res: Response): Promise<any> => {
  try {
    const { feedbackId, company_name, regd_no, token } = req.body;
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (decoded.role === "student" || decoded.role === "admin") {
      if (decoded.role === "student" && decoded.username !== regd_no) {
        return res.status(403).json({ error: "Access denied" });
      }
      if (!regd_no || !company_name) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const feedback = await Feedback.findOne({
        studentId: regd_no,
        companyName: company_name,
      });
      if (!feedback) {
        return res.status(404).json({ error: "Feedback not found" });
      }
      const { studentId, ...feedbackData } = feedback.toObject();
      return res.status(200).json({
        success: true,
        data: feedbackData,
        message: "Successfully fetched feedback",
      });
    } else if (decoded.role === "hr") {
      if (!feedbackId) {
        return res.status(400).json({ error: "All fields are required" });
      }
      
      const feedback = await Feedback.findOne({
        _id: feedbackId as mongoose.Types.ObjectId,
      });
      if (!feedback) {
        return res.status(404).json({ error: "Feedback not found" });
      }
      return res.status(200).json({
        success: true,
        data: feedback,
        message: "Successfully fetched feedback",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
