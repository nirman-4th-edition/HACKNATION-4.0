import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

async function tokenVerify(req, res, next) {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    if (decoded) {
      req.uid = decoded.uid;
      req.name = decoded.firstName;
      next();
    } else {
      return res.status(401).json({
        message: "Invalid Token",
        error: "Un-Authorized Access Blocked",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: "Token Verification Error",
    });
  }
}

export { tokenVerify };
