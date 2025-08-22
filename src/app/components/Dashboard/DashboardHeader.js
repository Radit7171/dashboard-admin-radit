// components/DashboardHeader.js
import { ChevronRight, Search, Download } from "lucide-react";

export default function DashboardHeader({ sidebarOpen }) {
  const breadcrumbs = ["Home", "Dashboard"];

  return (
    <div
      className={`w-full bg-[#16213a] border-b border-gray-800 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between transition-all duration-300
        ${sidebarOpen ? "ml-64" : "ml-0"}`}
      style={{ zIndex: 9 }}
    >
      <div className="px-5 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* Title + Breadcrumb */}
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
          <nav className="flex items-center text-sm text-gray-400 mt-1">
            {breadcrumbs.map((item, idx) => (
              <span key={item} className="flex items-center">
                <span
                  className={`cursor-pointer hover:text-gray-200 ${
                    idx === breadcrumbs.length - 1 ? "font-medium text-gray-100" : ""
                  }`}
                >
                  {item}
                </span>
                {idx < breadcrumbs.length - 1 && (
                  <ChevronRight size={14} className="mx-1 text-gray-400" />
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Search + Actions */}
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap mt-4 sm:mt-0">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              aria-label="Search dashboard"
              placeholder="Search..."
              className="pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-700 bg-[#1e293b] text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="button"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:shadow-md hover:bg-blue-700 transition"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
