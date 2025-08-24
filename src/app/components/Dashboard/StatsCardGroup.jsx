"use client";

import StatsCard from "./StatsCard";
import { ShoppingBag, DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import { useState } from "react";
import { useDarkModeCtx } from "@/app/DarkModeContext"; // sesuaikan path

export default function StatsCardGroup() {
  const { darkMode } = useDarkModeCtx(); // ← ambil dari context
  const [activeFilter, setActiveFilter] = useState("weekly");

  // Warna yang akan berubah berdasarkan mode
  const textPrimary = darkMode ? "text-gray-100" : "text-gray-800";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600";
  const filterBg = darkMode ? "bg-gray-800" : "bg-gray-200";
  const filterActiveBg = darkMode ? "bg-[#1e293b]" : "bg-white";
  const filterActiveText = darkMode ? "text-gray-100" : "text-gray-800";
  const summaryBg = darkMode
    ? "from-blue-900/30 to-indigo-900/30"
    : "from-blue-100 to-indigo-100";
  const summaryBorder = darkMode ? "border-blue-800/30" : "border-blue-200";
  const summaryButtonBg = darkMode ? "bg-[#1e293b]" : "bg-white";
  const summaryButtonBorder = darkMode
    ? "border-blue-700/30"
    : "border-blue-200";

  const stats = [
    {
      title: "Today Orders",
      value: "5,472",
      change: { value: 427 },
      icon: ShoppingBag,
    },
    {
      title: "Today Earnings",
      value: "$7,589",
      change: { value: -453 },
      icon: DollarSign,
    },
    {
      title: "Profit Gain",
      value: "$8,943",
      change: { value: 788 },
      icon: TrendingUp,
    },
    {
      title: "Total Earnings",
      value: "$57.2M",
      change: { value: -693 },
      icon: BarChart3,
    },
  ];

  const handleCardClick = (title) => {
    console.log(`Card clicked: ${title}`);
    // Dummy function - bisa diganti dengan navigasi atau modal
    alert(`You clicked on ${title}`);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    console.log(`Filter changed to: ${filter}`);
    // Dummy function - bisa diganti dengan data fetching
  };

  return (
    <div className="space-y-6">
      {/* Header with filter options */}
      <div className="flex justify-between items-center">
        <h2 className={`text-xl font-bold ${textPrimary}`}>
          Performance Metrics
        </h2>

        <div className={`flex ${filterBg} p-1 rounded-lg`}>
          {["daily", "weekly", "monthly"].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                activeFilter === filter
                  ? `${filterActiveBg} ${filterActiveText} shadow-sm`
                  : `${textSecondary} hover:${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <StatsCard
            key={idx}
            title={item.title}
            value={item.value}
            change={item.change}
            icon={item.icon}
            onClick={() => handleCardClick(item.title)}
          />
        ))}
      </div>

      {/* Summary section */}
      <div
        className={`bg-gradient-to-r ${summaryBg} p-4 rounded-2xl border ${summaryBorder}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-medium ${textPrimary}`}>
              Performance Summary
            </h3>
            <p className={`text-sm ${textSecondary} mt-1`}>
              {activeFilter === "daily"
                ? "Today's performance overview"
                : activeFilter === "weekly"
                ? "This week's performance overview"
                : "This month's performance overview"}
            </p>
          </div>
          <button
            className={`${summaryButtonBg} text-blue-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900/30 transition-colors border ${summaryButtonBorder}`}
          >
            View Report
          </button>
        </div>
      </div>
    </div>
  );
}
