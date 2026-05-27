"use client";

import { useEffect, useState } from "react";

import {
  Moon,
  Sun,
} from "lucide-react";

export default function DarkModeToggle() {

  const [darkMode, setDarkMode] =
    useState(false);

  // LOAD THEME

  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "dark") {

      document.documentElement.classList.add(
        "dark"
      );

      setDarkMode(true);

    }

  }, []);

  // TOGGLE

  const toggleDarkMode = () => {

    if (darkMode) {

      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );

    } else {

      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    }

    setDarkMode(!darkMode);

  };

  return (

    <button
      onClick={toggleDarkMode}
      className="bg-black dark:bg-white text-white dark:text-black p-3 rounded-full shadow-xl hover:scale-110 transition duration-300"
    >

      {darkMode ? (

        <Sun size={22} />

      ) : (

        <Moon size={22} />

      )}

    </button>

  );
}