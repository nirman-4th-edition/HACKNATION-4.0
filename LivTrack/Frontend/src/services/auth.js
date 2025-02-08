import api from "./api";
import { showNotification } from "@mantine/notifications";

export async function loginUser(credentials) {
  try {
    // Remove the separate axios instance calls
    const response = await api.post("/auth/login", credentials);

    console.log("API Response:", response.data);

    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);

      showNotification({
        title: "Login Successful",
        message: "Redirecting to dashboard...",
        color: "teal",
      });

      return {
        token: response.data.token,
        user: response.data.user, // Ensure backend returns user data
      };
    }

    throw new Error("No authentication token received");
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);

    showNotification({
      title: "Login Failed",
      message: error.response?.data?.message || "Invalid credentials",
      color: "red",
    });

    throw error;
  }
}

export async function getProfile() {
  try {
    const response = await api.get("/auth/profile");
    console.log("Profile data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Profile fetch error:", error);

    showNotification({
      title: "Profile Error",
      message: "Failed to load profile data",
      color: "red",
    });

    throw error;
  }
}

export function logoutUser() {
  localStorage.removeItem("token");

  showNotification({
    title: "Logged Out",
    message: "You've been successfully logged out",
    color: "blue",
  });
}
