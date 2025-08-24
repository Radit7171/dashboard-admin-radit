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
  Calendar,
  Search,
  ChevronDown,
  ChevronUp,
  Eye,
  ShoppingCart,
  DollarSign,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { useDarkModeCtx } from "@/app/DarkModeContext"; // sesuaikan path

// Component untuk progress bar
const ProgressBar = ({ percentage, color, darkMode }) => {
  const bgColor = darkMode ? "bg-gray-700" : "bg-gray-200";
  return (
    <div className={`w-full ${bgColor} rounded-full h-2`}>
      <div
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

// Component untuk metric card
const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  onClick,
  darkMode,
}) => {
  const isPositive = change.value >= 0;

  // Warna yang akan berubah berdasarkan mode
  const bgGradientFrom = darkMode ? "from-[#1e293b]" : "from-[#f1f5f9]";
  const bgGradientTo = darkMode ? "to-[#0f172a]" : "to-[#e2e8f0]";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-300";
  const textPrimary = darkMode ? "text-gray-100" : "text-gray-800";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600";

  return (
    <div
      className={`bg-gradient-to-br ${bgGradientFrom} ${bgGradientTo} rounded-xl p-4 border ${borderColor} hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm ${textSecondary}`}>{title}</p>
          <p className={`text-2xl font-bold ${textPrimary} mt-1`}>{value}</p>
          <div className="flex items-center gap-1 mt-2">
            {isPositive ? (
              <TrendingUp size={14} className="text-green-400" />
            ) : (
              <TrendingDown size={14} className="text-red-400" />
            )}
            <span
              className={`text-xs ${
                isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              {isPositive ? "+" : ""}
              {change.value}% {change.period}
            </span>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-blue-900/30">
          <Icon size={18} className="text-blue-400" />
        </div>
      </div>
    </div>
  );
};

// Custom Tooltip untuk chart
const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } p-3 rounded-lg border shadow-lg`}
      >
        <p
          className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
        >{`${label}`}</p>
        <p className="text-blue-400">{`Male: ${payload[0].value}`}</p>
        <p className="text-pink-400">{`Female: ${payload[1].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsRow() {
  const { darkMode } = useDarkModeCtx(); // ← ambil dari context
  const [activeFilter, setActiveFilter] = useState("weekly");
  const [expandedCards, setExpandedCards] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Warna yang akan berubah berdasarkan mode
  const bgGradientFrom = darkMode ? "from-[#1e293b]" : "from-[#f1f5f9]";
  const bgGradientTo = darkMode ? "to-[#0f172a]" : "to-[#e2e8f0]";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-300";
  const textPrimary = darkMode ? "text-gray-100" : "text-gray-800";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600";
  const filterBg = darkMode ? "bg-gray-800" : "bg-gray-200";
  const filterActiveBg = darkMode ? "bg-blue-600" : "bg-blue-500";
  const filterActiveText = "text-gray-100";
  const inputBg = darkMode ? "bg-gray-800" : "bg-white";
  const inputBorder = darkMode ? "border-gray-700" : "border-gray-300";
  const inputText = darkMode ? "text-gray-200" : "text-gray-800";
  const dividerColor = darkMode ? "border-gray-700" : "border-gray-200";
  const hoverBg = darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100";
  const cardHoverBg = darkMode ? "hover:bg-gray-800/30" : "hover:bg-gray-100";

  // Data untuk sales activity
  const salesData = [
    { country: "India", value: 32879, percentage: 65, color: "bg-blue-500" },
    { country: "Russia", value: 22710, percentage: 55, color: "bg-green-500" },
    { country: "Canada", value: 56291, percentage: 69, color: "bg-purple-500" },
    { country: "Brazil", value: 34209, percentage: 60, color: "bg-yellow-500" },
    {
      country: "United States",
      value: 45870,
      percentage: 86,
      color: "bg-red-500",
    },
    { country: "Germany", value: 67357, percentage: 73, color: "bg-pink-500" },
    { country: "U.A.E", value: 56291, percentage: 69, color: "bg-indigo-500" },
  ];

  // Data untuk warehouse operating costs
  const warehouseData = [
    {
      title: "Order Picking",
      value: "3,876",
      change: { value: 3, period: "last month" },
      time: "5 days ago",
      icon: Package,
    },
    {
      title: "Storage",
      value: "2,178",
      change: { value: 16, period: "last month" },
      time: "2 days ago",
      icon: Box,
    },
    {
      title: "Shipping",
      value: "1,367",
      change: { value: 6, period: "last month" },
      time: "1 days ago",
      icon: Truck,
    },
    {
      title: "Receiving",
      value: "678",
      change: { value: 25, period: "last month" },
      time: "10 days ago",
      icon: Box,
    },
    {
      title: "Review",
      value: "578",
      change: { value: 55, period: "last month" },
      time: "11 days ago",
      icon: CheckCircle,
    },
    {
      title: "Profit",
      value: "$27,215",
      change: { value: 32, period: "last month" },
      time: "11 days ago",
      icon: TrendingUp,
    },
  ];

  // Data untuk timeline
  const timelineData = [
    {
      date: "23 Sep, 2021",
      name: "Anita Letterback",
      description: "Completed purchase of electronics worth $1,200",
      status: "completed",
      icon: ShoppingCart,
    },
    {
      date: "16 Aug, 2021",
      name: "Paddy O'Furniture",
      description: "Submitted support ticket #4562",
      status: "pending",
      icon: Activity,
    },
    {
      date: "23 Feb, 2021",
      name: "Olive Yew",
      description: "Returned item #789456",
      status: "return",
      icon: Box,
    },
    {
      date: "21 June, 2021",
      name: "Maureen Biologist",
      description: "Subscribed to premium plan",
      status: "completed",
      icon: DollarSign,
    },
    {
      date: "04 Aug, 2021",
      name: "Peg Legge",
      description: "Requested product customization",
      status: "pending",
      icon: Package,
    },
    {
      date: "04 Aug, 2021",
      name: "Letterbac",
      description: "Viewed product page 15 times",
      status: "view",
      icon: Eye,
    },
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

  // Data untuk conversion rates (pie chart)
  const conversionData = [
    { name: "Completed", value: 75, color: "#10B981" },
    { name: "Pending", value: 15, color: "#F59E0B" },
    { name: "Abandoned", value: 10, color: "#EF4444" },
  ];

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    console.log(`Filter changed to: ${filter}`);
  };

  const handleCardClick = (title) => {
    console.log(`Card clicked: ${title}`);
  };

  const toggleCardExpansion = (cardId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
    console.log(
      `Card ${cardId} ${expandedCards[cardId] ? "collapsed" : "expanded"}`
    );
  };

  const handleExportData = (dataType) => {
    console.log(`Exporting ${dataType} data`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log(`Searching for: ${e.target.value}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "return":
        return "text-red-400";
      case "view":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={14} className="text-green-400" />;
      case "pending":
        return <Clock size={14} className="text-yellow-400" />;
      case "return":
        return <TrendingDown size={14} className="text-red-400" />;
      case "view":
        return <Eye size={14} className="text-blue-400" />;
      default:
        return <Activity size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header dengan filter options dan search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${textPrimary}`}>
            Analytics Overview
          </h2>
          <p className={`text-sm ${textSecondary} mt-1`}>
            Track and analyze your business performance
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search analytics..."
              className={`pl-10 pr-4 py-2 ${inputBg} border ${inputBorder} rounded-lg ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full`}
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

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
      </div>

      {/* Grid untuk analytics cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Activity Card */}
        <div
          className={`bg-gradient-to-br ${bgGradientFrom} ${bgGradientTo} rounded-2xl shadow-lg p-5 border ${borderColor} hover:shadow-xl transition-all duration-300`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3
              className={`text-lg font-semibold ${textPrimary} flex items-center gap-2`}
            >
              <BarChart3 size={20} className="text-blue-400" />
              SALES ACTIVITY
            </h3>
            <div className="flex gap-2">
              <button
                className={`p-2 ${hoverBg} rounded-lg transition-colors`}
                onClick={() => handleExportData("sales")}
              >
                <Download size={16} className={textSecondary} />
              </button>
              <button
                className={`p-2 ${hoverBg} rounded-lg transition-colors`}
                onClick={() => toggleCardExpansion("sales")}
              >
                {expandedCards.sales ? (
                  <ChevronUp size={16} className={textSecondary} />
                ) : (
                  <ChevronDown size={16} className={textSecondary} />
                )}
              </button>
            </div>
          </div>

          <div
            className={`space-y-4 transition-all duration-300 ${
              expandedCards.sales ? "" : "max-h-96 overflow-hidden"
            }`}
          >
            {salesData.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${textPrimary}`}>
                    {item.country}
                  </span>
                  <span className={`text-sm font-medium ${textPrimary}`}>
                    ${item.value.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ProgressBar
                    percentage={item.percentage}
                    color={item.color}
                    darkMode={darkMode}
                  />
                  <span className={`text-xs ${textSecondary}`}>
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {!expandedCards.sales && (
            <div
              className={`mt-4 pt-4 border-t ${dividerColor} flex justify-between items-center`}
            >
              <span className={`text-xs ${textSecondary}`}>
                Showing 7 of {salesData.length} countries
              </span>
              <button
                className="text-xs text-blue-400 hover:text-blue-300"
                onClick={() => toggleCardExpansion("sales")}
              >
                Show more
              </button>
            </div>
          )}
        </div>

        {/* Warehouse Operating Costs Card */}
        <div
          className={`bg-gradient-to-br ${bgGradientFrom} ${bgGradientTo} rounded-2xl shadow-lg p-5 border ${borderColor} hover:shadow-xl transition-all duration-300`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3
              className={`text-lg font-semibold ${textPrimary} flex items-center gap-2`}
            >
              <Package size={20} className="text-blue-400" />
              WAREHOUSE OPERATING COSTS
            </h3>
            <div className="flex gap-2">
              <button className={`p-2 ${hoverBg} rounded-lg transition-colors`}>
                <Filter size={16} className={textSecondary} />
              </button>
              <button
                className={`p-2 ${hoverBg} rounded-lg transition-colors`}
                onClick={() => toggleCardExpansion("warehouse")}
              >
                {expandedCards.warehouse ? (
                  <ChevronUp size={16} className={textSecondary} />
                ) : (
                  <ChevronDown size={16} className={textSecondary} />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {warehouseData
              .slice(0, expandedCards.warehouse ? warehouseData.length : 4)
              .map((item, idx) => (
                <MetricCard
                  key={idx}
                  title={item.title}
                  value={item.value}
                  change={item.change}
                  icon={item.icon}
                  onClick={() => handleCardClick(item.title)}
                  darkMode={darkMode}
                />
              ))}
          </div>

          {!expandedCards.warehouse && warehouseData.length > 4 && (
            <div className={`mt-4 pt-4 border-t ${dividerColor} text-center`}>
              <button
                className="text-xs text-blue-400 hover:text-blue-300"
                onClick={() => toggleCardExpansion("warehouse")}
              >
                Show all {warehouseData.length} metrics
              </button>
            </div>
          )}
        </div>

        {/* Timeline Card */}
        <div
          className={`bg-gradient-to-br ${bgGradientFrom} ${bgGradientTo} rounded-2xl shadow-lg p-5 border ${borderColor} hover:shadow-xl transitionall duration-300`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3
              className={`text-lg font-semibold ${textPrimary} flex items-center gap-2`}
            >
              <Clock size={20} className="text-blue-400" />
              RECENT ACTIVITY
            </h3>
            <div className="flex gap-2">
              <button className={`p-2 ${hoverBg} rounded-lg transition-colors`}>
                <Calendar size={16} className={textSecondary} />
              </button>
              <button
                className={`p-2 ${hoverBg} rounded-lg transition-colors`}
                onClick={() => toggleCardExpansion("timeline")}
              >
                {expandedCards.timeline ? (
                  <ChevronUp size={16} className={textSecondary} />
                ) : (
                  <ChevronDown size={16} className={textSecondary} />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {timelineData.map((item, idx) => (
              <div
                key={idx}
                className={`border-l-2 border-blue-500 pl-4 py-2 ${cardHoverBg} p-2 rounded-r-lg transition-colors`}
              >
                <div className="flex justify-between items-start">
                  <p className={`text-xs ${textSecondary}`}>{item.date}</p>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(item.status)}
                    <span className={`text-xs ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </span>
                  </div>
                </div>
                <p className={`text-sm font-medium ${textPrimary} mt-1`}>
                  {item.name}
                </p>
                <p className={`text-xs ${textSecondary} mt-1`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className={`mt-4 pt-4 border-t ${dividerColor} text-center`}>
            <button
              className="text-xs text-blue-400 hover:text-blue-300"
              onClick={() => console.log("View all activity")}
            >
              View all activity
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Visitors Card */}
      <div
        className={`bg-gradient-to-br ${bgGradientFrom} ${bgGradientTo} rounded-2xl shadow-lg p-5 border ${borderColor} hover:shadow-xl transition-all duration-300`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3
            className={`text-lg font-semibold ${textPrimary} flex items-center gap-2`}
          >
            <Users size={20} className="text-blue-400" />
            VISITOR ANALYTICS
          </h3>
          <div className="flex gap-2">
            <button
              className={`p-2 ${hoverBg} rounded-lg transition-colors`}
              onClick={() => handleExportData("visitors")}
            >
              <Download size={16} className={textSecondary} />
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
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#374151" : "#e5e7eb"}
                />
                <XAxis
                  dataKey="day"
                  stroke={darkMode ? "#9CA3AF" : "#6b7280"}
                />
                <YAxis stroke={darkMode ? "#9CA3AF" : "#6b7280"} />
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                <Bar
                  dataKey="male"
                  name="Male Visitors"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="female"
                  name="Female Visitors"
                  fill="#EC4899"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-6">
            <h4 className={`text-md font-medium ${textPrimary}`}>
              Average Visitors
            </h4>

            {averageVisitors.map((item, idx) => (
              <div
                key={idx}
                className={`${
                  darkMode ? "bg-gray-800/50" : "bg-gray-100"
                } p-4 rounded-lg ${
                  darkMode ? "hover:bg-gray-800/70" : "hover:bg-gray-200"
                } transition-colors`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      item.type === "Male" ? "bg-blue-900/30" : "bg-pink-900/30"
                    }`}
                  >
                    <Users
                      size={18}
                      className={
                        item.type === "Male" ? "text-blue-400" : "text-pink-400"
                      }
                    />
                  </div>
                  <div>
                    <p className={`text-sm ${textSecondary}`}>
                      Average {item.type} Visitors
                    </p>
                    <p className={`text-xl font-bold ${textPrimary}`}>
                      {item.value}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp size={14} className="text-green-400" />
                  <span className="text-xs text-green-400">
                    +{item.change}%
                  </span>
                  <span className={`text-xs ${textSecondary} ml-2`}>
                    vs previous week
                  </span>
                </div>
              </div>
            ))}

            <div
              className={`${
                darkMode ? "bg-gray-800/50" : "bg-gray-100"
              } p-4 rounded-lg ${
                darkMode ? "hover:bg-gray-800/70" : "hover:bg-gray-200"
              } transition-colors`}
            >
              <h4 className={`text-md font-medium ${textPrimary} mb-3`}>
                Conversion Rate
              </h4>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={conversionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {conversionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      iconType="circle"
                      iconSize={10}
                      formatter={(value) => (
                        <span
                          className={`text-xs ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
