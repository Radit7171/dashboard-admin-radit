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
import { useState } from "react";

export default function GrowthCard() {
  const [activeMetric, setActiveMetric] = useState("both"); // 'orders', 'sales', or 'both'
  
  const data = [
    { month: "Jan", orders: 40, sales: 65 },
    { month: "Feb", orders: 50, sales: 80 },
    { month: "Mar", orders: 30, sales: 50 },
    { month: "Apr", orders: 60, sales: 95 },
    { month: "May", orders: 70, sales: 100 },
    { month: "Jun", orders: 55, sales: 85 },
    { month: "Jul", orders: 65, sales: 90 },
    { month: "Aug", orders: 75, sales: 95 },
    { month: "Sep", orders: 60, sales: 80 },
    { month: "Oct", orders: 80, sales: 100 },
    { month: "Nov", orders: 70, sales: 90 },
    { month: "Dec", orders: 90, sales: 100 },
  ];

  // Calculate growth percentage
  const growthPercentage = Math.round(
    ((data[data.length - 1].sales - data[0].sales) / data[0].sales) * 100
  );

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-lg">
          <p className="text-gray-300 font-medium mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl shadow-xl p-6 border border-gray-700 w-full transition-all duration-300 hover:shadow-2xl hover:border-gray-600">
      {/* Header with stats */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center">
            📊 Growth Overview
            <span className="ml-2 text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded-full">
              +{growthPercentage}% YoY
            </span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">January - December 2023</p>
        </div>
        
        <div className="flex mt-3 lg:mt-0 space-x-2 bg-gray-800 p-1 rounded-lg">
          <button 
            onClick={() => setActiveMetric('orders')}
            className={`px-3 py-1 text-xs rounded-md transition-all ${activeMetric === 'orders' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveMetric('sales')}
            className={`px-3 py-1 text-xs rounded-md transition-all ${activeMetric === 'sales' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Sales
          </button>
          <button 
            onClick={() => setActiveMetric('both')}
            className={`px-3 py-1 text-xs rounded-md transition-all ${activeMetric === 'both' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Both
          </button>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-blue-400">
            {data.reduce((acc, curr) => acc + curr.orders, 0)}
          </p>
          <div className="flex items-center mt-1">
            <span className="text-xs text-blue-300">+12% from previous year</span>
          </div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm">Total Sales</p>
          <p className="text-2xl font-bold text-green-400">
            {data.reduce((acc, curr) => acc + curr.sales, 0)}%
          </p>
          <div className="flex items-center mt-1">
            <span className="text-xs text-green-300">+{growthPercentage}% from previous year</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-72">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            
            <XAxis 
              dataKey="month" 
              stroke="#94a3b8" 
              tick={{ fontSize: 12 }} 
              axisLine={false}
            />
            
            <YAxis 
              domain={[0, 100]} 
              ticks={[0, 20, 40, 60, 80, 100]} 
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
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer with insights */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <p className="text-sm text-gray-400">
          <span className="text-green-400 font-medium">Peak performance</span> in December with {data[11].orders} orders and {data[11].sales}% sales conversion
        </p>
      </div>
    </div>
  );
}