"use client";

import { useState, useContext, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import DarkModeContext from "@/app/DarkModeContext";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/DashboardFooter";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Komponen Line Chart utama yang telah ditingkatkan
const LineChart = ({
  data,
  options,
  title,
  description,
  className = "",
  onRefresh,
  isRefreshing = false,
}) => {
  const chartRef = useRef(null);
  const { darkMode } = useContext(DarkModeContext);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Default options dengan dark mode support
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: darkMode ? "#e5e7eb" : "#374151",
          font: {
            size: 12,
          },
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: title,
        color: darkMode ? "#f9fafb" : "#111827",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: darkMode ? "#374151" : "#ffffff",
        titleColor: darkMode ? "#f3f4f6" : "#374151",
        bodyColor: darkMode ? "#e5e7eb" : "#6b7280",
        borderColor: darkMode ? "#4b5563" : "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: darkMode ? "#d1d5db" : "#6b7280",
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: darkMode ? "#d1d5db" : "#6b7280",
          font: {
            size: 11,
          },
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        backgroundColor: "#ffffff",
        borderWidth: 2,
      },
      line: {
        tension: 0.3,
        borderWidth: 2,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    ...options,
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`rounded-2xl p-1 ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900"
          : "bg-gradient-to-br from-white to-gray-50"
      } shadow-lg ${className}`}
    >
      <div
        className={`rounded-2xl p-5 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            {title && (
              <h3
                className={`text-lg font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                } mb-1`}
              >
                {title}
              </h3>
            )}
            {description && (
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {description}
              </p>
            )}
          </div>
          <div className="flex space-x-2">
            {onRefresh && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onRefresh}
                disabled={isRefreshing}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                } transition-colors`}
                aria-label="Refresh chart"
              >
                {isRefreshing ? (
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                )}
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFullscreen}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              } transition-colors`}
              aria-label="Toggle fullscreen"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                />
              </svg>
            </motion.button>
          </div>
        </div>
        <div
          className={`h-64 md:h-80 ${
            isFullscreen
              ? "fixed inset-0 z-50 bg-white dark:bg-gray-900 p-10"
              : ""
          }`}
        >
          {isFullscreen && (
            <div className="absolute top-4 right-4 z-50">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleFullscreen}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                } transition-colors`}
                aria-label="Exit fullscreen"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>
          )}
          <Line ref={chartRef} data={data} options={defaultOptions} />
        </div>
        {isFullscreen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleFullscreen}
          ></div>
        )}
      </div>
    </motion.div>
  );
};

// Komponen untuk contoh penggunaan chart
const ChartExample = ({
  title,
  description,
  children,
  code,
  darkMode,
  onToggleDataset,
  datasetsVisible,
}) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-1 ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900"
          : "bg-gradient-to-br from-white to-gray-50"
      } mb-8 shadow-lg`}
    >
      <div
        className={`rounded-2xl p-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3
              className={`text-xl font-bold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {description}
            </p>
          </div>
          <div className="flex space-x-2">
            {onToggleDataset && (
              <button
                onClick={onToggleDataset}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                Toggle Data
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {isExpanded ? "Collapse" : "Expand"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => setIsCodeVisible(!isCodeVisible)}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {isCodeVisible ? "Hide Code" : "Show Code"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isCodeVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div
                className={`rounded-xl p-4 ${
                  darkMode
                    ? "bg-gray-900 text-gray-200"
                    : "bg-gray-100 text-gray-800"
                } overflow-x-auto mt-4`}
              >
                <pre className="text-sm font-mono">{code}</pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Tab Component untuk navigasi
const Tab = ({ active, onClick, children, count }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 font-medium rounded-xl transition-all flex items-center ${
        active
          ? darkMode
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-blue-500 text-white shadow-lg"
          : darkMode
          ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
      {count !== undefined && (
        <span
          className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
            active
              ? darkMode
                ? "bg-blue-800"
                : "bg-blue-600"
              : darkMode
              ? "bg-gray-600"
              : "bg-gray-300"
          }`}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
};

