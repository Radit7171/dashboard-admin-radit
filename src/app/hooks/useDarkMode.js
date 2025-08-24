// hooks/useDarkMode.js
"use client";
import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("darkMode", darkMode.toString());
      
      if (darkMode) {
        document.documentElement.classList.add("dark");
        document.body.className = "flex min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900";
      } else {
        document.documentElement.classList.remove("dark");
        document.body.className = "flex min-h-screen bg-white";
      }
    }
  }, [darkMode, isMounted]);

  return [darkMode, setDarkMode, isMounted];
};