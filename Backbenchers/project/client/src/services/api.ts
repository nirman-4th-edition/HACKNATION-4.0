export const loginUser = async (email: string, name: string) => {
  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
    const data = await response.json();
    localStorage.setItem("profileId", data.profileId);
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;  // Re-throw the error so it can be handled in the Login component
  }
};
