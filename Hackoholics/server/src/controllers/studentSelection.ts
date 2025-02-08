import { Request, Response } from "express";
import Company from "../models/Company";
import Student from "../models/Student";
import mongoose, { mongo } from "mongoose";
import jwt from "jsonwebtoken";
import HR from "../models/HR";
import { hr } from "./details";

export const addShortlistStudent = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { studentIds, companyName } = req.body;
  if (!studentIds || !companyName) {
    return res
      .status(400)
      .json({ message: "Student IDs and Company name are required" });
  }

  try {
    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const students = await Student.find({ _id: { $in: studentIds } });
    if (students.length !== studentIds.length) {
      return res
        .status(404)
        .json({ message: "One or more students not found" });
    }

    // Use $addToSet to avoid duplicates
    company.shortlistedStudents = [
      ...new Set([...company.shortlistedStudents, ...studentIds]),
    ];
    await company.save();

    // Update each student's companies field without deleting previous companies
    await Promise.all(
      students.map((student) => {
        student.companies = [
          ...new Set([
            ...student.companies,
            company._id as mongoose.Types.ObjectId,
          ]),
        ];
        return student.save();
      })
    );

    return res
      .status(200)
      .json({ success: true, message: "Students shortlisted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const removeShortlistStudent = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { studentIds, companyName } = req.body;

  if (!studentIds || !companyName) {
    return res
      .status(400)
      .json({ message: "Student IDs and Company name are required" });
  }

  try {
    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const students = await Student.find({ _id: { $in: studentIds } });
    if (students.length !== studentIds.length) {
      return res
        .status(404)
        .json({ message: "One or more students not found" });
    }

    // Remove the company ID from the students' companies field
    await Promise.all(
      students.map((student) => {
        student.companies = student.companies.filter(
          (companyId) =>
            !(companyId as mongoose.Types.ObjectId).equals(
              company._id as mongoose.Types.ObjectId
            )
        );
        return student.save();
      })
    );

    // Remove the student IDs from the company's shortlistedStudents field
    company.shortlistedStudents = company.shortlistedStudents.filter(
      (studentId) => !studentIds.includes(studentId)
    );
    await company.save();

    return res.status(200).json({
      success: true,
      message: "Students removed from shortlist successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const addSelectedStudent = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { studentIds, companyName } = req.body;
  if (!studentIds || !companyName) {
    return res
      .status(400)
      .json({ message: "Student IDs and Company name are required" });
  }
  try {
    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const students = await Student.find({ _id: { $in: studentIds } });
    if (students.length !== studentIds.length) {
      return res
        .status(404)
        .json({ message: "One or more students not found" });
    }
    // Use $addToSet to avoid duplicates
    company.selectedStudents = [
      ...new Set([...company.selectedStudents, ...studentIds]),
    ];

    await company.save();
    // Update each student's placedAt field without deleting previous companies

    await Promise.all(
      students.map((student) => {
        student.placedAt = [
          ...new Set([
            ...student.placedAt,
            company._id as mongoose.Types.ObjectId,
          ]),
        ];
        return student.save();
      })
    );
    return res
      .status(200)
      .json({ success: true, message: "Students selected successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const removeSelectedStudent = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { studentIds, companyName } = req.body;
  if (!studentIds || !companyName) {
    return res
      .status(400)
      .json({ message: "Student IDs and Company name are required" });
  }
  try {
    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const students = await Student.find({ _id: { $in: studentIds } });
    if (students.length !== studentIds.length) {
      return res
        .status(404)
        .json({ message: "One or more students not found" });
    }
    // Remove the company ID from the students' placedAt field
    await Promise.all(
      students.map((student) => {
        student.placedAt = student.placedAt.filter(
          (companyId) =>
            !(companyId as mongoose.Types.ObjectId).equals(
              company._id as mongoose.Types.ObjectId
            )
        );
        return student.save();
      })
    );
    // Remove the student IDs from the company's selectedStudents field
    company.selectedStudents = company.selectedStudents.filter(
      (studentId) => !studentIds.includes(studentId)
    );
    await company.save();
    return res.status(200).json({
      success: true,
      message: "Students removed from selection successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getSelectedStudents = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { companyName } = req.body;
  if (!companyName) {
    return res.status(400).json({ message: "Company name is required" });
  }
  try {
    const company = await Company.findOne({ name: companyName }).populate(
      "selectedStudents"
    );
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const students = await Student.find({
      _id: { $in: company.selectedStudents },
    }).select("-placedAt -companies -userId -feedback");
    return res
      .status(200)
      .json({ success: true, data: students, message: "Students found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getShortlistedStudents = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { companyName } = req.body;
  if (!companyName) {
    return res.status(400).json({ message: "Company name is required" });
  }
  try {
    const company = await Company.findOne({ name: companyName }).populate(
      "shortlistedStudents"
    );
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const students = await Student.find({
      _id: { $in: company.shortlistedStudents },
    }).select("-placedAt -companies -userId -feedback");

    return res
      .status(200)
      .json({ success: true, data: students, message: "Students found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const students = async (req: Request, res: Response): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Authorization token is required" });
  }
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
  const { username } = decoded;
  try {
    const hr = await HR.findOne({ email: username });
    if (!hr) {
      return res.status(404).json({ message: "HR not found" });
    }
    const company = await Company.findOne({ hr: hr._id }).populate({
      path: "selectedStudents shortlistedStudents completedStudents",
      select:
        "-userId -section -feedback -companies -placedAt -createdAt -updatedAt -completedCompanies",
    });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const companyData = {
      selectedStudents: company.selectedStudents,
      shortlistedStudents: company.shortlistedStudents,
      completedStudents: company.completedStudents,
    };
    return res
      .status(200)
      .json({ success: true, data: companyData, message: "Students found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const addCompletedStudent = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { studentIds, companyName } = req.body;
  if (!studentIds || !companyName) {
    return res
      .status(400)
      .json({ message: "Student IDs and Company name are required" });
  }
  try {
    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const students = await Student.find({ _id: { $in: studentIds } });
    if (students.length !== studentIds.length) {
      return res
        .status(404)
        .json({ message: "One or more students not found" });
    }
    // Use $addToSet to avoid duplicates
    company.completedStudents = [
      ...new Set([...company.completedStudents, ...studentIds]),
    ];

    await company.save();
    // Update each student's completedCompanies field without deleting previous companies

    await Promise.all(
      students.map((student) => {
        student.completedCompanies = [
          ...new Set([
            ...student.completedCompanies,
            company._id as mongoose.Types.ObjectId,
          ]),
        ];
        return student.save();
      })
    );
    return res
      .status(200)
      .json({ success: true, message: "Students completed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateShortlistStudent = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { studentIds } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  const decoded: any = jwt.verify(
    token as string,
    process.env.JWT_SECRET as string
  );
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = decoded.id;
  const hr = await HR.findOne({ userId: userId });
  if (!hr) {
    return res.status(404).json({ message: "HR not found" });
  }
  const company = await Company.findOne({ hr: { $in: [hr._id] } });
  const companyName = company?.name;
  if (!studentIds || !companyName) {
    return res
      .status(400)
      .json({ message: "Student IDs and Company name are required" });
  }

  try {
    const newStudents = await Student.find({ _id: { $in: studentIds } });
    if (newStudents.length !== studentIds.length) {
      return res
        .status(404)
        .json({ message: "One or more students not found" });
    }

    // Find previous students who had the company ID in their companies field
    const previousStudents = await Student.find({
      _id: { $in: company.shortlistedStudents },
    });
    // Remove the company ID from the previous students' companies field
    await Promise.all(
      previousStudents.map((student) => {
        student.companies = student.companies.filter(
          (companyId) =>
            !(companyId as mongoose.Types.ObjectId).equals(
              company._id as mongoose.Types.ObjectId
            )
        );
        return student.save();
      })
    );
    // Add the company ID to the new students' companies field using $addToSet to avoid duplicates
    await Promise.all(
      newStudents.map((student) => {
        return Student.updateOne(
          { _id: student._id },
          { $addToSet: { companies: company._id as mongoose.Types.ObjectId } }
        );
      })
    );

    // Update the company's shortlistedStudents field
    company.shortlistedStudents = studentIds;
    await company.save();

    return res
      .status(200)
      .json({ success: true, message: "Students shortlisted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateCompletedStudent = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { studentIds } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  const decoded: any = jwt.verify(
    token as string,
    process.env.JWT_SECRET as string
  );
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = decoded.id;
  const hr = await HR.findOne({ userId: userId });
  if (!hr) {
    return res.status(404).json({ message: "HR not found" });
  }
  const company = await Company.findOne({ hr: { $in: [hr._id] } });
  const companyName = company?.name;
  if (!studentIds || !companyName) {
    return res
      .status(400)
      .json({ message: "Student IDs and Company name are required" });
  }

  try {
    const newStudents = await Student.find({ _id: { $in: studentIds } });
    if (newStudents.length !== studentIds.length) {
      return res
        .status(404)
        .json({ message: "One or more students not found" });
    }
    // Find previous students who had the company ID in their completedCompanies field
    const previousStudents = await Student.find({
      _id: { $in: company.completedStudents },
    });
    // Remove the company ID from the previous students' completedCompanies field
    await Promise.all(
      previousStudents.map((student) => {
        student.completedCompanies = student.completedCompanies.filter(
          (companyId) =>
            !(companyId as mongoose.Types.ObjectId).equals(
              company._id as mongoose.Types.ObjectId
            )
        );
        return student.save();
      })
    );
    // Add the company ID to the new students' completedCompanies field
    await Promise.all(
      newStudents.map((student) => {
        return Student.updateOne(
          { _id: student._id },
          { $addToSet: { completedCompanies: company._id as mongoose.Types.ObjectId } }
        );
      })
    );

    // Update the company's completedStudents field
    company.completedStudents = studentIds;
    await company.save();

    return res
      .status(200)
      .json({ success: true, message: "Students completed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateSelectedStudent = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { studentIds } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  const decoded: any = jwt.verify(
    token as string,
    process.env.JWT_SECRET as string
  );
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = decoded.id;
  const hr = await HR.findOne({ userId: userId });
  if (!hr) {
    return res.status(404).json({ message: "HR not found" });
  }
  const company = await Company.findOne({ hr: { $in: [hr._id] } });
  const companyName = company?.name;
  if (!studentIds || !companyName) {
    return res
      .status(400)
      .json({ message: "Student IDs and Company name are required" });
  }

  try {
    const newStudents = await Student.find({ _id: { $in: studentIds } });
    if (newStudents.length !== studentIds.length) {
      return res
        .status(404)
        .json({ message: "One or more students not found" });
    }

    // Find previous students who had the company ID in their placedAt field
    const previousStudents = await Student.find({
      _id: { $in: company.selectedStudents },
    });
    // Remove the company ID from the previous students' placedAt field
    await Promise.all(
      previousStudents.map((student) => {
        student.placedAt = student.placedAt.filter(
          (companyId) =>
            !(companyId as mongoose.Types.ObjectId).equals(
              company._id as mongoose.Types.ObjectId
            )
        );
        return student.save();
      })
    );
    // Add the company ID to the new students' placedAt field
    await Promise.all(
      newStudents.map((student) => {
        return Student.updateOne(
          { _id: student._id },
          { $addToSet: { placedAt: company._id as mongoose.Types.ObjectId } }
        );
      })
    );

    // Update the company's selectedStudents field
    company.selectedStudents = studentIds;
    await company.save();

    return res
      .status(200)
      .json({ success: true, message: "Students selected successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const removeCompletedStudent = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { studentIds, companyName } = req.body;
  if (!studentIds || !companyName) {
    return res
      .status(400)
      .json({ message: "Student IDs and Company name are required" });
  }
  try {
    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const students = await Student.find({ _id: { $in: studentIds } });
    if (students.length !== studentIds.length) {
      return res
        .status(404)
        .json({ message: "One or more students not found" });
    }
    // Remove the company ID from the students' completedCompanies field
    await Promise.all(
      students.map((student) => {
        student.completedCompanies = student.completedCompanies.filter(
          (companyId) =>
            !(companyId as mongoose.Types.ObjectId).equals(
              company._id as mongoose.Types.ObjectId
            )
        );
        return student.save();
      })
    );
    // Remove the student IDs from the company's completedStudents field
    company.completedStudents = company.completedStudents.filter(
      (studentId) => !studentIds.includes(studentId)
    );
    await company.save();
    return res.status(200).json({
      success: true,
      message: "Students removed from completed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};
