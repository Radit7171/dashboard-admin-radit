// src/app/faq/page.jsx
"use client";

import { useRef, useContext, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import DarkModeContext from "@/app/DarkModeContext";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/DashboardFooter";

// Animasi varians
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

// Komponen AnimatedSection
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Komponen AnimatedCard
const AnimatedCard = ({ children }) => {
  return <motion.div variants={itemVariants}>{children}</motion.div>;
};

// Komponen untuk FAQ Item
const FAQItem = ({ question, answer, darkMode, isOpen, onClick, index }) => {
  return (
    <motion.div
      className={`rounded-lg overflow-hidden ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-md`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={onClick}
        className={`w-full px-6 py-4 text-left flex justify-between items-center ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        <span className="font-medium text-left">{question}</span>
        <motion.svg
          className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`px-6 pb-4 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Komponen untuk FAQ Category
const FAQCategory = ({
  title,
  questions,
  darkMode,
  openItems,
  setOpenItems,
  icon,
}) => {
  return (
    <AnimatedCard>
      <div
        className={`rounded-xl p-6 shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex items-center mb-6">
          <div
            className={`p-3 rounded-lg ${
              darkMode ? "bg-blue-900/20" : "bg-blue-100"
            } text-blue-500`}
          >
            {icon}
          </div>
          <h2
            className={`text-xl font-semibold ml-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h2>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <FAQItem
              key={index}
              question={question.question}
              answer={question.answer}
              darkMode={darkMode}
              isOpen={openItems.includes(`${title}-${index}`)}
              onClick={() => {
                const itemId = `${title}-${index}`;
                if (openItems.includes(itemId)) {
                  setOpenItems(openItems.filter((item) => item !== itemId));
                } else {
                  setOpenItems([...openItems, itemId]);
                }
              }}
              index={index}
            />
          ))}
        </div>
      </div>
    </AnimatedCard>
  );
};

// Komponen untuk Search Bar
const SearchBar = ({ darkMode, searchTerm, setSearchTerm }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className={`w-5 h-5 transition-colors ${
            isFocused
              ? "text-blue-500"
              : darkMode
              ? "text-gray-400"
              : "text-gray-500"
          }`}
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
      <motion.input
        type="text"
        placeholder="Search for questions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          darkMode
            ? "bg-gray-700 text-white placeholder-gray-400"
            : "bg-white text-gray-900 placeholder-gray-500 border border-gray-300"
        }`}
        whileFocus={{ scale: 1.01 }}
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <svg
            className="w-5 h-5 text-gray-400 hover:text-gray-600"
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
    </motion.div>
  );
};

// Komponen untuk Contact Card
const ContactCard = ({ darkMode }) => {
  return (
    <AnimatedCard>
      <div
        className={`rounded-xl p-6 shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-xl font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Still need help?
        </h2>
        <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Can't find the answer you're looking for? Please chat with our
          friendly team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            onClick={() => console.log("Contact support")}
            className={`px-4 py-3 rounded-lg font-medium flex items-center justify-center ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-100 hover:bg-blue-200 text-blue-800"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Chat with us
          </motion.button>

          <motion.button
            onClick={() => console.log("Send email")}
            className={`px-4 py-3 rounded-lg font-medium flex items-center justify-center ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Send us an email
          </motion.button>
        </div>
      </div>
    </AnimatedCard>
  );
};

// Komponen untuk Popular Questions
const PopularQuestions = ({ darkMode, questions, openItems, setOpenItems }) => {
  return (
    <AnimatedCard>
      <div
        className={`rounded-xl p-6 shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex items-center mb-6">
          <div
            className={`p-3 rounded-lg ${
              darkMode ? "bg-yellow-900/20" : "bg-yellow-100"
            } text-yellow-500`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h2
            className={`text-xl font-semibold ml-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Popular Questions
          </h2>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <FAQItem
              key={index}
              question={question.question}
              answer={question.answer}
              darkMode={darkMode}
              isOpen={openItems.includes(`popular-${index}`)}
              onClick={() => {
                const itemId = `popular-${index}`;
                if (openItems.includes(itemId)) {
                  setOpenItems(openItems.filter((item) => item !== itemId));
                } else {
                  setOpenItems([...openItems, itemId]);
                }
              }}
              index={index}
            />
          ))}
        </div>
      </div>
    </AnimatedCard>
  );
};

