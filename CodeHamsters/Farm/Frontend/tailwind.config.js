const daisyui = require("daisyui");
const daisyUIThemes = require("daisyui/src/theming/themes");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  variants: {
    extend: {
      backgroundImage: ["hover", "focus"],
    },
  },
};
