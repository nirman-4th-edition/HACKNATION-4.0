import React, { useEffect, useState } from "react";
import { ResumeData, dummyData, initialResumeData } from "./data";
import {
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  Linkedin,
  FileText,
  Award,
  BookOpen,
  FolderGit2,
  Download,
  Plus,
  User,
  Trash2,
  Save,
} from "lucide-react";

const ResumeForm: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [latexOutput, setLatexOutput] = useState<React.ReactNode>(null);

  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3030/api/genResume/get", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setResumeData(data.resume);
    };

    fetchResume();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    index?: number,
    subIndex?: number
  ) => {
    const { name, value } = e.target;

    if (field === "contact") {
      setResumeData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [name]: value },
      }));
    } else if (index !== undefined && subIndex !== undefined) {
      setResumeData((prev) => {
        const updatedArray = [...(prev as any)[field]];
        const updatedSubArray = [...updatedArray[index].authors];
        updatedSubArray[subIndex] = value;
        updatedArray[index] = {
          ...updatedArray[index],
          authors: updatedSubArray,
        };
        return { ...prev, [field]: updatedArray };
      });
    } else if (index !== undefined) {
      setResumeData((prev) => {
        const updatedArray = [...(prev as any)[field]];
        updatedArray[index] = { ...updatedArray[index], [name]: value };
        return { ...prev, [field]: updatedArray };
      });
    } else {
      setResumeData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", year: "" }],
    }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { title: "", company: "", years: "", description: "" },
      ],
    }));
  };

  const addSkill = () => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  };

  const addPublication = () => {
    setResumeData((prev) => ({
      ...prev,
      publications: [
        ...(prev.publications || []),
        { title: "", authors: [""], link: "" },
      ],
    }));
  };

  const addAuthor = (index: number) => {
    setResumeData((prev) => {
      const updatedPublications = [...(prev.publications || [])];
      const updatedAuthors = [...updatedPublications[index].authors, ""];
      updatedPublications[index] = {
        ...updatedPublications[index],
        authors: updatedAuthors,
      };
      return { ...prev, publications: updatedPublications };
    });
  };

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        { name: "", description: "", link: "" },
      ],
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const removeSkill = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const removePublication = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      publications: (prev.publications || []).filter((_, i) => i !== index),
    }));
  };

  const removeAuthor = (pubIndex: number, authorIndex: number) => {
    setResumeData((prev) => {
      const updatedPublications = [...(prev.publications || [])];
      const updatedAuthors = updatedPublications[pubIndex].authors.filter(
        (_, i) => i !== authorIndex
      );
      updatedPublications[pubIndex] = {
        ...updatedPublications[pubIndex],
        authors: updatedAuthors,
      };
      return { ...prev, publications: updatedPublications };
    });
  };

  const removeProject = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      projects: (prev.projects || []).filter((_, i) => i !== index),
    }));
  };

  const generatePDF = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3030/api/genResume/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ resumeData }),
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.pdf";
    link.click();
  };

  const saveResume = async () => {
    console.log("saving: ", resumeData);
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3030/api/genResume/save", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ resumeData }),
    });
  };

  const SectionTitle = ({
    icon: Icon,
    title,
  }: {
    icon: React.ElementType;
    title: string;
  }) => (
    <div className="flex items-center gap-2 mb-4 text-gray-800">
      <Icon className="w-5 h-5" />
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            Create Your Own Resume
          </h1>

          {/* Personal Information */}
          <div className="mb-8">
            <SectionTitle icon={User} title="Personal Information" />
            <div className="grid gap-4">
              <div className="flex items-center border rounded-lg p-3 bg-gray-50 input-field">
                <User className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={resumeData.name}
                  onChange={(e) => handleChange(e, "name")}
                  className="bg-transparent w-full focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center border rounded-lg p-3 bg-gray-50 input-field">
                  <Mail className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={resumeData.contact.email}
                    onChange={(e) => handleChange(e, "contact")}
                    className="bg-transparent w-full focus:outline-none"
                  />
                </div>

                <div className="flex items-center border rounded-lg p-3 bg-gray-50 input-field">
                  <Phone className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={resumeData.contact.phone}
                    onChange={(e) => handleChange(e, "contact")}
                    className="bg-transparent w-full focus:outline-none"
                  />
                </div>

                <div className="flex items-center border rounded-lg p-3 bg-gray-50 input-field">
                  <Linkedin className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="text"
                    name="linkedin"
                    placeholder="LinkedIn URL"
                    value={resumeData.contact.linkedin}
                    onChange={(e) => handleChange(e, "contact")}
                    className="bg-transparent w-full focus:outline-none"
                  />
                </div>
              </div>

              <textarea
                name="summary"
                placeholder="Professional Summary"
                value={resumeData.summary}
                onChange={(e) => handleChange(e, "summary")}
                className="w-full border rounded-lg p-3 bg-gray-50 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 input-field"
              />
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <SectionTitle icon={GraduationCap} title="Education" />
            {resumeData.education.map((edu, index) => (
              <div
                key={index}
                className="mb-4 p-4 border rounded-lg bg-gray-50 input-field relative flex flex-col"
              >
                <div className="grid gap-4 flex-grow">
                  <input
                    type="text"
                    name="degree"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleChange(e, "education", index)}
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 input-field"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="institution"
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) => handleChange(e, "education", index)}
                      className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 input-field"
                    />
                    <input
                      type="text"
                      name="year"
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) => handleChange(e, "education", index)}
                      className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 input-field"
                    />
                  </div>
                </div>

                {/* Move Trash Button to Bottom Right */}
                <button
                  onClick={() => removeEducation(index)}
                  className="mt-4 ml-auto text-red-500 hover:text-red-700 flex items-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addEducation}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </button>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <SectionTitle icon={Briefcase} title="Experience" />
            {resumeData.experience.map((exp, index) => (
              <div
                key={index}
                className="mb-4 p-4 border rounded-lg bg-gray-50 input-field relative"
              >
                <div className="grid gap-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={exp.title}
                    onChange={(e) => handleChange(e, "experience", index)}
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 input-field"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => handleChange(e, "experience", index)}
                      className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 input-field"
                    />
                    <input
                      type="text"
                      name="years"
                      placeholder="Years"
                      value={exp.years}
                      onChange={(e) => handleChange(e, "experience", index)}
                      className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 input-field"
                    />
                  </div>
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) => handleChange(e, "experience", index)}
                    className="w-full border rounded p-2 min-h-[190px] focus:outline-none focus:ring-2 focus:ring-blue-500 input-field"
                  />
                </div>
                <button
                  onClick={() => removeExperience(index)}
                  className="mt-4 ml-auto text-red-500 hover:text-red-700 flex items-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addExperience}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </button>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <SectionTitle icon={Award} title="Skills" />
            <div className="grid gap-4">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="relative">
                  <input
                    type="text"
                    name="skill"
                    placeholder="Skill"
                    value={skill}
                    onChange={(e) => {
                      const updatedSkills = [...resumeData.skills];
                      updatedSkills[index] = e.target.value;
                      setResumeData((prev) => ({
                        ...prev,
                        skills: updatedSkills,
                      }));
                    }}
                    className="w-full border rounded p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 input-field"
                  />
                  <button
                    onClick={() => removeSkill(index)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addSkill}
              className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Skill
            </button>
          </div>

          {/* Publications */}
          <div className="mb-8">
            <SectionTitle icon={BookOpen} title="Publications" />
            {(resumeData.publications || []).map((pub, index) => (
              <div
                key={index}
                className="mb-4 p-4 border rounded-lg bg-gray-50 input-field relative"
              >
                <div className="grid gap-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Publication Title"
                    value={pub.title}
                    onChange={(e) => handleChange(e, "publications", index)}
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 input-field"
                  />
                  {pub.authors.map((author, subIndex) => (
                    <div key={subIndex} className="relative">
                      <input
                        type="text"
                        name="author"
                        placeholder="Author"
                        value={author}
                        onChange={(e) =>
                          handleChange(e, "publications", index, subIndex)
                        }
                        className="w-full border rounded p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 input-field"
                      />
                      {pub.authors.length > 1 && (
                        <button
                          onClick={() => removeAuthor(index, subIndex)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addAuthor(index)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add Author
                  </button>
                  <input
                    type="text"
                    name="link"
                    placeholder="Link"
                    value={pub.link}
                    onChange={(e) => handleChange(e, "publications", index)}
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 input-field"
                  />
                </div>
                <button
                  onClick={() => removePublication(index)}
                  className="mt-4 ml-auto text-red-500 hover:text-red-700 flex items-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addPublication}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Publication
            </button>
          </div>

          {/* Projects */}
          <div className="mb-8">
            <SectionTitle icon={FolderGit2} title="Projects" />
            {(resumeData.projects || []).map((project, index) => (
              <div
                key={index}
                className="mb-4 p-4 border rounded-lg bg-gray-50 input-field relative"
              >
                <div className="grid gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Project Name"
                    value={project.name}
                    onChange={(e) => handleChange(e, "projects", index)}
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 input-field"
                  />
                  <textarea
                    name="description"
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) => handleChange(e, "projects", index)}
                    className="w-full border rounded p-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 input-field"
                  />
                  <input
                    type="text"
                    name="link"
                    placeholder="Project Link"
                    value={project.link}
                    onChange={(e) => handleChange(e, "projects", index)}
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 input-field"
                  />
                </div>
                <button
                  onClick={() => removeProject(index)}
                  className="mt-4 ml-auto text-red-500 hover:text-red-700 flex items-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addProject}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div>

          {/* Save Resume */}
            <button
            onClick={() => saveResume()}
            className="my-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
            >
            <Save className="w-5 h-5" />
            Save Resume
            </button>

          {/* Generate PDF Button */}
          <button
            onClick={generatePDF}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Generate PDF
          </button>

          {latexOutput && (
            <pre className="mt-8 p-4 bg-gray-100 rounded-lg overflow-x-auto">
              {latexOutput}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
