import React, { useState, useEffect } from "react";
import "../styles/reports.css";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/reports`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setReports(response.data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };

    fetchReports();
  }, []);

  const sortReports = () => {
    const sorted = [...reports].sort((a, b) => {
      return sortOrder === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date);
    });
    setReports(sorted);
  };

  useEffect(() => {
    sortReports();
  }, [sortOrder]);

  return (
    <div className="reports-container">
      <h1 className="reports-title">Your Medical Reports</h1>

      <div className="reports-header">
        <label>Sort by Date:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-dropdown"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="reports-list">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div key={report.id} className="report-card">
              <h3>{report.title}</h3>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(report.date).toLocaleDateString()}
              </p>
              <button className="view-report-btn">View Report</button>
            </div>
          ))
        ) : (
          <p className="no-reports">No reports available.</p>
        )}
      </div>
    </div>
  );
};

export default Reports;
