import { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a202c", // Example primary color
        secondary: "#2d3748", // Example secondary color
        accent: "#4a5568", // Example accent color
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Example custom font
      },
    },
  },
  plugins: [],
};

export default config;
