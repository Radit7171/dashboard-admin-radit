"use client";

import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeContext from "../../DarkModeContext";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/DashboardFooter";

// Komponen Card utama yang telah ditingkatkan
const Card = ({
  title,
  description,
  image,
  variant = "default",
  actionText = "Learn More",
  onAction,
  children,
  className = "",
  shadow = true,
  border = false,
  hoverEffect = true,
  badges = [],
  rating = null,
  stats = null,
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const baseClasses =
    "rounded-2xl transition-all duration-300 overflow-hidden flex flex-col";

  const variantClasses = {
    default: darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900",
    primary: darkMode
      ? "bg-gradient-to-br from-blue-800 to-indigo-900 text-white"
      : "bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-900",
    secondary: darkMode
      ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
      : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900",
    success: darkMode
      ? "bg-gradient-to-br from-emerald-800 to-green-900 text-white"
      : "bg-gradient-to-br from-emerald-50 to-green-100 text-emerald-900",
    danger: darkMode
      ? "bg-gradient-to-br from-rose-800 to-red-900 text-white"
      : "bg-gradient-to-br from-rose-50 to-red-100 text-rose-900",
    warning: darkMode
      ? "bg-gradient-to-br from-amber-700 to-orange-800 text-white"
      : "bg-gradient-to-br from-amber-50 to-orange-100 text-amber-900",
    premium: darkMode
      ? "bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white"
      : "bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 text-purple-900",
  };

  const shadowClasses = shadow
    ? darkMode
      ? "shadow-xl shadow-blue-500/10"
      : "shadow-xl shadow-blue-500/10"
    : "";

  const borderClasses = border
    ? darkMode
      ? "border border-gray-700"
      : "border border-gray-200"
    : "";

  const hoverClasses = hoverEffect
    ? "hover:-translate-y-2 hover:shadow-2xl"
    : "";

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -8, scale: 1.01 } : {}}
      className={`${baseClasses} ${variantClasses[variant]} ${shadowClasses} ${borderClasses} ${hoverClasses} ${className}`}
    >
      {image && (
        <div className="w-full h-48 relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-3 right-3 flex space-x-2">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                darkMode
                  ? "bg-black/30 hover:bg-black/50 text-white"
                  : "bg-white/80 hover:bg-white text-gray-800"
              }`}
            >
              {isBookmarked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
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
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              )}
            </button>
          </div>
          {badges.length > 0 && (
            <div className="absolute top-3 left-3 flex space-x-2">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium rounded-full bg-white/90 backdrop-blur-sm text-gray-800"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          {title && (
            <h3
              className={`text-xl font-bold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
          )}

          {rating !== null && (
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating ? "text-amber-400 fill-current" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-sm text-gray-500">({rating})</span>
            </div>
          )}

          {description && (
            <p
              className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {description}
            </p>
          )}

          {children && <div className="mb-4">{children}</div>}

          {stats && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-2 rounded-lg bg-black/5"
                >
                  <div
                    className={`text-lg font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {onAction && actionText && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAction}
              className={`px-4 py-2 rounded-xl font-medium ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              } transition-colors duration-300 flex items-center`}
            >
              {actionText}
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.button>
          )}

          <div className="flex space-x-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-colors ${
                isLiked
                  ? "text-rose-500 bg-rose-100 dark:bg-rose-900/30"
                  : darkMode
                  ? "text-gray-400 hover:bg-gray-700"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {isLiked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              )}
            </button>

            <button
              className={`p-2 rounded-full transition-colors ${
                darkMode
                  ? "text-gray-400 hover:bg-gray-700"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
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
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Komponen untuk menampilkan contoh card
const CardExample = ({ title, description, children, code, darkMode }) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
      className={`px-4 py-2 font-medium rounded-xl transition-all flex items-center relative ${
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

// Skeleton loader untuk cards
const CardSkeleton = ({ darkMode }) => {
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
        className={`h-48 rounded-xl mb-4 ${
          darkMode ? "bg-gray-700" : "bg-gray-300"
        }`}
      ></div>
      <div className="flex space-x-2">
        <div
          className={`h-10 w-24 rounded-xl ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`h-10 w-10 rounded-xl ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default function CardsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popular");

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

  // Placeholder image URL
  const placeholderImage =
    "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";

  // Sample data untuk card
  const cardExamples = [
    {
      id: "basic",
      title: "Basic Cards",
      description:
        "Simple cards with different content types and clean design.",
      code: `<Card\n  title="Basic Card"\n  description="This is a simple card with a title, description, and action button."\n  actionText="Learn More"\n  onAction={() => console.log('Card action')}\n/>\n\n<Card\n  title="Card with Image"\n  description="This card includes an image along with text content."\n  image={placeholderImage}\n  actionText="View Details"\n  onAction={() => console.log('Card action')}\n/>`,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Basic Card"
            description="This is a simple card with a title, description, and action button."
            actionText="Learn More"
            onAction={() => console.log("Card action")}
          />
          <Card
            title="Card with Image"
            description="This card includes an image along with text content."
            image={placeholderImage}
            actionText="View Details"
            onAction={() => console.log("Card action")}
          />
        </div>
      ),
      category: "basic",
    },
    {
      id: "variants",
      title: "Card Variants",
      description:
        "Cards with different color variants and styles for various use cases.",
      code: `<Card\n  title="Primary Card"\n  description="This card uses the primary variant with gradient background."\n  variant="primary"\n  actionText="Get Started"\n  onAction={() => console.log('Primary action')}\n/>\n\n<Card\n  title="Success Card"\n  description="This card uses the success variant for positive messages."\n  variant="success"\n  actionText="Success"\n  onAction={() => console.log('Success action')}\n/>\n\n<Card\n  title="Danger Card"\n  description="This card uses the danger variant for alerts or warnings."\n  variant="danger"\n  actionText="Dismiss"\n  onAction={() => console.log('Danger action')}\n/>`,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Primary Card"
            description="This card uses the primary variant with gradient background."
            variant="primary"
            actionText="Get Started"
            onAction={() => console.log("Primary action")}
          />
          <Card
            title="Success Card"
            description="This card uses the success variant for positive messages."
            variant="success"
            actionText="Success"
            onAction={() => console.log("Success action")}
          />
          <Card
            title="Danger Card"
            description="This card uses the danger variant for alerts or warnings."
            variant="danger"
            actionText="Dismiss"
            onAction={() => console.log("Danger action")}
          />
        </div>
      ),
      category: "variants",
    },
    {
      id: "styles",
      title: "Card Styles",
      description:
        "Cards with different visual styles, effects, and interactive elements.",
      code: `<Card\n  title="No Shadow Card"\n  description="This card has the shadow effect disabled."\n  shadow={false}\n  border={true}\n  actionText="View Options"\n  onAction={() => console.log('No shadow action')}\n/>\n\n<Card\n  title="Bordered Card"\n  description="This card has a border for a more defined look."\n  border={true}\n  actionText="Explore"\n  onAction={() => console.log('Bordered action')}\n/>\n\n<Card\n  title="No Hover Effect"\n  description="This card has the hover effect disabled."\n  hoverEffect={false}\n  actionText="Learn More"\n  onAction={() => console.log('No hover action')}\n/>`,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="No Shadow Card"
            description="This card has the shadow effect disabled."
            shadow={false}
            border={true}
            actionText="View Options"
            onAction={() => console.log("No shadow action")}
          />
          <Card
            title="Bordered Card"
            description="This card has a border for a more defined look."
            border={true}
            actionText="Explore"
            onAction={() => console.log("Bordered action")}
          />
          <Card
            title="No Hover Effect"
            description="This card has the hover effect disabled."
            hoverEffect={false}
            actionText="Learn More"
            onAction={() => console.log("No hover action")}
          />
        </div>
      ),
      category: "styles",
    },
    {
      id: "content",
      title: "Rich Content Cards",
      description:
        "Cards with custom content, badges, ratings, and complex layouts.",
      code: `<Card\n  title="Card with Custom Content"\n  image={placeholderImage}\n  badges={["New", "Popular"]}\n  rating={4.5}\n  stats={[\n    { label: "Views", value: "1.2K" },\n    { label: "Likes", value: "384" },\n    { label: "Shares", value: "56" }\n  ]}\n  onAction={() => console.log('Custom content action')}\n>\n  <p className="mb-4">This card contains custom content passed as children.</p>\n  <div className="flex justify-between mb-4">\n    <span className="text-sm text-gray-500">Posted on January 1, 2023</span>\n    <span className="text-sm text-blue-500">5 min read</span>\n  </div>\n  <div className="flex space-x-2">\n    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Tag 1</span>\n    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Tag 2</span>\n  </div>\n</Card>`,
      content: (
        <div className="grid grid-cols-1 gap-6">
          <Card
            title="Card with Custom Content"
            image={placeholderImage}
            badges={["New", "Popular"]}
            rating={4.5}
            stats={[
              { label: "Views", value: "1.2K" },
              { label: "Likes", value: "384" },
              { label: "Shares", value: "56" },
            ]}
            onAction={() => console.log("Custom content action")}
          >
            <p
              className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              This card contains custom content passed as children. You can add
              any React components or HTML elements inside the card body.
            </p>
            <div className="flex justify-between mb-4">
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Posted on January 1, 2023
              </span>
              <span className="text-sm text-blue-500">5 min read</span>
            </div>
            <div className="flex space-x-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                Tag 1
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                Tag 2
              </span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                Tag 3
              </span>
            </div>
          </Card>
        </div>
      ),
      category: "content",
    },
    {
      id: "premium",
      title: "Premium Cards",
      description: "Special cards with premium styling for featured content.",
      code: `<Card\n  title="Premium Card"\n  description="This card uses the premium variant with gradient background for special content."\n  variant="premium"\n  image={placeholderImage}\n  badges={["Premium", "Exclusive"]}\n  rating={5}\n  actionText="Get Premium"\n  onAction={() => console.log('Premium action')}\n/>`,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Premium Card"
            description="This card uses the premium variant with gradient background for special content."
            variant="premium"
            image={placeholderImage}
            badges={["Premium", "Exclusive"]}
            rating={5}
            actionText="Get Premium"
            onAction={() => console.log("Premium action")}
          />
          <Card
            title="Product Card"
            description="Perfect for e-commerce and product displays with rating and action buttons."
            variant="default"
            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            badges={["Sale", "Limited"]}
            rating={4.2}
            stats={[
              { label: "Sold", value: "124" },
              { label: "Reviews", value: "86" },
              { label: "In Stock", value: "24" },
            ]}
            actionText="Buy Now"
            onAction={() => console.log("Buy action")}
          />
        </div>
      ),
      category: "premium",
    },
  ].filter((card) => {
    const matchesTab = activeTab === "all" || card.category === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Count cards per category for tabs
  const cardCounts = {
    all: cardExamples.length,
    basic: cardExamples.filter((card) => card.category === "basic").length,
    variants: cardExamples.filter((card) => card.category === "variants")
      .length,
    styles: cardExamples.filter((card) => card.category === "styles").length,
    content: cardExamples.filter((card) => card.category === "content").length,
    premium: cardExamples.filter((card) => card.category === "premium").length,
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
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
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
                Card Components
              </h1>
              <p
                className={`text-xl max-w-3xl mx-auto ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Beautiful, responsive card components with light and dark mode
                support. Fully customizable and interactive.
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
                    count={cardCounts.all}
                  >
                    All Cards
                  </Tab>
                  <Tab
                    active={activeTab === "basic"}
                    onClick={() => setActiveTab("basic")}
                    count={cardCounts.basic}
                  >
                    Basic
                  </Tab>
                  <Tab
                    active={activeTab === "variants"}
                    onClick={() => setActiveTab("variants")}
                    count={cardCounts.variants}
                  >
                    Variants
                  </Tab>
                  <Tab
                    active={activeTab === "styles"}
                    onClick={() => setActiveTab("styles")}
                    count={cardCounts.styles}
                  >
                    Styles
                  </Tab>
                  <Tab
                    active={activeTab === "content"}
                    onClick={() => setActiveTab("content")}
                    count={cardCounts.content}
                  >
                    Content
                  </Tab>
                  <Tab
                    active={activeTab === "premium"}
                    onClick={() => setActiveTab("premium")}
                    count={cardCounts.premium}
                  >
                    Premium
                  </Tab>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
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
                      placeholder="Search cards..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`pl-10 pr-4 py-2 rounded-xl border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>

                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className={`pl-3 pr-10 py-2 rounded-xl border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none`}
                    >
                      <option value="popular">Most Popular</option>
                      <option value="recent">Most Recent</option>
                      <option value="az">A to Z</option>
                      <option value="za">Z to A</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="h-4 w-4 text-gray-400"
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
                    </div>
                  </div>
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
                Found {cardExamples.length} card
                {cardExamples.length !== 1 ? "s" : ""} matching "{searchQuery}"
              </motion.p>
            )}

            <div className="grid grid-cols-1 gap-8">
              {isLoading ? (
                // Skeleton loaders
                [...Array(3)].map((_, index) => (
                  <CardSkeleton key={index} darkMode={darkMode} />
                ))
              ) : cardExamples.length > 0 ? (
                cardExamples.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CardExample
                      title={card.title}
                      description={card.description}
                      code={card.code}
                      darkMode={darkMode}
                    >
                      {card.content}
                    </CardExample>
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
                    No cards found
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
                How to Use These Cards
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
                  Copy the <code>Card</code> component code into your project.
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
                    <pre className="text-sm font-mono">{`import { Card } from '@/components/Card';

// Basic card
<Card
  title="Card Title"
  description="This is a description of the card content."
  actionText="Learn More"
  onAction={() => console.log('Card action')}
/>

// Card with image
<Card
  title="Card with Image"
  description="This card includes an image."
  image="/path/to/image.jpg"
  actionText="View Details"
  onAction={() => console.log('Card action')}
/>

// Card with custom content
<Card title="Custom Content Card">
  <p>This is custom content passed as children.</p>
  <button onClick={() => console.log('Custom action')}>Custom Button</button>
</Card>`}</pre>
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
                    <tbody className={
                        darkMode
                          ? "divide-y divide-gray-200 dark:divide-gray-700"
                          : "bg-gray-100 text-gray-800"
                      }>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">title</td>
                        <td className="px-4 py-3 text-sm">string</td>
                        <td className="px-4 py-3 font-mono text-sm">-</td>
                        <td className="px-4 py-3 text-sm">
                          The title of the card
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          description
                        </td>
                        <td className="px-4 py-3 text-sm">string</td>
                        <td className="px-4 py-3 font-mono text-sm">-</td>
                        <td className="px-4 py-3 text-sm">
                          The description text of the card
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">image</td>
                        <td className="px-4 py-3 text-sm">string</td>
                        <td className="px-4 py-3 font-mono text-sm">-</td>
                        <td className="px-4 py-3 text-sm">
                          URL of the image to display
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">variant</td>
                        <td className="px-4 py-3 text-sm">
                          'default' | 'primary' | 'secondary' | 'success' |
                          'danger' | 'warning' | 'premium'
                        </td>
                        <td className="px-4 py-3 font-mono text-sm">
                          'default'
                        </td>
                        <td className="px-4 py-3 text-sm">
                          The visual style variant of the card
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">
                          actionText
                        </td>
                        <td className="px-4 py-3 text-sm">string</td>
                        <td className="px-4 py-3 font-mono text-sm">
                          'Learn More'
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Text for the action button
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          onAction
                        </td>
                        <td className="px-4 py-3 text-sm">function</td>
                        <td className="px-4 py-3 font-mono text-sm">-</td>
                        <td className="px-4 py-3 text-sm">
                          Callback function when action button is clicked
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">badges</td>
                        <td className="px-4 py-3 text-sm">string[]</td>
                        <td className="px-4 py-3 font-mono text-sm">[]</td>
                        <td className="px-4 py-3 text-sm">
                          Array of badge labels to display
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">rating</td>
                        <td className="px-4 py-3 text-sm">number</td>
                        <td className="px-4 py-3 font-mono text-sm">null</td>
                        <td className="px-4 py-3 text-sm">
                          Numeric rating value (0-5)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">stats</td>
                        <td className="px-4 py-3 text-sm">
                          Array&#x3C;{`{label: string, value: string}`}&#x3E;
                        </td>
                        <td className="px-4 py-3 font-mono text-sm">null</td>
                        <td className="px-4 py-3 text-sm">
                          Statistical data to display
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
                        <td className="px-4 py-3 font-mono text-sm">border</td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">false</td>
                        <td className="px-4 py-3 text-sm">
                          Whether to show a border
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          hoverEffect
                        </td>
                        <td className="px-4 py-3 text-sm">boolean</td>
                        <td className="px-4 py-3 font-mono text-sm">true</td>
                        <td className="px-4 py-3 text-sm">
                          Whether to enable hover effects
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
