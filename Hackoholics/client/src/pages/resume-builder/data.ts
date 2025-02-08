export const initialResumeData = {
  name: "",
  contact: {
    email: "",
    phone: "",
    linkedin: "",
  },
  summary: "",
  education: [{ degree: "", institution: "", year: "" }],
  experience: [{ title: "", company: "", years: "", description: "" }],
  skills: [], // Adjusted to match the updated skills structure
  publications: [],
  projects: [],
  additionalInfo: [],
};


export interface ResumeData {
  name: string; // Full name of the person
  contact: {
    email: string;  // Email address
    phone: string;  // Phone number
    linkedin: string;  // LinkedIn profile URL
  };
  summary: string; // A brief summary about the person
  education: {
    degree: string; // Degree obtained (e.g., "BS in Computer Science")
    institution: string; // Institution name (e.g., "University of Pennsylvania")
    year: string; // Duration of study or graduation year (e.g., "2000 - 2005")
  }[];  // Array for multiple education entries
  experience: {
    title: string; // Job title (e.g., "Software Engineer")
    company: string; // Company name (e.g., "Apple")
    years: string; // Duration of employment (e.g., "June 2005 – Aug 2007")
    description: string; // Responsibilities or achievements
  }[];  // Array for multiple experience entries
  skills: string[];  // List of skills with optional proficiency
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
  additionalInfo?: {  // Optional section for additional information
    title: string; // Title for the additional section (e.g., "Awards")
    content: string; // Content of the additional section (e.g., "Best Developer Award 2023")
  }[];  // Array for multiple additional info
  [key: string]: any; // Allow additional dynamic properties
}


export const dummyData: ResumeData = {
  name: "John Doe",
  contact: {
    email: "johndoe@example.com",
    phone: "+1-555-555-5555",
    linkedin: "https://linkedin.com/in/johndoe"
  },
  summary: "Experienced software engineer with a focus on web development.",
  education: [
    {
      degree: "BS in Computer Science",
      institution: "University of Example",
      year: "2005-2009"
    }
  ],
  experience: [
    {
      title: "Software Engineer",
      company: "TechCompany",
      years: "2010-2015",
      description: "Worked on various web development projects."
    },
    {
      title: "Senior Developer",
      company: "OtherCompany",
      years: "2015-Present",
      description: "Leading a team of engineers in developing new products."
    }
  ],
  skills: ["JavaScript", "React", "Node.js"],
  publications: [
    {
      title: "3D Finite Element Analysis of No-Insulation Coils",
      authors: ["John Doe", "Samwise Gamgee"],
      link: "https://doi.org/10.1109/TASC.2023.3340648"
    }
  ],
  projects: [
    {
      name: "Multi-User Drawing Tool",
      link: "https://github.com/johndoe/multi-user-drawing-tool",
      description: "Developed an electronic classroom where multiple users can simultaneously view and draw on a 'chalkboard'."
    },
    {
      name: "Synchronized Desktop Calendar",
      link: "https://github.com/johndoe/synchronized-desktop-calendar",
      description: "Created a desktop calendar with globally shared and synchronized calendars, allowing users to schedule meetings."
    }
  ]
};

export default initialResumeData;