"use client";

import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeContext from "../../DarkModeContext";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/DashboardFooter";

// Komponen Alert utama yang telah ditingkatkan
const Alert = ({
  type = "info",
  title,
  children,
  onClose,
  showIcon = true,
  showCloseButton = true,
  className = "",
  isVisible = true,
  variant = "default",
  autoClose = false,
  progress = false,
  action = null,
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const [progressWidth, setProgressWidth] = useState(100);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (autoClose && isVisible && !isHovered) {
      const interval = setInterval(() => {
        setProgressWidth((prev) => Math.max(0, prev - 0.5));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [autoClose, isVisible, isHovered]);

  useEffect(() => {
    if (progressWidth === 0 && onClose) {
      onClose();
    }
  }, [progressWidth, onClose]);

  const alertConfig = {
    info: {
      icon: (
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
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: {
        default: darkMode ? "bg-blue-900/20" : "bg-blue-50",
        solid: darkMode ? "bg-blue-700" : "bg-blue-500",
        outline: darkMode
          ? "bg-transparent border border-blue-500"
          : "bg-transparent border border-blue-400",
      },
      textColor: {
        default: darkMode ? "text-blue-400" : "text-blue-800",
        solid: "text-white",
        outline: darkMode ? "text-blue-400" : "text-blue-600",
      },
      titleColor: {
        default: darkMode ? "text-blue-300" : "text-blue-800",
        solid: "text-white",
        outline: darkMode ? "text-blue-300" : "text-blue-700",
      },
      iconColor: {
        default: darkMode ? "text-blue-400" : "text-blue-500",
        solid: "text-white",
        outline: darkMode ? "text-blue-400" : "text-blue-500",
      },
      progressColor: darkMode ? "bg-blue-400" : "bg-blue-500",
    },
    success: {
      icon: (
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: {
        default: darkMode ? "bg-green-900/20" : "bg-green-50",
        solid: darkMode ? "bg-green-700" : "bg-green-500",
        outline: darkMode
          ? "bg-transparent border border-green-500"
          : "bg-transparent border border-green-400",
      },
      textColor: {
        default: darkMode ? "text-green-400" : "text-green-800",
        solid: "text-white",
        outline: darkMode ? "text-green-400" : "text-green-600",
      },
      titleColor: {
        default: darkMode ? "text-green-300" : "text-green-800",
        solid: "text-white",
        outline: darkMode ? "text-green-300" : "text-green-700",
      },
      iconColor: {
        default: darkMode ? "text-green-400" : "text-green-500",
        solid: "text-white",
        outline: darkMode ? "text-green-400" : "text-green-500",
      },
      progressColor: darkMode ? "bg-green-400" : "bg-green-500",
    },
    warning: {
      icon: (
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      bgColor: {
        default: darkMode ? "bg-yellow-900/20" : "bg-yellow-50",
        solid: darkMode ? "bg-yellow-700" : "bg-yellow-500",
        outline: darkMode
          ? "bg-transparent border border-yellow-500"
          : "bg-transparent border border-yellow-400",
      },
      textColor: {
        default: darkMode ? "text-yellow-400" : "text-yellow-800",
        solid: "text-white",
        outline: darkMode ? "text-yellow-400" : "text-yellow-600",
      },
      titleColor: {
        default: darkMode ? "text-yellow-300" : "text-yellow-800",
        solid: "text-white",
        outline: darkMode ? "text-yellow-300" : "text-yellow-700",
      },
      iconColor: {
        default: darkMode ? "text-yellow-400" : "text-yellow-500",
        solid: "text-white",
        outline: darkMode ? "text-yellow-400" : "text-yellow-500",
      },
      progressColor: darkMode ? "bg-yellow-400" : "bg-yellow-500",
    },
    error: {
      icon: (
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
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: {
        default: darkMode ? "bg-red-900/20" : "bg-red-50",
        solid: darkMode ? "bg-red-700" : "bg-red-500",
        outline: darkMode
          ? "bg-transparent border border-red-500"
          : "bg-transparent border border-red-400",
      },
      textColor: {
        default: darkMode ? "text-red-400" : "text-red-800",
        solid: "text-white",
        outline: darkMode ? "text-red-400" : "text-red-600",
      },
      titleColor: {
        default: darkMode ? "text-red-300" : "text-red-800",
        solid: "text-white",
        outline: darkMode ? "text-red-300" : "text-red-700",
      },
      iconColor: {
        default: darkMode ? "text-red-400" : "text-red-500",
        solid: "text-white",
        outline: darkMode ? "text-red-400" : "text-red-500",
      },
      progressColor: darkMode ? "bg-red-400" : "bg-red-500",
    },
  };

  const config = alertConfig[type];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`rounded-xl p-4 ${config.bgColor[variant]} ${config.textColor[variant]} ${className} relative overflow-hidden`}
      role="alert"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {progress && autoClose && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700">
          <div
            className={`h-full ${config.progressColor} transition-all duration-50`}
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      )}

      <div className="flex items-start">
        {showIcon && (
          <div className={`flex-shrink-0 mr-3 ${config.iconColor[variant]}`}>
            {config.icon}
          </div>
        )}
        <div className="flex-1">
          {title && (
            <h3 className={`font-semibold ${config.titleColor[variant]} mb-1`}>
              {title}
            </h3>
          )}
          <div className={`text-sm ${config.textColor[variant]}`}>
            {children}
          </div>

          {action && <div className="mt-3 flex space-x-2">{action}</div>}
        </div>
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className={`flex-shrink-0 ml-4 ${config.iconColor[variant]} hover:opacity-70 transition-opacity`}
            aria-label="Close alert"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Komponen untuk contoh penggunaan alert
const AlertExample = ({ title, description, children, code, darkMode }) => {
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
              <div className="space-y-4">{children}</div>
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

// Skeleton loader untuk alerts
const AlertSkeleton = ({ darkMode }) => {
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
        <div
          className={`h-8 w-8 rounded-lg ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          }`}
        ></div>
      </div>
      <div
        className={`h-32 rounded-xl mb-4 ${
          darkMode ? "bg-gray-700" : "bg-gray-300"
        }`}
      ></div>
    </div>
  );
};

export default function AlertsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // State untuk alert yang bisa ditutup
  const [visibleAlerts, setVisibleAlerts] = useState({
    closableInfo: true,
    closableSuccess: true,
    closableWarning: true,
    closableError: true,
    autoCloseAlert: true,
    solidAlert: true,
    outlineAlert: true,
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

  const handleCloseAlert = (alertKey) => {
    setVisibleAlerts((prev) => ({
      ...prev,
      [alertKey]: false,
    }));
  };

  const handleResetAlerts = () => {
    setVisibleAlerts({
      closableInfo: true,
      closableSuccess: true,
      closableWarning: true,
      closableError: true,
      autoCloseAlert: true,
      solidAlert: true,
      outlineAlert: true,
    });
  };

  // Filter alerts berdasarkan tab aktif
  const filteredAlerts = [
    {
      id: "basic",
      title: "Basic Alerts",
      description: "Simple alerts with different types and styles.",
      code: `<Alert type="info">\n  This is an informational alert.\n</Alert>\n\n<Alert type="success">\n  This is a success alert.\n</Alert>\n\n<Alert type="warning">\n  This is a warning alert.\n</Alert>\n\n<Alert type="error">\n  This is an error alert.\n</Alert>`,
      content: (
        <>
          <Alert type="info">This is an informational alert.</Alert>
          <Alert type="success">This is a success alert.</Alert>
          <Alert type="warning">This is a warning alert.</Alert>
          <Alert type="error">This is an error alert.</Alert>
        </>
      ),
      category: "basic",
    },
    {
      id: "with-titles",
      title: "Alerts with Titles",
      description: "Alerts that include a title for additional context.",
      code: `<Alert type="info" title="Information">\n  Additional information about this alert.\n</Alert>\n\n<Alert type="success" title="Success">\n  Your action was completed successfully.\n</Alert>\n\n<Alert type="warning" title="Warning">\n  This action requires your attention.\n</Alert>\n\n<Alert type="error" title="Error">\n  Something went wrong with your request.\n</Alert>`,
      content: (
        <>
          <Alert type="info" title="Information">
            Additional information about this alert.
          </Alert>
          <Alert type="success" title="Success">
            Your action was completed successfully.
          </Alert>
          <Alert type="warning" title="Warning">
            This action requires your attention.
          </Alert>
          <Alert type="error" title="Error">
            Something went wrong with your request.
          </Alert>
        </>
      ),
      category: "titles",
    },
    {
      id: "closable",
      title: "Closable Alerts",
      description: "Alerts that can be dismissed by the user.",
      code: `const [visible, setVisible] = useState(true);\n\n<Alert \n  type="info" \n  title="Closable Alert"\n  onClose={() => setVisible(false)}\n  isVisible={visible}\n>\n  This alert can be closed by clicking the X button.\n</Alert>`,
      content: (
        <>
          <Alert
            type="info"
            title="Closable Info Alert"
            onClose={() => handleCloseAlert("closableInfo")}
            isVisible={visibleAlerts.closableInfo}
          >
            This info alert can be closed by clicking the X button.
          </Alert>
          <Alert
            type="success"
            title="Closable Success Alert"
            onClose={() => handleCloseAlert("closableSuccess")}
            isVisible={visibleAlerts.closableSuccess}
          >
            This success alert can be closed by clicking the X button.
          </Alert>
          <Alert
            type="warning"
            title="Closable Warning Alert"
            onClose={() => handleCloseAlert("closableWarning")}
            isVisible={visibleAlerts.closableWarning}
          >
            This warning alert can be closed by clicking the X button.
          </Alert>
          <Alert
            type="error"
            title="Closable Error Alert"
            onClose={() => handleCloseAlert("closableError")}
            isVisible={visibleAlerts.closableError}
          >
            This error alert can be closed by clicking the X button.
          </Alert>
        </>
      ),
      category: "interactive",
    },
    {
      id: "variants",
      title: "Alert Variants",
      description: "Alerts with different visual styles and variants.",
      code: `<Alert type="info" variant="solid">\n  This is a solid alert.\n</Alert>\n\n<Alert type="success" variant="outline">\n  This is an outline alert.\n</Alert>\n\n<Alert type="warning" variant="solid" title="Solid Warning">\n  This is a solid warning alert with title.\n</Alert>`,
      content: (
        <>
          <Alert
            type="info"
            variant="solid"
            isVisible={visibleAlerts.solidAlert}
            onClose={() => handleCloseAlert("solidAlert")}
          >
            This is a solid alert.
          </Alert>
          <Alert
            type="success"
            variant="outline"
            isVisible={visibleAlerts.outlineAlert}
            onClose={() => handleCloseAlert("outlineAlert")}
          >
            This is an outline alert.
          </Alert>
          <Alert type="warning" variant="solid" title="Solid Warning">
            This is a solid warning alert with title.
          </Alert>
          <Alert type="error" variant="outline" title="Outline Error">
            This is an outline error alert with title.
          </Alert>
        </>
      ),
      category: "variants",
    },
    {
      id: "auto-close",
      title: "Auto-Close Alerts",
      description: "Alerts that automatically close after a certain time.",
      code: `<Alert \n  type="info" \n  title="Auto-Close Alert"\n  autoClose={true}\n  progress={true}\n  onClose={() => setVisible(false)}\n  isVisible={visible}\n>\n  This alert will automatically close after 5 seconds.\n</Alert>`,
      content: (
        <>
          <Alert
            type="info"
            title="Auto-Close Alert"
            autoClose={true}
            progress={true}
            onClose={() => handleCloseAlert("autoCloseAlert")}
            isVisible={visibleAlerts.autoCloseAlert}
          >
            This alert will automatically close after 5 seconds.
          </Alert>
          <Alert
            type="success"
            title="Success Auto-Close"
            autoClose={true}
            progress={true}
          >
            This success alert will auto-close. Hover to pause.
          </Alert>
        </>
      ),
      category: "interactive",
    },
    {
      id: "custom",
      title: "Custom Content Alerts",
      description:
        "Alerts with custom content, actions, and additional elements.",
      code: `<Alert type="info" title="Update Available">\n  <p>A new version of the application is available.</p>\n  <div className="mt-2 flex space-x-2">\n    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">\n      Update Now\n    </button>\n    <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm">\n      Later\n    </button>\n  </div>\n</Alert>`,
      content: (
        <>
          <Alert
            type="info"
            title="Update Available"
            action={
              <div className="mt-2 flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  Update Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    darkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Later
                </motion.button>
              </div>
            }
          >
            <p>A new version of the application is available.</p>
          </Alert>
          <Alert type="success" title="Payment Processed" variant="solid">
            <p>
              Your payment of <strong>$49.99</strong> was successfully
              processed.
            </p>
            <p className="mt-1 text-xs opacity-75">
              Transaction ID: 1234567890
            </p>
          </Alert>
          <Alert
            type="warning"
            title="Session Expiring Soon"
            action={
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  darkMode
                    ? "bg-yellow-600 text-white"
                    : "bg-yellow-500 text-white"
                }`}
              >
                Extend Session
              </motion.button>
            }
          >
            <p>Your session will expire in 5 minutes due to inactivity.</p>
          </Alert>
        </>
      ),
      category: "content",
    },
  ].filter((alert) => {
    const matchesTab = activeTab === "all" || alert.category === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Count alerts per category for tabs
  const alertCounts = {
    all: filteredAlerts.length,
    basic: filteredAlerts.filter((alert) => alert.category === "basic").length,
    titles: filteredAlerts.filter((alert) => alert.category === "titles")
      .length,
    interactive: filteredAlerts.filter(
      (alert) => alert.category === "interactive"
    ).length,
    variants: filteredAlerts.filter((alert) => alert.category === "variants")
      .length,
    content: filteredAlerts.filter((alert) => alert.category === "content")
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
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
                Alert Components
              </h1>
              <p
                className={`text-xl max-w-3xl mx-auto ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Beautiful, accessible, and customizable alert components with
                light and dark mode support
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
                    count={alertCounts.all}
                  >
                    All Alerts
                  </Tab>
                  <Tab
                    active={activeTab === "basic"}
                    onClick={() => setActiveTab("basic")}
                    count={alertCounts.basic}
                  >
                    Basic
                  </Tab>
                  <Tab
                    active={activeTab === "titles"}
                    onClick={() => setActiveTab("titles")}
                    count={alertCounts.titles}
                  >
                    With Titles
                  </Tab>
                  <Tab
                    active={activeTab === "interactive"}
                    onClick={() => setActiveTab("interactive")}
                    count={alertCounts.interactive}
                  >
                    Interactive
                  </Tab>
                  <Tab
                    active={activeTab === "variants"}
                    onClick={() => setActiveTab("variants")}
                    count={alertCounts.variants}
                  >
                    Variants
                  </Tab>
                  <Tab
                    active={activeTab === "content"}
                    onClick={() => setActiveTab("content")}
                    count={alertCounts.content}
                  >
                    Content
                  </Tab>
                </div>

                <div className="flex gap-4">
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
                      placeholder="Search alerts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`pl-10 pr-4 py-2 rounded-xl border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleResetAlerts}
                    className={`px-4 py-2 rounded-xl font-medium ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    Reset Alerts
                  </motion.button>
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
                Found {filteredAlerts.length} alert
                {filteredAlerts.length !== 1 ? "s" : ""} matching "{searchQuery}
                "
              </motion.p>
            )}

            <div className="grid grid-cols-1 gap-8">
              {isLoading ? (
                // Skeleton loaders
                [...Array(3)].map((_, index) => (
                  <AlertSkeleton key={index} darkMode={darkMode} />
                ))
              ) : filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AlertExample
                      title={alert.title}
                      description={alert.description}
                      code={alert.code}
                      darkMode={darkMode}
                    >
                      {alert.content}
                    </AlertExample>
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
                    No alerts found
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
                How to Use These Alerts
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
                  Copy the <code>Alert</code> component code into your project.
                </p>

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
                    <pre className="text-sm font-mono">{`import { Alert } from '@/components/Alert';

// Basic alert
<Alert type="info">
  This is an informational message.
</Alert>

// Alert with title
<Alert type="success" title="Success">
  Your action was completed successfully.
</Alert>

// Closable alert
const [isVisible, setIsVisible] = useState(true);

<Alert 
  type="warning" 
  onClose={() => setIsVisible(false)}
  isVisible={isVisible}
>
  This alert can be closed.
</Alert>

// Auto-close alert with progress bar
<Alert 
  type="info" 
  autoClose={true}
  progress={true}
  onClose={() => setIsVisible(false)}
  isVisible={isVisible}
>
  This alert will auto-close.
</Alert>`}</pre>
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
                          Default
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className={darkMode ? "text-white" : "text-black"}>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">type</td>
                        <td className="px-4 py-3 text-sm">
                          'info' | 'success' | 'warning' | 'error'
                        </td>
                        <td className="px-4 py-3 font-mono text-sm">'info'</td>
                        <td className="px-4 py-3 text-sm">
                          The type of alert which determines its color and icon
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">title</td>
                        <td className="px-4 py-3 text-sm">string</td>
                        <td className="px-4 py-3 font-mono text-sm">-</td>
                        <td className="px-4 py-3 text-sm">
                          Optional title for the alert
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">onClose</td>
                        <td className="px-4 py-3 text-sm">function</td>
                        <td className="px-4 py-3 font-mono text-sm">-</td>
                        <td className="px-4 py-3 text-sm">
                          Callback function when the close button is clicked
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          showIcon
                        </td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">true</td>
                        <td className="px-4 py-3 text-sm">
                          Whether to show the icon
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">
                          showCloseButton
                        </td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">true</td>
                        <td className="px-4 py-3 text-sm">
                          Whether to show the close button (requires onClose)
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          isVisible
                        </td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">true</td>
                        <td className="px-4 py-3 text-sm">
                          Controls whether the alert is visible
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">variant</td>
                        <td className="px-4 py-3 text-sm">
                          'default' | 'solid' | 'outline'
                        </td>
                        <td className="px-4 py-3 font-mono text-sm">
                          'default'
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Visual style variant of the alert
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          autoClose
                        </td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">false</td>
                        <td className="px-4 py-3 text-sm">
                          Whether the alert should auto-close after a period
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">
                          progress
                        </td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">false</td>
                        <td className="px-4 py-3 text-sm">
                          Whether to show a progress bar for auto-close alerts
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">action</td>
                        <td className="px-4 py-3 text-sm">ReactNode</td>
                        <td className="px-4 py-3 font-mono text-sm">null</td>
                        <td className="px-4 py-3 text-sm">
                          Custom action buttons or elements
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">
                          className
                        </td>
                        <td className="px-4 py-3 text-sm">string</td>
                        <td className="px-4 py-3 font-mono text-sm">''</td>
                        <td className="px-4 py-3 text-sm">
                          Additional CSS classes
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
