import latex from "node-latex";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ResumeData } from "../types/collections";
import { Request, Response } from "express";
import Resume from "../models/Resume";
import jwt from "jsonwebtoken";
import Student from "../models/Student";

function fillTemplate(template: string, data: ResumeData): string {
  let filledTemplate = template;

  // Replace placeholders with data from the ResumeData
  filledTemplate = filledTemplate.replace("{{name}}", data.name);
  filledTemplate = filledTemplate.replace("{{contact.email}}", data.contact.email);
  filledTemplate = filledTemplate.replace("{{contact.phone}}", data.contact.phone);
  filledTemplate = filledTemplate.replace("{{contact.linkedin}}", data.contact.linkedin);
  filledTemplate = filledTemplate.replace("{{summary}}", data.summary);



  // Replace Education data
  let educationStr = "";
  data.education.forEach((edu) => {
    educationStr += `
      \\begin{twocolentry}{${edu.year}}
        \\textbf{${edu.degree}}, ${edu.institution}
      \\end{twocolentry}
    `;
  });
  if(data.education.length !== 0){
    filledTemplate = filledTemplate.replace("{{education1}}", "\\section*{Education}"+educationStr).replace("{{/education}}", "");
  }
  else{
    filledTemplate = filledTemplate.replace("{{education1}}", "").replace("{{/education}}", "");
  }

  // Replace Experience data
  let experienceStr = "";
  data.experience.forEach((exp) => {
    experienceStr += `
      \\begin{twocolentry}{${exp.years}}
        \\textbf{${exp.title}}, ${exp.company}
      \\end{twocolentry}
      \\begin{onecolentry}
        ${exp.description}
      \\end{onecolentry}
      \\vspace{0.3 cm}
    `;
  });
  if(data.experience.length !== 0) {
    filledTemplate = filledTemplate.replace("{{experience1}}", "\\section*{Experience}"+experienceStr).replace("{{/experience}}", "");
  }
  else{
    filledTemplate = filledTemplate.replace("{{experience1}}", "").replace("{{/experience}}", "");
  }

  // Replace Skills data
  let skillsStr = data.skills.map(skill => `\\item \\textbf {${skill}} \\`).join(" ");
  if(data.skills.length !== 0) {
    filledTemplate = filledTemplate.replace("{{skills1}}", skillsStr ).replace("{{/skills}}", "");
  }
  else{
    filledTemplate = filledTemplate.replace("{{skills1}}", "").replace("{{/skills}}", "");
  }
  
  // Replace Publications data
  let publicationStr = "";
  data.publications?.forEach((pub) => {
    publicationStr += `
      \\textbf{${pub.title}} \\newline
      Authors: ${pub.authors.join(", ")} \\
      ${pub.link ? `\\href{${pub.link}}{View Publication}` : ""} 
      \\vspace{0.3 cm}
    `;
  });
  if( data.publications?.length !== 0){
    filledTemplate = filledTemplate.replace("{{publications1}}", "\\section*{Publications}"+publicationStr).replace("{{/publications}}", "");
  }
  else{
    filledTemplate = filledTemplate.replace("{{publications1}}", "").replace("{{/publications}}", "");
  }

  // Replace Projects data
  let projectsStr = "";
  data.projects?.forEach((proj) => {
    projectsStr += `
      \\textbf{${proj.name}} \\newline
      ${proj.description} \\
      \\href{${proj.link}}{Project Link}
      \\vspace{0.3 cm}
    `;
  });
  if(data.projects?.length !== 0){
    filledTemplate = filledTemplate.replace("{{projects1}}", "\\section*{Projects}"+projectsStr).replace("{{/projects}}", "");
  }
  else{
    filledTemplate = filledTemplate.replace("{{projects1}}", "").replace("{{/projects}}", "");
  }

  // Replace Additional Info data
  let additionalInfoStr = "";
  data.additionalInfo?.forEach((info: { title: string; content: string }) => {
    additionalInfoStr += `
      \\textbf{${info.title}} \\
      ${info.content} \\
      \\vspace{0.3 cm}
    `;
  });
  filledTemplate = filledTemplate.replace("{{additionalInfo1}}", additionalInfoStr).replace("{{/additionalInfo}}", "");

  return filledTemplate;
}

async function save(data: ResumeData, token: string): Promise<void> {
  console.log("Saving resume data:", data);
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      throw new Error("Invalid token");
    }
    data.studentId = decoded?.username;
    const resume = await Resume.findOne({ studentId: data.studentId });
    if (resume) {
      await Resume.findOneAndUpdate({ studentId: data.studentId }, {resume: data}, { new: true });
    } else {
      const newResume = new Resume({resume: data});
      const savedResume = await newResume.save();
      const resumeId = savedResume._id;
      await Student.findOneAndUpdate({ _id: data.studentId }, { resumeId });
    }
    console.log('saved');
  } catch (err) {
    console.error("Error saving resume:", err);
    throw new Error("Failed to save resume");
  }
}

export const getResume = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("Unauthorized");
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      return res.status(401).send("Unauthorized");
    }
    const studentId = decoded.username;
    const resume = await Resume.findOne({ studentId });
    if (!resume) {
      return res.status(404).send("Resume not found");
    }
    res.status(200).json({ resume: resume.resume });
  } catch (err) {
    console.error("Error fetching resume:", err);
    res.status(500).send("Failed to fetch resume");
  }
}

export const saveResume = async (req: Request, res: Response): Promise<any> => {
  try {
    const resumeData = req.body.resumeData;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    await save(resumeData, token);
  } catch(err) {
    console.error(err);
  }
}

export const generatePdf = async (req: Request, res: Response): Promise<any> => {
  const resumeData = req.body.resumeData;
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
      return res.status(401).send("Unauthorized");
    }
    // await save(resumeData, token);

    const templatePath = path.join(__dirname, "../utils/templates/t1.tex");
    const template = fs.readFileSync(templatePath, "utf8");
    const latexCode = fillTemplate(template, resumeData);
    const pdfStream = latex(latexCode);
    res.setHeader("Content-Type", "application/pdf");

    pdfStream.pipe(res);

    pdfStream.on("error", (err) => {
      console.error("Error generating PDF:", err);
      res.status(500).send("Failed to generate PDF");
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).send("Unexpected error occurred");
  }
};
