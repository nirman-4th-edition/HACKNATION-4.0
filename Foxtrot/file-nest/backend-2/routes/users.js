import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AuthCheck } from "../middlewares/AuthCheck.js";
import dotenv from "dotenv";
import { userModel } from "../db/db.js";
import { tokenVerify } from "../middlewares/tokenVerify.js";

dotenv.config();
const userRouter = Router();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

userRouter.post("/signup", AuthCheck, async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const foundUser = await userModel.findOne({
      email: email,
    });

    if (foundUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // password Hashing
    const hashedPassword = await bcrypt.hash(password, 7);

    const user = await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    console.log("Signed up: " + user.id);

    return res.status(201).json({
      message: "Account Created",
      data: {
        email,
        firstName,
        lastName,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

userRouter.post("/signin", AuthCheck, async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await userModel.findOne({
      email: email,
    });

    if (!foundUser) {
      return res.json({
        message: "Wrong Credentials",
        Error: "User Not Found Try SignUp",
      });
    }

    // Password Check
    const passwordCheck = await bcrypt.compare(password, foundUser.password);
    const uid = foundUser._id;
    console.log("Signed in: " + uid);

    if (!passwordCheck) {
      return res.status(401).json({
        message: "Password Doesn't Match",
        error: "Wrong Password ",
      });
    }

    // Token generation
    const token = jwt.sign(
      {
        firstName: foundUser.firstName,
        uid: uid,
      },
      JWT_SECRET_KEY
    );

    return res.status(200).json({
      message: "Successfully Signed In  Account",
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error Generating the token",
      error: error.message,
    });
  }
});

userRouter.get("/name", tokenVerify, async (req, res) => {
  try {
    return res.json({
      username: req.name,
    });
  } catch (error) {
    return res.json({
      message: "Error Fetching Name",
      error: error.message,
    });
  }
});

export { userRouter };
