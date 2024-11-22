/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html"],
  theme: {
    extend: {
      colors: {
        error: "hsl(1, 90%, 64%)",
        primaryBg: "hsl(211, 68%, 94%)",
        primary: "hsl(219, 85%, 26%)",
        primaryText: "hsl(219, 14%, 63%)",
        secondaryText: "hsl(224, 21%, 14%)",
      },
      screens: {
        xs: "300px",
      },
    },
  },
  plugins: [],
};
