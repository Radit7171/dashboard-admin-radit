"use client";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <html lang="en">
      <body className="flex bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} />

        {/* Wrapper untuk konten utama */}
        <div
          className={`flex flex-col flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          {/* Navbar */}
          <Navbar onToggleSidebar={handleToggleSidebar} />

          {/* Main Content (DashboardHeader ada di sini lewat page.js) */}
          <main className="flex-1 p-0 pt-0">
            {typeof children === "function"
              ? children({ sidebarOpen })
              : children}
          </main>
        </div>
      </body>
    </html>
  );
}
