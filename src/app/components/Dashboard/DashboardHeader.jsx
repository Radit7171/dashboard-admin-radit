"use client";
import { ChevronRight, Search, Download } from "lucide-react";
import { useDarkModeCtx } from "@/app/DarkModeContext"; // sesuaikan path

export default function DashboardHeader({ sidebarOpen }) {
  const { darkMode } = useDarkModeCtx();
  const breadcrumbs = ["Home", "Dashboard"];

  return (
    <div
      className={`w-full border-b py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between transition-all duration-300
        ${sidebarOpen ? "" : "ml-0"} ${
        darkMode
          ? "bg-[#16213a] border-gray-800 text-gray-100"
          : "bg-white border-gray-200 text-gray-800 shadow-sm"
      }`}
    >
      <div className="px-5 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Dashboard
          </h1>
          <nav className="flex items-center text-sm mt-1">
            {breadcrumbs.map((item, idx) => (
              <span key={item} className="flex items-center">
                <span
                  className={`cursor-pointer ${
                    darkMode
                      ? idx === breadcrumbs.length - 1
                        ? "font-medium text-gray-100"
                        : "text-gray-400 hover:text-gray-200"
                      : idx === breadcrumbs.length - 1
                      ? "font-medium text-gray-800"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {item}
                </span>
                {idx < breadcrumbs.length - 1 && (
                  <ChevronRight
                    size={14}
                    className={`mx-1 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                )}
              </span>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap mt-4 sm:mt-0">
          <div className="relative">
            <Search
              size={16}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              aria-label="Search dashboard"
              placeholder="Search..."
              className={`pl-9 pr-3 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                darkMode
                  ? "border-gray-700 bg-[#1e293b] text-gray-100 placeholder-gray-400"
                  : "border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-500"
              }`}
            />
          </div>

          <button
            type="button"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow hover:shadow-md transition ${
              darkMode
                ? "bg-blue-700 text-white hover:bg-blue-600"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
