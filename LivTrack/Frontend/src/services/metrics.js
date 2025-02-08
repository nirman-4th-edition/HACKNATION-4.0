// import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;

// export const fetchMetrics = async () => {
//   const token = localStorage.getItem("token");
//   const response = await axios.get(`${API_URL}/api/metrics`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function fetchMetrics() {
  try {
    const token = localStorage.getItem("token"); // Retrieve token

    const response = await axios.get(`${API_URL}/api/v1/health`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in request
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Fetching metrics failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}
