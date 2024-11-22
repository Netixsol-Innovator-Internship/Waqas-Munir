/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(259, 100%, 65%)",
        secondary: "hsl(0, 1%, 44%)",
        error: "hsl(0, 100%, 67%)",
        background: "#dbdbdb",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
