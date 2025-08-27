"use client";

import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeContext from "../../DarkModeContext";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/DashboardFooter";

// Komponen Button utama dengan peningkatan UI
const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  icon,
  iconPosition = "left",
  fullWidth = false,
  gradient = false,
  shadow = true,
}) => {
  const { darkMode } = useContext(DarkModeContext);

  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeClasses = {
    small: "px-4 py-2.5 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: darkMode
      ? gradient
        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white focus:ring-blue-500"
        : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
      : gradient
      ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white focus:ring-blue-400"
      : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: darkMode
      ? gradient
        ? "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white focus:ring-gray-500"
        : "bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500"
      : gradient
      ? "bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-900 focus:ring-gray-400"
      : "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-400",
    success: darkMode
      ? gradient
        ? "bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-600 hover:to-emerald-600 text-white focus:ring-green-500"
        : "bg-green-700 hover:bg-green-600 text-white focus:ring-green-500"
      : gradient
      ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white focus:ring-green-400"
      : "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    danger: darkMode
      ? gradient
        ? "bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-600 hover:to-rose-600 text-white focus:ring-red-500"
        : "bg-red-700 hover:bg-red-600 text-white focus:ring-red-500"
      : gradient
      ? "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white focus:ring-red-400"
      : "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    warning: darkMode
      ? gradient
        ? "bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white focus:ring-yellow-500"
        : "bg-yellow-600 hover:bg-yellow-500 text-white focus:ring-yellow-500"
      : gradient
      ? "bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-gray-900 focus:ring-yellow-400"
      : "bg-yellow-500 hover:bg-yellow-600 text-gray-900 focus:ring-yellow-400",
    info: darkMode
      ? gradient
        ? "bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white focus:ring-cyan-500"
        : "bg-cyan-600 hover:bg-cyan-500 text-white focus:ring-cyan-500"
      : gradient
      ? "bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-500 hover:to-sky-500 text-white focus:ring-cyan-400"
      : "bg-cyan-500 hover:bg-cyan-600 text-white focus:ring-cyan-400",
    light: darkMode
      ? "bg-gray-800 hover:bg-gray-700 text-gray-200 focus:ring-gray-600"
      : "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-300",
    dark: darkMode
      ? "bg-gray-900 hover:bg-gray-800 text-white focus:ring-gray-700"
      : "bg-gray-800 hover:bg-gray-900 text-white focus:ring-gray-600",
    outline: darkMode
      ? "border-2 border-gray-600 hover:bg-gray-800 text-white focus:ring-gray-600"
      : "border-2 border-gray-300 hover:bg-gray-100 text-gray-700 focus:ring-gray-400",
    ghost: darkMode
      ? "hover:bg-gray-800 text-gray-300 focus:ring-gray-600"
      : "hover:bg-gray-100 text-gray-700 focus:ring-gray-400",
  };

  const shadowClasses = shadow
    ? darkMode
      ? "shadow-lg shadow-blue-500/10"
      : "shadow-lg shadow-blue-500/20"
    : "";

  const disabledClasses =
    disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <motion.button
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      whileHover={
        disabled || loading ? {} : { y: -3, transition: { duration: 0.2 } }
      }
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${shadowClasses} ${disabledClasses} ${widthClass} ${className}`}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
    >
      {loading && (
        <motion.svg
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
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
        </motion.svg>
      )}
      {!loading && icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {!loading && icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </motion.button>
  );
};

// Komponen untuk menampilkan contoh button
const ButtonExample = ({ title, description, children, code, darkMode }) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);

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
        <div>
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
        <Button
          variant="ghost"
          size="small"
          onClick={() => setIsCodeVisible(!isCodeVisible)}
          icon={
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
                d={
                  isCodeVisible
                    ? "M6 18L18 6M6 6l12 12"
                    : "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                }
              />
            </svg>
          }
        >
          {isCodeVisible ? "Hide Code" : "Show Code"}
        </Button>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 items-center">{children}</div>

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
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Code</span>
                <CopyButton text={code} darkMode={darkMode} />
              </div>
              <pre className="text-sm font-mono">{code}</pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Copy to Clipboard Button yang ditingkatkan
const CopyButton = ({ text, darkMode }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={copyToClipboard}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${
        darkMode
          ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
      }`}
    >
      {copied ? (
        <>
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          Copied!
        </>
      ) : (
        <>
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
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </>
      )}
    </motion.button>
  );
};

