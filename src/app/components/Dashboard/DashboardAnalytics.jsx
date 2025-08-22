"use client";

import { useState } from "react";
import { 
  MoreVertical, 
  Download, 
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  Truck,
  Box,
  CheckCircle,
  Clock,
  BarChart3,
  Calendar
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Component untuk progress bar
const ProgressBar = ({ percentage, color }) => {
  return (
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

// Component untuk metric card
const MetricCard = ({ title, value, change, icon: Icon, onClick }) => {
  const isPositive = change.value >= 0;

  return (
    <div 
      className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-xl font-bold text-gray-100 mt-1">{value}</p>
          <div className="flex items-center gap-1 mt-2">
            {isPositive ? (
              <TrendingUp size={14} className="text-green-400" />
            ) : (
              <TrendingDown size={14} className="text-red-400" />
            )}
            <span className={`text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{change.value}% {change.period}
            </span>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-gray-800">
          <Icon size={18} className="text-blue-400" />
        </div>
      </div>
    </div>
  );
};

export default function AnalyticsRow() {
  const [activeFilter, setActiveFilter] = useState("weekly");

  // Data untuk sales activity
  const salesData = [
    { country: "India", value: 32879, percentage: 65, color: "bg-blue-500" },
    { country: "Russia", value: 22710, percentage: 55, color: "bg-green-500" },
    { country: "Canada", value: 56291, percentage: 69, color: "bg-purple-500" },
    { country: "Brazil", value: 34209, percentage: 60, color: "bg-yellow-500" },
    { country: "United States", value: 45870, percentage: 86, color: "bg-red-500" },
    { country: "Germany", value: 67357, percentage: 73, color: "bg-pink-500" },
    { country: "U.A.E", value: 56291, percentage: 69, color: "bg-indigo-500" },
  ];

  // Data untuk warehouse operating costs
  const warehouseData = [
    { title: "Order Picking", value: "3,876", change: { value: 3, period: "last month" }, time: "5 days ago", icon: Package },
    { title: "Storage", value: "2,178", change: { value: 16, period: "last month" }, time: "2 days ago", icon: Box },
    { title: "Shipping", value: "1,367", change: { value: 6, period: "last month" }, time: "1 days ago", icon: Truck },
    { title: "Receiving", value: "678", change: { value: 25, period: "last month" }, time: "10 days ago", icon: Box },
    { title: "Review", value: "578", change: { value: 55, period: "last month" }, time: "11 days ago", icon: CheckCircle },
    { title: "Profit", value: "$27,215", change: { value: 32, period: "last month" }, time: "11 days ago", icon: TrendingUp },
  ];

  // Data untuk timeline
  const timelineData = [
    { date: "23 Sep, 2021", name: "Anita Letterback", description: "Lorem ipsum dolor tempor incididunt." },
    { date: "16 Aug, 2021", name: "Paddy O'Furniture", description: "Lorem ipsum dolor tempor incididunt." },
    { date: "23 Feb, 2021", name: "Olive Yew", description: "Lorem ipsum dolor tempor incididunt." },
    { date: "21 June, 2021", name: "Maureen Biologist", description: "Lorem ipsum dolor tempor incididunt." },
    { date: "04 Aug, 2021", name: "Peg Legge", description: "Lorem ipsum dolor tempor incididunt." },
    { date: "04 Aug, 2021", name: "Letterbac", description: "Lorem ipsum dolor tempor incididunt." },
  ];

  // Data untuk weekly visitors chart
  const visitorData = [
    { day: "Mon", male: 2200, female: 1100 },
    { day: "Tue", male: 1800, female: 900 },
    { day: "Wed", male: 2000, female: 1000 },
    { day: "Thu", male: 2400, female: 1200 },
    { day: "Fri", male: 2100, female: 1050 },
    { day: "Sat", male: 1900, female: 950 },
    { day: "Sun", male: 2300, female: 1150 },
  ];

  // Data untuk average visitors
  const averageVisitors = [
    { type: "Male", value: "2,132", change: 0.23 },
    { type: "Female", value: "1,053", change: 0.11 },
  ];

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    console.log(`Filter changed to: ${filter}`);
  };

  const handleCardClick = (title) => {
    console.log(`Card clicked: ${title}`);
  };

  return (
    <div className="space-y-6">
      {/* Header dengan filter options */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-100">Analytics Overview</h2>
        
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

      {/* Grid untuk analytics cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Activity Card */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-lg p-5 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-100">SALES ACTIVITY</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Filter size={16} className="text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Download size={16} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {salesData.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">{item.country}</span>
                  <span className="text-sm font-medium text-gray-100">${item.value.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ProgressBar percentage={item.percentage} color={item.color} />
                  <span className="text-xs text-gray-400">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warehouse Operating Costs Card */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-lg p-5 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-100">WAREHOUSE OPERATING COSTS</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Filter size={16} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {warehouseData.map((item, idx) => (
              <MetricCard
                key={idx}
                title={item.title}
                value={item.value}
                change={item.change}
                icon={item.icon}
                onClick={() => handleCardClick(item.title)}
              />
            ))}
          </div>
        </div>

        {/* Timeline Card */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-lg p-5 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-100">TIMELINE</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Calendar size={16} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {timelineData.map((item, idx) => (
              <div key={idx} className="border-l-2 border-blue-500 pl-4 py-2">
                <p className="text-xs text-gray-400">{item.date}</p>
                <p className="text-sm font-medium text-gray-100">{item.name}</p>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Visitors Card */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-lg p-5 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-100">WEEKLY VISITORS</h3>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Filter size={16} className="text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Download size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={visitorData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '0.5rem'
                  }} 
                />
                <Bar dataKey="male" name="Male Visitors" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="female" name="Female Visitors" fill="#EC4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-6">
            <h4 className="text-md font-medium text-gray-300">Average Visitors</h4>
            
            {averageVisitors.map((item, idx) => (
              <div key={idx} className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${
                    item.type === "Male" ? "bg-blue-900/30" : "bg-pink-900/30"
                  }`}>
                    <Users size={18} className={item.type === "Male" ? "text-blue-400" : "text-pink-400"} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Average {item.type} Visitors</p>
                    <p className="text-xl font-bold text-gray-100">{item.value}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp size={14} className="text-green-400" />
                  <span className="text-xs text-green-400">+{item.change}%</span>
                  <span className="text-xs text-gray-500 ml-2">vs previous week</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}