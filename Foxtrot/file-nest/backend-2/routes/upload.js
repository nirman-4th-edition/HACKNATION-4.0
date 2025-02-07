// import { Router } from "express";
// import multer from "multer";
// import { GridFsStorage } from "multer-gridfs-storage";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// const uploadRouter = Router();

// // Setup MongoDB GridFS storage
// const storage = new GridFsStorage({
//   url: process.env.MONGO_URL,
//   options: { useUnifiedTopology: true },
//   file: (req, file) => {
//     console.log(file);
//     return new Promise((resolve, reject) => {
//       resolve({
//         filename: `${Date.now()}-${file.originalname}`,
//         bucketName: "uploads", // Ensure this matches your MongoDB GridFS collection
//       });
//     });
//   },
// });

// const upload = multer({ storage });

// // Upload route
// uploadRouter.post("/", upload.single("file"), (req, res) => {
//   if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//   res.json({ fileUrl: `/files/${req.file.filename}` });
// });

// export { uploadRouter };

// Cloudinary =============================================================
import { Router } from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinary.js";
import { tokenVerify } from "../middlewares/tokenVerify.js";

const uploadRouter = Router();

// Setup Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // Cloudinary folder name
    public_id: (req, file) => file.originalname.split(".")[0], // Use filename without extension
    allowed_formats: ["jpg", "jpeg", "png", "pdf"], // Allowed formats
  },
});

const upload = multer({ storage });

// Upload route
uploadRouter.post("/", tokenVerify, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.json({ fileUrl: req.file.path }); // Returns a url URL
});

export { uploadRouter };
