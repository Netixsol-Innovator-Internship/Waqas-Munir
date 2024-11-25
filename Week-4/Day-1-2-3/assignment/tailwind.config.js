/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBg: "#051139",
        primary: "#1E50FF",
        primaryText: "#5699FF",
        secondaryText: "#EBEBEB",
      },
      screens: {
        lg: "1150px",
        xs: "400px",
      },
    },
  },
  plugins: [],
};