// Tab Component untuk navigasi
const Tab = ({ active, onClick, children }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
        active
          ? darkMode
            ? "bg-gray-800 text-blue-400"
            : "bg-white text-blue-600 border-t border-l border-r"
          : darkMode
          ? "text-gray-400 hover:text-gray-300"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
};

export default function ButtonsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [loadingStates, setLoadingStates] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleLoading = (buttonId) => {
    setLoadingStates((prev) => ({
      ...prev,
      [buttonId]: !prev[buttonId],
    }));
    if (!loadingStates[buttonId]) {
      setTimeout(() => {
        setLoadingStates((prev) => ({
          ...prev,
          [buttonId]: false,
        }));
      }, 2000);
    }
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Icon untuk contoh button dengan ikon
  const iconSVG = (
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
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );

  // Filter buttons berdasarkan tab aktif
  const filteredButtons = [
    {
      id: "primary",
      title: "Primary Buttons",
      description: "Primary buttons with different sizes and states.",
      code: `<Button variant="primary" size="small">Small</Button>\n<Button variant="primary">Medium</Button>\n<Button variant="primary" size="large">Large</Button>\n<Button variant="primary" loading={true}>Loading</Button>\n<Button variant="primary" disabled={true}>Disabled</Button>`,
      content: (
        <>
          <Button variant="primary" size="small">
            Small
          </Button>
          <Button variant="primary">Medium</Button>
          <Button variant="primary" size="large">
            Large
          </Button>
          <Button
            variant="primary"
            loading={loadingStates.primaryLoading}
            onClick={() => toggleLoading("primaryLoading")}
          >
            {loadingStates.primaryLoading ? "Loading" : "Click Me"}
          </Button>
          <Button variant="primary" disabled={true}>
            Disabled
          </Button>
        </>
      ),
      category: "basic",
    },
    {
      id: "secondary",
      title: "Secondary Buttons",
      description: "Secondary buttons with different sizes and states.",
      code: `<Button variant="secondary" size="small">Small</Button>\n<Button variant="secondary">Medium</Button>\n<Button variant="secondary" size="large">Large</Button>\n<Button variant="secondary" loading={true}>Loading</Button>\n<Button variant="secondary" disabled={true}>Disabled</Button>`,
      content: (
        <>
          <Button variant="secondary" size="small">
            Small
          </Button>
          <Button variant="secondary">Medium</Button>
          <Button variant="secondary" size="large">
            Large
          </Button>
          <Button
            variant="secondary"
            loading={loadingStates.secondaryLoading}
            onClick={() => toggleLoading("secondaryLoading")}
          >
            {loadingStates.secondaryLoading ? "Loading" : "Click Me"}
          </Button>
          <Button variant="secondary" disabled={true}>
            Disabled
          </Button>
        </>
      ),
      category: "basic",
    },
    {
      id: "colors",
      title: "Color Variants",
      description: "Buttons with different color variants.",
      code: `<Button variant="success">Success</Button>\n<Button variant="danger">Danger</Button>\n<Button variant="warning">Warning</Button>\n<Button variant="info">Info</Button>\n<Button variant="light">Light</Button>\n<Button variant="dark">Dark</Button>`,
      content: (
        <>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="info">Info</Button>
          <Button variant="light">Light</Button>
          <Button variant="dark">Dark</Button>
        </>
      ),
      category: "colors",
    },
    {
      id: "outline-ghost",
      title: "Outline & Ghost Buttons",
      description: "Outline and ghost style buttons.",
      code: `<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="outline" size="small">Small Outline</Button>\n<Button variant="ghost" size="large">Large Ghost</Button>`,
      content: (
        <>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline" size="small">
            Small Outline
          </Button>
          <Button variant="ghost" size="large">
            Large Ghost
          </Button>
        </>
      ),
      category: "styles",
    },
    {
      id: "icons",
      title: "Buttons with Icons",
      description: "Buttons with icons on left or right side.",
      code: `<Button icon={iconSVG}>Icon Left</Button>\n<Button icon={iconSVG} iconPosition="right">Icon Right</Button>\n<Button icon={iconSVG} variant="outline">Outline with Icon</Button>\n<Button icon={iconSVG} variant="ghost">Ghost with Icon</Button>`,
      content: (
        <>
          <Button icon={iconSVG}>Icon Left</Button>
          <Button icon={iconSVG} iconPosition="right">
            Icon Right
          </Button>
          <Button icon={iconSVG} variant="outline">
            Outline with Icon
          </Button>
          <Button icon={iconSVG} variant="ghost">
            Ghost with Icon
          </Button>
        </>
      ),
      category: "icons",
    },
    {
      id: "full-width",
      title: "Full Width Buttons",
      description: "Buttons that span the full width of their container.",
      code: `<Button fullWidth={true}>Full Width Button</Button>\n<Button variant="outline" fullWidth={true}>Full Width Outline</Button>\n<Button variant="secondary" fullWidth={true} size="large">Large Full Width</Button>`,
      content: (
        <div className="w-full space-y-3">
          <Button fullWidth={true}>Full Width Button</Button>
          <Button variant="outline" fullWidth={true}>
            Full Width Outline
          </Button>
          <Button variant="secondary" fullWidth={true} size="large">
            Large Full Width
          </Button>
        </div>
      ),
      category: "layout",
    },
    {
      id: "gradient",
      title: "Gradient Buttons",
      description: "Buttons with beautiful gradient effects.",
      code: `<Button gradient>Primary Gradient</Button>\n<Button variant="success" gradient>Success Gradient</Button>\n<Button variant="danger" gradient>Danger Gradient</Button>\n<Button variant="info" gradient>Info Gradient</Button>`,
      content: (
        <>
          <Button gradient>Primary Gradient</Button>
          <Button variant="success" gradient>
            Success Gradient
          </Button>
          <Button variant="danger" gradient>
            Danger Gradient
          </Button>
          <Button variant="info" gradient>
            Info Gradient
          </Button>
        </>
      ),
      category: "styles",
    },
    {
      id: "no-shadow",
      title: "Buttons without Shadow",
      description: "Buttons with shadow effect disabled.",
      code: `<Button shadow={false}>Without Shadow</Button>\n<Button variant="outline" shadow={false}>Outline without Shadow</Button>\n<Button variant="ghost" shadow={false}>Ghost without Shadow</Button>`,
      content: (
        <>
          <Button shadow={false}>Without Shadow</Button>
          <Button variant="outline" shadow={false}>
            Outline without Shadow
          </Button>
          <Button variant="ghost" shadow={false}>
            Ghost without Shadow
          </Button>
        </>
      ),
      category: "styles",
    },
  ].filter((button) => {
    const matchesTab = activeTab === "all" || button.category === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      button.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      button.description.toLowerCase().includes(searchQuery.toLowerCase());
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
                Button Components
              </h1>
              <p
                className={`text-xl max-w-3xl mx-auto ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Beautiful, accessible, and customizable button components with
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
                    All Buttons
                  </Tab>
                  <Tab
                    active={activeTab === "basic"}
                    onClick={() => setActiveTab("basic")}
                  >
                    Basic
                  </Tab>
                  <Tab
                    active={activeTab === "colors"}
                    onClick={() => setActiveTab("colors")}
                  >
                    Colors
                  </Tab>
                  <Tab
                    active={activeTab === "styles"}
                    onClick={() => setActiveTab("styles")}
                  >
                    Styles
                  </Tab>
                  <Tab
                    active={activeTab === "icons"}
                    onClick={() => setActiveTab("icons")}
                  >
                    With Icons
                  </Tab>
                  <Tab
                    active={activeTab === "layout"}
                    onClick={() => setActiveTab("layout")}
                  >
                    Layout
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
                    placeholder="Search buttons..."
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
                Found {filteredButtons.length} button
                {filteredButtons.length !== 1 ? "s" : ""} matching "
                {searchQuery}"
              </motion.p>
            )}

            <div className="grid grid-cols-1 gap-8">
              {filteredButtons.length > 0 ? (
                filteredButtons.map((button, index) => (
                  <motion.div
                    key={button.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ButtonExample
                      title={button.title}
                      description={button.description}
                      code={button.code}
                      darkMode={darkMode}
                    >
                      {button.content}
                    </ButtonExample>
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
                    No buttons found
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
                How to Use These Buttons
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
                  Copy the <code>Button</code> component code into your project.
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
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Example Code</span>
                      <CopyButton
                        text={`import { Button } from '@/components/Button';

// Basic button
<Button variant="primary" onClick={() => console.log('Clicked')}>
  Click Me
</Button>

// Button with icon
<Button variant="secondary" icon={iconSVG} iconPosition="left">
  With Icon
</Button>

// Disabled button
<Button variant="primary" disabled={true}>
  Disabled
</Button>`}
                        darkMode={darkMode}
                      />
                    </div>
                    <pre className="text-sm font-mono">{`import { Button } from '@/components/Button';

// Basic button
<Button variant="primary" onClick={() => console.log('Clicked')}>
  Click Me
</Button>

// Button with icon
<Button variant="secondary" icon={iconSVG} iconPosition="left">
  With Icon
</Button>

// Disabled button
<Button variant="primary" disabled={true}>
  Disabled
</Button>`}</pre>
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
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">variant</td>
                        <td className="px-4 py-3 text-sm">
                          'primary' | 'secondary' | 'success' | 'danger' |
                          'warning' | 'info' | 'light' | 'dark' | 'outline' |
                          'ghost'
                        </td>
                        <td className="px-4 py-3 font-mono text-sm">
                          'primary'
                        </td>
                        <td className="px-4 py-3 text-sm">
                          The visual style of the button
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">size</td>
                        <td className="px-4 py-3 text-sm">
                          'small' | 'medium' | 'large'
                        </td>
                        <td className="px-4 py-3 font-mono text-sm">
                          'medium'
                        </td>
                        <td className="px-4 py-3 text-sm">
                          The size of the button
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">
                          disabled
                        </td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">false</td>
                        <td className="px-4 py-3 text-sm">
                          Whether the button is disabled
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">loading</td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">false</td>
                        <td className="px-4 py-3 text-sm">
                          Whether to show a loading spinner
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">onClick</td>
                        <td className="px-4 py-3 text-sm">function</td>
                        <td className="px-4 py-3 font-mono text-sm">-</td>
                        <td className="px-4 py-3 text-sm">
                          Click handler function
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">icon</td>
                        <td className="px-4 py-3 text-sm">ReactNode</td>
                        <td className="px-4 py-3 font-mono text-sm">-</td>
                        <td className="px-4 py-3 text-sm">
                          Icon to display in the button
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">
                          iconPosition
                        </td>
                        <td className="px-4 py-3 text-sm">'left' | 'right'</td>
                        <td className="px-4 py-3 font-mono text-sm">'left'</td>
                        <td className="px-4 py-3 text-sm">
                          Position of the icon relative to the text
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          fullWidth
                        </td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">false</td>
                        <td className="px-4 py-3 text-sm">
                          Whether the button should span the full width
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">
                          gradient
                        </td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">false</td>
                        <td className="px-4 py-3 text-sm">
                          Whether to apply a gradient background
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">shadow</td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">true</td>
                        <td className="px-4 py-3 text-sm">
                          Whether to show shadow effect
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
