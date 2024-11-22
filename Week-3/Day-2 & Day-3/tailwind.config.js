/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primaryBg: "#f6f8ff",
        secondaryBg: "#FEFEFE",
        primary: "#0079FF",
        primaryText: "#6B7D9C",
        secondaryText: "#293140",
        primaryDbg: "#141d2f",
        secondaryDbg: "#1e2a47",
      },
      screens: {
        xs: "410px",
        img: "350px",
      },
    },
  },
  plugins: [],
};
