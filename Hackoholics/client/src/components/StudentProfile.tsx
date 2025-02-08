import React, { useEffect, useState } from "react";
import { GraduationCap, Mail, UserCircle, BookOpen, Users2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { ObjectId } from "mongodb";
import { getRequest } from "../utils/services";

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}
interface Student{
    _id: string;
    name: string;
    section: string;
    branch: string;
    admissionYear: number;
    feedback: ObjectId[];
    companies: ObjectId[];
    placedAt: ObjectId[];
    email: string;
    status: "Pending" | "Selected" | "Completed" | string;
}
interface StudentProfileProps {
  student: Student;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  
  <div className="group p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);



export const StudentProfile: React.FC<StudentProfileProps> = ({ student }) => {


  // const studentInfo = [
  //   {
  //     icon: <GraduationCap className="text-blue-600" size={24} />,
  //     label: "Registration Number",
  //     value: "2241008003"
  //   },
  //   {
  //     icon: <Mail className="text-blue-600" size={24} />,
  //     label: "Email",
  //     value: "04adityahansraj@gmail.com"
  //   },
  //   {
  //     icon: <BookOpen className="text-blue-600" size={24} />,
  //     label: "Branch",
  //     value: "CSE"
  //   },
  //   {
  //     icon: <Users2 className="text-blue-600" size={24} />,
  //     label: "Section",
  //     value: "CSE-2241003"
  //   }
  // ];

  return (
    <div className="w-full md:w-1/3 lg:w-2/4 bg-gradient-to-b from-blue-50 to-white p-8 min-h-screen">
      <div className="flex flex-col items-center mb-8">
        <div className="w-36 h-36 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mb-4 shadow-lg ring-4 ring-white">
          <UserCircle size={88} className="text-blue-500" />
        </div>
        {student && <h2 className="text-2xl font-bold text-gray-800 mb-1">{student?.name}</h2>}
        <p className="text-blue-600 font-medium bg-blue-50 px-4 py-1 rounded-full text-sm">Student</p>
      </div>
      
      <div className="space-y-6">
        {student && (
          <>
            <InfoItem icon={<GraduationCap className="text-blue-600" size={24} />} label="Registration Number" value={student._id} />
            <InfoItem icon={<Mail className="text-blue-600" size={24} />} label="Email" value={student.email} />
            <InfoItem icon={<BookOpen className="text-blue-600" size={24} />} label="Branch" value={student.branch} />
            <InfoItem icon={<Users2 className="text-blue-600" size={24} />} label="Section" value={student.section} />
          </>
        )}
      </div>
    </div>
  );
};