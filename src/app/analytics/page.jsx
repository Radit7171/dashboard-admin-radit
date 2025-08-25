// src/app/analytics/page.jsx
"use client";

import { useRef, useContext, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import DarkModeContext from "../DarkModeContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/DashboardFooter";

// Animasi varians
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

// Komponen AnimatedSection
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Komponen AnimatedCard
const AnimatedCard = ({ children }) => {
  return <motion.div variants={itemVariants}>{children}</motion.div>;
};

// Komponen untuk kartu statistik dengan tooltip
const StatCard = ({ title, value, change, icon, darkMode, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <AnimatedCard>
      <div
        className={`rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${
          darkMode
            ? "bg-gray-800 hover:bg-gray-750"
            : "bg-white hover:bg-gray-50"
        } relative`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {tooltip && showTooltip && (
          <div
            className={`absolute -top-10 left-0 px-3 py-2 rounded-lg text-xs ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {tooltip}
          </div>
        )}

        <div className="flex justify-between items-start">
          <div>
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {title}
            </p>
            <h3
              className={`text-2xl font-bold mt-1 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {value}
            </h3>
            <p
              className={`text-sm mt-2 ${
                change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from last week
            </p>
          </div>
          <div
            className={`p-3 rounded-lg ${
              darkMode ? "bg-blue-900/30" : "bg-blue-100"
            }`}
          >
            {icon}
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

// Komponen untuk Visitor Trends (Line Chart Interaktif)
const VisitorTrendsChart = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  // Data untuk line chart
  const data = [
    { day: "Mon", visitors: 4000 },
    { day: "Tue", visitors: 3000 },
    { day: "Wed", visitors: 5000 },
    { day: "Thu", visitors: 4500 },
    { day: "Fri", visitors: 6000 },
    { day: "Sat", visitors: 7000 },
    { day: "Sun", visitors: 6500 },
  ];

  const maxVisitors = Math.max(...data.map((d) => d.visitors));
  const chartHeight = 200;
  const chartWidth = "100%";
  const padding = 40;

  // Hitung posisi titik
  const points = data.map((item, index) => {
    const x = padding + (index * (100 - padding * 2)) / (data.length - 1);
    const y = 100 - (item.visitors / maxVisitors) * (100 - padding);
    return { x, y, ...item };
  });

  // Buat path untuk garis
  const linePath = points
    .map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Visitor Trends
        </h3>
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-md px-3 py-1 text-sm ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className={`bg-transparent ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
            </select>
          </div>
          <button
            onClick={onOptionsClick}
            className={`p-2 rounded-lg hover:opacity-80 ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="h-64 relative">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((yPos) => (
            <line
              key={yPos}
              x1={padding}
              y1={yPos}
              x2={100 - padding}
              y2={yPos}
              stroke={darkMode ? "#374151" : "#e5e7eb"}
              strokeWidth="0.5"
            />
          ))}

          {/* Garis chart */}
          <motion.path
            d={linePath}
            fill="none"
            stroke={darkMode ? "#3b82f6" : "#2563eb"}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Area di bawah garis */}
          <path
            d={`${linePath} L ${points[points.length - 1].x} 100 L ${
              points[0].x
            } 100 Z`}
            fill={
              darkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(37, 99, 235, 0.2)"
            }
          />

          {/* Titik-titik data */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="3"
                fill={darkMode ? "#3b82f6" : "#2563eb"}
                onMouseEnter={() => setHoveredIndex(index)}
                className="cursor-pointer"
              />

              {/* Tooltip saat hover */}
              {hoveredIndex === index && (
                <g>
                  <rect
                    x={point.x - 15}
                    y={point.y - 25}
                    width="30"
                    height="20"
                    rx="3"
                    fill={darkMode ? "#1f2937" : "#f3f4f6"}
                    stroke={darkMode ? "#374151" : "#d1d5db"}
                  />
                  <text
                    x={point.x}
                    y={point.y - 12}
                    textAnchor="middle"
                    fill={darkMode ? "#f9fafb" : "#111827"}
                    fontSize="3"
                    fontWeight="bold"
                  >
                    {point.visitors}
                  </text>
                </g>
              )}
            </g>
          ))}
        </svg>

        {/* Label sumbu X */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
          {data.map((item, index) => (
            <span
              key={index}
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {item.day}
            </span>
          ))}
        </div>

        {/* Label sumbu Y */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-2">
          <span
            className={`text-xs pl-2 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {maxVisitors}
          </span>
          <span
            className={`text-xs pl-2 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            0
          </span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div
          className={`text-sm ${darkMode ? "text-blue-400" : "text-blue-600"}`}
        >
          <span className="font-medium">+12.3%</span> vs previous week
        </div>
        <button
          onClick={() => console.log("Explore Visitor Trends data")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-100 hover:bg-blue-200 text-blue-800"
          }`}
        >
          Explore Data
        </button>
      </div>
    </div>
  );
};

// Komponen untuk Traffic Sources (Pie Chart Interaktif)
const TrafficSourcesChart = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  // Data untuk pie chart
  const data = [
    {
      source: "Organic Search",
      value: 45,
      color: darkMode ? "#3b82f6" : "#2563eb",
    },
    { source: "Direct", value: 25, color: darkMode ? "#10b981" : "#059669" },
    {
      source: "Social Media",
      value: 15,
      color: darkMode ? "#8b5cf6" : "#7c3aed",
    },
    { source: "Referral", value: 10, color: darkMode ? "#f59e0b" : "#d97706" },
    { source: "Email", value: 5, color: darkMode ? "#ef4444" : "#dc2626" },
  ];

  // Hitung sudut untuk pie chart
  let currentAngle = -90; // Mulai dari atas
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const segments = data.map((item) => {
    const angle = (item.value / totalValue) * 360;
    const segment = {
      ...item,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      largeArc: angle > 180 ? 1 : 0,
    };
    currentAngle += angle;
    return segment;
  });

  // Fungsi untuk menghitung koordinat titik pada lingkaran
  const getCoordinates = (angle, radius) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: 50 + radius * Math.cos(rad),
      y: 50 + radius * Math.sin(rad),
    };
  };

  // Fungsi untuk membuat path pie segment
  const createPiePath = (segment, innerRadius = 0, outerRadius = 35) => {
    const start = getCoordinates(segment.startAngle, outerRadius);
    const end = getCoordinates(segment.endAngle, outerRadius);
    const innerStart = getCoordinates(segment.startAngle, innerRadius);
    const innerEnd = getCoordinates(segment.endAngle, innerRadius);

    return [
      `M ${innerStart.x} ${innerStart.y}`,
      `L ${start.x} ${start.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${segment.largeArc} 1 ${end.x} ${end.y}`,
      `L ${innerEnd.x} ${innerEnd.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${segment.largeArc} 0 ${innerStart.x} ${innerStart.y}`,
      "Z",
    ].join(" ");
  };

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Traffic Sources
        </h3>
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-md px-3 py-1 text-sm ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className={`bg-transparent ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
            </select>
          </div>
          <button
            onClick={onOptionsClick}
            className={`p-2 rounded-lg hover:opacity-80 ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center h-64">
        <div className="w-1/2 relative">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={createPiePath(segment)}
                fill={segment.color}
                stroke={darkMode ? "#1f2937" : "#ffffff"}
                strokeWidth="1"
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="cursor-pointer transition-transform duration-200"
                style={{
                  transform:
                    hoveredSegment === index ? "scale(1.05)" : "scale(1)",
                  transformOrigin: "center",
                }}
              />
            ))}

            {/* Label di tengah */}
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              fill={darkMode ? "#f9fafb" : "#111827"}
              fontSize="6"
              fontWeight="bold"
            >
              {totalValue}%
            </text>
          </svg>
        </div>

        <div className="w-1/2 space-y-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center"
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div
                className={`w-4 h-4 rounded-sm mr-2`}
                style={{ backgroundColor: item.color }}
              ></div>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } ${hoveredSegment === index ? "font-bold" : ""}`}
              >
                {item.source}:{" "}
                <span className="font-medium">{item.value}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => console.log("Explore Traffic Sources data")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-100 hover:bg-blue-200 text-blue-800"
          }`}
        >
          Explore Data
        </button>
      </div>
    </div>
  );
};

