"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function StorageCard({ name = "Radit", usage = 75, total = 100 }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Animate progress value on component mount
    const timer = setTimeout(() => setProgress(usage), 100);
    return () => clearTimeout(timer);
  }, [usage]);

  const data = [
    { name: "Used", value: progress },
    { name: "Free", value: total - progress },
  ];

  const COLORS = ["#3b82f6", "#334155"];

  return (
    <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-gray-600">
      {/* Header Section */}
      <div className="w-full text-left mb-4">
        <h2 className="text-xl font-bold text-gray-100">Hi, {name} 👋</h2>
        <p className="text-gray-400 text-sm mt-1">Here's your storage usage</p>
      </div>

      {/* Chart Section */}
      <div className="relative w-full flex justify-center my-5">
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
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-100">{progress}%</span>
            <span className="text-xs text-gray-400 mt-0.5">used</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Storage Info */}
      <div className="flex justify-between w-full mb-5">
        <div className="text-left">
          <p className="text-xs text-gray-400">Used</p>
          <p className="text-sm font-medium text-gray-100">{usage} GB</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-sm font-medium text-gray-100">{total} GB</p>
        </div>
      </div>

      {/* CTA Button */}
      <button className="mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
        Upgrade Now
        <ArrowUpRight size={16} />
      </button>
    </div>
  );
}