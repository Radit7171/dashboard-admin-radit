// src/app/analytics/page.jsx
"use client";

import { useRef, useContext, useState } from "react";
import { motion, useInView } from "framer-motion";
import DarkModeContext from "../DarkModeContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/DashboardFooter";

// Animasi varians
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

// Komponen AnimatedSection
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Komponen AnimatedCard
const AnimatedCard = ({ children }) => {
  return <motion.div variants={itemVariants}>{children}</motion.div>;
};

// Komponen untuk kartu statistik dengan tooltip
const StatCard = ({ title, value, change, icon, darkMode, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <AnimatedCard>
      <div
        className={`rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${
          darkMode
            ? "bg-gray-800 hover:bg-gray-750"
            : "bg-white hover:bg-gray-50"
        } relative`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {tooltip && showTooltip && (
          <div
            className={`absolute -top-10 left-0 px-3 py-2 rounded-lg text-xs ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {tooltip}
          </div>
        )}

        <div className="flex justify-between items-start">
          <div>
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {title}
            </p>
            <h3
              className={`text-2xl font-bold mt-1 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {value}
            </h3>
            <p
              className={`text-sm mt-2 ${
                change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from last week
            </p>
          </div>
          <div
            className={`p-3 rounded-lg ${
              darkMode ? "bg-blue-900/30" : "bg-blue-100"
            }`}
          >
            {icon}
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

// Komponen untuk Visitor Trends (Line Chart)
const VisitorTrendsChart = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  // Data untuk line chart
  const data = [
    { day: "Mon", visitors: 4000 },
    { day: "Tue", visitors: 3000 },
    { day: "Wed", visitors: 5000 },
    { day: "Thu", visitors: 4500 },
    { day: "Fri", visitors: 6000 },
    { day: "Sat", visitors: 7000 },
    { day: "Sun", visitors: 6500 },
  ];

  const maxVisitors = Math.max(...data.map((d) => d.visitors));
  const chartHeight = 200;

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Visitor Trends
        </h3>
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-md px-3 py-1 text-sm ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className={`bg-transparent ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
            </select>
          </div>
          <button
            onClick={onOptionsClick}
            className={`p-2 rounded-lg hover:opacity-80 ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="h-64">
        <div className="flex items-end justify-between h-48 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center w-10">
              <div
                className={`w-2 rounded-t-full ${
                  darkMode ? "bg-blue-500" : "bg-blue-400"
                }`}
                style={{ height: `${(item.visitors / maxVisitors) * 100}%` }}
              ></div>
              <span
                className={`text-xs mt-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {item.day}
              </span>
            </div>
          ))}
        </div>

        <div
          className={`flex justify-between mt-4 px-4 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <span className="text-xs">0</span>
          <span className="text-xs">{maxVisitors} visitors</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div
          className={`text-sm ${darkMode ? "text-blue-400" : "text-blue-600"}`}
        >
          <span className="font-medium">+12.3%</span> vs previous week
        </div>
        <button
          onClick={() => console.log("Explore Visitor Trends data")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-100 hover:bg-blue-200 text-blue-800"
          }`}
        >
          Explore Data
        </button>
      </div>
    </div>
  );
};

// Komponen untuk Traffic Sources (Pie Chart)
const TrafficSourcesChart = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  // Data untuk pie chart
  const data = [
    { source: "Organic Search", value: 45, color: "bg-blue-500" },
    { source: "Direct", value: 25, color: "bg-green-500" },
    { source: "Social Media", value: 15, color: "bg-purple-500" },
    { source: "Referral", value: 10, color: "bg-yellow-500" },
    { source: "Email", value: 5, color: "bg-red-500" },
  ];

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Traffic Sources
        </h3>
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-md px-3 py-1 text-sm ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className={`bg-transparent ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
            </select>
          </div>
          <button
            onClick={onOptionsClick}
            className={`p-2 rounded-lg hover:opacity-80 ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center h-64">
        <div className="w-1/2">
          <div className="relative w-40 h-40 mx-auto">
            <div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
            <div
              className="absolute inset-0 rounded-full border-8 border-green-500"
              style={{
                clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)",
              }}
            ></div>
            <div
              className="absolute inset-0 rounded-full border-8 border-purple-500"
              style={{
                clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
              }}
            ></div>
            <div
              className="absolute inset-0 rounded-full border-8 border-yellow-500"
              style={{
                clipPath: "polygon(50% 50%, 50% 100%, 0% 100%, 0% 50%)",
              }}
            ></div>
            <div
              className="absolute inset-0 rounded-full border-8 border-red-500"
              style={{ clipPath: "polygon(50% 50%, 0% 50%, 0% 0%, 50% 0%)" }}
            ></div>
            <div
              className={`absolute inset-0 flex items-center justify-center rounded-full ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <span
                className={`text-lg font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                100%
              </span>
            </div>
          </div>
        </div>

        <div className="w-1/2 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-4 h-4 rounded-sm ${item.color} mr-2`}></div>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {item.source}:{" "}
                <span className="font-medium">{item.value}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => console.log("Explore Traffic Sources data")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-100 hover:bg-blue-200 text-blue-800"
          }`}
        >
          Explore Data
        </button>
      </div>
    </div>
  );
};

// Komponen untuk Device Breakdown (Donut Chart)
const DeviceBreakdownChart = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  // Data untuk device breakdown
  const data = [
    { device: "Mobile", value: 62, color: "bg-blue-500" },
    { device: "Desktop", value: 28, color: "bg-green-500" },
    { device: "Tablet", value: 8, color: "bg-purple-500" },
    { device: "Other", value: 2, color: "bg-gray-500" },
  ];

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Device Breakdown
        </h3>
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-md px-3 py-1 text-sm ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className={`bg-transparent ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
            </select>
          </div>
          <button
            onClick={onOptionsClick}
            className={`p-2 rounded-lg hover:opacity-80 ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center h-64">
        <div className="w-1/2">
          <div className="relative w-40 h-40 mx-auto">
            <div
              className="absolute inset-0 rounded-full border-8 border-blue-500"
              style={{
                clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)",
              }}
            ></div>
            <div
              className="absolute inset-0 rounded-full border-8 border-green-500"
              style={{
                clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
              }}
            ></div>
            <div
              className="absolute inset-0 rounded-full border-8 border-purple-500"
              style={{
                clipPath: "polygon(50% 50%, 50% 100%, 0% 100%, 0% 50%)",
              }}
            ></div>
            <div
              className="absolute inset-0 rounded-full border-8 border-gray-500"
              style={{ clipPath: "polygon(50% 50%, 0% 50%, 0% 0%, 50% 0%)" }}
            ></div>
            <div
              className={`absolute inset-4 flex items-center justify-center rounded-full ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <span
                className={`text-lg font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                100%
              </span>
            </div>
          </div>
        </div>

        <div className="w-1/2 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-4 h-4 rounded-sm ${item.color} mr-2`}></div>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {item.device}:{" "}
                <span className="font-medium">{item.value}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => console.log("Explore Device Breakdown data")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-100 hover:bg-blue-200 text-blue-800"
          }`}
        >
          Explore Data
        </button>
      </div>
    </div>
  );
};

// Komponen untuk Geographic Distribution (Peta)
const GeographicDistributionChart = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  // Data untuk geographic distribution
  const data = [
    { country: "United States", value: 42, color: "bg-blue-500" },
    { country: "United Kingdom", value: 18, color: "bg-green-500" },
    { country: "Germany", value: 12, color: "bg-purple-500" },
    { country: "France", value: 9, color: "bg-yellow-500" },
    { country: "Canada", value: 7, color: "bg-red-500" },
    { country: "Other", value: 12, color: "bg-gray-500" },
  ];

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Geographic Distribution
        </h3>
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-md px-3 py-1 text-sm ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className={`bg-transparent ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
            </select>
          </div>
          <button
            onClick={onOptionsClick}
            className={`p-2 rounded-lg hover:opacity-80 ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="h-64 flex">
        <div className="w-1/2 relative">
          {/* Simplified world map representation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-32 h-16 rounded-full border-2 ${
                darkMode ? "border-gray-600" : "border-gray-300"
              }`}
            ></div>
            <div
              className={`absolute top-1/4 left-1/2 w-8 h-8 rounded-full ${
                darkMode ? "bg-blue-500" : "bg-blue-400"
              } transform -translate-x-1/2 -translate-y-1/2`}
            ></div>
            <div
              className={`absolute top-1/3 right-1/4 w-6 h-6 rounded-full ${
                darkMode ? "bg-green-500" : "bg-green-400"
              } transform -translate-x-1/2 -translate-y-1/2`}
            ></div>
            <div
              className={`absolute top-1/2 left-1/3 w-5 h-5 rounded-full ${
                darkMode ? "bg-purple-500" : "bg-purple-400"
              } transform -translate-x-1/2 -translate-y-1/2`}
            ></div>
            <div
              className={`absolute bottom-1/3 left-2/3 w-4 h-4 rounded-full ${
                darkMode ? "bg-yellow-500" : "bg-yellow-400"
              } transform -translate-x-1/2 -translate-y-1/2`}
            ></div>
            <div
              className={`absolute bottom-1/4 right-1/3 w-4 h-4 rounded-full ${
                darkMode ? "bg-red-500" : "bg-red-400"
              } transform -translate-x-1/2 -translate-y-1/2`}
            ></div>
          </div>
        </div>

        <div className="w-1/2 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-4 h-4 rounded-sm ${item.color} mr-2`}></div>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {item.country}:{" "}
                <span className="font-medium">{item.value}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => console.log("Explore Geographic Distribution data")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-100 hover:bg-blue-200 text-blue-800"
          }`}
        >
          Explore Data
        </button>
      </div>
    </div>
  );
};

// Komponen untuk tabel data dengan sorting
const DataTable = ({ darkMode }) => {
  const [sortField, setSortField] = useState("visitors");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const data = [
    { page: "/home", visitors: 3245, bounceRate: "24.5%", conversion: "4.2%" },
    {
      page: "/products",
      visitors: 2541,
      bounceRate: "32.1%",
      conversion: "6.7%",
    },
    { page: "/blog", visitors: 1876, bounceRate: "18.9%", conversion: "3.1%" },
    { page: "/about", visitors: 1542, bounceRate: "21.3%", conversion: "2.4%" },
    {
      page: "/contact",
      visitors: 987,
      bounceRate: "26.7%",
      conversion: "8.9%",
    },
    {
      page: "/pricing",
      visitors: 876,
      bounceRate: "22.4%",
      conversion: "9.2%",
    },
    { page: "/faq", visitors: 654, bounceRate: "28.9%", conversion: "1.8%" },
    {
      page: "/login",
      visitors: 2109,
      bounceRate: "38.2%",
      conversion: "12.5%",
    },
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let valueA = a[sortField];
    let valueB = b[sortField];

    // Handle percentage values
    if (typeof valueA === "string" && valueA.includes("%")) {
      valueA = parseFloat(valueA);
      valueB = parseFloat(valueB);
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortIcon = ({ field }) => (
    <span className="ml-1">
      {sortField === field && (sortDirection === "asc" ? "↑" : "↓")}
    </span>
  );

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Page Performance
        </h3>
        <button
          onClick={() => console.log("Export data")}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={darkMode ? "text-gray-400" : "text-gray-500"}>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:opacity-80"
                onClick={() => handleSort("page")}
              >
                Page <SortIcon field="page" />
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:opacity-80"
                onClick={() => handleSort("visitors")}
              >
                Visitors <SortIcon field="visitors" />
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:opacity-80"
                onClick={() => handleSort("bounceRate")}
              >
                Bounce Rate <SortIcon field="bounceRate" />
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:opacity-80"
                onClick={() => handleSort("conversion")}
              >
                Conversion <SortIcon field="conversion" />
              </th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr
                key={index}
                className={`${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } ${
                  index % 2 === 0
                    ? darkMode
                      ? "bg-gray-750/30"
                      : "bg-gray-50"
                    : ""
                }`}
              >
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {row.page}
                </td>
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {row.visitors.toLocaleString()}
                </td>
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {row.bounceRate}
                </td>
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {row.conversion}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => console.log(`View details for ${row.page}`)}
                    className={`p-1 rounded-md hover:opacity-80 ${
                      darkMode
                        ? "text-blue-400 hover:bg-blue-900/30"
                        : "text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2 15.5v-11a2 2 0 012-2h16a2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className={`flex justify-between items-center mt-4 pt-4 border-t ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, sortedData.length)} of{" "}
          {sortedData.length} entries
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === 1
                ? darkMode
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                : darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === totalPages
                ? darkMode
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                : darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Komponen DateRangePicker untuk filter tanggal
const DateRangePicker = ({ darkMode, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("last_7_days");

  const ranges = [
    { id: "today", label: "Today" },
    { id: "yesterday", label: "Yesterday" },
    { id: "last_7_days", label: "Last 7 days" },
    { id: "last_30_days", label: "Last 30 days" },
    { id: "this_month", label: "This month" },
    { id: "last_month", label: "Last month" },
    { id: "custom", label: "Custom range" },
  ];

  const handleRangeSelect = (rangeId) => {
    setSelectedRange(rangeId);
    setIsOpen(false);
    if (onDateChange) onDateChange(rangeId);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
          darkMode
            ? "bg-gray-700 hover:bg-gray-600 text-white"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
        }`}
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {ranges.find((r) => r.id === selectedRange)?.label}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-1 py-2 rounded-lg shadow-lg z-10 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {ranges.map((range) => (
            <button
              key={range.id}
              onClick={() => handleRangeSelect(range.id)}
              className={`block w-full text-left px-4 py-2 text-sm hover:opacity-80 ${
                selectedRange === range.id
                  ? darkMode
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-100 text-blue-800"
                  : darkMode
                  ? "text-gray-300"
                  : "text-gray-800"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  const handleDateChange = (range) => {
    console.log(`Date range changed to: ${range}`);
    // Dummy function - would fetch new data based on date range in a real app
  };

  const handleChartOptions = (chartTitle) => {
    console.log(`Options clicked for: ${chartTitle}`);
    // Dummy function - would show chart options modal in a real app
  };

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Sidebar open={sidebarOpen} darkMode={darkMode} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 min-h-screen ${
          sidebarOpen ? "ml-64" : "ml-0"
        } ${darkMode ? "" : "bg-white"} overflow-x-hidden`}
        style={{
          width: sidebarOpen ? "calc(100vw - 16rem)" : "100vw",
        }}
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
            {/* Header dengan date picker */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex justify-between items-center"
            >
              <div>
                <h1
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Analytics Dashboard
                </h1>
                <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                  Monitor your website performance and user behavior
                </p>
              </div>
              <DateRangePicker
                darkMode={darkMode}
                onDateChange={handleDateChange}
              />
            </motion.div>

            {/* Stat Cards */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Visitors"
                  value="45.2K"
                  change={12.3}
                  icon={
                    <svg
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Total number of visitors in the selected period"
                />
                <StatCard
                  title="Avg. Session Duration"
                  value="4m 32s"
                  change={5.7}
                  icon={
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Average time spent by visitors on your site"
                />
                <StatCard
                  title="Bounce Rate"
                  value="26.4%"
                  change={-3.2}
                  icon={
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Percentage of visitors who leave after viewing only one page"
                />
                <StatCard
                  title="Conversion Rate"
                  value="3.8%"
                  change={8.1}
                  icon={
                    <svg
                      className="w-6 h-6 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 01118 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Percentage of visitors who complete a desired action"
                />
              </div>
            </AnimatedSection>

            {/* Charts Row */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <VisitorTrendsChart
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("Visitor Trends")}
                />
                <TrafficSourcesChart
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("Traffic Sources")}
                />
              </div>
            </AnimatedSection>

            {/* Table */}
            <AnimatedSection className="mb-6">
              <DataTable darkMode={darkMode} />
            </AnimatedSection>

            {/* Additional Metrics */}
            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DeviceBreakdownChart
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("Device Breakdown")}
                />
                <GeographicDistributionChart
                  darkMode={darkMode}
                  onOptionsClick={() =>
                    handleChartOptions("Geographic Distribution")
                  }
                />
              </div>
            </AnimatedSection>
          </div>
        </main>

        <div className="relative z-10 mt-auto">
          <Footer darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}
