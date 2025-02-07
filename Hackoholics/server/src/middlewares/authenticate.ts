import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { response } from "../types/response";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({
        ...response,
        error: "Authentication Failed ! Token not Found !",
      });
    }

    const decoded: any = jwt.verify(
      token,
      (process.env.JWT_SECRET as string) || "your_secret_key"
    );
    const user = await User.findOne({ _id: decoded.id }); // from token we get the role of the user

    if (!user || user.role !== "admin") {
      return res.status(403).send({ error: "Access denied." });
    }

    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export const isAuthenicated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({
        ...response,
        error: "Authentication Failed ! Token not Found !",
      });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      return res.status(403).send({ error: "Access denied." });
    }
    // req.token = token;
    // req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export const isHr = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({
        ...response,
        error: "Authentication Failed ! Token not Found !",
      });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findOne({ _id: decoded.id });

    if (!user || user.role !== "hr") {
      return res.status(403).send({ error: "Access denied." });
    }
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export const isStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({
        ...response,
        error: "Authentication Failed ! Token not Found !",
      });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findOne({ _id: decoded.id });
    
    if (!user || user.role !== "student") {
      return res.status(403).send({ error: "Access denied." });
    }
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export const isHrOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({
        ...response,
        error: "Authentication Failed ! Token not Found !",
      });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findOne({ _id: decoded.id });

    if (!user || (user.role !== "hr" && user.role !== "admin")) {
      return res.status(403).send({ error: "Access denied." });
    }
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export const isStudentOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({
        ...response,
        error: "Authentication Failed ! Token not Found !",
      });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findOne({ _id: decoded.id });

    if (!user || (user.role !== "student" && user.role !== "admin")) {
      return res.status(403).send({ error: "Access denied." });
    }
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export const isHrOrStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({
        ...response,
        error: "Authentication Failed ! Token not Found !",
      });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findOne({ _id: decoded.id });

    if (!user || (user.role !== "hr" && user.role !== "student")) {
      return res.status(403).send({ error: "Access denied." });
    }
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export const isHrOrStudentOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({
        ...response,
        error: "Authentication Failed ! Token not Found !",
      });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findOne({ _id: decoded.id });

    if (
      !user ||
      (user.role !== "hr" && user.role !== "student" && user.role !== "admin")
    ) {
      return res.status(403).send({ error: "Access denied." });
    }
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};
