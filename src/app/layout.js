"use client";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/DashboardFooter";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Background pattern tetap */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20 z-0"></div>
        <div className="fixed inset-0 opacity-10 z-0">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        {/* Sidebar */}
        <Sidebar open={sidebarOpen} />

        {/* Wrapper untuk konten utama */}
        <div
          className={`flex flex-col flex-1 transition-all duration-300 min-h-screen ${
            sidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          {/* Navbar */}
          <div className="sticky top-0 z-50">
            <Navbar onToggleSidebar={handleToggleSidebar} />
          </div>

          {/* Main Content - Pastikan konten memenuhi sisa layar */}
          <main className="flex-1 relative z-10">
            <div className="p-5">
              {typeof children === "function"
                ? children({ sidebarOpen })
                : children}
            </div>
          </main>

          {/* Footer - Akan selalu berada di bawah */}
          <div className="relative z-10 mt-auto">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
