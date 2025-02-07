const konstaConfig = require("konsta/config");
export default konstaConfig({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        main: {
          200: "#62bf80",
          400: "#49b670",
          600: "#27ae60",
          800: "#209752",
        },
        secondary: "#B9E5A7",
      },
    },
  },
  plugins: [],
});

/**
 * EBFCD5/B9E5A7(secondary).4AC113/9DECDA/008080(primary),black white for buttons/icons
 */
