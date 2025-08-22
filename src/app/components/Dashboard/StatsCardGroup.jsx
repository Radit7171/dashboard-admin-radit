// StatsCardGroup.jsx
"use client";

import StatsCard from "./StatsCard";
import { ShoppingBag, DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import { useState } from "react";

export default function StatsCardGroup() {
  const [activeFilter, setActiveFilter] = useState("weekly");
  
  const stats = [
    { 
      title: "Today Orders", 
      value: "5,472", 
      change: { value: 427 },
      icon: ShoppingBag
    },
    { 
      title: "Today Earnings", 
      value: "$7,589", 
      change: { value: -453 },
      icon: DollarSign
    },
    { 
      title: "Profit Gain", 
      value: "$8,943", 
      change: { value: 788 },
      icon: TrendingUp
    },
    { 
      title: "Total Earnings", 
      value: "$57.2M", 
      change: { value: -693 },
      icon: BarChart3
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
        <h2 className="text-xl font-bold text-gray-100">Performance Metrics</h2>
        
        <div className="flex bg-gray-800 p-1 rounded-lg">
          {["daily", "weekly", "monthly"].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                activeFilter === filter
                  ? "bg-[#1e293b] text-gray-100 shadow-sm"
                  : "text-gray-500 hover:text-gray-300"
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
      <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 p-4 rounded-2xl border border-blue-800/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-100">Performance Summary</h3>
            <p className="text-sm text-gray-400 mt-1">
              {activeFilter === "daily" 
                ? "Today's performance overview" 
                : activeFilter === "weekly" 
                ? "This week's performance overview" 
                : "This month's performance overview"}
            </p>
          </div>
          <button className="bg-[#1e293b] text-blue-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900/30 transition-colors border border-blue-700/30">
            View Report
          </button>
        </div>
      </div>
    </div>
  );
}