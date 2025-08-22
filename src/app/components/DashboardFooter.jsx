"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  ArrowUp,
  MessageSquare,
  HelpCircle,
  Settings,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Sun,
  Moon,
  Globe,
  Shield,
  UserCheck,
} from "lucide-react";

const Footer = ({ darkMode }) => {
  const [language, setLanguage] = useState("English");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Effect untuk menangani scroll event
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dummy function untuk change language
  const changeLanguage = (lang) => {
    setLanguage(lang);
    console.log(`Language changed to: ${lang}`);
  };

  // Dummy function untuk scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("Scrolled to top");
  };

  // Dummy function untuk button clicks
  const handleButtonClick = (action) => {
    console.log(`${action} button clicked`);
  };

  // Kelas CSS berdasarkan mode
  const footerClasses = darkMode
    ? "bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-t border-gray-700"
    : "bg-gradient-to-br from-gray-100 to-gray-200 border-t border-gray-300";

  const textPrimary = darkMode ? "text-gray-100" : "text-gray-800";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600";
  const hoverText = darkMode ? "hover:text-gray-100" : "hover:text-gray-900";
  const borderColor = darkMode ? "border-gray-800" : "border-gray-200";
  const dropdownBg = darkMode ? "bg-gray-800" : "bg-white";
  const dropdownHover = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";
  const dropdownText = darkMode ? "text-gray-300" : "text-gray-700";
  const scrollButtonBg = darkMode
    ? "bg-blue-600 hover:bg-blue-500"
    : "bg-blue-500 hover:bg-blue-400";

  return (
    <footer className={`mt-10 ${footerClasses}`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className={`text-lg font-semibold mb-4 ${textPrimary}`}>
              Dashboard Pro
            </h3>
            <p className={`text-sm mb-4 ${textSecondary}`}>
              Powerful analytics and management tools for your business. Monitor
              performance, track sales, and optimize operations.
            </p>
            <div className="flex space-x-4">
              <button
                className={`transition-colors ${textSecondary} hover:text-blue-400`}
                onClick={() => handleButtonClick("Facebook")}
              >
                <Facebook size={20} />
              </button>
              <button
                className={`transition-colors ${textSecondary} hover:text-blue-400`}
                onClick={() => handleButtonClick("Twitter")}
              >
                <Twitter size={20} />
              </button>
              <button
                className={`transition-colors ${textSecondary} hover:text-purple-400`}
                onClick={() => handleButtonClick("Instagram")}
              >
                <Instagram size={20} />
              </button>
              <button
                className={`transition-colors ${textSecondary} hover:text-blue-400`}
                onClick={() => handleButtonClick("LinkedIn")}
              >
                <Linkedin size={20} />
              </button>
              <button
                className={`transition-colors ${textSecondary} hover:text-gray-900`}
                onClick={() => handleButtonClick("GitHub")}
              >
                <Github size={20} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${textPrimary}`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Features", "Pricing", "Blog", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <button
                      className={`text-sm transition-colors ${textSecondary} ${hoverText}`}
                      onClick={() => handleButtonClick(item)}
                    >
                      {item}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${textPrimary}`}>
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  className={`text-sm transition-colors flex items-center gap-2 ${textSecondary} ${hoverText}`}
                  onClick={() => handleButtonClick("Help Center")}
                >
                  <HelpCircle size={16} />
                  Help Center
                </button>
              </li>
              <li>
                <button
                  className={`text-sm transition-colors flex items-center gap-2 ${textSecondary} ${hoverText}`}
                  onClick={() => handleButtonClick("FAQ")}
                >
                  <MessageSquare size={16} />
                  FAQ
                </button>
              </li>
              <li>
                <button
                  className={`text-sm transition-colors flex items-center gap-2 ${textSecondary} ${hoverText}`}
                  onClick={() => handleButtonClick("Privacy Policy")}
                >
                  <Shield size={16} />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  className={`text-sm transition-colors flex items-center gap-2 ${textSecondary} ${hoverText}`}
                  onClick={() => handleButtonClick("Terms of Service")}
                >
                  <UserCheck size={16} />
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div
          className={`border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center ${borderColor}`}
        >
          <div
            className={`flex items-center gap-1 text-sm mb-4 md:mb-0 ${textSecondary}`}
          >
            <span>© 2023 Dashboard Pro. Made with</span>
            <Heart size={16} className="text-red-500" fill="currentColor" />
            <span>by Radit</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 text-sm transition-colors ${textSecondary} ${hoverText}`}
              >
                <Globe size={16} />
                <span>{language}</span>
              </button>
              <div
                className={`absolute bottom-full left-0 mb-2 w-32 rounded-lg shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 ${dropdownBg}`}
              >
                {["English", "Spanish", "French", "German", "Japanese"].map(
                  (lang) => (
                    <button
                      key={lang}
                      className={`block w-full text-left px-3 py-2 text-sm rounded-md ${
                        language === lang
                          ? "bg-blue-600 text-white"
                          : `${dropdownText} ${dropdownHover}`
                      }`}
                      onClick={() => changeLanguage(lang)}
                    >
                      {lang}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Theme Toggle - Tidak diperlukan karena sudah ada di Navbar */}

            {/* Settings */}
            <button
              className={`transition-colors ${textSecondary} ${hoverText}`}
              onClick={() => handleButtonClick("Settings")}
            >
              <Settings size={16} />
            </button>

            {/* Contact */}
            <button
              className={`transition-colors ${textSecondary} ${hoverText}`}
              onClick={() => handleButtonClick("Contact")}
            >
              <Mail size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 ${scrollButtonBg}`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
