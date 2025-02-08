import { Request, Response } from "express";
import Contest from "../models/contest/Contest";
import jwt from "jsonwebtoken";

export const joinContest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const studentId = decoded.username;
    const { contestId } = req.body;

    if (!contestId || !studentId) {
      return res
        .status(400)
        .json({ message: "Contest ID and Student ID are required" });
    }

    const contest = await Contest.findById(contestId);

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    if (contest.participants.includes(studentId)) {
      return res
        .status(400)
        .json({ message: "Student already joined the contest" });
    }

    contest.participants.push(studentId);
    await contest.save();

    res
      .status(200)
      .json({ message: "Student joined the contest successfully", contest });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getContests = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    console.log("getContests received");
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("Unauthorized");
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
        console.log("Invalid token: ", token)
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    const contests = await Contest.find();
    console.log("contests", contests);
    res.status(200).json({ success: true, data: contests });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const getContest = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const contestId = req.params.id;
    if (!contestId) {
      return res.status(400).json({ message: "Contest ID is required" });
    }
    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }
    res.status(200).json({ contest });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createContest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const { name, description, timeLimit } = req.body;
    if (!name || !timeLimit) {
      return res
        .status(400)
        .json({ message: "Name and Time Limit are required" });
    }
    const contest = new Contest({
      name,
      description,
      timeLimit,
    });
    await contest.save();
    res.status(200).json({ message: "Contest created successfully", contest });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateContest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const { contestId } = req.body;
    const { name, description, timeLimit } = req.body;
    if (!contestId) {
      return res.status(400).json({ message: "Contest ID is required" });
    }
    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }
    contest.name = name || contest.name;
    contest.description = description || contest.description;
    contest.timeLimit = timeLimit || contest.timeLimit;
    await contest.save();
    res.status(200).json({ message: "Contest updated successfully", contest });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteContest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const { contestId } = req.body;
    if (!contestId) {
      return res.status(400).json({ message: "Contest ID is required" });
    }
    const contest = await Contest.findByIdAndDelete(contestId);
    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }
    res.status(200).json({ message: "Contest deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getContestParticipants = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const contestId = req.params.id;
    if (!contestId) {
      return res.status(400).json({ message: "Contest ID is required" });
    }
    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }
    res.status(200).json({ participants: contest.participants });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getContestResults = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const contestId = req.params.id;
    if (!contestId) {
      return res.status(400).json({ message: "Contest ID is required" });
    }
    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }
    const results = contest.participants.map((studentId: string) => ({
      studentId,
      score: Math.floor(Math.random() * 100), // fix later
    }));
    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
