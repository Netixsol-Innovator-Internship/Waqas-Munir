/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html"],
  theme: {
    extend: {
      colors: {
        primary: " hsl(0, 0%, 98%)",
        secondary: "hsl(0, 0%, 41%)",
        textPrimary: "hsl(0, 0%, 8%)",
      },
      screens: {
        xs: "350px",
      },
    },
  },
  plugins: [],
};
