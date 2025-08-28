"use client";

import { useState, useContext, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import DarkModeContext from "@/app/DarkModeContext";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/DashboardFooter";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

// Komponen Pie Chart utama yang telah ditingkatkan
const PieChart = ({
  data,
  options,
  title,
  description,
  className = "",
  variant = "pie",
  onVariantChange,
  showActions = true,
}) => {
  const chartRef = useRef(null);
  const { darkMode } = useContext(DarkModeContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50));

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
          padding: 20,
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
        backgroundColor: darkMode ? "#374151" : "#ffffff",
        titleColor: darkMode ? "#f3f4f6" : "#374151",
        bodyColor: darkMode ? "#e5e7eb" : "#6b7280",
        borderColor: darkMode ? "#4b5563" : "#e5e7eb",
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    ...options,
    cutout:
      variant === "doughnut"
        ? "60%"
        : variant === "thinDoughnut"
        ? "80%"
        : "0%",
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1500,
      easing: "easeOutQuart",
    },
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`rounded-2xl p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-xl border ${darkMode ? "border-gray-700" : "border-gray-200"} ${
        isExpanded ? "fixed inset-4 z-50" : "relative"
      } transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleExpand}
    >
      {isExpanded && (
        <button
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          onClick={(e) => {
            e.stopPropagation();
            handleExpand();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-1`}
          >
            {title}
          </h3>
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

        {showActions && (
          <div className="flex space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`p-2 rounded-full ${
                isLiked
                  ? "bg-red-100 text-red-500 dark:bg-red-900/30"
                  : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300"
              } transition-colors`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Like</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {likeCount}
              </span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleBookmark}
              className={`p-2 rounded-full ${
                isBookmarked
                  ? "bg-blue-100 text-blue-500 dark:bg-blue-900/30"
                  : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300"
              } transition-colors`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              <span className="sr-only">Bookmark</span>
            </motion.button>

            {onVariantChange && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onVariantChange();
                }}
                className="p-2 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                <span className="sr-only">Change Chart Type</span>
              </motion.button>
            )}
          </div>
        )}
      </div>

      <div
        className={`relative ${
          isExpanded ? "h-[calc(100vh-180px)]" : "h-64 md:h-80"
        }`}
      >
        <Pie ref={chartRef} data={data} options={defaultOptions} />

        <AnimatePresence>
          {isHovered && !isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center"
            >
              <button className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg font-medium flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Click to expand
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {variant !== "pie" && (
        <div className="mt-4 flex justify-center">
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {variant === "doughnut" ? "Doughnut Chart" : "Thin Doughnut Chart"}
          </span>
        </div>
      )}
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
  onVariantChange,
  chartVariant,
}) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } mb-8 shadow-lg border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
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
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
            {description}
          </p>
        </div>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCodeVisible(!isCodeVisible)}
            className={`px-4 py-2 rounded-lg font-medium flex items-center ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
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
            {isCodeVisible ? "Hide Code" : "Show Code"}
          </motion.button>

          {onVariantChange && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onVariantChange}
              className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
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
              Change Type
            </motion.button>
          )}
        </div>
      </div>

      <div className="mb-6">{children}</div>

      {isCodeVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden mt-4"
        >
          <div
            className={`rounded-xl p-4 relative ${
              darkMode
                ? "bg-gray-900 text-gray-200"
                : "bg-gray-100 text-gray-800"
            } overflow-x-auto`}
          >
            <button
              onClick={copyToClipboard}
              className={`absolute top-2 right-2 p-2 rounded-lg ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                  : "bg-white hover:bg-gray-200 text-gray-800"
              }`}
            >
              {isCopied ? "Copied!" : "Copy"}
            </button>
            <pre className="text-sm font-mono overflow-x-auto">{code}</pre>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Tab Component untuk navigasi
const Tab = ({ active, onClick, children }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 font-medium rounded-lg transition-colors relative ${
        active
          ? darkMode
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-blue-500 text-white shadow-lg"
          : darkMode
          ? "text-gray-400 hover:text-gray-300 bg-gray-700"
          : "text-gray-500 hover:text-gray-700 bg-gray-100"
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="activeTab"
          className={`absolute inset-0 rounded-lg ${
            darkMode ? "bg-blue-600" : "bg-blue-500"
          } z-[-1]`}
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
};

// Skeleton Loader
const ChartSkeleton = ({ darkMode }) => {
  return (
    <div
      className={`rounded-2xl p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      } mb-8`}
    >
      <div className="animate-pulse">
        <div
          className={`h-6 w-1/3 rounded-md ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          } mb-4`}
        ></div>
        <div
          className={`h-4 w-2/3 rounded-md ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          } mb-6`}
        ></div>
        <div
          className={`h-64 rounded-xl ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default function PieChartsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [chartVariants, setChartVariants] = useState({
    basic: "pie",
    doughnut: "doughnut",
    monochrome: "pie",
    smallSlices: "pie",
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleChartVariant = (chartId) => {
    setChartVariants((prev) => {
      const currentVariant = prev[chartId];
      let nextVariant;

      if (currentVariant === "pie") nextVariant = "doughnut";
      else if (currentVariant === "doughnut") nextVariant = "thinDoughnut";
      else nextVariant = "pie";

      return { ...prev, [chartId]: nextVariant };
    });
  };

  // Data untuk contoh chart
  const basicChartData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Desktop", "Mobile", "Tablet"],
    datasets: [
      {
        label: "Traffic Source",
        data: [60, 30, 10],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(16, 185, 129)",
          "rgb(245, 158, 11)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const monochromeChartData = {
    labels: ["Marketing", "Sales", "Development", "Support", "Other"],
    datasets: [
      {
        label: "Budget Allocation",
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(59, 130, 246, 0.6)",
          "rgba(59, 130, 246, 0.4)",
          "rgba(59, 130, 246, 0.3)",
          "rgba(59, 130, 246, 0.2)",
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(59, 130, 246)",
          "rgb(59, 130, 246)",
          "rgb(59, 130, 246)",
          "rgb(59, 130, 246)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const smallSlicesChartData = {
    labels: ["Direct", "Social", "Referral", "Email", "Organic", "Other"],
    datasets: [
      {
        label: "Traffic Sources",
        data: [35, 25, 20, 10, 8, 2],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(156, 163, 175, 0.8)",
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(239, 68, 68)",
          "rgb(16, 185, 129)",
          "rgb(245, 158, 11)",
          "rgb(139, 92, 246)",
          "rgb(156, 163, 175)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Filter charts berdasarkan tab aktif
  const filteredCharts = [
    {
      id: "basic",
      title: "Basic Pie Chart",
      description:
        "A simple pie chart showing distribution of data with different colors.",
      code: `const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

<PieChart 
  data={data} 
  title="Vote Distribution" 
  description="Distribution of votes across different options"
/>`,
      content: (
        <PieChart
          data={basicChartData}
          title="Vote Distribution"
          description="Distribution of votes across different options"
          variant={chartVariants.basic}
          onVariantChange={() => toggleChartVariant("basic")}
        />
      ),
      category: "basic",
    },
    {
      id: "doughnut",
      title: "Doughnut Chart",
      description:
        "A doughnut chart variant of the pie chart with a central cutout.",
      code: `const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      label: 'Traffic Source',
      data: [60, 30, 10],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  cutout: '60%',
};

<PieChart 
  data={data} 
  options={options}
  title="Device Usage" 
  description="Percentage of traffic by device type"
/>`,
      content: (
        <PieChart
          data={doughnutChartData}
          title="Device Usage"
          description="Percentage of traffic by device type"
          variant={chartVariants.doughnut}
          onVariantChange={() => toggleChartVariant("doughnut")}
        />
      ),
      category: "variations",
    },
    {
      id: "monochrome",
      title: "Monochrome Pie Chart",
      description:
        "A pie chart using different shades of the same color for a cohesive look.",
      code: `const data = {
  labels: ['Marketing', 'Sales', 'Development', 'Support', 'Other'],
  datasets: [
    {
      label: 'Budget Allocation',
      data: [30, 25, 20, 15, 10],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(59, 130, 246, 0.6)',
        'rgba(59, 130, 246, 0.4)',
        'rgba(59, 130, 246, 0.3)',
        'rgba(59, 130, 246, 0.2)',
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(59, 130, 246)',
        'rgb(59, 130, 246)',
        'rgb(59, 130, 246)',
        'rgb(59, 130, 246)',
      ],
      borderWidth: 1,
    },
  ],
};

<PieChart 
  data={data} 
  title="Budget Allocation" 
  description="Company budget distribution across departments"
/>`,
      content: (
        <PieChart
          data={monochromeChartData}
          title="Budget Allocation"
          description="Company budget distribution across departments"
          variant={chartVariants.monochrome}
          onVariantChange={() => toggleChartVariant("monochrome")}
        />
      ),
      category: "styles",
    },
    {
      id: "small-slices",
      title: "Pie Chart with Small Slices",
      description:
        "A pie chart that includes small slices, demonstrating how the chart handles them.",
      code: `const data = {
  labels: ['Direct', 'Social', 'Referral', 'Email', 'Organic', 'Other'],
  datasets: [
    {
      label: 'Traffic Sources',
      data: [35, 25, 20, 10, 8, 2],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(156, 163, 175, 0.8)',
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(239, 68, 68)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(139, 92, 246)',
        'rgb(156, 163, 175)',
      ],
      borderWidth: 1,
    },
  ],
};

<PieChart 
  data={data} 
  title="Traffic Sources" 
  description="Website traffic by source with small slices"
/>`,
      content: (
        <PieChart
          data={smallSlicesChartData}
          title="Traffic Sources"
          description="Website traffic by source with small slices"
          variant={chartVariants.smallSlices}
          onVariantChange={() => toggleChartVariant("smallSlices")}
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

  return (
    <div className={darkMode ? "dark" : ""}>
      <Sidebar open={sidebarOpen} darkMode={darkMode} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 min-h-screen ${
          sidebarOpen ? "ml-64" : "ml-0"
        } ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
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
              <h1
                className={`text-5xl font-bold mb-4 bg-gradient-to-r ${
                  darkMode
                    ? "from-blue-400 to-purple-400"
                    : "from-blue-600 to-purple-600"
                } bg-clip-text text-transparent`}
              >
                Pie Chart Components
              </h1>
              <p
                className={`text-xl max-w-3xl mx-auto ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Beautiful, responsive pie chart components with light and dark
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
              } shadow-lg border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <Tab
                    active={activeTab === "all"}
                    onClick={() => setActiveTab("all")}
                  >
                    All Charts
                  </Tab>
                  <Tab
                    active={activeTab === "basic"}
                    onClick={() => setActiveTab("basic")}
                  >
                    Basic
                  </Tab>
                  <Tab
                    active={activeTab === "variations"}
                    onClick={() => setActiveTab("variations")}
                  >
                    Variations
                  </Tab>
                  <Tab
                    active={activeTab === "styles"}
                    onClick={() => setActiveTab("styles")}
                  >
                    Styles
                  </Tab>
                  <Tab
                    active={activeTab === "advanced"}
                    onClick={() => setActiveTab("advanced")}
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
                    className={`pl-10 pr-4 py-2 rounded-lg border ${
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
                // Show skeleton loaders while loading
                Array.from({ length: 4 }).map((_, index) => (
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
                      onVariantChange={() => toggleChartVariant(chart.id)}
                      chartVariant={chartVariants[chart.id]}
                    >
                      {chart.content}
                    </ChartExample>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center py-12 rounded-2xl ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
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
                </motion.div>
              )}
            </div>

            {/* Usage Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-2xl p-8 mt-12 shadow-lg border ${
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
                    <pre className="text-sm font-mono">{`import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
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
  return <Pie data={data} options={options} />;
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
