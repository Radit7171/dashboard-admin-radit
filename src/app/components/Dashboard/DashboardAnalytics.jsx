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
  Activity
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';

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
      className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-4 border border-gray-700 hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-100 mt-1">{value}</p>
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
        <div className="p-2 rounded-lg bg-blue-900/30">
          <Icon size={18} className="text-blue-400" />
        </div>
      </div>
    </div>
  );
};

// Custom Tooltip untuk chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-lg">
        <p className="text-gray-300">{`${label}`}</p>
        <p className="text-blue-400">{`Male: ${payload[0].value}`}</p>
        <p className="text-pink-400">{`Female: ${payload[1].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsRow() {
  const [activeFilter, setActiveFilter] = useState("weekly");
  const [expandedCards, setExpandedCards] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

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
    { date: "23 Sep, 2021", name: "Anita Letterback", description: "Completed purchase of electronics worth $1,200", status: "completed", icon: ShoppingCart },
    { date: "16 Aug, 2021", name: "Paddy O'Furniture", description: "Submitted support ticket #4562", status: "pending", icon: Activity },
    { date: "23 Feb, 2021", name: "Olive Yew", description: "Returned item #789456", status: "return", icon: Box },
    { date: "21 June, 2021", name: "Maureen Biologist", description: "Subscribed to premium plan", status: "completed", icon: DollarSign },
    { date: "04 Aug, 2021", name: "Peg Legge", description: "Requested product customization", status: "pending", icon: Package },
    { date: "04 Aug, 2021", name: "Letterbac", description: "Viewed product page 15 times", status: "view", icon: Eye },
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
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
    console.log(`Card ${cardId} ${expandedCards[cardId] ? 'collapsed' : 'expanded'}`);
  };

  const handleExportData = (dataType) => {
    console.log(`Exporting ${dataType} data`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log(`Searching for: ${e.target.value}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "completed": return "text-green-400";
      case "pending": return "text-yellow-400";
      case "return": return "text-red-400";
      case "view": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "completed": return <CheckCircle size={14} className="text-green-400" />;
      case "pending": return <Clock size={14} className="text-yellow-400" />;
      case "return": return <TrendingDown size={14} className="text-red-400" />;
      case "view": return <Eye size={14} className="text-blue-400" />;
      default: return <Activity size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header dengan filter options dan search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Analytics Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Track and analyze your business performance</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search analytics..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex bg-gray-800 p-1 rounded-lg">
            {["daily", "weekly", "monthly"].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-3 py-1 text-sm rounded-md transition-all ${
                  activeFilter === filter
                    ? "bg-blue-600 text-gray-100 shadow-sm"
                    : "text-gray-500 hover:text-gray-300"
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
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-lg p-5 border border-gray-700 hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
              <BarChart3 size={20} className="text-blue-400" />
              SALES ACTIVITY
            </h3>
            <div className="flex gap-2">
              <button 
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => handleExportData('sales')}
              >
                <Download size={16} className="text-gray-400" />
              </button>
              <button 
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => toggleCardExpansion('sales')}
              >
                {expandedCards.sales ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </button>
            </div>
          </div>

          <div className={`space-y-4 transition-all duration-300 ${expandedCards.sales ? '' : 'max-h-96 overflow-hidden'}`}>
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

          {!expandedCards.sales && (
            <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
              <span className="text-xs text-gray-500">Showing 7 of {salesData.length} countries</span>
              <button 
                className="text-xs text-blue-400 hover:text-blue-300"
                onClick={() => toggleCardExpansion('sales')}
              >
                Show more
              </button>
            </div>
          )}
        </div>

        {/* Warehouse Operating Costs Card */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-lg p-5 border border-gray-700 hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
              <Package size={20} className="text-blue-400" />
              WAREHOUSE OPERATING COSTS
            </h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Filter size={16} className="text-gray-400" />
              </button>
              <button 
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => toggleCardExpansion('warehouse')}
              >
                {expandedCards.warehouse ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {warehouseData.slice(0, expandedCards.warehouse ? warehouseData.length : 4).map((item, idx) => (
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

          {!expandedCards.warehouse && warehouseData.length > 4 && (
            <div className="mt-4 pt-4 border-t border-gray-700 text-center">
              <button 
                className="text-xs text-blue-400 hover:text-blue-300"
                onClick={() => toggleCardExpansion('warehouse')}
              >
                Show all {warehouseData.length} metrics
              </button>
            </div>
          )}
        </div>

        {/* Timeline Card */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-lg p-5 border border-gray-700 hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
              <Clock size={20} className="text-blue-400" />
              RECENT ACTIVITY
            </h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Calendar size={16} className="text-gray-400" />
              </button>
              <button 
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => toggleCardExpansion('timeline')}
              >
                {expandedCards.timeline ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {timelineData.map((item, idx) => (
              <div key={idx} className="border-l-2 border-blue-500 pl-4 py-2 hover:bg-gray-800/30 p-2 rounded-r-lg transition-colors">
                <div className="flex justify-between items-start">
                  <p className="text-xs text-gray-400">{item.date}</p>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(item.status)}
                    <span className={`text-xs ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-100 mt-1">{item.name}</p>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700 text-center">
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
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-lg p-5 border border-gray-700 hover:shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
            <Users size={20} className="text-blue-400" />
            VISITOR ANALYTICS
          </h3>
          <div className="flex gap-2">
            <button 
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => handleExportData('visitors')}
            >
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
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="male" name="Male Visitors" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="female" name="Female Visitors" fill="#EC4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-6">
            <h4 className="text-md font-medium text-gray-300">Average Visitors</h4>
            
            {averageVisitors.map((item, idx) => (
              <div key={idx} className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/70 transition-colors">
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

            <div className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/70 transition-colors">
              <h4 className="text-md font-medium text-gray-300 mb-3">Conversion Rate</h4>
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
                      formatter={(value) => <span className="text-gray-300 text-xs">{value}</span>}
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