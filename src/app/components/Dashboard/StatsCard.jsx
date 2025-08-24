"use client";

import { MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import { useDarkModeCtx } from "@/app/DarkModeContext"; // sesuaikan path

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  onClick,
}) {
  const { darkMode } = useDarkModeCtx(); // ← ambil dari context
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const isPositive = change.value >= 0;

  // Warna yang akan berubah berdasarkan mode
  const bgGradientFrom = darkMode ? "from-[#1e293b]" : "from-[#f1f5f9]";
  const bgGradientTo = darkMode ? "to-[#0f172a]" : "to-[#e2e8f0]";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-300";
  const textPrimary = darkMode ? "text-gray-100" : "text-gray-800";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600";
  const hoverBg = darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200";
  const menuBg = darkMode ? "bg-[#1e293b]" : "bg-white";
  const menuBorder = darkMode ? "border-gray-700" : "border-gray-200";
  const menuItemHover = darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100";
  const menuItemText = darkMode ? "text-gray-300" : "text-gray-700";
  const progressBg = darkMode ? "bg-gray-800" : "bg-gray-200";

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div
      className={`bg-gradient-to-br ${bgGradientFrom} ${bgGradientTo} shadow-lg rounded-2xl p-5 flex flex-col gap-3 hover:shadow-xl transition-all duration-300 cursor-pointer border ${borderColor} relative overflow-hidden group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      style={{
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Hover effect overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
          isPositive
            ? "from-green-500 to-blue-500"
            : "from-red-500 to-orange-500"
        }`}
      ></div>

      {/* Header with title and menu */}
      <div className="flex justify-between items-start">
        <h3 className={`text-sm font-medium ${textSecondary}`}>{title}</h3>

        <button
          onClick={handleMenuClick}
          className={`p-1 rounded-full ${hoverBg} transition-colors`}
        >
          <MoreHorizontal size={16} className={textSecondary} />
        </button>
      </div>

      {/* Value with icon */}
      <div className="flex items-center gap-3">
        {Icon && (
          <div
            className={`p-2 rounded-lg ${
              isPositive
                ? "bg-green-900/30 text-green-400"
                : "bg-red-900/30 text-red-400"
            }`}
          >
            <Icon size={20} />
          </div>
        )}
        <p className={`text-2xl font-bold ${textPrimary}`}>{value}</p>
      </div>

      {/* Change indicator */}
      <div className="flex items-center gap-1 text-sm mt-1">
        {isPositive ? (
          <>
            <TrendingUp size={16} className="text-green-500" />
            <span className="font-medium text-green-400">+{change.value}</span>
          </>
        ) : (
          <>
            <TrendingDown size={16} className="text-red-500" />
            <span className="font-medium text-red-400">{change.value}</span>
          </>
        )}
        <span className={textSecondary}>vs last week</span>
      </div>

      {/* Mini progress bar */}
      <div className={`w-full ${progressBg} rounded-full h-1.5 mt-2`}>
        <div
          className={`h-1.5 rounded-full ${
            isPositive ? "bg-green-500" : "bg-red-500"
          }`}
          style={{
            width: `${Math.min((Math.abs(change.value) / 20) * 100, 100)}%`,
          }}
        ></div>
      </div>

      {/* Context menu */}
      {showMenu && (
        <div
          className={`absolute right-3 top-10 ${menuBg} shadow-lg rounded-lg p-2 z-10 border ${menuBorder}`}
        >
          <button
            className={`w-full text-left px-3 py-2 text-sm ${menuItemHover} rounded-md ${menuItemText}`}
          >
            View Details
          </button>
          <button
            className={`w-full text-left px-3 py-2 text-sm ${menuItemHover} rounded-md ${menuItemText}`}
          >
            Export Data
          </button>
          <button
            className={`w-full text-left px-3 py-2 text-sm ${menuItemHover} rounded-md text-red-400`}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
