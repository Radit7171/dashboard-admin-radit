"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Home,
  Layers,
  FileText,
  Grid,
  Settings,
  User,
  BarChart3,
  CreditCard,
  HelpCircle,
  Shield,
  LogOut,
  Mail,
  MessageSquare,
  Calendar,
  ShoppingBag,
  Users,
  Database,
  PieChart,
  Bell,
  Star,
  FolderOpen,
  FileSpreadsheet,
  Image,
  Download,
  Upload,
  Lock,
} from "lucide-react";

export default function Sidebar({ open = true, darkMode = true }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [openSubmenus, setOpenSubmenus] = useState({
    dashboard: true,
    pages: false,
    apps: false,
    components: false,
    authentication: false,
    charts: false,
    forms: false,
  });

  const router = useRouter();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);

    // Navigasi berdasarkan menu yang dipilih
    switch (menu) {
      case "dashboard-1":
        router.push("/analytics");
        break;
      case "dashboard":
        router.push("/dashboard");
        break;
      case "dashboard-2":
        router.push("/ecommerce");
        break;
      case "dashboard-3":
        router.push("/CRM");
        break;
      case "email":
        router.push("/web_apps/email");
        break;
      case "chat":
        router.push("/web_apps/chat");
        break;
      case "calendar":
        router.push("/web_apps/calendar");
      case "ecommerce":
        router.push("/ecommerce");
        break;
      case "users":
        router.push("/pages/users");
        break;
      case "profile":
        router.push("/pages/profile");
        break;
      case "pricing":
        router.push("/pages/pricing");
        break;
      case "faq":
        router.push("/pages/faq");
        break;
      case "login":
        router.push("/Authentication/login-register");
      case "register":
        router.push("/Authentication/login-register");
        break;
      case "forgot-password":
        router.push("/Authentication/forgot-password");
      case "alerts":
        router.push("/Component/alerts");
        break;
      case "buttons":
        router.push("/Component/buttons");
        break;
      case "cards":
        router.push("/Component/cards");
        break;
      case "modals":
        router.push("/Component/modals");
        break;
      case "line-charts":
        router.push("/Charts/line-charts");
        break;
      case "bar-charts":
        router.push("/Charts/bar-charts");
        break;
      case "pie-charts":
        router.push("/Charts/pie-charts");
        break;
      case "pie-charts":
        router.push("/Charts/pie-charts");
        break;
      case "basic-elements":
        router.push("/Forms/basic-elements");
        break;
      case "advanced-elements":
        router.push("/Forms/advanced-elements");
        break;
      case "editors":
        router.push("/Forms/editors");
        break;
      // Tambahkan case lainnya sesuai kebutuhan
      default:
        console.log(`Navigating to: ${menu}`);
    }
  };

  const toggleSubmenu = (menu) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full transition-all duration-300 z-30 shadow-xl
        ${open ? "w-64" : "w-0"}
        ${
          darkMode
            ? "bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-gray-200"
            : "bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] text-gray-800"
        }`}
    >
      <div
        className={`h-full flex flex-col ${
          open ? "p-4" : "p-0 overflow-hidden"
        }`}
      >
        {open && (
          <>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8 px-2 py-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 size={24} className="text-white" />
              </div>
              <div>
                <h2
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  NexusAdmin
                </h2>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Dashboard v2.1
                </p>
              </div>
            </div>

            {/* User Profile */}
            <div
              className={`rounded-lg p-3 mb-6 flex items-center gap-3 ${
                darkMode ? "bg-gray-800/50" : "bg-gray-100"
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Nick Johnson</p>
                <p
                  className={`text-xs truncate ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Admin
                </p>
              </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 space-y-1 overflow-y-auto">
              {/* Dashboard */}
              <div>
                <button
                  onClick={() => toggleSubmenu("dashboard")}
                  className={`flex items-center justify-between w-full px-3 py-3 rounded-lg transition-all ${
                    activeMenu === "dashboard"
                      ? `${
                          darkMode
                            ? "bg-blue-600/20 text-blue-400"
                            : "bg-blue-100 text-blue-600"
                        }`
                      : `${
                          darkMode
                            ? "hover:bg-gray-800/50"
                            : "hover:bg-gray-200/50"
                        }`
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Home size={18} />
                    <span>Dashboards</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openSubmenus.dashboard ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSubmenus.dashboard && (
                  <div
                    className={`ml-6 space-y-1 mt-1 border-l pl-2 py-1 ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() => handleMenuClick("dashboard-1")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "dashboard-1"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <ChevronRight size={14} />
                      <span>Analytics</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("dashboard-2")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "dashboard-2"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <ChevronRight size={14} />
                      <span>E-Commerce</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("dashboard-3")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "dashboard-3"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <ChevronRight size={14} />
                      <span>CRM</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Apps */}
              <div>
                <button
                  onClick={() => toggleSubmenu("apps")}
                  className={`flex items-center justify-between w-full px-3 py-3 rounded-lg transition-all ${
                    activeMenu === "apps"
                      ? `${
                          darkMode
                            ? "bg-blue-600/20 text-blue-400"
                            : "bg-blue-100 text-blue-600"
                        }`
                      : `${
                          darkMode
                            ? "hover:bg-gray-800/50"
                            : "hover:bg-gray-200/50"
                        }`
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Grid size={18} />
                    <span>Web Apps</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openSubmenus.apps ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSubmenus.apps && (
                  <div
                    className={`ml-6 space-y-1 mt-1 border-l pl-2 py-1 ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() => handleMenuClick("email")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "email"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <Mail size={16} />
                      <span>Email</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("chat")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "chat"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <MessageSquare size={16} />
                      <span>Chat</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("calendar")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "calendar"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <Calendar size={16} />
                      <span>Calendar</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("ecommerce")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "ecommerce"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <ShoppingBag size={16} />
                      <span>E-Commerce</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Pages */}
              <div>
                <button
                  onClick={() => toggleSubmenu("pages")}
                  className={`flex items-center justify-between w-full px-3 py-3 rounded-lg transition-all ${
                    activeMenu === "pages"
                      ? `${
                          darkMode
                            ? "bg-blue-600/20 text-blue-400"
                            : "bg-blue-100 text-blue-600"
                        }`
                      : `${
                          darkMode
                            ? "hover:bg-gray-800/50"
                            : "hover:bg-gray-200/50"
                        }`
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <FileText size={18} />
                    <span>Pages</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openSubmenus.pages ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSubmenus.pages && (
                  <div
                    className={`ml-6 space-y-1 mt-1 border-l pl-2 py-1 ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() => handleMenuClick("users")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "users"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <Users size={16} />
                      <span>Users</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("profile")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "profile"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("pricing")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "pricing"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <CreditCard size={16} />
                      <span>Pricing</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("faq")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "faq"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <HelpCircle size={16} />
                      <span>FAQ</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Authentication */}
              <div>
                <button
                  onClick={() => toggleSubmenu("authentication")}
                  className={`flex items-center justify-between w-full px-3 py-3 rounded-lg transition-all ${
                    activeMenu === "authentication"
                      ? `${
                          darkMode
                            ? "bg-blue-600/20 text-blue-400"
                            : "bg-blue-100 text-blue-600"
                        }`
                      : `${
                          darkMode
                            ? "hover:bg-gray-800/50"
                            : "hover:bg-gray-200/50"
                        }`
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Shield size={18} />
                    <span>Authentication</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openSubmenus.authentication ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSubmenus.authentication && (
                  <div
                    className={`ml-6 space-y-1 mt-1 border-l pl-2 py-1 ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() => handleMenuClick("login")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "login"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <LogOut size={16} className="rotate-180" />
                      <span>Login</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("register")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "register"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <UserPlus size={16} />
                      <span>Register</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("forgot-password")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "forgot-password"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <Lock size={16} />
                      <span>Forgot Password</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Components */}
              <div>
                <button
                  onClick={() => toggleSubmenu("components")}
                  className={`flex items-center justify-between w-full px-3 py-3 rounded-lg transition-all ${
                    activeMenu === "components"
                      ? `${
                          darkMode
                            ? "bg-blue-600/20 text-blue-400"
                            : "bg-blue-100 text-blue-600"
                        }`
                      : `${
                          darkMode
                            ? "hover:bg-gray-800/50"
                            : "hover:bg-gray-200/50"
                        }`
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Layers size={18} />
                    <span>Components</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openSubmenus.components ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSubmenus.components && (
                  <div
                    className={`ml-6 space-y-1 mt-1 border-l pl-2 py-1 ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() => handleMenuClick("alerts")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "alerts"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <Bell size={16} />
                      <span>Alerts</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("buttons")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "buttons"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <Star size={16} />
                      <span>Buttons</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("cards")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "cards"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <CreditCard size={16} />
                      <span>Cards</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("modals")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "modals"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <FolderOpen size={16} />
                      <span>Modals</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Charts */}
              <div>
                <button
                  onClick={() => toggleSubmenu("charts")}
                  className={`flex items-center justify-between w-full px-3 py-3 rounded-lg transition-all ${
                    activeMenu === "charts"
                      ? `${
                          darkMode
                            ? "bg-blue-600/20 text-blue-400"
                            : "bg-blue-100 text-blue-600"
                        }`
                      : `${
                          darkMode
                            ? "hover:bg-gray-800/50"
                            : "hover:bg-gray-200/50"
                        }`
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <PieChart size={18} />
                    <span>Charts</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openSubmenus.charts ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSubmenus.charts && (
                  <div
                    className={`ml-6 space-y-1 mt-1 border-l pl-2 py-1 ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() => handleMenuClick("line-charts")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "line-charts"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <BarChart3 size={16} />
                      <span>Line Charts</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("bar-charts")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "bar-charts"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <BarChart3 size={16} />
                      <span>Bar Charts</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("pie-charts")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "pie-charts"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <PieChart size={16} />
                      <span>Pie Charts</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Forms */}
              <div>
                <button
                  onClick={() => toggleSubmenu("forms")}
                  className={`flex items-center justify-between w-full px-3 py-3 rounded-lg transition-all ${
                    activeMenu === "forms"
                      ? `${
                          darkMode
                            ? "bg-blue-600/20 text-blue-400"
                            : "bg-blue-100 text-blue-600"
                        }`
                      : `${
                          darkMode
                            ? "hover:bg-gray-800/50"
                            : "hover:bg-gray-200/50"
                        }`
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <FileSpreadsheet size={18} />
                    <span>Forms</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openSubmenus.forms ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSubmenus.forms && (
                  <div
                    className={`ml-6 space-y-1 mt-1 border-l pl-2 py-1 ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() => handleMenuClick("basic-elements")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "basic-elements"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <FileText size={16} />
                      <span>Basic Elements</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("advanced-elements")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "advanced-elements"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <Settings size={16} />
                      <span>Advanced Elements</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("editors")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "editors"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <Edit size={16} />
                      <span>Editors</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick("wizard")}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        activeMenu === "wizard"
                          ? `${
                              darkMode
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`
                          : `${
                              darkMode
                                ? "hover:bg-gray-800/50"
                                : "hover:bg-gray-200/50"
                            }`
                      }`}
                    >
                      <Star size={16} />
                      <span>Wizard</span>
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Footer */}
            <div
              className={`pt-4 mt-4 border-t ${
                darkMode ? "border-gray-800" : "border-gray-300"
              }`}
            >
              <div className="space-y-2">
                <button
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all ${
                    darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-200/50"
                  }`}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
                <button
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all ${
                    darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-200/50"
                  }`}
                >
                  <HelpCircle size={18} />
                  <span>Help Center</span>
                </button>
                <button
                  className={`flex items-center gap-3 w-full px-3 py-2 text-red-400 rounded-lg transition-all ${
                    darkMode ? "hover:bg-red-500/10" : "hover:bg-red-100"
                  }`}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>

              <div
                className={`mt-4 text-center text-xs ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                <p>NexusAdmin v2.1</p>
                <p>© 2023 All rights reserved</p>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

// Tambahkan ikon yang belum diimpor
function UserPlus(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}

function Edit(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
