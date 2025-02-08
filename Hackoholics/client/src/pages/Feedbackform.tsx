import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { StudentProfile } from "../components/StudentProfile";
import { FeedbackForm } from "../components/FeedbackForm";
import { useUIContext } from "../contexts/ui.context";
import { useParams } from "react-router-dom";

const StudentFeedback: React.FC = () => {
  const { isSidebarVisible } = useUIContext();
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<any>(null);
  const token = localStorage.getItem("token");
  const BASE_URL = "http://localhost:3030/api/details";
  useEffect(() => {
    const fetchStudent = async () => {
      const response = await fetch(`${BASE_URL}/student/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.log("Error fetching student data");
        return;
      }
      const { data } = await response.json();
      setStudent(data);
      console.log(response);
    };

    fetchStudent();
  }, [id]);

  return (
    <div
      className={`flex-1 p-6 md:p-8 bg-gray-50 transition-all duration-300 ${
        isSidebarVisible ? "md:ml-64 ml-0" : "md:ml-20 ml-0"
      }`}
    >
      <a
        href="/candidates"
        className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </a>

      <div className="flex flex-col md:flex-row min-h-screen">
        <StudentProfile student={student}/>
        <FeedbackForm student ={student}/>
      </div>
    </div>
  );
};

export default StudentFeedback;
