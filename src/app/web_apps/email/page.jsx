// src/app/email/page.jsx
"use client";

import { useRef, useContext, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import DarkModeContext from "@/app/DarkModeContext";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/DashboardFooter";

// Animasi varians
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
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
    y: -30,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

// Komponen AnimatedSection
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });

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
const StatCard = ({
  title,
  value,
  change,
  icon,
  darkMode,
  tooltip,
  currency = false,
  percentage = false,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formattedValue = currency
    ? `$${value.toLocaleString()}`
    : percentage
    ? `${value.toLocaleString()}%`
    : value.toLocaleString();

  return (
    <AnimatedCard>
      <motion.div
        className={`rounded-2xl p-6 shadow-lg transition-all duration-300 relative overflow-hidden ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-750 hover:to-gray-850"
            : "bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 border border-gray-100"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowTooltip(false);
        }}
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Highlight effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {tooltip && (
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        <AnimatePresence>
          {tooltip && showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`absolute -top-10 left-0 px-3 py-2 rounded-lg text-xs z-10 ${
                darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {tooltip}
              <div
                className={`absolute -bottom-1 left-4 w-2 h-2 rotate-45 ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-start relative z-10">
          <div className="flex-1">
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
              {formattedValue}
            </h3>
            <div className="flex items-center mt-2">
              <motion.span
                className={`text-sm flex items-center ${
                  change >= 0 ? "text-green-500" : "text-red-500"
                }`}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ yoyo: Infinity, duration: 1.5 }}
              >
                {change >= 0 ? (
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 mr-1"
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
                )}
                {Math.abs(change)}%
              </motion.span>
              <span
                className={`text-xs ml-2 ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                from last week
              </span>
            </div>
          </div>
          <motion.div
            className={`p-3 rounded-xl ${
              darkMode ? "bg-blue-900/30" : "bg-blue-100"
            }`}
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {icon}
          </motion.div>
        </div>
      </motion.div>
    </AnimatedCard>
  );
};

// Komponen untuk Email Performance Chart
const EmailPerformanceChart = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");
  const [hoveredBar, setHoveredBar] = useState(null);
  const [chartType, setChartType] = useState("bar"); // 'bar' or 'line'

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  const toggleChartType = () => {
    setChartType(chartType === "bar" ? "line" : "bar");
  };

  // Data untuk email performance chart
  const data = [
    { day: "Mon", sent: 420, opened: 210, clicked: 84 },
    { day: "Tue", sent: 380, opened: 190, clicked: 76 },
    { day: "Wed", sent: 510, opened: 255, clicked: 102 },
    { day: "Thu", sent: 480, opened: 240, clicked: 96 },
    { day: "Fri", sent: 620, opened: 310, clicked: 124 },
    { day: "Sat", sent: 350, opened: 175, clicked: 70 },
    { day: "Sun", sent: 290, opened: 145, clicked: 58 },
  ];

  const maxSent = Math.max(...data.map((d) => d.sent));
  const maxOpened = Math.max(...data.map((d) => d.opened));
  const maxClicked = Math.max(...data.map((d) => d.clicked));

  return (
    <motion.div
      className={`rounded-2xl p-6 shadow-lg ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900"
          : "bg-gradient-to-br from-white to-gray-50 border border-gray-100"
      }`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Email Performance
          </h3>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Track your email engagement metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex rounded-md overflow-hidden">
            <button
              onClick={() => handleTimeRangeChange("7d")}
              className={`px-3 py-2 text-sm ${
                timeRange === "7d"
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-800"
                  : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              7D
            </button>
            <button
              onClick={() => handleTimeRangeChange("30d")}
              className={`px-3 py-2 text-sm ${
                timeRange === "30d"
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-800"
                  : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              30D
            </button>
          </div>
          <button
            onClick={toggleChartType}
            className={`p-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            title={`Switch to ${chartType === "bar" ? "line" : "bar"} chart`}
          >
            {chartType === "bar" ? (
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
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
            ) : (
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            )}
          </button>
          <button
            onClick={onOptionsClick}
            className={`p-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
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

      <div className="h-64 relative">
        <div className="flex items-end justify-between h-48 mt-4 space-x-2">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center flex-1 relative"
            >
              {chartType === "bar" ? (
                <div className="flex items-end justify-center h-full space-x-1 w-full">
                  <div
                    className={`w-2 rounded-t-md transition-all duration-300 ${
                      darkMode ? "bg-blue-500" : "bg-blue-400"
                    } ${
                      hoveredBar === `sent-${index}`
                        ? "opacity-100"
                        : "opacity-90"
                    }`}
                    style={{ height: `${(item.sent / maxSent) * 100}%` }}
                    onMouseEnter={() => setHoveredBar(`sent-${index}`)}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                  <div
                    className={`w-2 rounded-t-md transition-all duration-300 ${
                      darkMode ? "bg-green-500" : "bg-green-400"
                    } ${
                      hoveredBar === `opened-${index}`
                        ? "opacity-100"
                        : "opacity-90"
                    }`}
                    style={{ height: `${(item.opened / maxOpened) * 100}%` }}
                    onMouseEnter={() => setHoveredBar(`opened-${index}`)}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                  <div
                    className={`w-2 rounded-t-md transition-all duration-300 ${
                      darkMode ? "bg-purple-500" : "bg-purple-400"
                    } ${
                      hoveredBar === `clicked-${index}`
                        ? "opacity-100"
                        : "opacity-90"
                    }`}
                    style={{ height: `${(item.clicked / maxClicked) * 100}%` }}
                    onMouseEnter={() => setHoveredBar(`clicked-${index}`)}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                </div>
              ) : (
                // Line chart implementation would go here
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Line chart visualization
                </div>
              )}
              <span
                className={`text-xs mt-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {item.day}
              </span>

              {/* Hover tooltip */}
              {hoveredBar && hoveredBar.includes(index.toString()) && (
                <div
                  className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {hoveredBar.includes("sent")
                    ? `Sent: ${item.sent}`
                    : hoveredBar.includes("opened")
                    ? `Opened: ${item.opened}`
                    : `Clicked: ${item.clicked}`}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-sm ${
                darkMode ? "bg-blue-500" : "bg-blue-400"
              } mr-2`}
            ></div>
            <span
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Sent
            </span>
          </div>
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-sm ${
                darkMode ? "bg-green-500" : "bg-green-400"
              } mr-2`}
            ></div>
            <span
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Opened
            </span>
          </div>
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-sm ${
                darkMode ? "bg-purple-500" : "bg-purple-400"
              } mr-2`}
            ></div>
            <span
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Clicked
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full bg-green-500 mr-2`}></div>
          <div
            className={`text-sm ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            <span className="font-medium">+8.5%</span> open rate vs previous
            week
          </div>
        </div>
        <motion.button
          onClick={() => console.log("Explore Email data")}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-100 hover:bg-blue-200 text-blue-800"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Data
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
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Komponen untuk Campaign Performance
const CampaignPerformance = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'card'

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "table" ? "card" : "table");
  };

  // Data untuk campaign performance
  const campaigns = [
    {
      name: "Welcome Series",
      sent: 2450,
      openRate: 42.3,
      clickRate: 18.7,
      conversion: 5.2,
      status: "Active",
    },
    {
      name: "Product Announcement",
      sent: 1890,
      openRate: 38.5,
      clickRate: 15.2,
      conversion: 4.1,
      status: "Completed",
    },
    {
      name: "Weekly Newsletter",
      sent: 3560,
      openRate: 35.2,
      clickRate: 12.8,
      conversion: 3.5,
      status: "Active",
    },
    {
      name: "Promotional Offer",
      sent: 1320,
      openRate: 45.6,
      clickRate: 22.3,
      conversion: 7.8,
      status: "Paused",
    },
    {
      name: "Abandoned Cart",
      sent: 980,
      openRate: 48.2,
      clickRate: 25.7,
      conversion: 9.3,
      status: "Active",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Paused":
        return "bg-yellow-100 text-yellow-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      className={`rounded-2xl p-6 shadow-lg ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900"
          : "bg-gradient-to-br from-white to-gray-50 border border-gray-100"
      }`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Campaign Performance
          </h3>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Performance metrics for your email campaigns
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex rounded-md overflow-hidden">
            <button
              onClick={() => handleTimeRangeChange("7d")}
              className={`px-3 py-2 text-sm ${
                timeRange === "7d"
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-800"
                  : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => handleTimeRangeChange("30d")}
              className={`px-3 py-2 text-sm ${
                timeRange === "30d"
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-800"
                  : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Monthly
            </button>
          </div>
          <button
            onClick={toggleViewMode}
            className={`p-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            title={`Switch to ${viewMode === "table" ? "card" : "table"} view`}
          >
            {viewMode === "table" ? (
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
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            ) : (
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            )}
          </button>
          <button
            onClick={onOptionsClick}
            className={`p-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
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

      {viewMode === "table" ? (
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full">
            <thead>
              <tr
                className={
                  darkMode
                    ? "bg-gray-750 text-gray-400"
                    : "bg-gray-100 text-gray-500"
                }
              >
                <th className="text-left py-3 px-4 rounded-l-lg">Campaign</th>
                <th className="text-left py-3 px-4">Sent</th>
                <th className="text-left py-3 px-4">Open Rate</th>
                <th className="text-left py-3 px-4">Click Rate</th>
                <th className="text-left py-3 px-4">Conversion</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4 rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, index) => (
                <motion.tr
                  key={index}
                  className={`${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } ${
                    index % 2 === 0
                      ? darkMode
                        ? "bg-gray-800"
                        : "bg-gray-50"
                      : darkMode
                      ? "bg-gray-750"
                      : "bg-white"
                  } hover:${
                    darkMode ? "bg-gray-700" : "bg-blue-50"
                  } transition-colors duration-200`}
                  whileHover={{ scale: 1.01 }}
                >
                  <td
                    className={`py-3 px-4 font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {campaign.name}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {campaign.sent.toLocaleString()}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <div className="flex items-center">
                      {campaign.openRate}%
                      <span
                        className={`ml-1 ${
                          campaign.openRate > 40
                            ? "text-green-500"
                            : campaign.openRate > 30
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {campaign.openRate > 40
                          ? "↑"
                          : campaign.openRate > 30
                          ? "→"
                          : "↓"}
                      </span>
                    </div>
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <div className="flex items-center">
                      {campaign.clickRate}%
                      <span
                        className={`ml-1 ${
                          campaign.clickRate > 15
                            ? "text-green-500"
                            : campaign.clickRate > 10
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {campaign.clickRate > 15
                          ? "↑"
                          : campaign.clickRate > 10
                          ? "→"
                          : "↓"}
                      </span>
                    </div>
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <div className="flex items-center">
                      {campaign.conversion}%
                      <span
                        className={`ml-1 ${
                          campaign.conversion > 5
                            ? "text-green-500"
                            : campaign.conversion > 3
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {campaign.conversion > 5
                          ? "↑"
                          : campaign.conversion > 3
                          ? "→"
                          : "↓"}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        campaign.status
                      )}`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <motion.button
                      onClick={() =>
                        console.log(`View details for ${campaign.name}`)
                      }
                      className={`px-3 py-1 rounded-md text-sm font-medium flex items-center ${
                        darkMode
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={index}
              className={`rounded-xl p-4 ${
                darkMode ? "bg-gray-750" : "bg-white border"
              } shadow-sm`}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-between items-start mb-3">
                <h4
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {campaign.name}
                </h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    campaign.status
                  )}`}
                >
                  {campaign.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Sent
                  </div>
                  <div
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {campaign.sent.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Open Rate
                  </div>
                  <div
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {campaign.openRate}%
                  </div>
                </div>
                <div>
                  <div
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Click Rate
                  </div>
                  <div
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {campaign.clickRate}%
                  </div>
                </div>
                <div>
                  <div
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Conversion
                  </div>
                  <div
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {campaign.conversion}%
                  </div>
                </div>
              </div>

              <motion.button
                onClick={() => console.log(`View details for ${campaign.name}`)}
                className={`w-full py-2 rounded-lg text-sm font-medium ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Details
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <motion.button
          onClick={() => console.log("View all campaigns")}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Campaigns
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
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Komponen untuk Recent Emails
const RecentEmails = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    console.log(`Status filter changed to: ${status}`);
  };

  // Data untuk recent emails
  const emails = [
    {
      id: "#EML-2871",
      subject: "Welcome to our service!",
      recipient: "john.doe@example.com",
      date: "2023-04-15 14:30",
      status: "Delivered",
      opens: 1,
      clicks: 0,
    },
    {
      id: "#EML-2872",
      subject: "Your weekly newsletter",
      recipient: "jane.smith@example.com",
      date: "2023-04-15 11:00",
      status: "Opened",
      opens: 3,
      clicks: 2,
    },
    {
      id: "#EML-2873",
      subject: "Special offer just for you",
      recipient: "robert@example.com",
      date: "2023-04-14 16:45",
      status: "Clicked",
      opens: 2,
      clicks: 1,
    },
    {
      id: "#EML-2874",
      subject: "Your cart is waiting",
      recipient: "sarah@example.com",
      date: "2023-04-14 09:15",
      status: "Delivered",
      opens: 0,
      clicks: 0,
    },
    {
      id: "#EML-2875",
      subject: "Thank you for your purchase",
      recipient: "michael@example.com",
      date: "2023-04-13 15:20",
      status: "Opened",
      opens: 1,
      clicks: 0,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-gray-100 text-gray-800";
      case "Opened":
        return "bg-blue-100 text-blue-800";
      case "Clicked":
        return "bg-green-100 text-green-800";
      case "Bounced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRecipientInitial = (email) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <motion.div
      className={`rounded-2xl p-6 shadow-lg ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900"
          : "bg-gradient-to-br from-white to-gray-50 border border-gray-100"
      }`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Recent Emails
          </h3>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Recently sent emails and their status
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex rounded-md overflow-hidden">
            <button
              onClick={() => handleTimeRangeChange("7d")}
              className={`px-3 py-2 text-sm ${
                timeRange === "7d"
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-800"
                  : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              7D
            </button>
            <button
              onClick={() => handleTimeRangeChange("30d")}
              className={`px-3 py-2 text-sm ${
                timeRange === "30d"
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-800"
                  : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              30D
            </button>
          </div>
          <div
            className={`rounded-md px-3 py-2 text-sm ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`bg-transparent ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <option value="all">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Opened">Opened</option>
              <option value="Clicked">Clicked</option>
              <option value="Bounced">Bounced</option>
            </select>
          </div>
          <button
            onClick={onOptionsClick}
            className={`p-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
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

      <div className="space-y-4">
        {emails.map((email, index) => (
          <motion.div
            key={index}
            className={`rounded-xl p-4 ${
              darkMode ? "bg-gray-750" : "bg-white border"
            } shadow-sm flex items-start`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <span
                className={`font-medium ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {getRecipientInitial(email.recipient)}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {email.subject}
                  </h4>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    To: {email.recipient}
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {email.date}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    email.status
                  )}`}
                >
                  {email.status}
                </span>
              </div>
              <div className="flex items-center mt-3 space-x-4">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-blue-500"
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
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {email.opens} opens
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <span
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {email.clicks} clicks
                  </span>
                </div>
                <div className="flex items-center ml-auto">
                  <button
                    onClick={() => console.log(`View email ${email.id}`)}
                    className={`text-xs px-2 py-1 rounded-md mr-2 ${
                      darkMode
                        ? "text-blue-400 hover:bg-blue-900/30"
                        : "text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => console.log(`Resend email ${email.id}`)}
                    className={`text-xs px-2 py-1 rounded-md ${
                      darkMode
                        ? "text-gray-400 hover:bg-gray-700"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    Resend
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <motion.button
          onClick={() => console.log("View all emails")}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Emails
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
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Komponen untuk Email Templates
const EmailTemplates = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const templates = [
    {
      name: "Welcome Email",
      category: "Onboarding",
      lastUsed: "2023-04-15",
      performance: "4.8/5",
      stars: 4.8,
    },
    {
      name: "Newsletter",
      category: "Engagement",
      lastUsed: "2023-04-14",
      performance: "4.2/5",
      stars: 4.2,
    },
    {
      name: "Promotional Offer",
      category: "Marketing",
      lastUsed: "2023-04-13",
      performance: "4.5/5",
      stars: 4.5,
    },
    {
      name: "Abandoned Cart",
      category: "Retention",
      lastUsed: "2023-04-12",
      performance: "4.9/5",
      stars: 4.9,
    },
  ];

  const categories = [
    "all",
    "Onboarding",
    "Engagement",
    "Marketing",
    "Retention",
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    console.log(`Category changed to: ${category}`);
  };

  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : templates.filter((template) => template.category === selectedCategory);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${
            i <= Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <motion.div
      className={`rounded-2xl p-6 shadow-lg ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900"
          : "bg-gradient-to-br from-white to-gray-50 border border-gray-100"
      }`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Email Templates
          </h3>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Pre-designed templates for your email campaigns
          </p>
        </div>
        <div className="flex rounded-md overflow-hidden">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-2 text-sm ${
                selectedCategory === category
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-800"
                  : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {category === "all" ? "All" : category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={index}
            className={`rounded-xl p-4 ${
              darkMode ? "bg-gray-750" : "bg-white border"
            } shadow-sm`}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start mb-3">
              <h4
                className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {template.name}
              </h4>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {template.category}
              </span>
            </div>

            <div className="flex items-center mb-3">
              <div className="flex mr-2">{renderStars(template.stars)}</div>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {template.stars}/5
              </span>
            </div>

            <p
              className={`text-sm mb-3 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Last used: {template.lastUsed}
            </p>

            <div className="flex justify-between items-center">
              <button
                onClick={() =>
                  console.log(`Preview template: ${template.name}`)
                }
                className={`text-sm px-3 py-1 rounded-md ${
                  darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Preview
              </button>
              <motion.button
                onClick={() => console.log(`Use template: ${template.name}`)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Use Template
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <motion.button
          onClick={() => console.log("View all templates")}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Templates
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
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
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
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
          darkMode
            ? "bg-gray-700 hover:bg-gray-600 text-white"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
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
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full left-0 mt-1 py-2 rounded-lg shadow-lg z-20 min-w-full ${
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Quick Actions Component
const QuickActions = ({ darkMode }) => {
  const actions = [
    {
      title: "Compose Email",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      onClick: () => console.log("Compose Email clicked"),
      color: "bg-blue-500",
    },
    {
      title: "Create Campaign",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      onClick: () => console.log("Create Campaign clicked"),
      color: "bg-green-500",
    },
    {
      title: "Import Contacts",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      ),
      onClick: () => console.log("Import Contacts clicked"),
      color: "bg-yellow-500",
    },
    {
      title: "Schedule",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      onClick: () => console.log("Schedule clicked"),
      color: "bg-purple-500",
    },
  ];

  return (
    <AnimatedSection className="mb-6">
      <div
        className={`rounded-2xl p-6 shadow-lg ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-900"
            : "bg-gradient-to-br from-white to-gray-50 border border-gray-100"
        }`}
      >
        <h3
          className={`text-xl font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <motion.button
              key={index}
              onClick={action.onClick}
              className={`flex flex-col items-center justify-center p-4 rounded-xl ${
                darkMode ? "bg-gray-750" : "bg-gray-100"
              } hover:opacity-90 transition-opacity`}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`p-3 rounded-full ${action.color} text-white mb-2`}
              >
                {action.icon}
              </div>
              <span
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {action.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default function EmailPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  const handleDateChange = (range) => {
    console.log(`Date range changed to: ${range}`);
    // Dummy function - would fetch new data based on date range in a real app
  };

  const handleChartOptions = (chartTitle) => {
    console.log(`Options clicked for: ${chartTitle}`);
    // Dummy function - would show chart options modal in a real app
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
    // Dummy function - would perform search in a real app
  };

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Sidebar open={sidebarOpen} darkMode={darkMode} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 min-h-screen ${
          sidebarOpen ? "ml-64" : "ml-0"
        } ${darkMode ? "bg-gray-900" : "bg-gray-50"} overflow-x-hidden`}
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
              className="mb-6 flex justify-between items-center flex-wrap gap-4"
            >
              <div>
                <h1
                  className={`text-3xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Email Dashboard
                </h1>
                <p
                  className={`mt-2 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Monitor your email campaigns and performance
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search campaigns, emails..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-lg ${
                      darkMode
                        ? "bg-gray-800 text-white placeholder-gray-500"
                        : "bg-white text-gray-900 placeholder-gray-400 border"
                    }`}
                  />
                  <svg
                    className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </form>
                <DateRangePicker
                  darkMode={darkMode}
                  onDateChange={handleDateChange}
                />
              </div>
            </motion.div>

            {/* Quick Actions */}
            <QuickActions darkMode={darkMode} />

            {/* Stat Cards */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Emails Sent"
                  value={12450}
                  change={8.5}
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Total emails sent in the selected period"
                />
                <StatCard
                  title="Open Rate"
                  value={42.3}
                  change={3.2}
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Percentage of emails opened by recipients"
                  percentage={true}
                />
                <StatCard
                  title="Click Rate"
                  value={18.7}
                  change={2.1}
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
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Percentage of emails with clicked links"
                  percentage={true}
                />
                <StatCard
                  title="Conversion Rate"
                  value={5.2}
                  change={1.5}
                  icon={
                    <svg
                      className="w-6 h-6 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 01118 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Percentage of emails that led to conversions"
                  percentage={true}
                />
              </div>
            </AnimatedSection>

            {/* Charts Row */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EmailPerformanceChart
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("Email Performance")}
                />
                <CampaignPerformance
                  darkMode={darkMode}
                  onOptionsClick={() =>
                    handleChartOptions("Campaign Performance")
                  }
                />
              </div>
            </AnimatedSection>

            {/* Recent Emails and Email Templates */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentEmails
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("Recent Emails")}
                />
                <EmailTemplates darkMode={darkMode} />
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
