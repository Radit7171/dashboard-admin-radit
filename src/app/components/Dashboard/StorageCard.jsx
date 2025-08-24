"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  ArrowUpRight,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Info,
  Shield,
  Zap,
  Calendar,
  BarChart3,
  Cloud,
  Database,
  HardDrive,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useDarkModeCtx } from "@/app/DarkModeContext"; // sesuaikan path

export default function StorageCard({
  name = "Radit",
  usage = 75,
  total = 100,
}) {
  const { darkMode } = useDarkModeCtx(); // ← ambil dari context
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setProgress(usage), 100);
    return () => clearTimeout(t);
  }, [usage]);

  const data = [
    { name: "Used", value: progress },
    { name: "Free", value: total - progress },
  ];

  const COLORS = darkMode ? ["#3b82f6", "#334155"] : ["#3b82f6", "#e5e7eb"];
  const gradientFrom = darkMode ? "from-[#1e293b]" : "from-[#f1f5f9]";
  const gradientTo = darkMode ? "to-[#0f172a]" : "to-[#e2e8f0]";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-300";
  const hoverBorder = darkMode
    ? "hover:border-blue-500/30"
    : "hover:border-blue-400/50";
  const textPrimary = darkMode ? "text-gray-100" : "text-gray-800";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600";
  const buttonBg = darkMode ? "bg-gray-800" : "bg-gray-100";
  const buttonHover = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200";
  const detailsBg = darkMode ? "bg-gray-800/30" : "bg-gray-100/80";
  const detailsBorder = darkMode ? "border-gray-700" : "border-gray-300";
  const progressBg = darkMode ? "bg-gray-700" : "bg-gray-300";

  const handleUpgrade = () => {
    console.log("Upgrade storage clicked");
  };

  const handleSettings = () => {
    console.log("Storage settings clicked");
  };

  const handleRefresh = () => {
    console.log("Refresh storage data clicked");
    setProgress(0);
    setTimeout(() => setProgress(usage), 500);
  };

  const handleDownload = () => {
    console.log("Download storage report clicked");
  };

  const handleDetails = () => {
    setShowDetails(!showDetails);
    console.log(`Storage details ${showDetails ? "hidden" : "shown"}`);
  };

  return (
    <div
      className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl shadow-lg p-6 flex flex-col border ${borderColor} transition-all duration-300 hover:shadow-xl ${hoverBorder} relative overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 animate-pulse`}
        ></div>
      )}

      <div className="flex justify-between items-start mb-4 z-10">
        <div>
          <h2
            className={`text-xl font-bold ${textPrimary} flex items-center gap-2`}
          >
            <HardDrive className="text-blue-400" size={20} />
            Storage Overview
          </h2>
          <p className={`${textSecondary} text-sm mt-1`}>
            Hello, {name}! Here's your storage usage
          </p>
        </div>

        <div className="flex gap-2">
          <button
            className={`p-2 rounded-lg ${buttonBg} ${textSecondary} ${buttonHover} hover:text-blue-400 transition-colors`}
            onClick={handleSettings}
            title="Storage Settings"
          >
            <Settings size={16} />
          </button>
          <button
            className={`p-2 rounded-lg ${buttonBg} ${textSecondary} ${buttonHover} hover:text-green-400 transition-colors`}
            onClick={handleRefresh}
            title="Refresh Data"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6 mb-5 z-10">
        <div className="relative w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={55}
                outerRadius={75}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
                dataKey="value"
                animationDuration={1000}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${textPrimary}`}>
              {progress}%
            </span>
            <span className={`text-xs ${textSecondary} mt-0.5`}>used</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className={`text-sm ${textSecondary}`}>Storage Usage</span>
              <span className={`text-sm font-medium ${textPrimary}`}>
                {usage} GB / {total} GB
              </span>
            </div>
            <div
              className={`w-full ${progressBg} rounded-full h-2 overflow-hidden`}
            >
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out shadow-md"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={`${buttonBg} p-3 rounded-lg`}>
              <div className="flex items-center gap-2 mb-1">
                <Database size={14} className="text-blue-400" />
                <span className={`text-xs ${textSecondary}`}>Used</span>
              </div>
              <p className={`text-sm font-medium ${textPrimary}`}>{usage} GB</p>
            </div>
            <div className={`${buttonBg} p-3 rounded-lg`}>
              <div className="flex items-center gap-2 mb-1">
                <Cloud size={14} className="text-green-400" />
                <span className={`text-xs ${textSecondary}`}>Available</span>
              </div>
              <p className={`text-sm font-medium ${textPrimary}`}>
                {total - usage} GB
              </p>
            </div>
          </div>
        </div>
      </div>

      {showDetails && (
        <div
          className={`mb-4 p-3 ${detailsBg} rounded-lg border ${detailsBorder} animate-fadeIn`}
        >
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <BarChart3 size={12} className="text-purple-400" />
              <span className={textSecondary}>Files:</span>
              <span className={textPrimary}>1,245</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={12} className="text-yellow-400" />
              <span className={textSecondary}>Last Backup:</span>
              <span className={textPrimary}>2 days ago</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={12} className="text-cyan-400" />
              <span className={textSecondary}>Performance:</span>
              <span className={textPrimary}>Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={12} className="text-green-400" />
              <span className={textSecondary}>Security:</span>
              <span className={textPrimary}>Protected</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 z-10">
        <button
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          onClick={handleUpgrade}
        >
          <ArrowUpRight size={16} />
          Upgrade Storage
        </button>

        <div className="flex gap-2">
          <button
            className={`p-3 rounded-xl ${buttonBg} ${textSecondary} ${buttonHover} hover:text-blue-400 transition-colors flex items-center justify-center`}
            onClick={handleDownload}
            title="Download Report"
          >
            <Download size={16} />
          </button>
          <button
            className={`p-3 rounded-xl ${buttonBg} ${textSecondary} ${buttonHover} hover:text-green-400 transition-colors flex items-center justify-center`}
            onClick={() => console.log("Upload files clicked")}
            title="Upload Files"
          >
            <Upload size={16} />
          </button>
          <button
            className={`p-3 rounded-xl transition-colors flex items-center justify-center ${
              showDetails
                ? "bg-blue-500/20 text-blue-400"
                : `${buttonBg} ${textSecondary} ${buttonHover} hover:text-yellow-400`
            }`}
            onClick={handleDetails}
            title={showDetails ? "Hide Details" : "Show Details"}
          >
            <Info size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
