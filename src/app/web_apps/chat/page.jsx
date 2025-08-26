// src/app/chat/page.jsx
"use client";

import { useRef, useContext, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import DarkModeContext from "@/app/DarkModeContext";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/DashboardFooter";

// Animasi varians yang lebih halus
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

// Komponen AnimatedSection
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px" });

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
const AnimatedCard = ({ children, delay = 0 }) => {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

// Komponen untuk kartu statistik dengan tooltip dan animasi
const StatCard = ({
  title,
  value,
  change,
  icon,
  darkMode,
  tooltip,
  delay = 0,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formattedValue = value.toLocaleString();

  return (
    <AnimatedCard delay={delay}>
      <motion.div
        className={`rounded-2xl p-6 shadow-lg transition-all duration-300 relative overflow-hidden group ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-750 hover:to-gray-850"
            : "bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowTooltip(false);
        }}
        whileHover={{ y: -5, scale: 1.02 }}
        onClick={() => console.log(`Clicked on ${title} stat card`)}
      >
        {/* Efek latar belakang saat hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
        />

        {tooltip && (
          <div
            className="absolute top-3 right-3 cursor-help"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <svg
              className="w-4 h-4 text-gray-400"
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
          </div>
        )}

        {tooltip && showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`absolute -top-10 left-0 px-3 py-2 rounded-lg text-xs z-10 ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {tooltip}
          </motion.div>
        )}

        <div className="flex justify-between items-start relative z-10">
          <div>
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {title}
            </p>
            <motion.h3
              className={`text-2xl font-bold mt-1 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
              initial={{ scale: 1 }}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {formattedValue}
            </motion.h3>
            <motion.p
              className={`text-sm mt-2 flex items-center ${
                change >= 0 ? "text-green-500" : "text-red-500"
              }`}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0.8 }}
            >
              <motion.span
                animate={{ rotate: change >= 0 ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {change >= 0 ? "↑" : "↓"}
              </motion.span>
              <span className="ml-1">{Math.abs(change)}% from last week</span>
            </motion.p>
          </div>
          <motion.div
            className={`p-3 rounded-xl ${
              darkMode ? "bg-blue-900/30" : "bg-blue-100"
            }`}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        </div>
      </motion.div>
    </AnimatedCard>
  );
};

// Komponen untuk Conversation List
const ConversationList = ({
  darkMode,
  conversations,
  onSelectConversation,
  selectedConversation,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, unread, online

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === "unread") return matchesSearch && conv.unread > 0;
    if (filter === "online") return matchesSearch && conv.status === "online";
    return matchesSearch;
  });

  return (
    <motion.div
      className={`rounded-2xl p-6 shadow-lg h-full ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Conversations
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => console.log("Start new conversation")}
          className={`p-2 rounded-xl flex items-center gap-2 ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-100 hover:bg-blue-200 text-blue-800"
          }`}
        >
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
          <span className="text-sm font-medium">New Chat</span>
        </motion.button>
      </div>

      {/* Filter Tabs */}
      <div className="flex mb-4 gap-2">
        {["all", "unread", "online"].map((tab) => (
          <motion.button
            key={tab}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${
              filter === tab
                ? darkMode
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-800"
                : darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      <div className="mb-4">
        <div
          className={`relative rounded-xl ${
            darkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className={`w-5 h-5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
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
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
                : "bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-blue-400"
            }`}
          />
        </div>
      </div>

      <div className="overflow-y-auto max-h-96 pr-2">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-8">
            <svg
              className={`w-12 h-12 mx-auto ${
                darkMode ? "text-gray-600" : "text-gray-300"
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
            <p
              className={darkMode ? "text-gray-400 mt-2" : "text-gray-500 mt-2"}
            >
              No conversations found
            </p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelectConversation(conversation)}
              className={`p-4 rounded-xl cursor-pointer transition-all mb-2 group ${
                selectedConversation?.id === conversation.id
                  ? darkMode
                    ? "bg-blue-900/30 border-blue-500 border"
                    : "bg-blue-100 border-blue-500 border"
                  : darkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-start">
                <div className="relative flex-shrink-0">
                  <motion.img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
                      darkMode ? "border-gray-800" : "border-white"
                    } ${
                      conversation.status === "online"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></div>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4
                      className={`text-sm font-semibold truncate ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {conversation.name}
                    </h4>
                    <span
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {conversation.time}
                    </span>
                  </div>
                  <p
                    className={`text-sm truncate ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread > 0 && (
                    <div className="flex justify-between items-center mt-1">
                      <span
                        className={`text-xs ${
                          darkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        {conversation.lastActive}
                      </span>
                      <motion.span
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={`text-xs px-2 py-1 rounded-full ${
                          darkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {conversation.unread} unread
                      </motion.span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

// Komponen untuk Chat Window
const ChatWindow = ({ darkMode, conversation, onBack }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! How can I help you today?",
      sender: "them",
      time: "10:00 AM",
    },
    {
      id: 2,
      text: "I'm having an issue with my recent order.",
      sender: "me",
      time: "10:02 AM",
    },
    {
      id: 3,
      text: "Could you please tell me your order ID?",
      sender: "them",
      time: "10:03 AM",
    },
    {
      id: 4,
      text: "Sure, it's #ORD-2871.",
      sender: "me",
      time: "10:04 AM",
    },
    {
      id: 5,
      text: "Thank you. Let me check that for you.",
      sender: "them",
      time: "10:05 AM",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate typing indicator
    setIsTyping(true);

    // Simulate reply after a delay
    setTimeout(() => {
      setIsTyping(false);
      const reply = {
        id: messages.length + 2,
        text: "I've found the issue. Your order is being processed and will ship tomorrow.",
        sender: "them",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 2500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!conversation) {
    return (
      <motion.div
        className={`rounded-2xl p-6 shadow-lg h-full flex items-center justify-center ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`mx-auto p-3 rounded-2xl ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            } w-16 h-16 flex items-center justify-center mb-4`}
          >
            <svg
              className={`w-8 h-8 ${
                darkMode ? "text-gray-400" : "text-gray-500"
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </motion.div>
          <h3
            className={`text-lg font-medium mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Select a conversation
          </h3>
          <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
            Choose a conversation from the list to start chatting
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              console.log("Start new conversation from empty state")
            }
            className={`mt-4 px-4 py-2 rounded-xl ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-100 hover:bg-blue-200 text-blue-800"
            }`}
          >
            Start New Conversation
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`rounded-2xl shadow-lg h-full flex flex-col ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className={`px-6 py-4 border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        } flex items-center`}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className={`md:hidden mr-3 p-2 rounded-xl ${
            darkMode
              ? "hover:bg-gray-700 text-white"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 极速赛车开奖直播 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </motion.button>
        <div className="relative flex-shrink-0">
          <motion.img
            src={conversation.avatar}
            alt={conversation.name}
            className="w-10 h-10 rounded-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          />
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
              darkMode ? "border-gray-800" : "border-white"
            } ${
              conversation.status === "online" ? "bg-green-500" : "bg-gray-400"
            }`}
          ></div>
        </div>
        <div className="ml-3">
          <h3
            className={`font-medium ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {conversation.name}
          </h3>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {conversation.status === "online" ? "Online" : "Offline"}
          </p>
        </div>
        <div className="ml-auto flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => console.log("Call clicked")}
            className={`p-2 rounded-xl ${
              darkMode
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => console.log("Search in conversation clicked")}
            className={`p-2 rounded-xl ${
              darkMode
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => console.log("More options clicked")}
            className={`p-2 rounded-xl ${
              darkMode
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
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
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 极速赛车开奖直播 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      <div
        className={`flex-1 p-4 overflow-y-auto ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl p-4 ${
                  msg.sender === "me"
                    ? darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-gray-900"
                    : darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-900 shadow"
                }`}
              >
                <p>{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === "me"
                      ? darkMode
                        ? "text-blue-200"
                        : "text-blue-600"
                      : darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div
                className={`max-w-xs rounded-2xl p-4 ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-900 shadow"
                }`}
              >
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div
        className={`p-4 border-t ${
          darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
        }`}
      >
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => console.log("Attach file clicked")}
            className={`p-2 rounded-xl mr-2 ${
              darkMode
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
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
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => console.log("Add emoji clicked")}
            className={`p-2 rounded-xl mr-2 ${
              darkMode
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
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
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.button>
          <div
            className={`flex-1 rounded-xl ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows="1"
              className={`w-full px-4 py-3 rounded-xl focus:outline-none resize-none ${
                darkMode
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-gray-100 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={message.trim() === ""}
            className={`ml-2 p-3 rounded-xl ${
              message.trim() === ""
                ? darkMode
                  ? "text-gray-500 bg-gray-700"
                  : "text-gray-400 bg-gray-100"
                : darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-100 hover:bg-blue-200 text-blue-800"
            }`}
          >
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
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Komponen untuk Response Time Chart
const ResponseTimeChart = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");
  const [hoveredBar, setHoveredBar] = useState(null);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  // Data untuk response time chart
  const data = [
    { day: "Mon", avgResponse: 15, firstResponse: 5 },
    { day: "Tue", avgResponse: 12, firstResponse: 4 },
    { day: "Wed", avgResponse: 18, firstResponse: 6 },
    { day: "Thu", avgResponse: 10, firstResponse: 3 },
    { day: "Fri", avgResponse: 8, firstResponse: 2 },
    { day: "Sat", avgResponse: 20, firstResponse: 7 },
    { day: "Sun", avgResponse: 25, firstResponse: 9 },
  ];

  const maxResponse = Math.max(...data.map((d) => d.avgResponse));

  return (
    <motion.div
      className={`rounded-2xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Response Times
        </h3>
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-md px-3 py-1 text-sm ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className={`bg-transparent ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onOptionsClick}
            className={`p-2 rounded-xl ${
              darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
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
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 极速赛车开奖直播 0 010 2z"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      <div className="h-64">
        <div className="flex items-end justify-between h-48 mt-4 space-x-1">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="flex items-end justify-center h-full space-x-1 relative">
                <motion.div
                  className={`w-4 rounded-t-md ${
                    darkMode ? "bg-blue-500" : "bg-blue-400"
                  } cursor-pointer`}
                  style={{
                    height: `${(item.avgResponse / maxResponse) * 100}%`,
                  }}
                  initial={{ height: 0 }}
                  animate={{
                    height: `${(item.avgResponse / maxResponse) * 100}%`,
                  }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ opacity: 0.8 }}
                  onHoverStart={() => setHoveredBar({ type: "avg", index })}
                  onHoverEnd={() => setHoveredBar(null)}
                  onClick={() =>
                    console.log(
                      `Avg response for ${item.day}: ${item.avgResponse}m`
                    )
                  }
                />
                <motion.div
                  className={`w-4 rounded-t-md ${
                    darkMode ? "bg-green-500" : "bg-green-400"
                  } cursor-pointer`}
                  style={{
                    height: `${(item.firstResponse / maxResponse) * 100}%`,
                  }}
                  initial={{ height: 0 }}
                  animate={{
                    height: `${(item.firstResponse / maxResponse) * 100}%`,
                  }}
                  transition={{ duration: 0.5, delay: index * 0.05 + 0.1 }}
                  whileHover={{ opacity: 0.8 }}
                  onHoverStart={() => setHoveredBar({ type: "first", index })}
                  onHoverEnd={() => setHoveredBar(null)}
                  onClick={() =>
                    console.log(
                      `First response for ${item.day}: ${item.firstResponse}m`
                    )
                  }
                />

                {/* Tooltip for bars */}
                {hoveredBar && hoveredBar.index === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute -top-8 px-2 py-1 rounded-md text-xs ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {hoveredBar.type === "avg"
                      ? `Avg: ${item.avgResponse}m`
                      : `First: ${item.firstResponse}m`}
                  </motion.div>
                )}
              </div>
              <span
                className={`text-xs mt-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {item.day}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4 px-4">
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-sm ${
                darkMode ? "bg-blue-500" : "bg-blue-400"
              } mr-2`}
            ></div>
            <span
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Avg Response (min)
            </span>
          </div>
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-sm ${
                darkMode ? "bg-green-500" : "bg-green-400"
              } mr-2`}
            ></div>
            <span
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              First Response (min)
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div
          className={`text-sm ${
            darkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          <span className="font-medium">-12.3%</span> avg response time vs last
          week
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => console.log("Explore Response Time data")}
          className={`px-4 py-2 rounded-xl text-sm font-medium ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-100 hover:bg-blue-200 text-blue-800"
          }`}
        >
          Explore Data
        </motion.button>
      </div>
    </motion.div>
  );
};

// Komponen untuk Agent Performance
const AgentPerformance = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");
  const [sortBy, setSortBy] = useState("chats");

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  // Data untuk agent performance
  const agents = [
    { name: "John Doe", chats: 245, satisfaction: 92, avgResponse: 5.2 },
    { name: "Jane Smith", chats: 189, satisfaction: 88, avgResponse: 4.8 },
    { name: "Robert Johnson", chats: 156, satisfaction: 95, avgResponse: 3.7 },
    { name: "Sarah Williams", chats: 132, satisfaction: 90, avgResponse: 6.1 },
    { name: "Michael Brown", chats: 121, satisfaction: 87, avgResponse: 7.3 },
  ];

  // Sort agents based on selected criteria
  const sortedAgents = [...agents].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <motion.div
      className={`rounded-2xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Agent Performance
        </h3>
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-md px-3 py-1 text-sm ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className={`bg-transparent ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
            </select>
          </div>
          <div
            className={`rounded-md px-3 py-1 text-sm ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`bg-transparent ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <option value="chats">Sort by Chats</option>
              <option value="satisfaction">Sort by Satisfaction</option>
              <option value="avgResponse">Sort by Response Time</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onOptionsClick}
            className={`p-2 rounded-xl ${
              darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
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
                d="M12 5v.01M12 12极速赛车开奖直播.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={darkMode ? "text-gray-400" : "text-gray-500"}>
              <th className="text-left py-3 px-4">Agent</th>
              <th className="text-left py-3 px-4">Chats</th>
              <th className="text-left py-3 px-4">Satisfaction</th>
              <th className="text-left py-3 px-4">Avg Response</th>
              <th className="text-left py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedAgents.map((agent, index) => (
              <motion.tr
                key={index}
                className={`${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } ${
                  index % 2 === 0
                    ? darkMode
                      ? "bg-gray-750/30"
                      : "bg-gray-50"
                    : ""
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src={`https://i.pravatar.cc/40?u=${agent.name}`}
                      alt={agent.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    {agent.name}
                  </div>
                </td>
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {agent.chats}
                </td>
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{agent.satisfaction}%</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${agent.satisfaction}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {agent.avgResponse}m
                </td>
                <td className="py-3 px-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      console.log(`View details for ${agent.name}`)
                    }
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      darkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                    }`}
                  >
                    View
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => console.log("View all agents")}
          className={`px-4 py-2 rounded-xl text-sm font-medium ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
        >
          View All Agents
        </motion.button>
      </div>
    </motion.div>
  );
};

// Komponen DateRangePicker untuk filter tanggal
const DateRangePicker = ({ darkMode, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("last_7_days");

  const ranges = [
    { id: "today", label: "Today" },
    { id: "yesterday", label: "Yesterday" },
    { id: "last_7_days", label: "Last 7 days" },
    { id: "last_30_days", label: "Last 30 days" },
    { id: "this_month", label: "This month" },
    { id: "last_month", label: "Last month" },
    { id: "custom", label: "Custom range" },
  ];

  const handleRangeSelect = (rangeId) => {
    setSelectedRange(rangeId);
    setIsOpen(false);
    if (onDateChange) onDateChange(rangeId);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center ${
          darkMode
            ? "bg-gray-700 hover:bg-gray-600 text-white"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
        }`}
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
            d="M8 7V3m8 4极速赛车开奖直播m-9 8h10M5 21极速赛车开奖直播a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {ranges.find((r) => r.id === selectedRange)?.label}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d极速赛车开奖直播="M19 9l-7 7-7-7"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full left-0 mt-1 py-2 rounded-xl shadow-lg z-10 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            {ranges.map((range) => (
              <motion.button
                key={range.id}
                whileHover={{
                  backgroundColor: darkMode ? "#374151" : "#f3f4f6",
                }}
                onClick={() => handleRangeSelect(range.id)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  selectedRange === range.id
                    ? darkMode
                      ? "bg-blue-900/30 text-blue-400"
                      : "bg-blue-100 text-blue-800"
                    : darkMode
                    ? "text-gray-300"
                    : "text-gray-800"
                }`}
              >
                {range.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showConversationList, setShowConversationList] = useState(true);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  const handleDateChange = (range) => {
    console.log(`Date range changed to: ${range}`);
    // Dummy function - would fetch new data based on date range in a real app
  };

  const handleChartOptions = (chartTitle) => {
    console.log(`Options clicked for: ${chartTitle}`);
    // Dummy function - would show chart options modal in a real app
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    // On mobile, hide the conversation list when a conversation is selected
    if (window.innerWidth < 768) {
      setShowConversationList(false);
    }
  };

  const handleBackToConversations = () => {
    setSelectedConversation(null);
    setShowConversationList(true);
  };

  // Sample conversation data
  const conversations = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Thanks for your help!",
      time: "10:30 AM",
      unread: 2,
      status: "online",
      lastActive: "Just now",
      avatar: "https://i.pravatar.cc/150?u=john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "I need assistance with my order",
      time: "9:45 AM",
      unread: 0,
      status: "online",
      lastActive: "10 min ago",
      avatar: "https://i.pravatar.cc/150?u=jane@example.com",
    },
    {
      id: 3,
      name: "Robert Johnson",
      lastMessage: "When will my product arrive?",
      time: "Yesterday",
      unread: 1,
      status: "offline",
      lastActive: "2 hours ago",
      avatar: "https://i.pravatar.cc/150?u=robert@example.com",
    },
    {
      id: 4,
      name: "Sarah Williams",
      lastMessage: "The product is amazing!",
      time: "Yesterday",
      unread: 0,
      status: "online",
      lastActive: "30 min ago",
      avatar: "https://i.pravatar.cc/150?u=sarah@example.com",
    },
    {
      id: 5,
      name: "Michael Brown",
      lastMessage: "Can I get a refund?",
      time: "Apr 15",
      unread: 0,
      status: "offline",
      lastActive: "1 day ago",
      avatar: "https://i.pravatar.cc/150?u=michael@example.com",
    },
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
          <div className="p-5">
            {/* Header dengan date picker */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex justify-between items-center flex-wrap gap-4"
            >
              <div>
                <h1
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Chat Dashboard
                </h1>
                <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                  Manage your conversations and support tickets
                </p>
              </div>
              <DateRangePicker
                darkMode={darkMode}
                onDateChange={handleDateChange}
              />
            </motion.div>

            {/* Stat Cards */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Conversations"
                  value={1245}
                  change={8.5}
                  icon={
                    <svg
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8极速赛车开奖直播"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Total conversations in the selected period"
                  delay={0}
                />
                <StatCard
                  title="Avg Response Time"
                  value={5.2}
                  change={-12.3}
                  icon={
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Average response time in minutes"
                  delay={0.1}
                />
                <StatCard
                  title="Satisfaction Rate"
                  value={92.5}
                  change={3.2}
                  icon={
                    <svg
                      className="w-6 h-6 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 01-1.789 2.894l-4.5-9A2 2 0 0010.382 2H5a2 2 0 00-2 2v6a2 2 0 002 2h.5a5.023 5.023 0 004.5 2.5A5.023 5.023 0 0014.5 12h.5a2 2 0 002-2z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Customer satisfaction percentage"
                  delay={0.2}
                />
                <StatCard
                  title="Active Conversations"
                  value={42}
                  change={15.7}
                  icon={
                    <svg
                      className="w-6 h-6 text-yellow-500"
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
                  }
                  darkMode={darkMode}
                  tooltip="Currently active conversations"
                  delay={0.3}
                />
              </div>
            </AnimatedSection>

            {/* Main Chat Area */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                {/* Conversation List - hidden on mobile when conversation is selected */}
                <motion.div
                  className={`lg:col-span-1 ${
                    showConversationList ? "block" : "hidden md:block"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ConversationList
                    darkMode={darkMode}
                    conversations={conversations}
                    onSelectConversation={handleSelectConversation}
                    selectedConversation={selectedConversation}
                  />
                </motion.div>

                {/* Chat Window - full width on mobile when conversation is selected */}
                <motion.div
                  className={`lg:col-span-2 ${
                    showConversationList ? "hidden md:block" : "block"
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ChatWindow
                    darkMode={darkMode}
                    conversation={selectedConversation}
                    onBack={handleBackToConversations}
                  />
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Charts Row */}
            <AnimatedSection className="my-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponseTimeChart
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("Response Time")}
                />
                <AgentPerformance
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("Agent Performance")}
                />
              </div>
            </AnimatedSection>
          </div>
        </main>

        <div className="relative z-10 mt-auto">
          <Footer darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}
