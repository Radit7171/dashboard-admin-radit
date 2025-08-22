// StatsCard.jsx
"use client";

import { MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

export default function StatsCard({ title, value, change, icon: Icon, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const isPositive = change.value >= 0;

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
      className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] shadow-lg rounded-2xl p-5 flex flex-col gap-3 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-700 relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
      }}
    >
      {/* Hover effect overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
        isPositive ? 'from-green-500 to-blue-500' : 'from-red-500 to-orange-500'
      }`}></div>
      
      {/* Header with title and menu */}
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        
        <button 
          onClick={handleMenuClick}
          className="p-1 rounded-full hover:bg-gray-800 transition-colors"
        >
          <MoreHorizontal size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Value with icon */}
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={`p-2 rounded-lg ${
            isPositive ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
          }`}>
            <Icon size={20} />
          </div>
        )}
        <p className="text-2xl font-bold text-gray-100">{value}</p>
      </div>

      {/* Change indicator */}
      <div className="flex items-center gap-1 text-sm mt-1">
        {isPositive ? (
          <>
            <TrendingUp size={16} className="text-green-500" />
            <span className="font-medium text-green-400">
              +{change.value}
            </span>
          </>
        ) : (
          <>
            <TrendingDown size={16} className="text-red-500" />
            <span className="font-medium text-red-400">
              {change.value}
            </span>
          </>
        )}
        <span className="text-gray-500">vs last week</span>
      </div>

      {/* Mini progress bar */}
      <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
        <div 
          className={`h-1.5 rounded-full ${
            isPositive ? 'bg-green-500' : 'bg-red-500'
          }`}
          style={{ width: `${Math.min(Math.abs(change.value) / 20 * 100, 100)}%` }}
        ></div>
      </div>

      {/* Context menu */}
      {showMenu && (
        <div className="absolute right-3 top-10 bg-[#1e293b] shadow-lg rounded-lg p-2 z-10 border border-gray-700">
          <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-800 rounded-md text-gray-300">
            View Details
          </button>
          <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-800 rounded-md text-gray-300">
            Export Data
          </button>
          <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-800 rounded-md text-red-400">
            Remove
          </button>
        </div>
      )}
    </div>
  );
}