/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBg: "#E7E6DF",
        primary: "#3EB07F",
        secondaryBg: "#F3F2F5",
      },
      screens: {
        xs: "300px",
      },
    },
  },
  plugins: [],
};