// Komponen untuk Device Breakdown (Bar Chart Interaktif)
const DeviceBreakdownChart = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");
  const [hoveredBar, setHoveredBar] = useState(null);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  // Data untuk device breakdown
  const data = [
    { device: "Mobile", value: 62, color: darkMode ? "#3b82f6" : "#2563eb" },
    { device: "Desktop", value: 28, color: darkMode ? "#10b981" : "#059669" },
    { device: "Tablet", value: 8, color: darkMode ? "#8b5cf6" : "#7c3aed" },
    { device: "Other", value: 2, color: darkMode ? "#9ca3af" : "#6b7280" },
  ];

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Device Breakdown
        </h3>
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-md px-3 py-1 text-sm ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className={`bg-transparent ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
            </select>
          </div>
          <button
            onClick={onOptionsClick}
            className={`p-2 rounded-lg hover:opacity-80 ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="h-64">
        <div className="flex flex-col h-full justify-between py-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center mb-3">
              <span
                className={`text-sm w-16 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {item.device}
              </span>
              <div
                className="flex-1 ml-2 relative"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div
                  className={`h-6 rounded-full transition-all duration-300`}
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color,
                    opacity: hoveredBar === index ? 0.8 : 1,
                  }}
                ></div>
                <span
                  className={`absolute right-0 top-0 text-xs px-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {item.value}%
                </span>

                {/* Tooltip saat hover */}
                {hoveredBar === index && (
                  <div
                    className={`absolute -top-8 left-0 px-2 py-1 rounded text-xs ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {item.device}: {item.value}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => console.log("Explore Device Breakdown data")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-100 hover:bg-blue-200 text-blue-800"
          }`}
        >
          Explore Data
        </button>
      </div>
    </div>
  );
};

// Komponen untuk Geographic Distribution (Peta Interaktif)
const GeographicDistributionChart = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  // Data untuk geographic distribution
  const data = [
    { country: "United States", value: 42, x: 25, y: 40 },
    { country: "United Kingdom", value: 18, x: 47, y: 30 },
    { country: "Germany", value: 12, x: 50, y: 35 },
    { country: "France", value: 9, x: 48, y: 38 },
    { country: "Canada", value: 7, x: 20, y: 35 },
    { country: "Australia", value: 5, x: 75, y: 65 },
    { country: "Japan", value: 4, x: 80, y: 40 },
    { country: "Brazil", value: 3, x: 35, y: 60 },
  ];

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Geographic Distribution
        </h3>
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-md px-3 py-1 text-sm ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className={`bg-transparent ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
            </select>
          </div>
          <button
            onClick={onOptionsClick}
            className={`p-2 rounded-lg hover:opacity-80 ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="h-64 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Peta dunia sederhana */}
          <path
            d="M20,30 Q30,20 40,30 T60,30 T75,35 T85,40 T90,50 T85,60 T75,65 T60,70 T40,70 T25,65 T15,60 T10,50 T15,40 Z"
            fill={darkMode ? "#374151" : "#e5e7eb"}
            stroke={darkMode ? "#4b5563" : "#d1d5db"}
          />

          {/* Titik-titik untuk negara */}
          {data.map((item, index) => {
            const size = 3 + (item.value / maxValue) * 5;
            return (
              <circle
                key={index}
                cx={item.x}
                cy={item.y}
                r={size}
                fill={darkMode ? "#3b82f6" : "#2563eb"}
                stroke={darkMode ? "#1e40af" : "#1e40af"}
                strokeWidth="0.5"
                onMouseEnter={() => setHoveredCountry(index)}
                onMouseLeave={() => setHoveredCountry(null)}
                className="cursor-pointer transition-all duration-200"
                style={{
                  opacity:
                    hoveredCountry === null || hoveredCountry === index
                      ? 1
                      : 0.5,
                }}
              />
            );
          })}

          {/* Tooltip untuk negara yang dihover */}
          {hoveredCountry !== null && (
            <g>
              <rect
                x={data[hoveredCountry].x - 15}
                y={data[hoveredCountry].y - 25}
                width="30"
                height="20"
                rx="3"
                fill={darkMode ? "#1f2937" : "#f3f4f6"}
                stroke={darkMode ? "#374151" : "#d1d5db"}
              />
              <text
                x={data[hoveredCountry].x}
                y={data[hoveredCountry].y - 17}
                textAnchor="middle"
                fill={darkMode ? "#f9fafb" : "#111827"}
                fontSize="3"
              >
                {data[hoveredCountry].country}
              </text>
              <text
                x={data[hoveredCountry].x}
                y={data[hoveredCountry].y - 12}
                textAnchor="middle"
                fill={darkMode ? "#3b82f6" : "#2563eb"}
                fontSize="3"
                fontWeight="bold"
              >
                {data[hoveredCountry].value}%
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full ${
              darkMode ? "bg-blue-500" : "bg-blue-400"
            } mr-2`}
          ></div>
          <span
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Larger circles indicate higher traffic
          </span>
        </div>
        <button
          onClick={() => console.log("Explore Geographic Distribution data")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-100 hover:bg-blue-200 text-blue-800"
          }`}
        >
          Explore Data
        </button>
      </div>
    </div>
  );
};

// Komponen untuk tabel data dengan sorting
const DataTable = ({ darkMode }) => {
  const [sortField, setSortField] = useState("visitors");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const data = [
    { page: "/home", visitors: 3245, bounceRate: "24.5%", conversion: "4.2%" },
    {
      page: "/products",
      visitors: 2541,
      bounceRate: "32.1%",
      conversion: "6.7%",
    },
    { page: "/blog", visitors: 1876, bounceRate: "18.9%", conversion: "3.1%" },
    { page: "/about", visitors: 1542, bounceRate: "21.3%", conversion: "2.4%" },
    {
      page: "/contact",
      visitors: 987,
      bounceRate: "26.7%",
      conversion: "8.9%",
    },
    {
      page: "/pricing",
      visitors: 876,
      bounceRate: "22.4%",
      conversion: "9.2%",
    },
    { page: "/faq", visitors: 654, bounceRate: "28.9%", conversion: "1.8%" },
    {
      page: "/login",
      visitors: 2109,
      bounceRate: "38.2%",
      conversion: "12.5%",
    },
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let valueA = a[sortField];
    let valueB = b[sortField];

    // Handle percentage values
    if (typeof valueA === "string" && valueA.includes("%")) {
      valueA = parseFloat(valueA);
      valueB = parseFloat(valueB);
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortIcon = ({ field }) => (
    <span className="ml-1">
      {sortField === field && (sortDirection === "asc" ? "↑" : "↓")}
    </span>
  );

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Page Performance
        </h3>
        <button
          onClick={() => console.log("Export data")}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={darkMode ? "text-gray-400" : "text-gray-500"}>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:opacity-80"
                onClick={() => handleSort("page")}
              >
                Page <SortIcon field="page" />
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:opacity-80"
                onClick={() => handleSort("visitors")}
              >
                Visitors <SortIcon field="visitors" />
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:opacity-80"
                onClick={() => handleSort("bounceRate")}
              >
                Bounce Rate <SortIcon field="bounceRate" />
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:opacity-80"
                onClick={() => handleSort("conversion")}
              >
                Conversion <SortIcon field="conversion" />
              </th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } ${
                  index % 2 === 0
                    ? darkMode
                      ? "bg-gray-750/30"
                      : "bg-gray-50"
                    : ""
                }`}
              >
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {row.page}
                </td>
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {row.visitors.toLocaleString()}
                </td>
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {row.bounceRate}
                </td>
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {row.conversion}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => console.log(`View details for ${row.page}`)}
                    className={`p-1 rounded-md hover:opacity-80 ${
                      darkMode
                        ? "text-blue-400 hover:bg-blue-900/30"
                        : "text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2 15.5v-11a2 2 0 012-2h16a2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2z"
                      />
                    </svg>
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className={`flex justify-between items-center mt-4 pt-4 border-t ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, sortedData.length)} of{" "}
          {sortedData.length} entries
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === 1
                ? darkMode
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                : darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === totalPages
                ? darkMode
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                : darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Komponen DateRangePicker untuk filter tanggal
const DateRangePicker = ({ darkMode, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("last_7_days");

  const ranges = [
    { id: "today", label: "Today" },
    { id: "yesterday", label: "Yesterday" },
    { id: "last_7_days", label: "Last 7 days" },
    { id: "last_30_days", label: "Last 30 days" },
    { id: "this_month", label: "This month" },
    { id: "last_month", label: "Last month" },
    { id: "custom", label: "Custom range" },
  ];

  const handleRangeSelect = (rangeId) => {
    setSelectedRange(rangeId);
    setIsOpen(false);
    if (onDateChange) onDateChange(rangeId);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
          darkMode
            ? "bg-gray-700 hover:bg-gray-600 text-white"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
        }`}
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {ranges.find((r) => r.id === selectedRange)?.label}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute top-full left-0 mt-1 py-2 rounded-lg shadow-lg z-10 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {ranges.map((range) => (
            <button
              key={range.id}
              onClick={() => handleRangeSelect(range.id)}
              className={`block w-full text-left px-4 py-2 text-sm hover:opacity-80 ${
                selectedRange === range.id
                  ? darkMode
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-100 text-blue-800"
                  : darkMode
                  ? "text-gray-300"
                  : "text-gray-800"
              }`}
            >
              {range.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  const handleDateChange = (range) => {
    console.log(`Date range changed to: ${range}`);
    // Dummy function - would fetch new data based on date range in a real app
  };

  const handleChartOptions = (chartTitle) => {
    console.log(`Options clicked for: ${chartTitle}`);
    // Dummy function - would show chart options modal in a real app
  };

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Sidebar open={sidebarOpen} darkMode={darkMode} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 min-h-screen ${
          sidebarOpen ? "ml-64" : "ml-0"
        } ${darkMode ? "" : "bg-white"} overflow-x-hidden`}
        style={{
          width: sidebarOpen ? "calc(100vw - 16rem)" : "100vw",
        }}
      >
        <div className="sticky top-0 z-50">
          <Navbar
            onToggleSidebar={handleToggleSidebar}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </div>

        <main className="flex-1 relative z-10">
          <div className="p-5">
            {/* Header dengan date picker */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex justify-between items-center"
            >
              <div>
                <h1
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Analytics Dashboard
                </h1>
                <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                  Monitor your website performance and user behavior
                </p>
              </div>
              <DateRangePicker
                darkMode={darkMode}
                onDateChange={handleDateChange}
              />
            </motion.div>

            {/* Stat Cards */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Visitors"
                  value="45.2K"
                  change={12.3}
                  icon={
                    <svg
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Total number of visitors in the selected period"
                />
                <StatCard
                  title="Avg. Session Duration"
                  value="4m 32s"
                  change={5.7}
                  icon={
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Average time spent by visitors on your site"
                />
                <StatCard
                  title="Bounce Rate"
                  value="26.4%"
                  change={-3.2}
                  icon={
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Percentage of visitors who leave after viewing only one page"
                />
                <StatCard
                  title="Conversion Rate"
                  value="3.8%"
                  change={8.1}
                  icon={
                    <svg
                      className="w-6 h-6 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 01118 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Percentage of visitors who complete a desired action"
                />
              </div>
            </AnimatedSection>

            {/* Charts Row */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <VisitorTrendsChart
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("Visitor Trends")}
                />
                <TrafficSourcesChart
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("Traffic Sources")}
                />
              </div>
            </AnimatedSection>

            {/* Table */}
            <AnimatedSection className="mb-6">
              <DataTable darkMode={darkMode} />
            </AnimatedSection>

            {/* Additional Metrics */}
            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DeviceBreakdownChart
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("Device Breakdown")}
                />
                <GeographicDistributionChart
                  darkMode={darkMode}
                  onOptionsClick={() =>
                    handleChartOptions("Geographic Distribution")
                  }
                />
              </div>
            </AnimatedSection>
          </div>
        </main>

        <div className="relative z-10 mt-auto">
          <Footer darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}