// Floating Help Button
const FloatingHelpButton = ({ darkMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`absolute bottom-16 right-0 w-64 p-4 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            } mb-2`}
          >
            <h3
              className={`font-medium mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Need help?
            </h3>
            <p
              className={`text-sm mb-3 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              We're here to assist you with any questions
            </p>
            <div className="flex space-x-2">
              <button
                className={`flex-1 py-2 text-sm rounded ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                Chat
              </button>
              <button
                className={`flex-1 py-2 text-sm rounded ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                } ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                Email
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center ${
          darkMode
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isExpanded ? (
          <svg
            className="w-6 h-6"
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
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default function FAQPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [openItems, setOpenItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  // FAQ data
  const faqData = {
    popular: [
      {
        question: "How do I reset my password?",
        answer:
          "To reset your password, go to the login page and click on 'Forgot Password'. Enter your email address and we'll send you a link to reset your password. If you don't receive the email within a few minutes, please check your spam folder.",
      },
      {
        question: "How can I upgrade my plan?",
        answer:
          "You can upgrade your plan at any time from your account settings. Go to the 'Billing' section and click on 'Upgrade Plan'. You'll be able to choose your new plan and the changes will take effect immediately. Any unused portion of your current plan will be credited toward your new plan.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and for annual plans we also accept bank transfers. All payments are processed securely through our encrypted payment system.",
      },
    ],
    account: [
      {
        question: "How do I create an account?",
        answer:
          "To create an account, click on the 'Sign Up' button at the top right of any page. You'll need to provide your name, email address, and create a password. After verifying your email address, you'll have full access to your account.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "To delete your account, go to your account settings and click on 'Delete Account' at the bottom of the page. Please note that this action is permanent and cannot be undone. All your data will be permanently removed from our systems.",
      },
      {
        question: "Can I change my email address?",
        answer:
          "Yes, you can change your email address from your account settings. Go to the 'Profile' section and click on 'Edit' next to your email address. You'll need to verify your new email address before it becomes active.",
      },
      {
        question: "Why am I not receiving email notifications?",
        answer:
          "If you're not receiving email notifications, please check your spam or junk folder first. If the emails aren't there, make sure your email address is correctly entered in your account settings. You may also want to add our email address to your safe senders list.",
      },
    ],
    billing: [
      {
        question: "When will I be billed?",
        answer:
          "For monthly plans, you'll be billed on the same day each month that you signed up. For annual plans, you'll be billed on the same day each year. You can view your next billing date in the 'Billing' section of your account settings.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "We offer a 30-day money-back guarantee for all annual plans. If you're not satisfied with our service within the first 30 days, you can request a full refund. Monthly plans are not eligible for refunds but can be canceled at any time.",
      },
      {
        question: "How do I update my payment method?",
        answer:
          "To update your payment method, go to the 'Billing' section in your account settings. Click on 'Payment Methods' and then 'Add New Payment Method'. Once added, you can set it as your default payment method.",
      },
      {
        question: "What happens if my payment fails?",
        answer:
          "If a payment fails, we'll automatically retry the payment over the next few days. We'll also send you email notifications about the failed payment. If payment continues to fail, your account may be temporarily suspended until the payment is resolved.",
      },
    ],
    technical: [
      {
        question: "What browsers are supported?",
        answer:
          "Our platform works best with the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to the latest version for the best experience and security.",
      },
      {
        question: "How do I clear my cache?",
        answer:
          "To clear your cache, go to your browser's settings and look for the 'Privacy' or 'History' section. From there, you can clear your browsing data. Make sure to select 'Cached images and files' before clearing. After clearing your cache, refresh the page.",
      },
      {
        question: "Why is the page loading slowly?",
        answer:
          "Slow page loading can be caused by several factors including your internet connection, browser extensions, or temporary server issues. Try refreshing the page, clearing your cache, or using a different browser. If the issue persists, contact our support team.",
      },
      {
        question: "Do you have an API?",
        answer:
          "Yes, we have a comprehensive REST API that allows developers to integrate our services with their applications. API documentation is available in the 'Developers' section of your account. You'll need an API key to access our API endpoints.",
      },
    ],
  };

  // Ikon untuk setiap kategori
  const categoryIcons = {
    account: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    billing: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    technical: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
  };

  // Filter questions based on search term
  const filterQuestions = (questions) => {
    if (!searchTerm) return questions;

    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Get all categories for navigation
  const categories = [
    { id: "all", name: "All Questions", icon: "🌟" },
    { id: "popular", name: "Popular", icon: "🔥" },
    { id: "account", name: "Account", icon: "👤" },
    { id: "billing", name: "Billing", icon: "💳" },
    { id: "technical", name: "Technical", icon: "🔧" },
  ];

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Sidebar open={sidebarOpen} darkMode={darkMode} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 min-h-screen ${
          sidebarOpen ? "ml-64" : "ml-0"
        } ${darkMode ? "bg-gray-900" : "bg-gray-50"} overflow-x-hidden`}
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

        <main className="flex-1 relative z-10">
          <div className="p-5 max-w-7xl mx-auto w-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1
                className={`text-3xl md:text-4xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Frequently Asked Questions
              </h1>
              <p
                className={`text-lg max-w-2xl mx-auto ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Find answers to common questions about our product and services
              </p>
            </motion.div>

            {/* Search Bar */}
            <AnimatedSection className="mb-8">
              <SearchBar
                darkMode={darkMode}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </AnimatedSection>

            {/* Category Navigation */}
            <AnimatedSection className="mb-8">
              <div className="flex overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center ${
                        activeCategory === category.id
                          ? darkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-800"
                          : darkMode
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* FAQ Content */}
            <AnimatedSection className="mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {(activeCategory === "all" ||
                    activeCategory === "popular") && (
                    <PopularQuestions
                      darkMode={darkMode}
                      questions={filterQuestions(faqData.popular)}
                      openItems={openItems}
                      setOpenItems={setOpenItems}
                    />
                  )}

                  {(activeCategory === "all" ||
                    activeCategory === "account") && (
                    <FAQCategory
                      title="Account Questions"
                      questions={filterQuestions(faqData.account)}
                      darkMode={darkMode}
                      openItems={openItems}
                      setOpenItems={setOpenItems}
                      icon={categoryIcons.account}
                    />
                  )}

                  {(activeCategory === "all" ||
                    activeCategory === "billing") && (
                    <FAQCategory
                      title="Billing Questions"
                      questions={filterQuestions(faqData.billing)}
                      darkMode={darkMode}
                      openItems={openItems}
                      setOpenItems={setOpenItems}
                      icon={categoryIcons.billing}
                    />
                  )}

                  {(activeCategory === "all" ||
                    activeCategory === "technical") && (
                    <FAQCategory
                      title="Technical Questions"
                      questions={filterQuestions(faqData.technical)}
                      darkMode={darkMode}
                      openItems={openItems}
                      setOpenItems={setOpenItems}
                      icon={categoryIcons.technical}
                    />
                  )}

                  {searchTerm &&
                    filterQuestions([
                      ...faqData.popular,
                      ...faqData.account,
                      ...faqData.billing,
                      ...faqData.technical,
                    ]).length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`rounded-xl p-6 text-center ${
                          darkMode ? "bg-gray-800" : "bg-white"
                        } shadow-lg`}
                      >
                        <svg
                          className={`w-16 h-16 mx-auto mb-4 ${
                            darkMode ? "text-gray-600" : "text-gray-400"
                          }`}
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
                          className={`text-lg font-medium mb-2 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          No results found
                        </h3>
                        <p
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        >
                          Try different keywords or browse all categories
                        </p>
                      </motion.div>
                    )}
                </div>

                <div className="space-y-6">
                  <ContactCard darkMode={darkMode} />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`rounded-xl p-6 shadow-lg ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold mb-4 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      FAQ Resources
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <motion.a
                          href="#"
                          className={`flex items-center p-2 rounded-lg ${
                            darkMode
                              ? "hover:bg-gray-700 text-blue-400"
                              : "hover:bg-gray-100 text-blue-600"
                          }`}
                          whileHover={{ x: 5 }}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          User Guide
                        </motion.a>
                      </li>
                      <li>
                        <motion.a
                          href="#"
                          className={`flex items-center p-2 rounded-lg ${
                            darkMode
                              ? "hover:bg-gray-700 text-blue-400"
                              : "hover:bg-gray-100 text-blue-600"
                          }`}
                          whileHover={{ x: 5 }}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Release Notes
                        </motion.a>
                      </li>
                      <li>
                        <motion.a
                          href="#"
                          className={`flex items-center p-2 rounded-lg ${
                            darkMode
                              ? "hover:bg-gray-700 text-blue-400"
                              : "hover:bg-gray-100 text-blue-600"
                          }`}
                          whileHover={{ x: 5 }}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                          </svg>
                          API Documentation
                        </motion.a>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </main>

        <div className="relative z-10 mt-auto">
          <Footer darkMode={darkMode} />
        </div>
      </div>

      <FloatingHelpButton darkMode={darkMode} />
    </div>
  );
}
