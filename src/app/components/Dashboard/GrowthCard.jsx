"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
} from "recharts";
import { 
  useState,
  useEffect 
} from "react";
import {
  TrendingUp,
  BarChart3,
  Download,
  Filter,
  RefreshCw,
  Eye,
  EyeOff,
  Target,
  DollarSign,
  ShoppingCart,
  Calendar,
  Zap,
  Award,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function GrowthCard() {
  const [activeMetric, setActiveMetric] = useState("both"); // 'orders', 'sales', or 'both'
  const [timeFrame, setTimeFrame] = useState("yearly"); // 'monthly', 'quarterly', 'yearly'
  const [showForecast, setShowForecast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  const data = [
    { month: "Jan", orders: 40, sales: 65, forecast: 70 },
    { month: "Feb", orders: 50, sales: 80, forecast: 85 },
    { month: "Mar", orders: 30, sales: 50, forecast: 65 },
    { month: "Apr", orders: 60, sales: 95, forecast: 90 },
    { month: "May", orders: 70, sales: 100, forecast: 95 },
    { month: "Jun", orders: 55, sales: 85, forecast: 90 },
    { month: "Jul", orders: 65, sales: 90, forecast: 95 },
    { month: "Aug", orders: 75, sales: 95, forecast: 100 },
    { month: "Sep", orders: 60, sales: 80, forecast: 90 },
    { month: "Oct", orders: 80, sales: 100, forecast: 105 },
    { month: "Nov", orders: 70, sales: 90, forecast: 95 },
    { month: "Dec", orders: 90, sales: 100, forecast: 110 },
  ];

  // Calculate growth percentage
  const growthPercentage = Math.round(
    ((data[data.length - 1].sales - data[0].sales) / data[0].sales) * 100
  );

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-xl">
          <p className="text-gray-300 font-medium mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-gray-300">{entry.name}:</span>
                <span className="font-medium" style={{ color: entry.color }}>
                  {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Dummy functions
  const handleDownload = () => {
    console.log("Download growth report");
  };

  const handleFilter = () => {
    console.log("Open filter options");
  };

  const handleRefresh = () => {
    setIsLoading(true);
    console.log("Refreshing growth data...");
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
  };

  const toggleForecast = () => {
    setShowForecast(!showForecast);
    console.log(`Forecast ${showForecast ? "hidden" : "shown"}`);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
    console.log(`Card ${expanded ? "collapsed" : "expanded"}`);
  };

  return (
    <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-xl p-6 border border-gray-700 w-full transition-all duration-300 hover:shadow-2xl hover:border-blue-500/30 relative overflow-hidden">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center z-20">
          <RefreshCw className="animate-spin text-blue-400" size={24} />
        </div>
      )}
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <TrendingUp className="text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Growth Overview
              <span className="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded-full flex items-center gap-1">
                <Zap size={12} />
                +{growthPercentage}% YoY
              </span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">January - December 2023</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-4 lg:mt-0">
          <div className="flex bg-gray-800 p-1 rounded-lg">
            <button 
              onClick={() => setTimeFrame('monthly')}
              className={`px-3 py-1 text-xs rounded-md transition-all flex items-center gap-1 ${timeFrame === 'monthly' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Calendar size={12} />
              Monthly
            </button>
            <button 
              onClick={() => setTimeFrame('quarterly')}
              className={`px-3 py-1 text-xs rounded-md transition-all flex items-center gap-1 ${timeFrame === 'quarterly' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <BarChart3 size={12} />
              Quarterly
            </button>
            <button 
              onClick={() => setTimeFrame('yearly')}
              className={`px-3 py-1 text-xs rounded-md transition-all flex items-center gap-1 ${timeFrame === 'yearly' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Target size={12} />
              Yearly
            </button>
          </div>
          
          <div className="flex gap-1">
            <button 
              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-blue-400 transition-colors"
              onClick={handleDownload}
              title="Download Report"
            >
              <Download size={16} />
            </button>
            <button 
              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-green-400 transition-colors"
              onClick={handleFilter}
              title="Filter Data"
            >
              <Filter size={16} />
            </button>
            <button 
              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-yellow-400 transition-colors"
              onClick={handleRefresh}
              title="Refresh Data"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            </button>
            <button 
              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-purple-400 transition-colors"
              onClick={toggleExpand}
              title={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart size={16} className="text-blue-400" />
            <p className="text-gray-400 text-sm">Total Orders</p>
          </div>
          <p className="text-2xl font-bold text-blue-400">
            {data.reduce((acc, curr) => acc + curr.orders, 0).toLocaleString()}
          </p>
          <div className="flex items-center mt-1">
            <span className="text-xs text-blue-300 flex items-center gap-1">
              <TrendingUp size={12} />
              +12% from previous year
            </span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-green-500/30 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={16} className="text-green-400" />
            <p className="text-gray-400 text-sm">Total Sales</p>
          </div>
          <p className="text-2xl font-bold text-green-400">
            {data.reduce((acc, curr) => acc + curr.sales, 0).toLocaleString()}%
          </p>
          <div className="flex items-center mt-1">
            <span className="text-xs text-green-300 flex items-center gap-1">
              <TrendingUp size={12} />
              +{growthPercentage}% from previous year
            </span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-purple-500/30 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Award size={16} className="text-purple-400" />
            <p className="text-gray-400 text-sm">Peak Performance</p>
          </div>
          <p className="text-2xl font-bold text-purple-400">December</p>
          <div className="flex items-center mt-1">
            <span className="text-xs text-purple-300">
              {data[11].orders} orders · {data[11].sales}% conversion
            </span>
          </div>
        </div>
      </div>

      {/* Metric selector */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2 bg-gray-800 p-1 rounded-lg">
          <button 
            onClick={() => setActiveMetric('orders')}
            className={`px-3 py-1 text-xs rounded-md transition-all flex items-center gap-1 ${activeMetric === 'orders' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <ShoppingCart size={12} />
            Orders
          </button>
          <button 
            onClick={() => setActiveMetric('sales')}
            className={`px-3 py-1 text-xs rounded-md transition-all flex items-center gap-1 ${activeMetric === 'sales' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <DollarSign size={12} />
            Sales
          </button>
          <button 
            onClick={() => setActiveMetric('both')}
            className={`px-3 py-1 text-xs rounded-md transition-all flex items-center gap-1 ${activeMetric === 'both' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <BarChart3 size={12} />
            Both
          </button>
        </div>
        
        <button 
          onClick={toggleForecast}
          className={`text-xs flex items-center gap-1 px-2 py-1 rounded-md ${showForecast ? 'bg-cyan-900/30 text-cyan-400' : 'bg-gray-800 text-gray-400 hover:text-cyan-400'}`}
        >
          {showForecast ? <EyeOff size={12} /> : <Eye size={12} />}
          {showForecast ? 'Hide Forecast' : 'Show Forecast'}
        </button>
      </div>

      {/* Chart */}
      <div className={`w-full transition-all duration-500 ${expanded ? 'h-96' : 'h-72'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            
            <XAxis 
              dataKey="month" 
              stroke="#94a3b8" 
              tick={{ fontSize: 12 }} 
              axisLine={false}
            />
            
            <YAxis 
              domain={[0, showForecast ? 120 : 100]} 
              ticks={[0, 20, 40, 60, 80, 100, 120]} 
              stroke="#94a3b8" 
              tick={{ fontSize: 12 }} 
              axisLine={false}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              iconSize={10}
              wrapperStyle={{ color: "#e2e8f0", fontSize: "12px", paddingBottom: "15px" }}
            />
            
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            {/* Conditionally render based on active metric */}
            {(activeMetric === 'orders' || activeMetric === 'both') && (
              <>
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#3b82f6" 
                  fill="url(#colorOrders)" 
                  strokeWidth={3} 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  name="Orders"
                  animationDuration={1000}
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }}
                  name="Orders"
                  animationDuration={1000}
                  hide={activeMetric !== 'orders'}
                />
              </>
            )}
            
            {(activeMetric === 'sales' || activeMetric === 'both') && (
              <>
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#10b981" 
                  fill="url(#colorSales)" 
                  strokeWidth={3} 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  name="Sales"
                  animationDuration={1000}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }}
                  name="Sales"
                  animationDuration={1000}
                  hide={activeMetric !== 'sales'}
                />
              </>
            )}
            
            {/* Forecast line (dotted) */}
            {showForecast && (
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#8b5cf6" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 4 }}
                name="Forecast"
                animationDuration={1000}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer with insights */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <p className="text-sm text-gray-400 flex items-center gap-2">
          <Award className="text-yellow-400" size={14} />
          <span className="text-green-400 font-medium">Peak performance</span> 
          in December with {data[11].orders} orders and {data[11].sales}% sales conversion
        </p>
      </div>
    </div>
  );
}