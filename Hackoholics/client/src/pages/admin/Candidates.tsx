import React from "react";
import { Users, GraduationCap, TrendingUp, Download } from "lucide-react";
import { CandidateList } from "./../../components/admin/CandidateList";
import { useUIContext } from "../../contexts/ui.context";
import { StatCard } from "../../components/StatCard";
import { useStudent } from "../../contexts/student.context";
import { Upload } from "lucide-react";

export function AllCandidate() {
  const { students } = useStudent();
  const { isSidebarVisible } = useUIContext();
  const [filter, setFilter] = React.useState<string>("");
  const [majorFilter, setMajorFilter] = React.useState<string>("");

  const filteredStudents = students.filter((student) => {
    return (
      (filter === "" ||
        student.name.toLowerCase().includes(filter.toLowerCase()) ||
        student.status.toLowerCase().includes(filter.toLowerCase())) &&
      (majorFilter === "" ||
        student.branch.toLowerCase() === majorFilter.toLowerCase())
    );
  });

  const exportToCSV = () => {
    const csvRows = [];
    const headers = Object.keys(filteredStudents[0]);
    csvRows.push(headers.join(","));  

    for (const student of filteredStudents) {
      const values = headers.map((header) => {
        const value = (student as any)[header];
        return Array.isArray(value) ? value.join(";") : value;
      });
      csvRows.push(values.join(","));
    }

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "students.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
          title="Average GPA"
          value="3.7"
          change="+0.1 from last semester"
          icon={<GraduationCap className="text-blue-600" />}
        />
        <StatCard
          title="Graduation Rate"
          value="92%"
          change="+2% from last year"
          icon={<TrendingUp className="text-blue-600" />}
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-blue-600 font-semibold">
            Student Filters
          </h2>
          <div>
            <button
              className="mx-2 bg-green-600 text-white text-lg px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".csv";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                  // Handle file upload
                  console.log(file);
                  }
                };
                input.click();
                }}
            >
              <Upload className="inline-block mr-2" />
              Import
            </button>
            <button
              className="mx-2 bg-blue-600 text-white text-lg px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={exportToCSV}
            >
              <Download className="inline-block mr-2" />
              Export
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Filter by name, status"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFilter(e.target.value)}
          />
          <select
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setMajorFilter(e.target.value)}
          >
            <option value="">All Majors</option>
            <option value="CSE">Computer Science Engineering (CSE)</option>
            <option value="CSIT">
              Computer Science and Information Technology (CSIT)
            </option>
            <option value="ECE">
              Electronics and Communication Engineering (ECE)
            </option>
            <option value="ME">Mechanical Engineering (ME)</option>
            <option value="CE">Civil Engineering (CE)</option>
            <option value="EE">Electrical Engineering (EE)</option>
          </select>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-lg p-6 shadow-sm overflow-x-auto">
        <h2 className="text-xl text-blue-600 font-semibold mb-4">
          Student List
        </h2>
        <CandidateList filter={filter} majorFilter={majorFilter} />
      </div>
    </div>
  );
}
