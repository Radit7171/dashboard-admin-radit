"use client";

import { useState } from "react";
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

const Footer = () => {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("English");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Dummy function untuk toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    console.log(`Theme changed to: ${newTheme}`);
  };

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

  // Listen for scroll events to show/hide scroll-to-top button
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setShowScrollTop(window.scrollY > 300);
    });
  }

  // Dummy function untuk button clicks
  const handleButtonClick = (action) => {
    console.log(`${action} button clicked`);
  };

  return (
    <footer className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-t border-gray-700 mt-10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">
              Dashboard Pro
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Powerful analytics and management tools for your business. Monitor
              performance, track sales, and optimize operations.
            </p>
            <div className="flex space-x-4">
              <button
                className="text-gray-400 hover:text-blue-400 transition-colors"
                onClick={() => handleButtonClick("Facebook")}
              >
                <Facebook size={20} />
              </button>
              <button
                className="text-gray-400 hover:text-blue-400 transition-colors"
                onClick={() => handleButtonClick("Twitter")}
              >
                <Twitter size={20} />
              </button>
              <button
                className="text-gray-400 hover:text-purple-400 transition-colors"
                onClick={() => handleButtonClick("Instagram")}
              >
                <Instagram size={20} />
              </button>
              <button
                className="text-gray-400 hover:text-blue-400 transition-colors"
                onClick={() => handleButtonClick("LinkedIn")}
              >
                <Linkedin size={20} />
              </button>
              <button
                className="text-gray-400 hover:text-gray-100 transition-colors"
                onClick={() => handleButtonClick("GitHub")}
              >
                <Github size={20} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  className="text-gray-400 hover:text-gray-100 text-sm transition-colors"
                  onClick={() => handleButtonClick("Home")}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  className="text-gray-400 hover:text-gray-100 text-sm transition-colors"
                  onClick={() => handleButtonClick("Features")}
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  className="text-gray-400 hover:text-gray-100 text-sm transition-colors"
                  onClick={() => handleButtonClick("Pricing")}
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  className="text-gray-400 hover:text-gray-100 text-sm transition-colors"
                  onClick={() => handleButtonClick("Blog")}
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  className="text-gray-400 hover:text-gray-100 text-sm transition-colors"
                  onClick={() => handleButtonClick("Contact")}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  className="text-gray-400 hover:text-gray-100 text-sm transition-colors flex items-center gap-2"
                  onClick={() => handleButtonClick("Help Center")}
                >
                  <HelpCircle size={16} />
                  Help Center
                </button>
              </li>
              <li>
                <button
                  className="text-gray-400 hover:text-gray-100 text-sm transition-colors flex items-center gap-2"
                  onClick={() => handleButtonClick("FAQ")}
                >
                  <MessageSquare size={16} />
                  FAQ
                </button>
              </li>
              <li>
                <button
                  className="text-gray-400 hover:text-gray-100 text-sm transition-colors flex items-center gap-2"
                  onClick={() => handleButtonClick("Privacy Policy")}
                >
                  <Shield size={16} />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  className="text-gray-400 hover:text-gray-100 text-sm transition-colors flex items-center gap-2"
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
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-4 md:mb-0">
            <span>© 2023 Dashboard Pro. Made with</span>
            <Heart size={16} className="text-red-500" fill="currentColor" />
            <span>by Radit</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200 transition-colors">
                <Globe size={16} />
                <span>{language}</span>
              </button>
              <div className="absolute bottom-full left-0 mb-2 w-32 bg-gray-800 rounded-lg shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                {["English", "Spanish", "French", "German", "Japanese"].map(
                  (lang) => (
                    <button
                      key={lang}
                      className={`block w-full text-left px-3 py-2 text-sm rounded-md ${
                        language === lang
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                      onClick={() => changeLanguage(lang)}
                    >
                      {lang}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              className="text-gray-400 hover:text-gray-200 transition-colors"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Settings */}
            <button
              className="text-gray-400 hover:text-gray-200 transition-colors"
              onClick={() => handleButtonClick("Settings")}
            >
              <Settings size={16} />
            </button>

            {/* Contact */}
            <button
              className="text-gray-400 hover:text-gray-200 transition-colors"
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
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
