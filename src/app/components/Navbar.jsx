"use client";
import { useState, useEffect, useRef } from "react";
import {
  Search,
  Globe,
  ShoppingCart,
  Bell,
  AppWindow,
  Maximize,
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
  Shield
} from "lucide-react";

export default function Navbar({ onToggleSidebar }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [sidebarMini, setSidebarMini] = useState(false);
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

  const handleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Navbar */}
      <header
        ref={navbarRef}
        className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-gray-200 shadow-lg p-3 flex justify-between items-center sticky top-0 z-50"
      >
        {/* Left: Sidebar toggle + Search */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-800 rounded-lg transition-all duration-200 hover:scale-105"
          >
            <Menu size={20} />
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search anything..."
              className="pl-10 pr-4 py-2 rounded-lg bg-[#1e293b] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
            />
          </div>
        </div>

        {/* Right: Menu */}
        <div className="flex items-center gap-2 relative">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdown("lang")}
              className="flex items-center gap-1 p-2 hover:bg-gray-800 rounded-lg transition-all"
            >
              <Globe size={18} /> 
              <span className="hidden md:inline">EN</span>
              <ChevronDown size={14} className={`transition-transform ${activeDropdown === "lang" ? "rotate-180" : ""}`} />
            </button>
            {activeDropdown === "lang" && (
              <div className="absolute right-0 mt-2 w-40 bg-[#1e293b] text-gray-200 rounded-lg shadow-lg border border-gray-700 overflow-hidden py-1 animate-fadeIn">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left transition-colors">
                  <span className="fi fi-gb mr-2"></span>
                  English
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left transition-colors">
                  <span className="fi fi-id mr-2"></span>
                  Indonesian
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left transition-colors">
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
              className="p-2 hover:bg-gray-800 rounded-lg relative transition-all"
            >
              <ShoppingCart size={18} />
              <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white px-1.5 rounded-full flex items-center justify-center h-4 w-4">
                3
              </span>
            </button>
            {activeDropdown === "cart" && (
              <div className="absolute right-0 mt-2 w-80 bg-[#1e293b] text-gray-200 rounded-lg shadow-lg border border-gray-700 overflow-hidden animate-fadeIn">
                <div className="p-3 border-b border-gray-700 font-medium flex justify-between items-center">
                  <span>Shopping Cart</span>
                  <span className="text-xs text-blue-400">3 items</span>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <div className="p-3 hover:bg-gray-800 flex items-center gap-3 transition-colors">
                    <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
                      <CreditCard size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Wireless Headphones</p>
                      <p className="text-xs text-gray-400">$129.99 x 1</p>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-gray-800 flex items-center gap-3 transition-colors">
                    <div className="w-10 h-10 bg-green-600 rounded-md flex items-center justify-center">
                      <CreditCard size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Smart Watch</p>
                      <p className="text-xs text-gray-400">$259.99 x 1</p>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-gray-800 flex items-center gap-3 transition-colors">
                    <div className="w-10 h-10 bg-purple-600 rounded-md flex items-center justify-center">
                      <CreditCard size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone Case</p>
                      <p className="text-xs text-gray-400">$24.99 x 1</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-gray-700 flex justify-between items-center">
                  <span className="text-sm">Total:</span>
                  <span className="font-medium">$414.97</span>
                </div>
                <div className="p-3 bg-gray-800/50">
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
              className="p-2 hover:bg-gray-800 rounded-lg relative transition-all"
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 text-xs bg-green-500 text-white px-1.5 rounded-full flex items-center justify-center h-4 w-4">
                5
              </span>
            </button>
            {activeDropdown === "notif" && (
              <div className="absolute right-0 mt-2 w-80 bg-[#1e293b] text-gray-200 rounded-lg shadow-lg border border-gray-700 overflow-hidden animate-fadeIn">
                <div className="p-3 border-b border-gray-700 font-medium flex justify-between items-center">
                  <span>Notifications</span>
                  <span className="text-xs text-blue-400">Mark all as read</span>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <div className="p-3 hover:bg-gray-800 border-b border-gray-800 transition-colors">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      New order received
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Customer #3245 placed a new order</p>
                    <p className="text-xs text-gray-500 mt-2">2 minutes ago</p>
                  </div>
                  <div className="p-3 hover:bg-gray-800 border-b border-gray-800 transition-colors">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Server rebooted
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Server maintenance completed successfully</p>
                    <p className="text-xs text-gray-500 mt-2">45 minutes ago</p>
                  </div>
                  <div className="p-3 hover:bg-gray-800 border-b border-gray-800 transition-colors">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      Payment received
                    </p>
                    <p className="text-xs text-gray-400 mt-1">New payment of $299.99 received</p>
                    <p className="text-xs text-gray-500 mt-2">1 hour ago</p>
                  </div>
                </div>
                <div className="p-3 bg-gray-800/50 text-center">
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
              className="p-2 hover:bg-gray-800 rounded-lg transition-all"
            >
              <AppWindow size={18} />
            </button>
            {activeDropdown === "apps" && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1e293b] text-gray-200 rounded-lg shadow-lg border border-gray-700 grid grid-cols-2 gap-1 p-2 animate-fadeIn">
                <button className="flex flex-col items-center justify-center p-3 hover:bg-gray-800 rounded-md transition-colors">
                  <Mail size={20} className="mb-1 text-blue-400" />
                  <span className="text-xs">Mail</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 hover:bg-gray-800 rounded-md transition-colors">
                  <MessageSquare size={20} className="mb-1 text-green-400" />
                  <span className="text-xs">Chat</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 hover:bg-gray-800 rounded-md transition-colors">
                  <Calendar size={20} className="mb-1 text-yellow-400" />
                  <span className="text-xs">Calendar</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 hover:bg-gray-800 rounded-md transition-colors">
                  <HardDrive size={20} className="mb-1 text-purple-400" />
                  <span className="text-xs">Drive</span>
                </button>
              </div>
            )}
          </div>

          {/* Fullscreen */}
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-all">
            <Maximize size={18} />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdown("profile")}
              className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg transition-all"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">Nick</span>
                <span className="text-xs text-gray-400">Admin</span>
              </div>
              <ChevronDown size={14} className={`transition-transform ${activeDropdown === "profile" ? "rotate-180" : ""}`} />
            </button>
            {activeDropdown === "profile" && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1e293b] text-gray-200 rounded-lg shadow-lg border border-gray-700 overflow-hidden py-1 animate-fadeIn">
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="font-medium">Nick Johnson</p>
                  <p className="text-sm text-gray-400">nick@example.com</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left transition-colors">
                  <User size={16} />
                  Profile
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left transition-colors">
                  <Settings size={16} />
                  Settings
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left transition-colors">
                  <HelpCircle size={16} />
                  Help & Support
                </button>
                <div className="border-t border-gray-700 my-1"></div>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 w-full text-left transition-colors text-red-400">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Settings (Right Sidebar Toggle) */}
          <button
            onClick={toggleSettings}
            className={`p-2 rounded-lg transition-all ${isSettingsOpen ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Right Sidebar Settings */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isSettingsOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/70" onClick={toggleSettings}></div>
        <aside className={`absolute right-0 top-0 h-full w-80 bg-[#1e293b] text-gray-200 shadow-lg transform transition-transform duration-300 ${isSettingsOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Settings size={20} />
              Settings
            </h3>
            <button onClick={toggleSettings} className="p-1 hover:bg-gray-800 rounded">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 space-y-6 overflow-y-auto h-full pb-20">
            <div>
              <h4 className="font-medium mb-3 text-gray-300">Appearance</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-sm">Dark Mode</span>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-sm">Notifications</span>
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationsEnabled ? 'bg-blue-600' : 'bg-gray-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-sm">Sidebar Mini</span>
                  <button
                    onClick={() => setSidebarMini(!sidebarMini)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${sidebarMini ? 'bg-blue-600' : 'bg-gray-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${sidebarMini ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-gray-300">Account</h4>
              <div className="space-y-2">
                <button className="flex items-center gap-2 w-full p-3 hover:bg-gray-800/50 rounded-lg transition-colors text-left">
                  <Shield size={16} />
                  <span>Privacy & Security</span>
                </button>
                <button className="flex items-center gap-2 w-full p-3 hover:bg-gray-800/50 rounded-lg transition-colors text-left">
                  <CreditCard size={16} />
                  <span>Billing & Payments</span>
                </button>
                <button className="flex items-center gap-2 w-full p-3 hover:bg-gray-800/50 rounded-lg transition-colors text-left">
                  <HelpCircle size={16} />
                  <span>Help & Support</span>
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-gray-300">Language & Region</h4>
              <div className="space-y-2">
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <label className="text-sm block mb-1">Language</label>
                  <select className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>English</option>
                    <option>Indonesian</option>
                    <option>Japanese</option>
                  </select>
                </div>
                
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <label className="text-sm block mb-1">Time Zone</label>
                  <select className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
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
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
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
        .fi-gb { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCAzMCI+PHBhdGggZmlsbD0iIzAxMjE2OSIgZD0iTTAgMGg2MHYzMEgweiIvPjxwYXRoIGZpbGw9IiZjODEwMmUiIGQ9Ik0wIDBsNjAgMzBNNjAgMEwwIDMwIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI0IDBsMTIgMzBNMzYgMEwyNCAzME0wIDEyaDYwTTAgMThoNjBNMCAwaDMwVjMwIi8+PHBhdGggZmlsbD0iI2M4MTAyZSIgZD0iTTAgMGgzMFYzMEgweiIvPjwvc3ZnPg=='); }
        .fi-id { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCAzMCI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZmYiLz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iMTUiIGZpbGw9IiZjNjAwMDAiLz48L3N2Zz4='); }
        .fi-jp { background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCAzMCI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZmYiLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjE1IiByPSI4IiBmaWxsPSIjYmMwMDJjIi8+PC9zdmc+'); }
      `}</style>
    </>
  );
}