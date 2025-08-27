"use client";

import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeContext from "../../DarkModeContext";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/DashboardFooter";

// Komponen Alert yang dapat digunakan kembali
const Alert = ({
  type = "info",
  title,
  children,
  onClose,
  className = "",
  showIcon = true,
  showCloseButton = true,
}) => {
  const { darkMode } = useContext(DarkModeContext);

  const alertConfig = {
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
      bgColor: darkMode ? "bg-green-900/20" : "bg-green-50",
      borderColor: darkMode ? "border-green-700" : "border-green-200",
      textColor: darkMode ? "text-green-400" : "text-green-800",
      titleColor: darkMode ? "text-green-300" : "text-green-900",
      iconColor: darkMode ? "text-green-400" : "text-green-500",
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
      bgColor: darkMode ? "bg-red-900/20" : "bg-red-50",
      borderColor: darkMode ? "border-red-700" : "border-red-200",
      textColor: darkMode ? "text-red-400" : "text-red-800",
      titleColor: darkMode ? "text-red-300" : "text-red-900",
      iconColor: darkMode ? "text-red-400" : "text-red-500",
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
      bgColor: darkMode ? "bg-yellow-900/20" : "bg-yellow-50",
      borderColor: darkMode ? "border-yellow-700" : "border-yellow-200",
      textColor: darkMode ? "text-yellow-400" : "text-yellow-800",
      titleColor: darkMode ? "text-yellow-300" : "text-yellow-900",
      iconColor: darkMode ? "text-yellow-400" : "text-yellow-500",
    },
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
            d="M13 16h-1v-4 h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: darkMode ? "bg-blue-900/20" : "bg-blue-50",
      borderColor: darkMode ? "border-blue-700" : "border-blue-200",
      textColor: darkMode ? "text-blue-400" : "text-blue-800",
      titleColor: darkMode ? "text-blue-300" : "text-blue-900",
      iconColor: darkMode ? "text-blue-400" : "text-blue-500",
    },
  };

  const config = alertConfig[type] || alertConfig.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`rounded-lg border p-4 ${config.bgColor} ${config.borderColor} ${className}`}
    >
      <div className="flex items-start">
        {showIcon && (
          <div className={`flex-shrink-0 mr-3 ${config.iconColor}`}>
            {config.icon}
          </div>
        )}

        <div className="flex-1">
          {title && (
            <h3 className={`text-sm font-medium mb-1 ${config.titleColor}`}>
              {title}
            </h3>
          )}
          <div className={`text-sm ${config.textColor}`}>{children}</div>
        </div>

        {showCloseButton && onClose && (
          <button
            type="button"
            onClick={onClose}
            className={`ml-4 flex-shrink-0 ${
              darkMode
                ? "text-gray-400 hover:text-gray-300"
                : "text-gray-500 hover:text-gray-700"
            }`}
            aria-label="Close"
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

// Komponen untuk menampilkan contoh alert
const AlertExample = ({ title, description, children, code }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      } mb-8`}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h3>
      <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        {description}
      </p>

      <div className="mb-4">{children}</div>

      <div
        className={`rounded-lg p-4 ${
          darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
        } overflow-x-auto`}
      >
        <pre className="text-sm">{code}</pre>
      </div>
    </motion.div>
  );
};

// Copy to Clipboard Button
const CopyButton = ({ text, darkMode }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`ml-2 px-3 py-1 rounded text-xs ${
        darkMode
          ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
      }`}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

export default function AlertsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [visibleAlerts, setVisibleAlerts] = useState({
    success: true,
    error: true,
    warning: true,
    info: true,
    withAction: true,
  });

  const toggleAlert = (alertType) => {
    setVisibleAlerts((prev) => ({
      ...prev,
      [alertType]: !prev[alertType],
    }));
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1
                className={`text-4xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Alert Components
              </h1>
              <p
                className={`text-lg ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Ready-to-use alert components with light and dark mode support
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Success Alert Example */}
              <AlertExample
                title="Success Alert"
                description="Use this alert to indicate a successful operation."
                code={`<Alert type="success" title="Success!" onClose={() => toggleAlert('success')}>\n  Your action was completed successfully.\n</Alert>`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={darkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Toggle this alert:
                  </span>
                  <button
                    onClick={() => toggleAlert("success")}
                    className={`px-3 py-1 rounded text-sm ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    {visibleAlerts.success ? "Hide" : "Show"}
                  </button>
                </div>
                <AnimatePresence>
                  {visibleAlerts.success && (
                    <Alert
                      type="success"
                      title="Success!"
                      onClose={() => toggleAlert("success")}
                    >
                      Your action was completed successfully.
                    </Alert>
                  )}
                </AnimatePresence>
              </AlertExample>

              {/* Error Alert Example */}
              <AlertExample
                title="Error Alert"
                description="Use this alert to indicate an error or problem."
                code={`<Alert type="error" title="Error!" onClose={() => toggleAlert('error')}>\n  Something went wrong. Please try again.\n</Alert>`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={darkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Toggle this alert:
                  </span>
                  <button
                    onClick={() => toggleAlert("error")}
                    className={`px-3 py-1 rounded text-sm ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    {visibleAlerts.error ? "Hide" : "Show"}
                  </button>
                </div>
                <AnimatePresence>
                  {visibleAlerts.error && (
                    <Alert
                      type="error"
                      title="Error!"
                      onClose={() => toggleAlert("error")}
                    >
                      Something went wrong. Please try again.
                    </Alert>
                  )}
                </AnimatePresence>
              </AlertExample>

              {/* Warning Alert Example */}
              <AlertExample
                title="Warning Alert"
                description="Use this alert to warn users about potential issues."
                code={`<Alert type="warning" title="Warning!" onClose={() => toggleAlert('warning')}>\n  This action requires your attention.\n</Alert>`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={darkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Toggle this alert:
                  </span>
                  <button
                    onClick={() => toggleAlert("warning")}
                    className={`px-3 py-1 rounded text-sm ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    {visibleAlerts.warning ? "Hide" : "Show"}
                  </button>
                </div>
                <AnimatePresence>
                  {visibleAlerts.warning && (
                    <Alert
                      type="warning"
                      title="Warning!"
                      onClose={() => toggleAlert("warning")}
                    >
                      This action requires your attention.
                    </Alert>
                  )}
                </AnimatePresence>
              </AlertExample>

              {/* Info Alert Example */}
              <AlertExample
                title="Info Alert"
                description="Use this alert to provide general information."
                code={`<Alert type="info" title="Information" onClose={() => toggleAlert('info')}>\n  Here's some important information for you.\n</Alert>`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={darkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Toggle this alert:
                  </span>
                  <button
                    onClick={() => toggleAlert("info")}
                    className={`px-3 py-1 rounded text-sm ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    {visibleAlerts.info ? "Hide" : "Show"}
                  </button>
                </div>
                <AnimatePresence>
                  {visibleAlerts.info && (
                    <Alert
                      type="info"
                      title="Information"
                      onClose={() => toggleAlert("info")}
                    >
                      Here's some important information for you.
                    </Alert>
                  )}
                </AnimatePresence>
              </AlertExample>
            </div>

            {/* Full Width Examples */}
            <div className="mt-8">
              {/* Alert with Action Example */}
              <AlertExample
                title="Alert with Action"
                description="Alerts can include custom content and actions."
                code={`<Alert type="info" title="Session Expiring Soon">\n  <p className="mb-3">Your session will expire in 5 minutes.</p>\n  <div className="flex space-x-3">\n    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">\n      Extend Session\n    </button>\n    <button className="px-3 py-1 bg-gray-300 text-gray-800 rounded text-sm">\n      Logout Now\n    </button>\n  </div>\n</Alert>`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={darkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Toggle this alert:
                  </span>
                  <button
                    onClick={() => toggleAlert("withAction")}
                    className={`px-3 py-1 rounded text-sm ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    {visibleAlerts.withAction ? "Hide" : "Show"}
                  </button>
                </div>
                <AnimatePresence>
                  {visibleAlerts.withAction && (
                    <Alert
                      type="info"
                      title="Session Expiring Soon"
                      onClose={() => toggleAlert("withAction")}
                    >
                      <p className="mb-3">
                        Your session will expire in 5 minutes.
                      </p>
                      <div className="flex space-x-3">
                        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                          Extend Session
                        </button>
                        <button className="px-3 py-1 bg-gray-300 text-gray-800 rounded text-sm hover:bg-gray-400 transition-colors">
                          Logout Now
                        </button>
                      </div>
                    </Alert>
                  )}
                </AnimatePresence>
              </AlertExample>

              {/* Alert without Icon Example */}
              <AlertExample
                title="Alert without Icon"
                description="You can optionally hide the icon in alerts."
                code={`<Alert type="success" showIcon={false}>\n  This alert doesn't have an icon.\n</Alert>`}
              >
                <Alert type="success" showIcon={false}>
                  This alert doesn't have an icon.
                </Alert>
              </AlertExample>
            </div>

            {/* Usage Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-xl p-6 shadow-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              } mt-12`}
            >
              <h2
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                How to Use These Alerts
              </h2>

              <div
                className={`prose ${darkMode ? "prose-invert" : ""} max-w-none`}
              >
                <h3>Installation</h3>
                <p>
                  Copy the <code>Alert</code> component code into your project.
                </p>

                <h3>Basic Usage</h3>
                <div className="relative">
                  <pre
                    className={`rounded-lg p-4 ${
                      darkMode
                        ? "bg-gray-900 text-gray-200"
                        : "bg-gray-100 text-gray-800"
                    } overflow-x-auto`}
                  >
                    {`import { Alert } from '@/components/Alert';

// Simple alert
<Alert type="success" title="Success!">
  Your action was completed successfully.
</Alert>

// Alert with close button
<Alert type="error" title="Error!" onClose={() => console.log('Closed')}>
  Something went wrong.
</Alert>`}
                  </pre>
                  <CopyButton
                    text={`import { Alert } from '@/components/Alert';

// Simple alert
<Alert type="success" title="Success!">
  Your action was completed successfully.
</Alert>

// Alert with close button
<Alert type="error" title="Error!" onClose={() => console.log('Closed')}>
  Something went wrong.
</Alert>`}
                    darkMode={darkMode}
                  />
                </div>

                <h3>Props</h3>
                <div
                  className={`rounded-lg border ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } overflow-hidden`}
                >
                  <table className="w-full">
                    <thead className={darkMode ? "bg-gray-700" : "bg-gray-100"}>
                      <tr>
                        <th className="px-4 py-2 text-left">Prop</th>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Default</th>
                        <th className="px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        className={
                          darkMode ? "border-gray-700" : "border-gray-200"
                        }
                      >
                        <td className="px-4 py-2 font-mono">type</td>
                        <td className="px-4 py-2">
                          'success' | 'error' | 'warning' | 'info'
                        </td>
                        <td className="px-4 py-2">'info'</td>
                        <td className="px-4 py-2">
                          The type of alert to display
                        </td>
                      </tr>
                      <tr
                        className={
                          darkMode ? "border-gray-700" : "border-gray-200"
                        }
                      >
                        <td className="px-4 py-2 font-mono">title</td>
                        <td className="px-4 py-2">string</td>
                        <td className="px-4 py-2">-</td>
                        <td className="px-4 py-2">
                          Optional title for the alert
                        </td>
                      </tr>
                      <tr
                        className={
                          darkMode ? "border-gray-700" : "border-gray-200"
                        }
                      >
                        <td className="px-4 py-2 font-mono">onClose</td>
                        <td className="px-4 py-2">function</td>
                        <td className="px-4 py-2">-</td>
                        <td className="px-4 py-2">
                          Callback when the close button is clicked
                        </td>
                      </tr>
                      <tr
                        className={
                          darkMode ? "border-gray-700" : "border-gray-200"
                        }
                      >
                        <td className="px-4 py-2 font-mono">showIcon</td>
                        <td className="px-4 py-2">boolean</td>
                        <td className="px-4 py-2">true</td>
                        <td className="px-4 py-2">
                          Whether to show the alert icon
                        </td>
                      </tr>
                      <tr
                        className={
                          darkMode ? "border-gray-700" : "border-gray-200"
                        }
                      >
                        <td className="px-4 py-2 font-mono">showCloseButton</td>
                        <td className="px-4 py-2">boolean</td>
                        <td className="px-4 py-2">true</td>
                        <td className="px-4 py-2">
                          Whether to show the close button (only if onClose is
                          provided)
                        </td>
                      </tr>
                      <tr
                        className={
                          darkMode ? "border-gray-700" : "border-gray-200"
                        }
                      >
                        <td className="px-4 py-2 font-mono">className</td>
                        <td className="px-4 py-2">string</td>
                        <td className="px-4 py-2">''</td>
                        <td className="px-4 py-2">
                          Additional CSS classes for the alert
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
