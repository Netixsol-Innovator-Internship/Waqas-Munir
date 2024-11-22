/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(25, 97%, 53%)",
        bgPrimary: "hsl(216, 12%, 8%)",
        bgSecondary: "hsl(213, 19%, 18%)",
        secondary: "hsl(217, 12%, 63%)",
      },
      screens: {
        xs: "400px",
        xxs: "300px",
      },
    },
  },
  plugins: [],
};
