// src/app/users/page.jsx
"use client";

import { useRef, useContext, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import DarkModeContext from "@/app/DarkModeContext";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/DashboardFooter";

// Animasi varians
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
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
const AnimatedCard = ({ children, delay = 0 }) => {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

// Komponen untuk kartu statistik dengan tooltip
const StatCard = ({
  title,
  value,
  change,
  icon,
  darkMode,
  tooltip,
  onClick,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formattedValue = value.toLocaleString();

  return (
    <AnimatedCard>
      <motion.div
        className={`rounded-2xl p-6 shadow-lg transition-all duration-300 cursor-pointer ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-750 hover:to-gray-850"
            : "bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 border border-gray-100"
        }`}
        whileHover={{ y: -5, scale: 1.02 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowTooltip(false);
        }}
        onClick={onClick}
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
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(!showTooltip);
            }}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2. V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
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
                from last month
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

// Komponen untuk User Growth Chart
const UserGrowthChart = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("30d");
  const [hoveredBar, setHoveredBar] = useState(null);
  const [chartType, setChartType] = useState("bar"); // 'bar' or 'line'

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  const toggleChartType = () => {
    setChartType(chartType === "bar" ? "line" : "bar");
  };

  // Data untuk user growth chart
  const data = [
    { month: "Jan", newUsers: 120, activeUsers: 420 },
    { month: "Feb", newUsers: 150, activeUsers: 480 },
    { month: "Mar", newUsers: 180, activeUsers: 510 },
    { month: "Apr", newUsers: 210, activeUsers: 590 },
    { month: "May", newUsers: 240, activeUsers: 650 },
    { month: "Jun", newUsers: 270, activeUsers: 720 },
  ];

  const maxNewUsers = Math.max(...data.map((d) => d.newUsers));
  const maxActiveUsers = Math.max(...data.map((d) => d.activeUsers));

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
            User Growth
          </h3>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Track your user acquisition and engagement
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
            <button
              onClick={() => handleTimeRangeChange("90d")}
              className={`px-3 py-2 text-sm ${
                timeRange === "90d"
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-800"
                  : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              90D
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
                      hoveredBar === `new-${index}`
                        ? "opacity-100"
                        : "opacity-90"
                    }`}
                    style={{
                      height: `${(item.newUsers / maxNewUsers) * 100}%`,
                    }}
                    onMouseEnter={() => setHoveredBar(`new-${index}`)}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                  <div
                    className={`w-3 rounded-t-md transition-all duration-300 ${
                      darkMode ? "bg-green-500" : "bg-green-400"
                    } ${
                      hoveredBar === `active-${index}`
                        ? "opacity-100"
                        : "opacity-90"
                    }`}
                    style={{
                      height: `${(item.activeUsers / maxActiveUsers) * 100}%`,
                    }}
                    onMouseEnter={() => setHoveredBar(`active-${index}`)}
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
                {item.month}
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
                  {hoveredBar.includes("new")
                    ? `New: ${item.newUsers}`
                    : `Active: ${item.activeUsers}`}
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
              New Users
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
              Active Users
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
            <span className="font-medium">+15.7%</span> user growth vs last
            month
          </div>
        </div>
        <motion.button
          onClick={() => console.log("Explore User data")}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
            darkMode
              ? "bg-blue-600 hover: bg-blue-700 text-white"
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

// Komponen untuk User List
const UserList = ({ darkMode, onOptionsClick, onUserClick }) => {
  const [timeRange, setTimeRange] = useState("30d");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'card'
  const [searchQuery, setSearchQuery] = useState("");

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    console.log(`Status filter changed to: ${status}`);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "table" ? "card" : "table");
  };

  // Data untuk users
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      joinDate: "2023-01-15",
      status: "active",
      role: "Admin",
      lastActive: "2 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      joinDate: "2023-02-20",
      status: "active",
      role: "User",
      lastActive: "5 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      joinDate: "2023-03-10",
      status: "inactive",
      role: "User",
      lastActive: "2 days ago",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      joinDate: "2023-03-25",
      status: "active",
      role: "Editor",
      lastActive: "30 minutes ago",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael@example.com",
      joinDate: "2023-04-05",
      status: "suspended",
      role: "User",
      lastActive: "1 week ago",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily@example.com",
      joinDate: "2023-04-12",
      status: "active",
      role: "User",
      lastActive: "1 hour ago",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 7,
      name: "David Wilson",
      email: "david@example.com",
      joinDate: "极速赛车开奖直播 2023-04-18",
      status: "active",
      role: "Moderator",
      lastActive: "3 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 8,
      name: "Lisa Miller",
      email: "lisa@example.com",
      joinDate: "2023-04-22",
      status: "inactive",
      role: "User",
      lastActive: "5 days ago",
      avatar:
        "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  const filteredUsers =
    statusFilter === "all"
      ? users
      : users.filter((user) => user.status === statusFilter);

  const searchedUsers = filteredUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800";
      case "Editor":
        return "bg-blue-100 text-blue-800";
      case "Moderator":
        return "bg-yellow-100 text-yellow-800";
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
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h3
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            User Management
          </h3>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Manage your users and their permissions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-xl text-sm ${
                darkMode
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-gray-100 text-gray-800 placeholder-gray-500"
              }`}
            />
            <svg
              className="w-4 h-4 absolute left-3 top-2.5 text-gray-400"
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
          </div>

          <div
            className={`rounded-xl px-3 py-2 text-sm ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className={`bg-transparent ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <div
            className={`rounded-xl px-3 py-2 text-sm ${
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
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
            </select>
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
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full">
            <thead>
              <tr
                className={
                  darkMode
                    ? "bg-gray-750 text-gray-400"
                    : "bg-gray-100 text-gray-500"
                }
              >
                <th className="text-left py-3 px-4 rounded-l-xl">User</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Joined</th>
                <th className="text-left py-3 px-4">Last Active</th>
                <th className="text-left py-3 px-4 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {searchedUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
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
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <p
                          className={`font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {user.name}
                        </p>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user.joinDate}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user.lastActive}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onUserClick(user)}
                        className={`p-1.5 rounded-md ${
                          darkMode
                            ? "text-blue-400 hover:bg-blue-900/30"
                            : "text-blue-600 hover:bg-blue-100"
                        }`}
                        title="View user details"
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2 15.5v-11a2 2 0 012-2h16a2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2z"
                          />
                        </svg>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => console.log(`Edit user ${user.id}`)}
                        className={`p-1.5 rounded-md ${
                          darkMode
                            ? "text-gray-400 hover:bg-gray-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        title="Edit user"
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
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {searchedUsers.map((user, index) => (
            <motion.div
              key={user.id}
              className={`rounded-xl p-4 ${
                darkMode ? "bg-gray-750" : "bg-white border"
              } shadow-sm`}
              whileHover={{ y: -5 }}
              onClick={() => onUserClick(user)}
            >
              <div className="flex items-center mb-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user.name}
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    user.status
                  )}`}
                >
                  {user.status}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getRoleColor(
                    user.role
                  )}`}
                >
                  {user.role}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                    Joined
                  </p>
                  <p className={darkMode ? "text-white" : "text-gray-900"}>
                    {user.joinDate}
                  </p>
                </div>
                <div>
                  <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                    Last Active
                  </p>
                  <p className={darkMode ? "text-white" : "text-gray-900"}>
                    {user.lastActive}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(`Edit user ${user.id}`);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(`Delete user ${user.id}`);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs ${
                    darkMode
                      ? "bg-red-700 text-white hover:bg-red-600"
                      : "bg-red-100 text-red-600 hover:bg-red-200"
                  }`}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <div
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          Showing {searchedUsers.length} of {users.length} users
        </div>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log("Previous page")}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log("Next page")}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            Next
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Komponen untuk User Demographics
const UserDemographics = ({ darkMode }) => {
  const demographics = [
    { country: "United States", users: 1245, growth: 12.3, percentage: 62 },
    { country: "United Kingdom", users: 856, growth: 8.7, percentage: 43 },
    { country: "Germany", users: 721, growth: 5.4, percentage: 36 },
    { country: "France", users: 632, growth: 7.2, percentage: 32 },
    { country: "Canada", users: 521, growth: 9.8, percentage: 26 },
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
      <h3
        className={`text-xl font-semibold mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        User Demographics
      </h3>

      <div className="space-y-5">
        {demographics.map((demo, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span
                className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {demo.country}
              </span>
              <div className="text-right">
                <span
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {demo.users.toLocaleString()}
                </span>
                <span
                  className={`text-sm ml-2 ${
                    demo.growth >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {demo.growth >= 0 ? "↑" : "↓"} {Math.abs(demo.growth)}%
                </span>
              </div>
            </div>
            <div
              className={`w-full bg-gray-200 rounded-full h-2.5 ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <motion.div
                className="bg-blue-600 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${demo.percentage}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => console.log("View all demographics")}
          className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
        >
          View Full Report
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
              d="M14 5l7 7m极速赛车开奖直播 0 0l-7 7m7-7H3"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Komponen untuk Recent Signups
const RecentSignups = ({ darkMode }) => {
  const signups = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      signupDate: "2023-04-22",
      source: "Organic",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      signupDate: "2023-04-21",
      source: "Referral",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Robert Johnson",
      email: "robert@example.com",
      signupDate: "2023-04-20",
      source: "Social Media",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Sarah Williams",
      email: "sarah@example.com",
      signupDate: "2023-04-19",
      source: "Paid Ads",
      avatar:
        "极速赛车开奖直播 https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Michael Brown",
      email: "michael@example.com",
      signupDate: "2023-04-18",
      source: "Organic",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  const getSourceColor = (source) => {
    switch (source) {
      case "Organic":
        return "bg-green-100 text-green-800";
      case "Referral":
        return "bg-blue-100 text-blue-800";
      case "Social Media":
        return "bg-purple-100 text-purple-800";
      case "Paid Ads":
        return "bg-yellow-100 text-yellow-800";
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
      <h3
        className={`text-xl font-semibold mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Recent Signups
      </h3>

      <div className="space-y-4">
        {signups.map((signup, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl ${
              darkMode ? "bg-gray-750" : "bg-white border"
            } shadow-sm`}
          >
            <div className="flex items-center">
              <img
                src={signup.avatar}
                alt={signup.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3 flex-1">
                <h4
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {signup.name}
                </h4>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {signup.email}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getSourceColor(
                    signup.source
                  )}`}
                >
                  {signup.source}
                </span>
                <p
                  className={`text-xs mt-1 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {signup.signupDate}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => console.log("View all signups")}
          className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
        >
          View All Signups
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w极速赛车开奖直播 .w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7极速赛车开奖直播 m7-7H3"
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
  const [selectedRange, setSelectedRange] = useState("last_30_days");

  const ranges = [
    { id: "today", label: "Today" },
    { id: "yesterday", label: "Yesterday" },
    { id: "last_7_days", label: "Last 7 days" },
    { id: "last_30_days", label: "Last 30 days" },
    { id: "this_month", label: "This month极速赛车开奖直播 " },
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center ${
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
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full left-0 mt-1 py-2 rounded-xl shadow-lg z-10 min-w-full ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            {ranges.map((range) => (
              <motion.button
                key={range.id}
                whileHover={{
                  backgroundColor: darkMode ? "#374151" : "#f3f4f6",
                }}
                onClick={() => handleRangeSelect(range.id)}
                className={`block w-full text-left px-4 py-2 text-sm ${
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
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Quick Actions Component
const QuickActions = ({ darkMode, onActionClick }) => {
  const actions = [
    {
      title: "Add User",
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
      action: "add_user",
      color: "bg-blue-500",
    },
    {
      title: "Import Users",
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
      action: "import_users",
      color: "bg-green-500",
    },
    {
      title: "Export Data",
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
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      ),
      action: "export_data",
      color: "bg-yellow-500",
    },
    {
      title: "Bulk Actions",
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      action: "bulk_actions",
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
              onClick={() => onActionClick(action.action)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl ${
                darkMode ? "bg-gray-750" : "bg-gray-100"
              }`}
              whileHover={{ y: -3, scale: 1.05, opacity: 0.9 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
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

export default function UsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  const handleDateChange = (range) => {
    console.log(`Date range changed to: ${range}`);
  };

  const handleChartOptions = (chartTitle) => {
    console.log(`Options clicked for: ${chartTitle}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
    console.log("User clicked:", user);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowUserModal(true);
    console.log("Add user clicked");
  };

  const handleQuickAction = (action) => {
    console.log("Quick action:", action);
    switch (action) {
      case "add_user":
        handleAddUser();
        break;
      case "import_users":
        // Logic to import users
        break;
      case "export_data":
        // Logic to export data
        break;
      case "bulk_actions":
        // Logic for bulk actions
        break;
      default:
        break;
    }
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
          <div className="p-6 rounded-2xl shadow-md border border-transparent hover:shadow-lg">
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
                  User Management
                </h1>
                <p
                  className={`mt-2 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Manage your users and their permissions
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-xl ${
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
            <QuickActions
              darkMode={darkMode}
              onActionClick={handleQuickAction}
            />

            {/* Stat Cards */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Users"
                  value={5423}
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
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Total number of registered users"
                  onClick={() => console.log("Total users clicked")}
                />
                <StatCard
                  title="Active Users"
                  value={3245}
                  change={12.3}
                  icon={
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill极速赛车开奖直播="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Users active in the last 30 days"
                  onClick={() => console.log("Active users clicked")}
                />
                <StatCard
                  title="New Users"
                  value={245}
                  change={5.2}
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
                        d="M18 9v30v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="New users in the selected period"
                  onClick={() => console.log("New users clicked")}
                />
                <StatCard
                  title="Avg. Session"
                  value={12.7}
                  change={-2.1}
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Average session duration in minutes"
                  onClick={() => console.log("Avg session clicked")}
                />
              </div>
            </AnimatedSection>

            {/* Charts Row */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UserGrowthChart
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("User Growth")}
                />
                <UserDemographics darkMode={darkMode} />
              </div>
            </AnimatedSection>
            <AnimatedSection className="mb-6">
              <UserList
                darkMode={darkMode}
                onOptionsClick={() => handleChartOptions("User List")}
                onUserClick={handleUserClick}
              />
            </AnimatedSection>
            {/* User List and Recent Signups */}
            <AnimatedSection className="mb-6">
              <RecentSignups darkMode={darkMode} />
            </AnimatedSection>
          </div>
        </main>

        <div className="relative z-10 mt-auto">
          <Footer darkMode={darkMode} />
        </div>

        {/* User Modal */}
        <AnimatePresence>
          {showUserModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowUserModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`rounded-2xl p-6 max-w-md w-full ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <h2
                  className={`text-xl font-bold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {selectedUser ? "User Details" : "Add New User"}
                </h2>

                {selectedUser ? (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <img
                        src={selectedUser.avatar}
                        alt={selectedUser.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <h3
                          className={`font-semibold ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {selectedUser.name}
                        </h3>
                        <p
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        >
                          {selectedUser.email}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p
                          className={`font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Status
                        </p>
                        <p
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        >
                          {selectedUser.status}
                        </p>
                      </div>
                      <div>
                        <p
                          className={`font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Role
                        </p>
                        <p
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        >
                          {selectedUser.role}
                        </p>
                      </div>
                      <div>
                        <p
                          className={`font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Joined
                        </p>
                        <p
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        >
                          {selectedUser.joinDate}
                        </p>
                      </div>
                      <div>
                        <p
                          className={`font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Last Active
                        </p>
                        <p
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        >
                          {selectedUser.lastActive}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowUserModal(false)}
                        className={`px-4 py-2 rounded-xl ${
                          darkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        Close
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => console.log("Edit user", selectedUser)}
                        className={`px-4 py-2 rounded-xl ${
                          darkMode
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }`}
                      >
                        Edit User
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                      Add a new user to your system with appropriate permissions
                      and role.
                    </p>
                    <div className="flex justify-end space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowUserModal(false)}
                        className={`px-4 py-2 rounded-xl ${
                          darkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => console.log("Create new user")}
                        className={`px-4 py-2 rounded-xl ${
                          darkMode
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }`}
                      >
                        Create User
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
