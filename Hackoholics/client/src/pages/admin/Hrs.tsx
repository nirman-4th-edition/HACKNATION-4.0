import { useState, useCallback, useMemo } from "react";
import { useUIContext } from "../../contexts/ui.context";
import { SearchBar } from "../../components/admin/SearchBar";
import { HRList } from "../../components/admin/HRList";
import React from "react";

function Hrs() {
  const { isSidebarVisible } = useUIContext();
  const [filter, setFilter] = React.useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSearch = useCallback((value: string) => {
    setFilter(value);
  }, []);

  const handleSort = useCallback((order: "asc" | "desc") => {
    setSortOrder(order);
  }, []);



  return (
    <div
      className={`flex-1 bg-gray-50 transition-all duration-300 ${
        isSidebarVisible ? "md:ml-64 ml-0" : "md:ml-20 ml-0"
      }`}
    >
      <div className="flex h-full">
        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <SearchBar onSearch={handleSearch} onSort={handleSort} />
          <div className="flex-1 overflow-y-auto p-4">
            <HRList searchTerm={filter} sortOrder={sortOrder} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hrs;
