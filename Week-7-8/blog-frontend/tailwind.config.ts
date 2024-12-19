import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4B6BFB",
        darkBg: "#181A2A",
        darkPrimary: "#141624",
        darkSecondary: "#242535",
      },
      fontFamily: {
        logo: ["Neucha", "serif"],
        primary: ["Poppins", "serif"],
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
} satisfies Config;
