import React, { useState, useCallback, useMemo } from "react";
import { useUIContext } from "../../contexts/ui.context";
import { useCompany } from "../../contexts/company.context";
import { SearchBar } from "../../components/SearchBar";
import { CompanyCard } from "../../components/admin/CompanyCard";
import { CompanyData } from "../../types";

function AllCompanies() {
  const { isSidebarVisible } = useUIContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { companies } = useCompany();

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value.toLowerCase());
  }, []);

  const handleSort = useCallback((order: "asc" | "desc") => {
    setSortOrder(order);
  }, []);

  const filteredAndSortedCompanies = useMemo(() => {
    let filteredCompanies = companies as CompanyData[];
    if (searchTerm) {
      filteredCompanies = (companies as CompanyData[]).filter(
        (company: CompanyData) =>
          company.name.toLowerCase().includes(searchTerm) ||
          company.tags.some((tag: string) =>
            tag.toLowerCase().includes(searchTerm)
          )
      );
    }
    return filteredCompanies.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [searchTerm, companies, sortOrder]);

  return (
    <div
      className={`flex-1 bg-gray-50 transition-all duration-300 ${
        isSidebarVisible ? "md:ml-64 ml-0" : "md:ml-20 ml-0"
      }`}
    >
      <div className="flex h-full">
        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <SearchBar onSearch={handleSearch} onSort={handleSort} onExport={()=>{}}/>
          <div className="flex-1 overflow-y-auto p-4">
            {filteredAndSortedCompanies.map((company) => (
              <CompanyCard key={company.name} company={company} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCompanies;