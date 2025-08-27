// app/layout.jsx
"use client";

import { useState } from "react";
import React from "react";
import "./globals.css";
import { useDarkMode } from "./hooks/useDarkMode";
import { DarkModeProvider } from "./DarkModeContext";
import ScrollbarStyle from "./components/ScrollbarStyle";

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode, isMounted] = useDarkMode();

  if (!isMounted) {
    return (
      <html lang="en" className="h-full">
        <body className="flex min-h-screen w-full bg-white">
          <div className="flex items-center justify-center w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="h-full">
      <body className={`${darkMode ? "dark" : "light"} min-h-screen w-full`}>
        <DarkModeProvider value={{ darkMode, setDarkMode }}>
          <ScrollbarStyle />
          <main className="w-full">
            {children}
          </main>
        </DarkModeProvider>
      </body>
    </html>
  );
}