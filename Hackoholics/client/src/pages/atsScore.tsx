import React, { useState, useRef } from "react";
import { FileUpload } from "../components/atsScore/Upload";
import { LoadingState } from "../components/atsScore/LoadingState";
import { AnalysisResults } from "../components/atsScore/AnalysisResults";
import { useUIContext } from "../contexts/ui.context";
import axios from "axios";
import { set } from "mongoose";

interface ButtonProps {
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
    id?: string;
}

export const Button: React.FC<ButtonProps> = ({
    onClick,
    className,
    children,
    id,
}) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
            id={id}
        >
            {children}
        </button>
    );
};

function atsScore() {
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [jobDescription, setJobDescription] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [btn, setBtn] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { isSidebarVisible } = useUIContext();

    const handleFileUpload = (uploadedFile: File) => {
        setFile(uploadedFile);
    };

    const handleGenerateResult = async (prompt: string, buttonId: string) => {
        if (!file) {
            alert("Please upload a resume");
            return;
        }
        setBtn(buttonId);
        setAnalyzing(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("jobDescription", jobDescription);
        formData.append("prompt", prompt);

        try {
            const response = await axios.post("http://127.0.0.1:5001/api/gemini-response-resume", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setResponse(response.data.response);
        } catch (error) {
            console.error("Error fetching response:", error);
        } finally {
            setAnalyzing(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setJobDescription("");
        setResponse("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const inputPrompt1 = `
        You are an experienced Technical Human Resource Manager, your task is to review the provided resume against the job description.
        Please share your professional evaluation on whether the candidate's profile aligns with the role.
        Highlight the strengths and weaknesses of the applicant in relation to the specified job requirements.
    `;

    const inputPrompt3 = `
        You are a skilled ATS (Applicant Tracking System) scanner with a deep understanding of data science and ATS functionality,
        your task is to evaluate the resume against the provided job description. Give me the percentage of match if the resume matches
        the job description. First the output should come as percentage and then keywords missing and last final thoughts.
    `;

    return (
        <div
            className={`flex-1 bg-gray-50 transition-all duration-300 ${
                isSidebarVisible ? "md:ml-64 ml-0" : "md:ml-20 ml-0"
            }`}
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Resume ATS Analyzer
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                        Upload your resume to analyze its ATS compatibility and get detailed
                        feedback to improve your chances of getting past automated screening
                        systems.
                    </p>
                </div>

                {analyzing ? (
                    <LoadingState />
                ) : !response ? (
                    <>
                        <FileUpload
                            onFileUpload={handleFileUpload}
                            fileInputRef={fileInputRef}
                        />
                        <textarea
                            className="w-full p-4 mt-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            rows={4}
                            placeholder="Paste the job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                        <Button onClick={() => handleGenerateResult(inputPrompt1, "btn1")} className="mt-4" id="btn1">
                            Tell Me About the Resume
                        </Button>
                        <Button onClick={() => handleGenerateResult(inputPrompt3, "btn3")} className="mt-4 ml-4" id="btn3">
                            Percentage Match
                        </Button>
                    </>
                ) : (
                    <AnalysisResults onReset={handleReset} response={response} btn={btn} />
                )}
            </div>
        </div>
    );
}

export default atsScore;