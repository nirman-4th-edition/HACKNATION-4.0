import mongoose, { Document, mongo } from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
  role: "admin" | "hr" | "student";
}
interface IStudent extends Document {
  userId: string;
  name: string;
  email: string;
  section: string;
  branch: string;
  admissionYear: number;
  feedback: mongoose.Types.ObjectId[];
  companies: mongoose.Types.ObjectId[];
  placedAt: mongoose.Types.ObjectId[];
  completedCompanies: mongoose.Types.ObjectId[];
}

interface IHR extends Document {
  userId: string;
  companyId: mongoose.Types.ObjectId;
  name: string;
  email: string;
}

interface ICompany extends Document {
  name: string;
  hr: mongoose.Types.ObjectId[];
  shortlistedStudents: string[];
  selectedStudents: string[];
  completedStudents: string[];
  tags: string[];
}

interface IFeedback extends Document {
  studentId: string;
  companyName: string;
  type: "pi" | "gd" | "training";
  rating: number;
  comment: string;
}

interface IAdmin extends Document {
  userId: string;
  name: string;
  email: string;
}

interface ResumeData {
  name: string; // Name of the person
  contact: {
    email: string; // Email address
    phone: string; // Phone number
    linkedin: string; // LinkedIn profile URL
  };
  summary: string; // A brief summary about the person
  education: {
    degree: string; // Degree obtained (e.g., "BS in Computer Science")
    institution: string; // Institution name (e.g., "University of Pennsylvania")
    year: string; // Year of study or graduation (e.g., "2000 - 2005")
  }[];
  experience: {
    title: string; // Job title (e.g., "Software Engineer")
    company: string; // Company name (e.g., "Apple")
    years: string; // Duration of employment (e.g., "June 2005 – Aug 2007")
    description: string; // Responsibilities or achievements
  }[];
  skills: string[]; // List of skills (e.g., ["JavaScript", "React", "Node.js"])
  publications?: {
    title: string; // Title of the publication
    authors: string[]; // List of authors (e.g., ["John Doe", "Samwise Gamgee"])
    link?: string; // Optional link to the publication
  }[]; // Optional section for publications
  projects?: {
    name: string; // Project name
    link: string; // URL to the project (e.g., GitHub repository)
    description: string; // Brief description of the project
  }[]; // Optional section for projects
  [key: string]: any; // Allow additional dynamic properties
}

interface Contest {
  name: string;
  description: string;
  timeLimit: Number;
  participants: string[];
  maxParticipants: Number;
  status: "upcoming" | "ongoing" | "completed";
}

interface Result {
  contestId: mongoose.Types.ObjectId;
  studentId: string;
  score: number;
  position: number;
}

export type { IUser, IStudent, IHR, ICompany, IFeedback, IAdmin, ResumeData, Contest, Result };