import axios from "axios";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SpendingOverview = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileUpload = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    setLoading(true);
    try {
      // Make the API call to upload the file
      const response = await axios.post("http://localhost:5000/api/upload_pdf/67a3bee1916bc50950f8115a", formData);

      // Assuming response.data contains the JSON data with the expenses
      const expenses = response.data.expenses;
      console.log(expenses);
      const expenseLabels = [
        "Travel",
        "Food",
        "Utilities",
        "Health",
        "Entertainment",
        "Shopping",
      ];

      const expenseValues = [
        expenses.travelExpense,
        expenses.foodExpense,
        expenses.utilitiesExpense,
        expenses.healthExpense,
        expenses.entertainmentExpense,
        expenses.shoppingExpense,
      ];

      // Different colors for each bar
      const barColors = [
        "rgba(75, 192, 192, 0.6)",  // Travel
        "rgba(255, 99, 132, 0.6)",  // Food
        "rgba(54, 162, 235, 0.6)",  // Utilities
        "rgba(255, 159, 64, 0.6)",  // Health
        "rgba(153, 102, 255, 0.6)", // Entertainment
        "rgba(255, 205, 86, 0.6)",  // Shopping
      ];

      // Set chartData state with the mapped data and custom colors
      setChartData({
        labels: expenseLabels,
        datasets: [
          {
            label: "Spending by Category",
            data: expenseValues,
            backgroundColor: barColors, // Use the array of colors here
          },
        ],
      });

      setFileUploaded(true); // Mark file as uploaded
    } catch (error) {
      console.error("Error uploading file", error);
      setLoading(false);
    }
    setLoading(false);
  };

  // Use react-dropzone for drag-and-drop
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    onDrop: (acceptedFiles) => handleFileUpload(acceptedFiles),
  });

  return (
    <div className="min-h-[30vw] mt-6">
      <Link to="/expenses" className="text-xl font-bold text-purple-400">
        Spending Overview
      </Link>

      {!fileUploaded ? (
        <div
          className="mt-4 text-center border p-6 bg-gray-800 rounded cursor-pointer"
          {...getRootProps()} // Enable drag-and-drop functionality
        >
          <input {...getInputProps()} />
          <p className="text-gray-400">
            Drag & drop a PDF file here, or <span className="text-purple-400">click to upload</span>
          </p>
          {loading && <p className="mt-2 text-purple-400">Uploading...</p>}
        </div>
      ) : (
        <div className="mt-4">
          {chartData ? (
            <Bar data={chartData} />
          ) : (
            <p className="text-gray-400">Loading chart...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SpendingOverview;