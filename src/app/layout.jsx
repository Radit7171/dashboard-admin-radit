"use client";

import { useState } from "react";
import React from "react";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/DashboardFooter";
import { useDarkMode } from "./hooks/useDarkMode";
import { DarkModeProvider } from "./DarkModeContext";
import ScrollbarStyle from "./components/ScrollbarStyle";

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode, isMounted] = useDarkMode();

  const handleToggleSidebar = () => setSidebarOpen(open => !open);

  if (!isMounted) {
    return (
      <html lang="en" className="h-full">
        <body className="flex min-h-screen bg-white">
          <div className="flex items-center justify-center w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="h-full">
      <body className={darkMode ? "dark" : "light"}>
        <DarkModeProvider value={{ darkMode, setDarkMode }}>
          <ScrollbarStyle />
          <Sidebar open={sidebarOpen} darkMode={darkMode} />

          <div
            className={`flex flex-col flex-1 transition-all duration-300 min-h-screen ${
              sidebarOpen ? "ml-64" : "ml-0"
            } ${darkMode ? "" : "bg-white"}`}
          >
            <div className="sticky top-0 z-50">
              <Navbar
                onToggleSidebar={handleToggleSidebar}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            </div>

            <main className="flex-1 relative z-10">
              <div className="p-5">
                {children}
              </div>
            </main>

            <div className="relative z-10 mt-auto">
              <Footer darkMode={darkMode} />
            </div>
          </div>
        </DarkModeProvider>
      </body>
    </html>
  );
}
