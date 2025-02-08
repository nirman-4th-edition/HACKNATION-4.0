import { imageMetaModel } from "../db/db.js";
import { Router } from "express";
import { tokenVerify } from "../middlewares/tokenVerify.js";

const filesRouter = Router();

// Get all subject List
filesRouter.get("/subjects/list", tokenVerify, async (req, res) => {
  try {
    // group all images of same subjects
    const distinctSubjects = await imageMetaModel.aggregate([
      {
        $group: {
          _id: "$dir.Subject",
        },
      },
      {
        $sort: { _id: 1 }, // Sort alphabetically
      },
    ]);

    // converting it into an array
    const subjectsArray = distinctSubjects.map((item) => item._id);

    res.status(200).json({
      totalSubjects: subjectsArray.length,
      subjects: subjectsArray,
    });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all chapters List of the Subject
filesRouter.get("/chapters/list", tokenVerify, async (req, res) => {
  try {
    const { subject } = req.query;

    if (!subject) {
      return res.status(400).json({ error: "Subject is required" });
    }

    const distinctChapters = await imageMetaModel.aggregate([
      { $match: { "dir.Subject": subject } },
      { $group: { _id: "$dir.Chapter" } },
      { $sort: { _id: 1 } },
    ]);

    // converting it to array
    const chapterArray = distinctChapters.map((item) => item._id);

    res.json({
      subject,
      chapterCount: chapterArray.length,
      chapters: chapterArray,
    });
  } catch (error) {
    console.error("Error fetching chapters:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all files given chapter and subject
filesRouter.get("/specific", tokenVerify, async (req, res) => {
  try {
    const { subject, chapter } = req.query;

    if (!subject || !chapter) {
      return res
        .status(400)
        .json({ error: "Subject and Chapter are required" });
    }

    const files = await imageMetaModel.find({
      "dir.Subject": subject,
      "dir.Chapter": chapter,
    });

    res.json({
      subject,
      chapter,
      fileCount: files.length,
      files,
    });
  } catch (error) {
    console.error("Error fetching files by subject and chapter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get All files (includes all chapters) given subject
filesRouter.get("/subject/all", tokenVerify, async (req, res) => {
  try {
    const { subject } = req.query;

    if (!subject) {
      return res.status(400).json({ error: "Subject is required" });
    }

    // Find all files matching the subject
    const files = await imageMetaModel.find({ "dir.Subject": subject });

    res.json({
      subject,
      fileCount: files.length,
      files,
    });
  } catch (error) {
    console.error("Error fetching files by subject:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { filesRouter };
