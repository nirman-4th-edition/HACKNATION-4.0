import withMT from "@material-tailwind/react/utils/withMT";
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
});
