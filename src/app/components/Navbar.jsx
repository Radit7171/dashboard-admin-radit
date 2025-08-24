"use client";
import { useState, useEffect, useRef } from "react";
import {
  Search,
  Globe,
  ShoppingCart,
  Bell,
  AppWindow,
  Maximize,
  Minimize,
  User,
  Settings,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  Mail,
  MessageSquare,
  Calendar,
  HardDrive,
  LogOut,
  CreditCard,
  HelpCircle,
  Shield,
} from "lucide-react";

export default function Navbar({ onToggleSidebar, darkMode, setDarkMode }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [sidebarMini, setSidebarMini] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navbarRef = useRef(null);

  // Tutup dropdown saat klik di luar navbar
  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Tambahkan event listener untuk perubahan status fullscreen
  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    setActiveDropdown(null);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <>
      {/* Navbar */}
      <header
        ref={navbarRef}
        className={`${
          darkMode
            ? "bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-gray-200"
            : "bg-gradient-to-r from-[#f8fafc] to-[#e2e8f0] text-gray-800"
        } shadow-lg p-3 flex justify-between items-center sticky top-0 z-50`}
      >
        {/* Left: Sidebar toggle + Search */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
            }`}
          >
            <Menu size={20} />
          </button>
          <div className="relative">
            <Search
              className={`absolute left-3 top-2.5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
              size={18}
            />
            <input
              type="text"
              placeholder="Search anything..."
              className={`pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all ${
                darkMode
                  ? "bg-[#1e293b] text-gray-200"
                  : "bg-gray-100 text-gray-800"
              }`}
            />
          </div>
        </div>

        {/* Right: Menu */}
        <div className="flex items-center gap-2 relative">
          {/* Toggle Dark/Light Mode */}
          <button
            onClick={() => setDarkMode(v => !v)}
            className={`p-2 rounded-lg transition-all ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdown("lang")}
              className={`flex items-center gap-1 p-2 rounded-lg transition-all ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
              }`}
            >
              <Globe size={18} />
              <span className="hidden md:inline">EN</span>
              <ChevronDown
                size={14}
                className={`transition-transform ${
                  activeDropdown === "lang" ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeDropdown === "lang" && (
              <div
                className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg overflow-hidden py-1 animate-fadeIn ${
                  darkMode
                    ? "bg-[#1e293b] text-gray-200 border border-gray-700"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                <button
                  className={`flex items-center gap-2 px-4 py-2 w-full text-left transition-colors ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  <span className="fi fi-gb mr-2"></span>
                  English
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 w-full text-left transition-colors ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  <span className="fi fi-id mr-2"></span>
                  Indonesian
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 w-full text-left transition-colors ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  <span className="fi fi-jp mr-2"></span>
                  Japanese
                </button>
              </div>
            )}
          </div>

          {/* Cart Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdown("cart")}
              className={`p-2 rounded-lg relative transition-all ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
              }`}
            >
              <ShoppingCart size={18} />
              <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white px-1.5 rounded-full flex items-center justify-center h-4 w-4">
                3
              </span>
            </button>
            {activeDropdown === "cart" && (
              <div
                className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg overflow-hidden animate-fadeIn ${
                  darkMode
                    ? "bg-[#1e293b] text-gray-200 border border-gray-700"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                <div
                  className={`p-3 border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } font-medium flex justify-between items-center`}
                >
                  <span>Shopping Cart</span>
                  <span className="text-xs text-blue-400">3 items</span>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <div
                    className={`p-3 flex items-center gap-3 transition-colors ${
                      darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
                      <CreditCard size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Wireless Headphones</p>
                      <p
                        className={`text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        $129.99 x 1
                      </p>
                    </div>
                  </div>
                  <div
                    className={`p-3 flex items-center gap-3 transition-colors ${
                      darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="w-10 h-10 bg-green-600 rounded-md flex items-center justify-center">
                      <CreditCard size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Smart Watch</p>
                      <p
                        className={`text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        $259.99 x 1
                      </p>
                    </div>
                  </div>
                  <div
                    className={`p-3 flex items-center gap-3 transition-colors ${
                      darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="w-10 h-10 bg-purple-600 rounded-md flex items-center justify-center">
                      <CreditCard size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone Case</p>
                      <p
                        className={`text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        $24.99 x 1
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`p-3 border-t ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } flex justify-between items-center`}
                >
                  <span className="text-sm">Total:</span>
                  <span className="font-medium">$414.97</span>
                </div>
                <div
                  className={`p-3 ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-100"
                  }`}
                >
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition-colors">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notification Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdown("notif")}
              className={`p-2 rounded-lg relative transition-all ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
              }`}
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 text-xs bg-green-500 text-white px-1.5 rounded-full flex items-center justify-center h-4 w-4">
                5
              </span>
            </button>
            {activeDropdown === "notif" && (
              <div
                className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg overflow-hidden animate-fadeIn ${
                  darkMode
                    ? "bg-[#1e293b] text-gray-200 border border-gray-700"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                <div
                  className={`p-3 border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } font-medium flex justify-between items-center`}
                >
                  <span>Notifications</span>
                  <span className="text-xs text-blue-400">
                    Mark all as read
                  </span>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <div
                    className={`p-3 border-b transition-colors ${
                      darkMode
                        ? "hover:bg-gray-800 border-gray-800"
                        : "hover:bg-gray-100 border-gray-100"
                    }`}
                  >
                    <p className="text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      New order received
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Customer #3245 placed a new order
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        darkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      2 minutes ago
                    </p>
                  </div>
                  <div
                    className={`p-3 border-b transition-colors ${
                      darkMode
                        ? "hover:bg-gray-800 border-gray-800"
                        : "hover:bg-gray-100 border-gray-100"
                    }`}
                  >
                    <p className="text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Server rebooted
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Server maintenance completed successfully
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        darkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      45 minutes ago
                    </p>
                  </div>
                  <div
                    className={`p-3 border-b transition-colors ${
                      darkMode
                        ? "hover:bg-gray-800 border-gray-800"
                        : "hover:bg-gray-100 border-gray-100"
                    }`}
                  >
                    <p className="text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      Payment received
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      New payment of $299.99 received
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        darkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      1 hour ago
                    </p>
                  </div>
                </div>
                <div
                  className={`p-3 text-center ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-100"
                  }`}
                >
                  <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Related Apps Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdown("apps")}
              className={`p-2 rounded-lg transition-all ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
              }`}
            >
              <AppWindow size={18} />
            </button>
            {activeDropdown === "apps" && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg grid grid-cols-2 gap-1 p-2 animate-fadeIn ${
                  darkMode
                    ? "bg-[#1e293b] text-gray-200 border border-gray-700"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                <button
                  className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  <Mail size={20} className="mb-1 text-blue-400" />
                  <span className="text-xs">Mail</span>
                </button>
                <button
                  className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  <MessageSquare size={20} className="mb-1 text-green-400" />
                  <span className="text-xs">Chat</span>
                </button>
                <button
                  className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  <Calendar size={20} className="mb-1 text-yellow-400" />
                  <span className="text-xs">Calendar</span>
                </button>
                <button
                  className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  <HardDrive size={20} className="mb-1 text-purple-400" />
                  <span className="text-xs">Drive</span>
                </button>
              </div>
            )}
          </div>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className={`p-2 rounded-lg transition-all ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
            }`}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdown("profile")}
              className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">Nick</span>
                <span
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Admin
                </span>
              </div>
              <ChevronDown
                size={14}
                className={`transition-transform ${
                  activeDropdown === "profile" ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeDropdown === "profile" && (
              <div
                className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg overflow-hidden py-1 animate-fadeIn ${
                  darkMode
                    ? "bg-[#1e293b] text-gray-200 border border-gray-700"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                <div
                  className={`px-4 py-3 border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <p className="font-medium">Nick Johnson</p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    nick@example.com
                  </p>
                </div>
                <button
                  className={`flex items-center gap-2 px-4 py-2 w-full text-left transition-colors ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  <User size={16} />
                  Profile
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 w-full text-left transition-colors ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  <Settings size={16} />
                  Settings
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 w-full text-left transition-colors ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  <HelpCircle size={16} />
                  Help & Support
                </button>
                <div
                  className={`border-t my-1 ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                ></div>
                <button
                  className={`flex items-center gap-2 px-4 py-2 w-full text-left transition-colors text-red-400 ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Settings (Right Sidebar Toggle) */}
          <button
            onClick={toggleSettings}
            className={`p-2 rounded-lg transition-all ${
              isSettingsOpen
                ? "bg-blue-600 text-white"
                : darkMode
                ? "hover:bg-gray-800"
                : "hover:bg-gray-200"
            }`}
          >
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Right Sidebar Settings */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isSettingsOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70"
          onClick={toggleSettings}
        ></div>
        <aside
          className={`absolute right-0 top-0 h-full w-80 shadow-lg transform transition-transform duration-300 ${
            isSettingsOpen ? "translate-x-0" : "translate-x-full"
          } ${
            darkMode ? "bg-[#1e293b] text-gray-200" : "bg-white text-gray-800"
          }`}
        >
          <div
            className={`flex items-center justify-between p-4 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Settings size={20} />
              Settings
            </h3>
            <button
              onClick={toggleSettings}
              className={`p-1 rounded ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
              }`}
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 space-y-6 overflow-y-auto h-full pb-20">
            <div>
              <h4
                className={`font-medium mb-3 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Appearance
              </h4>
              <div className="space-y-3">
                <div
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-100"
                  }`}
                >
                  <span className="text-sm">Dark Mode</span>
                  <button
                    onClick={() => setDarkMode(v => !v)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      darkMode ? "bg-blue-600" : "bg-gray-400"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        darkMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-100"
                  }`}
                >
                  <span className="text-sm">Notifications</span>
                  <button
                    onClick={() =>
                      setNotificationsEnabled(!notificationsEnabled)
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notificationsEnabled ? "bg-blue-600" : "bg-gray-400"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notificationsEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-100"
                  }`}
                >
                  <span className="text-sm">Sidebar Mini</span>
                  <button
                    onClick={() => setSidebarMini(!sidebarMini)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      sidebarMini ? "bg-blue-600" : "bg-gray-400"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        sidebarMini ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h4
                className={`font-medium mb-3 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Account
              </h4>
              <div className="space-y-2">
                <button
                  className={`flex items-center gap-2 w-full p-3 rounded-lg transition-colors text-left ${
                    darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"
                  }`}
                >
                  <Shield size={16} />
                  <span>Privacy & Security</span>
                </button>
                <button
                  className={`flex items-center gap-2 w-full p-3 rounded-lg transition-colors text-left ${
                    darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"
                  }`}
                >
                  <CreditCard size={16} />
                  <span>Billing & Payments</span>
                </button>
                <button
                  className={`flex items-center gap-2 w-full p-3 rounded-lg transition-colors text-left ${
                    darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"
                  }`}
                >
                  <HelpCircle size={16} />
                  <span>Help & Support</span>
                </button>
              </div>
            </div>

            <div>
              <h4
                className={`font-medium mb-3 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Language & Region
              </h4>
              <div className="space-y-2">
                <div
                  className={`p-3 rounded-lg ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-100"
                  }`}
                >
                  <label className="text-sm block mb-1">Language</label>
                  <select
                    className={`w-full rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-900 border border-gray-700"
                        : "bg-white border border-gray-300"
                    }`}
                  >
                    <option>English</option>
                    <option>Indonesian</option>
                    <option>Japanese</option>
                  </select>
                </div>

                <div
                  className={`p-3 rounded-lg ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-100"
                  }`}
                >
                  <label className="text-sm block mb-1">Time Zone</label>
                  <select
                    className={`w-full rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-900 border border-gray-700"
                        : "bg-white border border-gray-300"
                    }`}
                  >
                    <option>(GMT-08:00) Pacific Time</option>
                    <option>(GMT-07:00) Mountain Time</option>
                    <option>(GMT-06:00) Central Time</option>
                    <option>(GMT-05:00) Eastern Time</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .fi {
          width: 1em;
          height: 1em;
          background-size: cover;
          display: inline-block;
        }
        .fi-gb {
          background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCAzMCI+PHBhdGggZmlsbD0iIzAxMjE2OSIgZD0iTTAgMGg2MHYzMEgweiIvPjxwYXRoIGZilibGw9IiNjODEwMmUiIGQ9Ik0wIDBsNjAgMzBNNjAgMEwwIDMwIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI0IDBsMTIgMzBNMzYgMEwyNCAzME0wIDEyaDYwTTAgMThoNjBNMCAwaDMwVjMwIi8+PHBhdGggZmlsbD0iI2M4MTAyZSIgZD0iTTAgMGgzMFYzMEgweiIvPjwvc3ZnPg==");
        }
        .fi-id {
          background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCAzMCI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjMwIiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiIGZpbGw9IiNmZmYiLz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iMTUiIHNoYXBlLXJlbmRlcmluZz0iY3Jpc3BFZGdlcyIgZmlsbD0iI2M2MDAwMCIvPjwvc3ZnPg==");
        }
        .fi-jp {
          background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCAzMCI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjMwIiBzaGFwZS1yZW5kZXJpbmc9YmNyaXNwRWRnZXMiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjE1IiByPSI4IiBmaWxsPSIjYmMwMDJjIi8+PC9zdmc+");
        }
      `}</style>
    </>
  );
}
