// src/app/crm/page.jsx
"use client";

import { useRef, useContext, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import DarkModeContext from "../DarkModeContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/DashboardFooter";

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
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formattedValue = currency
    ? `$${value.toLocaleString()}`
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

// Komponen untuk Leads Chart
const LeadsChart = ({ darkMode, onOptionsClick }) => {
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

  // Data untuk leads chart
  const data = [
    { day: "Mon", leads: 42, conversions: 15 },
    { day: "Tue", leads: 38, conversions: 12 },
    { day: "Wed", leads: 51, conversions: 18 },
    { day: "Thu", leads: 48, conversions: 16 },
    { day: "Fri", leads: 62, conversions: 22 },
    { day: "Sat", leads: 35, conversions: 10 },
    { day: "Sun", leads: 29, conversions: 8 },
  ];

  const maxLeads = Math.max(...data.map((d) => d.leads));
  const maxConversions = Math.max(...data.map((d) => d.conversions));

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
            Leads Overview
          </h3>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Track your leads and conversion performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex rounded-md overflow-hidden">
            <button
              onClick={() => handleTimeRangeChange("24h")}
              className={`px-3 py-2 text-sm ${
                timeRange === "24h"
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-800"
                  : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              24H
            </button>
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
                    className={`w-3 rounded-t-md transition-all duration-300 ${
                      darkMode ? "bg-blue-500" : "bg-blue-400"
                    } ${
                      hoveredBar === `leads-${index}`
                        ? "opacity-100"
                        : "opacity-90"
                    }`}
                    style={{ height: `${(item.leads / maxLeads) * 100}%` }}
                    onMouseEnter={() => setHoveredBar(`leads-${index}`)}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                  <div
                    className={`w-3 rounded-t-md transition-all duration-300 ${
                      darkMode ? "bg-green-500" : "bg-green-400"
                    } ${
                      hoveredBar === `conversions-${index}`
                        ? "opacity-100"
                        : "opacity-90"
                    }`}
                    style={{
                      height: `${(item.conversions / maxConversions) * 100}%`,
                    }}
                    onMouseEnter={() => setHoveredBar(`conversions-${index}`)}
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
                  {hoveredBar.includes("leads")
                    ? `Leads: ${item.leads}`
                    : `Conversions: ${item.conversions}`}
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
              Leads
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
              Conversions
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full bg-green-500 mr-2`}></div>
          <div
            className={`text-sm ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            <span className="font-medium">+12.3%</span> leads vs previous week
          </div>
        </div>
        <motion.button
          onClick={() => console.log("Explore Leads data")}
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

// Komponen untuk Top Customers
const TopCustomers = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'card'

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "table" ? "card" : "table");
  };

  // Data untuk top customers
  const customers = [
    {
      name: "John Doe",
      value: 24500,
      status: "VIP",
      deals: 12,
      company: "Acme Inc",
      email: "john@acme.com",
    },
    {
      name: "Jane Smith",
      value: 18900,
      status: "Premium",
      deals: 8,
      company: "Globex Corp",
      email: "jane@globex.com",
    },
    {
      name: "Robert Johnson",
      value: 15600,
      status: "Regular",
      deals: 6,
      company: "Wayne Enterprises",
      email: "robert@wayne.com",
    },
    {
      name: "Sarah Williams",
      value: 13200,
      status: "New",
      deals: 3,
      company: "Stark Industries",
      email: "sarah@stark.com",
    },
    {
      name: "Michael Brown",
      value: 12100,
      status: "Regular",
      deals: 5,
      company: "Oscorp",
      email: "michael@oscorp.com",
    },
  ];

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
            Top Customers
          </h3>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Your most valuable customers
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
                <th className="text-left py-3 px-4 rounded-l-lg">Customer</th>
                <th className="text-left py-3 px-4">Value</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Deals</th>
                <th className="text-left py-3 px-4 rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
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
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                          darkMode ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`font-medium ${
                            darkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                        >
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div
                          className={`font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {customer.name}
                        </div>
                        <div
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {customer.company}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`py-3 px-4 font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    ${customer.value.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        customer.status === "VIP"
                          ? "bg-purple-100 text-purple-800"
                          : customer.status === "Premium"
                          ? "bg-blue-100 text-blue-800"
                          : customer.status === "New"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {customer.deals}
                  </td>
                  <td className="py-3 px-4">
                    <motion.button
                      onClick={() =>
                        console.log(`View details for ${customer.name}`)
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
          {customers.map((customer, index) => (
            <motion.div
              key={index}
              className={`rounded-xl p-4 ${
                darkMode ? "bg-gray-750" : "bg-white border"
              } shadow-sm`}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                      darkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {customer.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div
                      className={`font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {customer.name}
                    </div>
                    <div
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {customer.company}
                    </div>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    customer.status === "VIP"
                      ? "bg-purple-100 text-purple-800"
                      : customer.status === "Premium"
                      ? "bg-blue-100 text-blue-800"
                      : customer.status === "New"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {customer.status}
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <div
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Value
                  </div>
                  <div
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    ${customer.value.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Deals
                  </div>
                  <div
                    className={`font-medium text-center ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {customer.deals}
                  </div>
                </div>
              </div>
              <motion.button
                onClick={() => console.log(`View details for ${customer.name}`)}
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
          onClick={() => console.log("View all customers")}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Customers
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

// Komponen untuk Recent Activities
const RecentActivities = ({ darkMode, onOptionsClick }) => {
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

  // Data untuk recent activities
  const activities = [
    {
      id: "#ACT-2871",
      type: "Call",
      contact: "John Doe",
      date: "2023-04-15 14:30",
      status: "Completed",
      duration: "15m",
    },
    {
      id: "#ACT-2872",
      type: "Meeting",
      contact: "Jane Smith",
      date: "2023-04-15 11:00",
      status: "Scheduled",
      duration: "30m",
    },
    {
      id: "#ACT-2873",
      type: "Email",
      contact: "Robert Johnson",
      date: "2023-04-14 16:45",
      status: "Sent",
      duration: null,
    },
    {
      id: "#ACT-2874",
      type: "Proposal",
      contact: "Sarah Williams",
      date: "2023-04-14 09:15",
      status: "In Progress",
      duration: null,
    },
    {
      id: "#ACT-2875",
      type: "Follow-up",
      contact: "Michael Brown",
      date: "2023-04-13 15:20",
      status: "Pending",
      duration: "10m",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Sent":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Call":
        return (
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        );
      case "Meeting":
        return (
          <svg
            className="w-5 h-5 text-purple-500"
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
        );
      case "Email":
        return (
          <svg
            className="w-5 h-5 text-yellow-500"
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
        );
      default:
        return (
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        );
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
            Recent Activities
          </h3>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Track your team's activities and engagements
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
              <option value="Completed">Completed</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Sent">Sent</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
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
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            className={`rounded-xl p-4 ${
              darkMode ? "bg-gray-750" : "bg-white border"
            } shadow-sm flex items-start`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`p-2 rounded-lg mr-4 ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              {getTypeIcon(activity.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {activity.type} with {activity.contact}
                  </h4>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {activity.date}{" "}
                    {activity.duration && `• ${activity.duration}`}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    activity.status
                  )}`}
                >
                  {activity.status}
                </span>
              </div>
              <div className="flex items-center mt-3">
                <span
                  className={`text-xs ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {activity.id}
                </span>
                <div className="flex items-center ml-4">
                  <button
                    onClick={() => console.log(`View activity ${activity.id}`)}
                    className={`text-xs px-2 py-1 rounded-md mr-2 ${
                      darkMode
                        ? "text-blue-400 hover:bg-blue-900/30"
                        : "text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => console.log(`Edit activity ${activity.id}`)}
                    className={`text-xs px-2 py-1 rounded-md ${
                      darkMode
                        ? "text-gray-400 hover:bg-gray-700"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <motion.button
          onClick={() => console.log("View all activities")}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Activities
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

// Komponen untuk Upcoming Tasks
const UpcomingTasks = ({ darkMode }) => {
  const [showCompleted, setShowCompleted] = useState(false);

  const tasks = [
    {
      id: 1,
      title: "Follow up with John Doe",
      due: "Today, 15:00",
      priority: "High",
      assigned: "You",
      completed: false,
    },
    {
      id: 2,
      title: "Prepare quarterly report",
      due: "Tomorrow, 10:00",
      priority: "Medium",
      assigned: "You",
      completed: false,
    },
    {
      id: 3,
      title: "Team meeting",
      due: "Apr 18, 14:00",
      priority: "Medium",
      assigned: "Whole team",
      completed: false,
    },
    {
      id: 4,
      title: "Client presentation",
      due: "Apr 20, 09:30",
      priority: "High",
      assigned: "You",
      completed: true,
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleTaskCompletion = (taskId) => {
    console.log(`Task ${taskId} completion toggled`);
    // In a real app, this would update the task's completed status
  };

  const filteredTasks = showCompleted
    ? tasks
    : tasks.filter((task) => !task.completed);

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
            Upcoming Tasks
          </h3>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Your pending tasks and actions
          </p>
        </div>
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className={`px-3 py-2 rounded-lg text-sm ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
        >
          {showCompleted ? "Hide Completed" : "Show Completed"}
        </button>
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task, index) => (
          <motion.div
            key={index}
            className={`rounded-xl p-4 ${
              darkMode ? "bg-gray-750" : "bg-white border"
            } shadow-sm ${task.completed ? "opacity-70" : ""}`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`h-5 w-5 rounded-full border mr-3 mt-1 flex items-center justify-center ${
                    task.completed
                      ? "bg-green-500 border-green-500"
                      : darkMode
                      ? "border-gray-500"
                      : "border-gray-300"
                  }`}
                >
                  {task.completed && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
                <div>
                  <h4
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    } ${task.completed ? "line-through" : ""}`}
                  >
                    {task.title}
                  </h4>
                  <div className="flex items-center mt-2 space-x-3">
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Due: {task.due}
                    </span>
                  </div>
                  <p
                    className={`mt-2 text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Assigned to: {task.assigned}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => console.log(`Edit task: ${task.title}`)}
                  className={`p-2 rounded-lg ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => console.log(`Delete task: ${task.title}`)}
                  className={`p-2 rounded-lg ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {tasks.filter((t) => !t.completed).length} pending tasks
        </div>
        <motion.button
          onClick={() => console.log("View all tasks")}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Tasks
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
      title: "Add Lead",
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
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      ),
      onClick: () => console.log("Add Lead clicked"),
      color: "bg-blue-500",
    },
    {
      title: "Schedule Call",
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
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      onClick: () => console.log("Schedule Call clicked"),
      color: "bg-green-500",
    },
    {
      title: "Send Email",
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
      onClick: () => console.log("Send Email clicked"),
      color: "bg-yellow-500",
    },
    {
      title: "Create Task",
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      onClick: () => console.log("Create Task clicked"),
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

export default function CRMPage() {
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
                  CRM Dashboard
                </h1>
                <p
                  className={`mt-2 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Manage your customer relationships and activities
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search leads, customers..."
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
                  title="Total Leads"
                  value={284}
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
                  tooltip="Total number of leads in the selected period"
                />
                <StatCard
                  title="Conversion Rate"
                  value={18.7}
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
                        d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Percentage of leads converted to customers"
                />
                <StatCard
                  title="Deals Closed"
                  value={53}
                  change={8.5}
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Number of deals closed in the selected period"
                />
                <StatCard
                  title="Revenue Generated"
                  value={84500}
                  change={15.7}
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Total revenue generated from closed deals"
                  currency={true}
                />
              </div>
            </AnimatedSection>

            {/* Charts Row */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LeadsChart
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("Leads Chart")}
                />
                <TopCustomers
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("Top Customers")}
                />
              </div>
            </AnimatedSection>

            {/* Recent Activities and Upcoming Tasks */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentActivities
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("Recent Activities")}
                />
                <UpcomingTasks darkMode={darkMode} />
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
