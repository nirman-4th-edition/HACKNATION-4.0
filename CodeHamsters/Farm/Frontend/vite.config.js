import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // 👈 Keep all proxy config under the route key
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        // Optional but recommended
      },
    },
  },
});
