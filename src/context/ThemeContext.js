"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light")

    useEffect(() => {
      const savedTheme = localStorage.getItem("theme") ?? "light"
      if(savedTheme) {
        setTheme(savedTheme)
      }}, [])

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));



  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");



    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// custom hook
export function useTheme() {
  return useContext(ThemeContext);
}