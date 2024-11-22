/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(172, 67%, 45%)",
        bgPrimary: "hsl(183, 100%, 15%)",
        secondary: "hsl(184, 14%, 56%)",
        bgSecondary: "hsl(189, 41%, 97%)",
        label: "hsl(186, 14%, 43%)",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
