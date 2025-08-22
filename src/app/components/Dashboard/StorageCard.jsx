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

export default function StorageCard({
  name = "Radit",
  usage = 75,
  total = 100,
}) {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(usage), 100);
    return () => clearTimeout(timer);
  }, [usage]);

  const data = [
    { name: "Used", value: progress },
    { name: "Free", value: total - progress },
  ];

  const COLORS = ["#3b82f6", "#334155"];

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
      className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-lg p-6 flex flex-col border border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-blue-500/30 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 animate-pulse"></div>
      )}

      <div className="flex justify-between items-start mb-4 z-10">
        <div>
          <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
            <HardDrive className="text-blue-400" size={20} />
            Storage Overview
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Hello, {name}! Here's your storage usage
          </p>
        </div>

        <div className="flex gap-2">
          <button
            className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-blue-400 transition-colors"
            onClick={handleSettings}
            title="Storage Settings"
          >
            <Settings size={16} />
          </button>
          <button
            className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-green-400 transition-colors"
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
            <span className="text-2xl font-bold text-gray-100">
              {progress}%
            </span>
            <span className="text-xs text-gray-400 mt-0.5">used</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-400">Storage Usage</span>
              <span className="text-sm font-medium text-gray-100">
                {usage} GB / {total} GB
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out shadow-md"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Database size={14} className="text-blue-400" />
                <span className="text-xs text-gray-400">Used</span>
              </div>
              <p className="text-sm font-medium text-gray-100">{usage} GB</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Cloud size={14} className="text-green-400" />
                <span className="text-xs text-gray-400">Available</span>
              </div>
              <p className="text-sm font-medium text-gray-100">
                {total - usage} GB
              </p>
            </div>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="mb-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700 animate-fadeIn">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <BarChart3 size={12} className="text-purple-400" />
              <span className="text-gray-400">Files:</span>
              <span className="text-gray-100">1,245</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={12} className="text-yellow-400" />
              <span className="text-gray-400">Last Backup:</span>
              <span className="text-gray-100">2 days ago</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={12} className="text-cyan-400" />
              <span className="text-gray-400">Performance:</span>
              <span className="text-gray-100">Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={12} className="text-green-400" />
              <span className="text-gray-400">Security:</span>
              <span className="text-gray-100">Protected</span>
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
            className="p-3 rounded-xl bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-blue-400 transition-colors flex items-center justify-center"
            onClick={handleDownload}
            title="Download Report"
          >
            <Download size={16} />
          </button>
          <button
            className="p-3 rounded-xl bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-green-400 transition-colors flex items-center justify-center"
            onClick={() => console.log("Upload files clicked")}
            title="Upload Files"
          >
            <Upload size={16} />
          </button>
          <button
            className={`p-3 rounded-xl transition-colors flex items-center justify-center ${
              showDetails
                ? "bg-blue-500/20 text-blue-400"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-yellow-400"
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