// Skeleton loader untuk charts
const ChartSkeleton = ({ darkMode }) => {
  return (
    <div
      className={`rounded-2xl p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } mb-8 shadow-lg border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      } animate-pulse`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div
            className={`h-7 rounded-lg mb-2 ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-4 rounded-lg w-3/4 ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
        </div>
        <div className="flex space-x-2">
          <div
            className={`h-8 w-8 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-8 w-8 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
        </div>
      </div>
      <div
        className={`h-64 rounded-xl ${
          darkMode ? "bg-gray-700" : "bg-gray-300"
        }`}
      ></div>
    </div>
  );
};

export default function ChartsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [datasetsVisible, setDatasetsVisible] = useState({
    multiDataset: true,
    realTime: true,
  });

  useEffect(() => {
    // Simulasi loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleRefreshChart = () => {
    setIsRefreshing(true);
    // Simulasi refresh data
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const toggleDataset = (chartId) => {
    setDatasetsVisible((prev) => ({
      ...prev,
      [chartId]: !prev[chartId],
    }));
  };

  // Data untuk contoh chart
  const basicChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Website Visits",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "rgb(59, 130, 246)",
        pointBorderWidth: 2,
      },
    ],
  };

  const multiDatasetChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Product A",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "rgb(59, 130, 246)",
        pointBorderWidth: 2,
        hidden: !datasetsVisible.multiDataset,
      },
      {
        label: "Product B",
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "rgb(239, 68, 68)",
        pointBorderWidth: 2,
        hidden: !datasetsVisible.multiDataset,
      },
    ],
  };

  const steppedChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 7000, 6500, 9000, 8000, 12000, 11000],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0,
        fill: true,
        stepped: "before",
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "rgb(16, 185, 129)",
        pointBorderWidth: 2,
      },
    ],
  };

  const realTimeChartData = {
    labels: Array.from({ length: 20 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Real-time Data",
        data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 100)),
        borderColor: "rgb(139, 92, 246)",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "rgb(139, 92, 246)",
        pointBorderWidth: 2,
        hidden: !datasetsVisible.realTime,
      },
    ],
  };

  // Filter charts berdasarkan tab aktif
  const filteredCharts = [
    {
      id: "basic",
      title: "Basic Line Chart",
      description: "A simple line chart with a single dataset and area fill.",
      code: `const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Website Visits',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.3,
      fill: true,
    },
  ],
};

<LineChart 
  data={data} 
  title="Monthly Website Visits" 
  description="Number of visits from January to July"
/>`,
      content: (
        <LineChart
          data={basicChartData}
          title="Monthly Website Visits"
          description="Number of visits from January to July"
          onRefresh={handleRefreshChart}
          isRefreshing={isRefreshing}
        />
      ),
      category: "basic",
    },
    {
      id: "multi-dataset",
      title: "Multiple Datasets Chart",
      description:
        "Line chart comparing multiple datasets with different colors.",
      code: `const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Product A',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.3,
      fill: true,
    },
    {
      label: 'Product B',
      data: [28, 48, 40, 19, 86, 27, 90],
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.3,
      fill: true,
    },
  ],
};

<LineChart 
  data={data} 
  title="Product Sales Comparison" 
  description="Monthly sales data for Product A and Product B"
/>`,
      content: (
        <LineChart
          data={multiDatasetChartData}
          title="Product Sales Comparison"
          description="Monthly sales data for Product A and Product B"
          onRefresh={handleRefreshChart}
          isRefreshing={isRefreshing}
        />
      ),
      category: "advanced",
    },
    {
      id: "stepped",
      title: "Stepped Line Chart",
      description: "A stepped line chart showing revenue growth over time.",
      code: `const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Revenue',
      data: [5000, 7000, 6500, 9000, 8000, 12000, 11000],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0,
      fill: true,
      stepped: 'before',
    },
  ],
};

<LineChart 
  data={data} 
  title="Monthly Revenue" 
  description="Company revenue from January to July ($)"
/>`,
      content: (
        <LineChart
          data={steppedChartData}
          title="Monthly Revenue"
          description="Company revenue from January to July ($)"
          onRefresh={handleRefreshChart}
          isRefreshing={isRefreshing}
        />
      ),
      category: "advanced",
    },
    {
      id: "realtime",
      title: "Real-time Data Chart",
      description:
        "A line chart that could be used for real-time data visualization.",
      code: `const data = {
  labels: Array.from({ length: 20 }, (_, i) => \`Day \${i + 1}\`),
  datasets: [
    {
      label: 'Real-time Data',
      data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 100)),
      borderColor: 'rgb(139, 92, 246)',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      tension: 0.4,
      fill: true,
    },
  ],
};

<LineChart 
  data={data} 
  title="Real-time Metrics" 
  description="Simulated real-time data over 20 days"
/>`,
      content: (
        <LineChart
          data={realTimeChartData}
          title="Real-time Metrics"
          description="Simulated real-time data over 20 days"
          onRefresh={handleRefreshChart}
          isRefreshing={isRefreshing}
        />
      ),
      category: "advanced",
    },
  ].filter((chart) => {
    const matchesTab = activeTab === "all" || chart.category === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      chart.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chart.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Count charts per category for tabs
  const chartCounts = {
    all: filteredCharts.length,
    basic: filteredCharts.filter((chart) => chart.category === "basic").length,
    advanced: filteredCharts.filter((chart) => chart.category === "advanced")
      .length,
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Sidebar open={sidebarOpen} darkMode={darkMode} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 min-h-screen ${
          sidebarOpen ? "ml-64" : "ml-0"
        } ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 to-gray-800"
            : "bg-gradient-to-br from-gray-50 to-gray-100"
        }`}
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

        <main className="flex-1 relative z-10 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block p-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 mb-6"
              >
                <div
                  className={`p-3 rounded-xl ${
                    darkMode ? "bg-gray-900" : "bg-white"
                  } bg-opacity-90 backdrop-blur-sm`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 mx-auto text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
              </motion.div>

              <h1
                className={`text-5xl font-bold mb-4 bg-gradient-to-r ${
                  darkMode
                    ? "from-blue-400 to-purple-400"
                    : "from-blue-600 to-purple-600"
                } bg-clip-text text-transparent`}
              >
                Line Chart Components
              </h1>
              <p
                className={`text-xl max-w-3xl mx-auto ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Beautiful, responsive line chart components with light and dark
                mode support
              </p>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`mb-8 p-6 rounded-2xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-xl border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  <Tab
                    active={activeTab === "all"}
                    onClick={() => setActiveTab("all")}
                    count={chartCounts.all}
                  >
                    All Charts
                  </Tab>
                  <Tab
                    active={activeTab === "basic"}
                    onClick={() => setActiveTab("basic")}
                    count={chartCounts.basic}
                  >
                    Basic
                  </Tab>
                  <Tab
                    active={activeTab === "advanced"}
                    onClick={() => setActiveTab("advanced")}
                    count={chartCounts.advanced}
                  >
                    Advanced
                  </Tab>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search charts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-xl border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
              </div>
            </motion.div>

            {/* Results Count */}
            {searchQuery && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mb-6 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Found {filteredCharts.length} chart
                {filteredCharts.length !== 1 ? "s" : ""} matching "{searchQuery}
                "
              </motion.p>
            )}

            <div className="grid grid-cols-1 gap-8">
              {isLoading ? (
                // Skeleton loaders
                [...Array(3)].map((_, index) => (
                  <ChartSkeleton key={index} darkMode={darkMode} />
                ))
              ) : filteredCharts.length > 0 ? (
                filteredCharts.map((chart, index) => (
                  <motion.div
                    key={chart.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ChartExample
                      title={chart.title}
                      description={chart.description}
                      code={chart.code}
                      darkMode={darkMode}
                      onToggleDataset={
                        chart.id === "multi-dataset" || chart.id === "realtime"
                          ? () => toggleDataset(chart.id)
                          : undefined
                      }
                      datasetsVisible={datasetsVisible[chart.id]}
                    >
                      {chart.content}
                    </ChartExample>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center py-16 rounded-2xl ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-lg`}
                >
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3
                    className={`mt-4 text-lg font-medium ${
                      darkMode ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    No charts found
                  </h3>
                  <p
                    className={`mt-2 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveTab("all");
                    }}
                    className={`mt-4 px-4 py-2 rounded-xl font-medium ${
                      darkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </div>

            {/* Usage Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-2xl p-8 mt-12 shadow-xl border ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                How to Use These Charts
              </h2>

              <div
                className={`prose prose-lg ${
                  darkMode ? "prose-invert" : ""
                } max-w-none`}
              >
                <h3
                  className={`${darkMode ? "text-gray-200" : "text-gray-800"}`}
                >
                  Installation
                </h3>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  First, install the required dependencies:
                </p>
                <div className="relative my-4">
                  <div
                    className={`rounded-xl p-4 ${
                      darkMode
                        ? "bg-gray-900 text-gray-200"
                        : "bg-gray-100 text-gray-800"
                    } overflow-x-auto`}
                  >
                    <pre className="text-sm font-mono">
                      npm install chart.js react-chartjs-2
                    </pre>
                  </div>
                </div>

                <h3
                  className={`mt-6 ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Basic Usage
                </h3>
                <div className="relative my-4">
                  <div
                    className={`rounded-xl p-4 ${
                      darkMode
                        ? "bg-gray-900 text-gray-200"
                        : "bg-gray-100 text-gray-800"
                    } overflow-x-auto`}
                  >
                    <pre className="text-sm font-mono">{`import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart Title',
    },
  },
};

function MyChart() {
  return <Line data={data} options={options} />;
}`}</pre>
                  </div>
                </div>

                <h3
                  className={`mt-6 ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Props
                </h3>
                <div
                  className={`rounded-xl border ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } overflow-hidden mt-4`}
                >
                  <table className="w-full">
                    <thead
                      className={
                        darkMode
                          ? "bg-gray-700 text-gray-200"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">
                          Prop
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className={darkMode ? "text-white" : "text-black"}>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">data</td>
                        <td className="px-4 py-3 text-sm">Object</td>
                        <td className="px-4 py-3 text-sm">
                          The data object containing labels and datasets
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">options</td>
                        <td className="px-4 py-3 text-sm">Object</td>
                        <td className="px-4 py-3 text-sm">
                          Configuration options for the chart
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">title</td>
                        <td className="px-4 py-3 text-sm">String</td>
                        <td className="px-4 py-3 text-sm">
                          Title displayed above the chart
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          description
                        </td>
                        <td className="px-4 py-3 text-sm">String</td>
                        <td className="px-4 py-3 text-sm">
                          Description text displayed below the title
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">
                          onRefresh
                        </td>
                        <td className="px-4 py-3 text-sm">Function</td>
                        <td className="px-4 py-3 text-sm">
                          Callback function when refresh button is clicked
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          isRefreshing
                        </td>
                        <td className="px-4 py-3 text-sm">Boolean</td>
                        <td className="px-4 py-3 text-sm">
                          Whether the chart is currently refreshing data
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">
                          className
                        </td>
                        <td className="px-4 py-3 text-sm">String</td>
                        <td className="px-4 py-3 text-sm">
                          Additional CSS classes for the container
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <div className="relative z-10 mt-auto">
          <Footer darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}
