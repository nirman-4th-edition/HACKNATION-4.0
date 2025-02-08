import React from "react";
import {
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { useUIContext } from "../contexts/ui.context";
import Papa from "papaparse";
import { putRequest } from "../utils/services";
const BASE_URL = `http://localhost:3030/api/studentSelection`;
interface EventProps {
  icon: React.ReactNode;
  title: string;
  date: string;
}

interface ActivityProps {
  icon: React.ReactNode;
  text: string;
}

interface QuickActionButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

export function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="text-gray-600">{title}</div>
        {icon}
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-sm text-gray-500">{change}</div>
    </div>
  );
}

export function QuickActionButton({
  icon,
  text,
  onClick,
}: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

export function Activity({ icon, text }: ActivityProps) {
  return (
    <div className="flex items-center gap-3 text-gray-600">
      {icon}
      <span>{text}</span>
    </div>
  );
}

export function Event({ icon, title, date }: EventProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-gray-600">
        {icon}
        <span>{title}</span>
      </div>
      <span className="text-gray-500">{date}</span>
    </div>
  );
}

async function handleFileUpload(file: File) {
  interface uploadInfo {
    _id: string;
    status: string;
  }
  const uploadData: uploadInfo[] = [];
  const formData = new FormData();
  formData.append("file", file);

  const reader = new FileReader();
  reader.onload = (event) => {
    const csvData = event.target?.result;
    if (typeof csvData === "string") {
      Papa.parse(csvData, {
        header: true,
        complete: async (results) => {
          results.data.forEach((row: any) => {
            if (row._id && row.status) {
              uploadData.push({
                _id: row._id,
                status: row.status,
              });
            }
          });
          const shortlistedStudents = uploadData.map((student) => student._id);

          const completedStudents = uploadData
            .filter(
              (student) => student.status === "done" || student.status === "selected"
            )
            .map((student) => student._id);

          const selectedStudents = uploadData
            .filter((student) => student.status === "selected")
            .map((student) => student._id);
          const token = localStorage.getItem("token");

          try {
            await putRequest(
              `${BASE_URL}/updateShortlistedStudents`,
              JSON.stringify({
                studentIds: shortlistedStudents,
              }),
              token
            );
            await putRequest(
              `${BASE_URL}/updateCompletedStudents`,
              JSON.stringify({
                studentIds: completedStudents,
              }),
              token
            );
            await putRequest(
              `${BASE_URL}/updateSelectedStudents`,
              JSON.stringify({
                studentIds: selectedStudents,
              }),
              token
            );
            console.log("File uploaded Complete !");
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        },
      });
    }
  };
  reader.readAsText(file);
}

export function HRDashboard() {
  const { isSidebarVisible } = useUIContext();
  return (
    <div
      className={`flex-1 p-6 md:p-8 bg-gray-50 transition-all duration-300 ${
        isSidebarVisible ? "md:ml-64 ml-0" : "md:ml-20 ml-0"
      }`}
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total Students"
          value="1,234"
          change="+10% from last month"
          icon={<Users className="text-blue-600" />}
        />
        <StatCard
          title="Resumes Reviewed"
          value="789"
          change="+5% from last month"
          icon={<FileText className="text-blue-600" />}
        />
        <StatCard
          title="Interviews Scheduled"
          value="156"
          change="+20% from last month"
          icon={<Calendar className="text-blue-600" />}
        />
        <StatCard
          title="Placement Rate"
          value="75%"
          change="+2% from last month"
          icon={<TrendingUp className="text-blue-600" />}
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl text-blue-600 font-semibold mb-4">
            Recent Activities
          </h2>
          <div className="space-y-4">
            <Activity
              icon={<Users size={18} />}
              text="5 new students registered"
            />
            <Activity
              icon={<FileText size={18} />}
              text="10 resumes reviewed"
            />
            <Activity
              icon={<Calendar size={18} />}
              text="3 interviews scheduled for tomorrow"
            />
            <Activity
              icon={<Briefcase size={18} />}
              text="2 new job postings added"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl text-blue-600 font-semibold mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <QuickActionButton
              icon={<Users size={18} />}
              text="Add Students"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".csv";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    handleFileUpload(file);
                  }
                };
                input.click();
              }}
            />
            <QuickActionButton
              icon={<Calendar size={18} />}
              text="Schedule Interview"
            />
            <QuickActionButton
              icon={<FileText size={18} />}
              text="Review Resume"
            />
            <QuickActionButton icon={<Briefcase size={18} />} text="Post Job" />
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
        <h2 className="text-xl text-blue-600 font-semibold mb-4">
          Upcoming Events
        </h2>
        <div className="space-y-4">
          <Event
            icon={<Calendar size={18} />}
            title="Career Fair"
            date="June 15, 2023"
          />
          <Event
            icon={<GraduationCap size={18} />}
            title="Resume Workshop"
            date="June 20, 2023"
          />
          <Event
            icon={<Briefcase size={18} />}
            title="Mock Interviews"
            date="June 25, 2023"
          />
        </div>
      </div>
    </div>
  );
}
