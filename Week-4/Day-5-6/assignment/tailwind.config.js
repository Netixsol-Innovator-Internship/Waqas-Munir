/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(180, 29%, 50%)",
        primaryBg: "hsl(180, 52%, 96%)",
        secondaryBg: "hsl(180, 31%, 95%)",
        primaryText: "hsl(180, 8%, 52%)",
        secondary: "hsl(180, 14%, 20%)",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
