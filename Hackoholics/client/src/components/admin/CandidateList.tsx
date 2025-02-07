import React from "react";
import { Candidate } from "../../types";
import { useStudent } from "../../contexts/student.context";

interface CandidateListProps {
  filter: string;
  majorFilter: string;
}

export function CandidateList({ filter, majorFilter }: CandidateListProps) {
  const { students } = useStudent();

  const filteredStudents = students.filter(
    (student) =>
      (student.name.toLowerCase().includes(filter.toLowerCase()) ||
      (student.status.toLowerCase().includes(filter.toLowerCase()))) &&
        student.branch.toLowerCase().includes(majorFilter.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="text-left text-blue-600">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Branch</th>
            <th className="py-3 px-4">Batch</th>
            <th className="py-3 px-4">Status</th>
            {/* <th className="py-3 px-4">Status</th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td className="py-3 px-4">{student.name}</td>
              <td className="py-3 px-4">{student.branch.toUpperCase()}</td>
              <td className="py-3 px-4">{student.admissionYear + 4}</td>
              <td className="py-2 px-4">
                <span
                  className={`w-24 inline-block px-3 py-1 text-center rounded-full text-sm font-semibold shadow-sm
            ${
              student.status === "Pending"
                ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                : student.status === "Selected"
                ? "bg-green-100 text-green-700 border border-green-300"
                : student.status === "Completed"
                ? "bg-blue-100 text-blue-700 border border-blue-300"
                : "bg-gray-100 text-gray-600 border border-gray-300"
            }`}
                >
                  {student.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
