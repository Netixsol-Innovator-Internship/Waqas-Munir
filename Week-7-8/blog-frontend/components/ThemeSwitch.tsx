"use client";
import { useState, useEffect } from "react";
import { IoIosMoon } from "react-icons/io";
import { MdWbSunny } from "react-icons/md";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center rounded-full py-3 px-3 text-white bg-darkBg dark:bg-gray-200  dark:text-darkBg"
    >
      <span className={`rounded-full `}>
        {theme === "dark" ? <IoIosMoon size={20} /> : <MdWbSunny size={20} />}
      </span>
    </button>
  );
};

export default ThemeSwitch;
