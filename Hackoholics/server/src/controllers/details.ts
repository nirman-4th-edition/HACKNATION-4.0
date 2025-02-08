import { Request, Response } from "express";
import { response } from "../types/response";
import Student from "../models/Student";
import HR from "../models/HR";
import Company from "../models/Company";
import Feedback from "../models/Feedback";
import jwt from "jsonwebtoken";

//Called by only admin
export const students = async (req: Request, res: Response): Promise<any> => {
  try {
    const students = await Student.find();

    if (!students || students.length === 0) {
      return res.status(404).json({ ...response, error: "No students found" });
    }
    const studentsData = students.map((student) => {
      const { userId, ...studentData } = student.toObject();
      return studentData;
    });

    return res.status(200).json({
      ...response,
      success: true,
      data: {studentsData},
      message: "Successfully fetched students",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ...response, error: "Internal Server Error" });
  }
};

//Called by HR and admin
export const student = async (req: Request, res: Response): Promise<any> => {
  try {
    const { regd_no, token } = req.body;    
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!regd_no || !decoded) {
      return res
        .status(400)
        .json({ ...response, error: "All fields are required" });
    }

    const student = await Student.findOne({ _id: regd_no });

    if (!student) {
      return res.status(400).json({ ...response, error: "Student not found" });
    }

    if (decoded.role === "admin") {
      const { userId, ...studentData } = student.toObject();
      return res.status(200).json({
        ...response,
        success: true,
        data: studentData,
        message: "Student found",
      });
    } else if (decoded.role === "hr") {
      const { userId, feedback, companies, placedAt, ...studentData } =
        student.toObject();
      return res.status(200).json({
        ...response,
        success: true,
        data: studentData,
        message: "Student found",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ...response, error: "Internal Server Error" });
  }
};

//Called only by Admin
export const companies = async (req: Request, res: Response): Promise<any> => {
  try {
    const companies = await Company.find(); // To populate or not
    if (!companies || companies.length === 0) {
      return res.status(404).json({ ...response, error: "No companies found" });
    }

    return res.status(200).json({
      ...response,
      success: true,
      data: {companies},
      message: "Successfully fetched companies",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ...response, error: "Internal Server Error" });
  }
};

//Called by Admin, HR and Student
export const company = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, token } = req.body;
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!name || !decoded) {
      return res
        .status(400)
        .json({ ...response, error: "All fields are required" });
    }

    const company = await Company.findOne({ name });
    if (!company) {
      return res.status(404).json({ ...response, error: "Company not found" });
    }

    const hr = await HR.findOne({ _id: company.hr[0] });
    if (!hr) {
      return res.status(404).json({ ...response, error: "HR not found" });
    }

    if (decoded.role === "student") {
      const { shortlistedStudents, selectedStudents,completedStudents, ...companyData } =
        company.toObject();
      if(!shortlistedStudents.includes(decoded.username)){
        return res.status(403).json({ ...response, error: "Access denied" });
      }
      return res.status(200).json({
        ...response,
        success: true,
        data: {
          hrName: hr.name,
          ...companyData,
        },
        message: "Successfully fetched company",
      });
    } else if (decoded.role === "hr" || decoded.role === "admin") {
      return res.status(200).json({
        ...response,
        success: true,
        data: company,
        message: "Successfully fetched company",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ...response, error: "Internal Server Error" });
  }
};

//Called by Admin
export const hrs = async (req: Request, res: Response): Promise<any> => {
  try {
    const hrs = await HR.find().populate({ path: 'companyId', select: 'name' });
    if (!hrs || hrs.length === 0) {
      return res.status(404).json({ ...response, error: "No HRs found" });
    }

    const hrsData = hrs.map((hr) => {
      const { userId, ...hrData } = hr.toObject();
      return hrData;
    });

    return res.status(200).json({
      ...response,
      success: true,
      data: {hrsData},
      message: "Successfully fetched HRs",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ...response, error: "Internal Server Error" });
  }
};

//Called by Admin, HR and Student
export const hr = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id, token } = req.body;
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!id || !decoded) {
      return res
        .status(400)
        .json({ ...response, error: "All fields are required" });
    }

    const hr = await HR.findOne({ _id: id });
    if (!hr) {
      return res.status(404).json({ ...response, error: "HR not found" });
    }

    if (decoded.role === "student") {
      const { userId, companyId, ...hrData } = hr.toObject();
      const company = await Company.findById(companyId);
      if (!company) {
        return res.status(404).json({ ...response, error: "Company not found" });
      }

      if (
        !company.shortlistedStudents.includes(decoded.username) &&
        !company.selectedStudents.includes(decoded.username)
      ) {
        return res.status(403).json({ ...response, error: "Access denied" });
      }
      return res.status(200).json({
        ...response,
        success: true,
        data: hrData,
        message: "Successfully fetched HR",
      });
    } else if (decoded.role === "hr" || decoded.role === "admin") {
      return res.status(200).json({
        ...response,
        success: true,
        data: hr,
        message: "Successfully fetched HR",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ...response, error: "Internal Server Error" });
  }
};

export const getStudentSelections = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if( !token ) {
      return res.status(400).json({ ...response, error: "Unauthorized !" });
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      return res
        .status(400)
        .json({ ...response, error: "All fields are required" });
    }
    const regd_no = decoded.username;
    const student = await Student.findOne({ _id: regd_no });
    if (!student) {
      return res.status(404).json({ ...response, error: "Student not found" });
    }
    
    const companies= await Company.find({ _id: { $in: student.companies } }).populate({ path: 'hr', select: 'name' });
    const completedCompanies = await Company.find({ _id: { $in: student.completedCompanies } }).populate({ path: 'hr', select: 'name' });
    const placedAt = await Company.find({ _id: { $in: student.placedAt } }).populate({ path: 'hr', select: 'name' });

    class CompanyData {
      name: string | undefined;
      tags: string[] | undefined;
      hr: string[] | undefined;
      placed: boolean | undefined;
      completed: boolean | undefined;
    }

    const companyData: CompanyData[] = [];
    companies.forEach((company) => {
      const data = new CompanyData();
      data.name = company.name;
      data.tags = company.tags;
      data.hr = company.hr.map((hr: any) => hr.name);
      data.placed = placedAt.some((placed) => placed.name === company.name);
      data.completed = completedCompanies.some((completed) => completed.name === company.name);
      companyData.push(data);
    }); 

    return res.status(200).json({
      ...response,
      success: true,
      data: {companies: companyData},
      message: "Successfully fetched companies",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ...response, error: "Internal Server Error" });
  }
};