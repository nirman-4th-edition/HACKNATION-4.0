import React, { useMemo } from "react";
import { useHr } from "../../contexts/hr.context";
import { Hr } from "../../types";

interface HRListProps {
  searchTerm: string;
  sortOrder: "asc" | "desc";
}

export function HRList({ searchTerm, sortOrder }: HRListProps) {
  const { hrmembers } = useHr();
   const filteredAndSortedHRs = useMemo(() => {
      let filteredHRs = hrmembers as Hr[];
      if (searchTerm) {
        filteredHRs = (hrmembers as Hr[]).filter(
          (hr: Hr) =>
            hr.name.toLowerCase().includes(searchTerm) ||
            hr.email.toLowerCase().includes(searchTerm)  ||
            hr.companyId.name.toLowerCase().includes(searchTerm)
        );
      }
      return filteredHRs.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }, [searchTerm, hrmembers, sortOrder]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="text-left text-blue-600">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Company</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {filteredAndSortedHRs.map((hr, index) => (
            <tr key={index}>
              <td className="py-3 px-4">{hr.name}</td>
              <td className="py-3 px-4">{hr.email}</td>
              <td className="py-3 px-4">{hr.companyId.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
