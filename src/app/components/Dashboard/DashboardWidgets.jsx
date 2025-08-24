"use client";

import { useState } from "react";
import {
  MoreVertical,
  CheckCircle,
  Clock,
  Download,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useDarkModeCtx } from "@/app/DarkModeContext"; // sesuaikan path

// Daftar ikon browser dari CDN
const browserIcons = {
  chrome:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg",
  edge: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/edge/edge-original.svg",
  firefox:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firefox/firefox-original.svg",
  safari:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/safari/safari-original.svg",
  opera:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opera/opera-original.svg",
};

// Component untuk badge status
const StatusBadge = ({ status, darkMode }) => {
  const statusConfig = {
    Paid: {
      text: "text-green-400",
      icon: CheckCircle,
    },
    Pending: {
      text: "text-yellow-400",
      icon: Clock,
    },
  };

  const config = statusConfig[status] || statusConfig.Pending;
  const Icon = config.icon;

  return (
    <div
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${config.bg} ${config.text}`}
    >
      <Icon size={12} />
      <span>{status}</span>
    </div>
  );
};

export default function DashboardWidgets() {
  const { darkMode } = useDarkModeCtx(); // ← ambil dari context
  const [showCustomerMenu, setShowCustomerMenu] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});

  // Warna yang akan berubah berdasarkan mode
  const bgGradientFrom = darkMode ? "from-[#1e293b]" : "from-[#f1f5f9]";
  const bgGradientTo = darkMode ? "to-[#0f172a]" : "to-[#e2e8f0]";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-300";
  const textPrimary = darkMode ? "text-gray-100" : "text-gray-800";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600";
  const hoverBg = darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200";
  const buttonBg = darkMode ? "bg-gray-800/50" : "bg-gray-100";
  const menuBg = darkMode ? "bg-[#1e293b]" : "bg-white";
  const menuBorder = darkMode ? "border-gray-700" : "border-gray-200";
  const menuItemText = darkMode ? "text-gray-300" : "text-gray-700";
  const menuItemHover = darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100";
  const avatarBg = darkMode ? "bg-blue-900/30" : "bg-blue-100";
  const avatarText = darkMode ? "text-blue-400" : "text-blue-600";

  const toggleTaskCompletion = (index) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCustomerMenuClick = (id, e) => {
    e.stopPropagation();
    setShowCustomerMenu(showCustomerMenu === id ? null : id);
  };

  const browserData = [
    {
      name: "Chrome",
      company: "Google, Inc.",
      users: "35,502",
      percent: "64.75%",
      trend: "up",
      icon: browserIcons.chrome,
    },
    {
      name: "Edge",
      company: "Microsoft Corporation, Inc.",
      users: "25,364",
      percent: "24.37%",
      trend: "up",
      icon: browserIcons.edge,
    },
    {
      name: "Firefox",
      company: "Mozilla Foundation, Inc.",
      users: "14,635",
      percent: "15.63%",
      trend: "down",
      icon: browserIcons.firefox,
    },
    {
      name: "Safari",
      company: "Apple Corporation, Inc.",
      users: "35,657",
      percent: "12.54%",
      trend: "up",
      icon: browserIcons.safari,
    },
    {
      name: "Opera",
      company: "Opera, Inc.",
      users: "12,563",
      percent: "8.12%",
      trend: "down",
      icon: browserIcons.opera,
    },
  ];

  const customerData = [
    { id: 1, name: "Samantha Melon", status: "Paid", avatar: "SM" },
    { id: 2, name: "Allie Grater", status: "Pending", avatar: "AG" },
    { id: 3, name: "Gabe Lackmen", status: "Pending", avatar: "GL" },
    { id: 4, name: "Manuel Labor", status: "Paid", avatar: "ML" },
    { id: 5, name: "Hercules Bing", status: "Paid", avatar: "HB" },
    { id: 6, name: "Manuel Labor", status: "Pending", avatar: "ML" },
  ];

  const taskData = [
    {
      task: "Accurate information at any given point.",
      time: "Today",
      priority: "high",
    },
    {
      task: "Sharing the information with clients or stakeholders.",
      time: "Today",
      priority: "medium",
    },
    {
      task: "Hearing the information and responding.",
      time: "22 hrs",
      priority: "low",
    },
    {
      task: "Setting up and customizing your own sales.",
      time: "1 Day",
      priority: "medium",
    },
    {
      task: "To have a complete 360° overview of sales information.",
      time: "2 Days",
      priority: "high",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Browser Usage Widget */}
      <div
        className={`bg-gradient-to-br ${bgGradientFrom} ${bgGradientTo} rounded-2xl shadow-lg p-5 border ${borderColor}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-semibold ${textPrimary}`}>
            Browser Usage
          </h2>
          <div className="flex gap-2">
            <button className={`p-2 ${hoverBg} rounded-lg transition-colors`}>
              <Filter size={16} className={textSecondary} />
            </button>
            <button className={`p-2 ${hoverBg} rounded-lg transition-colors`}>
              <Download size={16} className={textSecondary} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {browserData.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-3 rounded-lg ${
                darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"
              } transition-colors cursor-pointer group`}
              onClick={() => console.log(`Browser: ${item.name}`)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  } flex items-center justify-center`}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-5 h-5"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className={`hidden w-8 h-8 rounded-lg ${
                      darkMode ? "bg-blue-500" : "bg-blue-400"
                    } items-center justify-center text-white text-xs font-bold`}
                  >
                    {item.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <p className={`font-medium ${textPrimary}`}>{item.name}</p>
                  <span className={`text-xs ${textSecondary}`}>
                    {item.company}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${textPrimary}`}>{item.users}</p>
                <div className="flex items-center gap-1 text-xs">
                  {item.trend === "up" ? (
                    <TrendingUp size={12} className="text-green-400" />
                  ) : (
                    <TrendingDown size={12} className="text-red-400" />
                  )}
                  <span
                    className={`${
                      item.trend === "up" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {item.percent}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className={`w-full mt-4 py-2 ${buttonBg} hover:${
            darkMode ? "bg-gray-800" : "bg-gray-200"
          } ${textSecondary} rounded-lg transition-colors flex items-center justify-center gap-2`}
        >
          <Plus size={16} />
          <span>Add Browser</span>
        </button>
      </div>

      {/* Recent Customers Widget */}
      <div
        className={`bg-gradient-to-br ${bgGradientFrom} ${bgGradientTo} rounded-2xl shadow-lg p-5 border ${borderColor}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-semibold ${textPrimary}`}>
            Recent Customers
          </h2>
          <div className="flex gap-2">
            <button className={`p-2 ${hoverBg} rounded-lg transition-colors`}>
              <Filter size={16} className={textSecondary} />
            </button>
            <button className={`p-2 ${hoverBg} rounded-lg transition-colors`}>
              <Download size={16} className={textSecondary} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {customerData.map((user, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-3 rounded-lg ${
                darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"
              } transition-colors relative`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${avatarBg} flex items-center justify-center ${avatarText} font-medium`}
                >
                  {user.avatar}
                </div>
                <div>
                  <p className={`font-medium ${textPrimary}`}>{user.name}</p>
                  <span className={`text-xs ${textSecondary}`}>
                    ID: #{user.id}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={user.status} darkMode={darkMode} />

                <button
                  onClick={(e) => handleCustomerMenuClick(user.id, e)}
                  className={`p-1 ${hoverBg} rounded transition-colors`}
                >
                  <MoreVertical size={14} className={textSecondary} />
                </button>

                {showCustomerMenu === user.id && (
                  <div
                    className={`absolute right-3 top-10 ${menuBg} shadow-lg rounded-lg p-2 z-10 border ${menuBorder}`}
                  >
                    <button
                      className={`flex items-center gap-2 w-full px-3 py-2 text-sm ${menuItemHover} rounded-md ${menuItemText}`}
                    >
                      <Eye size={14} />
                      <span>View Details</span>
                    </button>
                    <button
                      className={`flex items-center gap-2 w-full px-3 py-2 text-sm ${menuItemHover} rounded-md ${menuItemText}`}
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      className={`flex items-center gap-2 w-full px-3 py-2 text-sm ${menuItemHover} rounded-md text-red-400`}
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          className={`w-full mt-4 py-2 ${buttonBg} hover:${
            darkMode ? "bg-gray-800" : "bg-gray-200"
          } ${textSecondary} rounded-lg transition-colors flex items-center justify-center gap-2`}
        >
          <span>View All Customers</span>
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Main Tasks Widget */}
      <div
        className={`bg-gradient-to-br ${bgGradientFrom} ${bgGradientTo} rounded-2xl shadow-lg p-5 border ${borderColor}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-semibold ${textPrimary}`}>Main Tasks</h2>
          <div className="flex gap-2">
            <button className={`p-2 ${hoverBg} rounded-lg transition-colors`}>
              <Filter size={16} className={textSecondary} />
            </button>
            <button
              className={`px-3 py-1 ${
                darkMode ? "bg-blue-900/30" : "bg-blue-100"
              } text-blue-400 rounded-lg text-sm ${
                darkMode ? "hover:bg-blue-900/50" : "hover:bg-blue-200"
              } transition-colors flex items-center gap-2`}
            >
              <Plus size={14} />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {taskData.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-start justify-between p-3 rounded-lg transition-colors ${
                completedTasks[idx]
                  ? "opacity-60"
                  : darkMode
                  ? "hover:bg-gray-800/50"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                <button
                  onClick={() => toggleTaskCompletion(idx)}
                  className={`mt-1 p-1 rounded-full border ${
                    completedTasks[idx]
                      ? "bg-green-500/20 border-green-500 text-green-400"
                      : `${
                          darkMode ? "border-gray-600" : "border-gray-300"
                        } text-transparent hover:border-blue-500`
                  }`}
                >
                  <CheckCircle size={14} />
                </button>

                <div className="flex-1">
                  <p
                    className={`text-sm ${
                      completedTasks[idx]
                        ? "line-through text-gray-500"
                        : textPrimary
                    }`}
                  >
                    {item.task}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-xs ${textSecondary}`}>
                      {item.time}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        item.priority === "high"
                          ? "text-red-400"
                          : item.priority === "medium"
                          ? " text-yellow-400"
                          : " text-blue-400"
                      }`}
                    >
                      {item.priority} priority
                    </span>
                  </div>
                </div>
              </div>

              <button className={`p-1 ${hoverBg} rounded transition-colors`}>
                <MoreVertical size={14} className={textSecondary} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
