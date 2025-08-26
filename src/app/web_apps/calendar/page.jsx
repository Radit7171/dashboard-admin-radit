// src/app/calendar/page.jsx
"use client";

import { useRef, useContext, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import DarkModeContext from "@/app/DarkModeContext";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/DashboardFooter";

// Animasi varians
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

// Komponen untuk statistik kalender
const StatCard = ({ title, value, icon, darkMode, delay = 0 }) => {
  return (
    <AnimatedCard delay={delay}>
      <motion.div
        className={`rounded-2xl p-6 shadow-lg transition-all duration-300 ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-900"
            : "bg-gradient-to-br from-white to-gray-50"
        }`}
        whileHover={{ y: -5, scale: 1.02 }}
      >
        <div className="flex justify-between items-start">
          <div>
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {title}
            </p>
            <h3
              className={`text-2xl font-bold mt-1 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {value}
            </h3>
          </div>
          <div
            className={`p-3 rounded-xl ${
              darkMode ? "bg-blue-900/30" : "bg-blue-100"
            }`}
          >
            {icon}
          </div>
        </div>
      </motion.div>
    </AnimatedCard>
  );
};

// Komponen kalender utama
const Calendar = ({ darkMode, events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month"); // 'month' or 'day'

  const navigateMonth = (direction) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  const navigateToToday = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const hasEvent = (date) => {
    return events.some(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );
  };

  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const weeks = [];
    let days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const today = isToday(date);
      const selected = isSelected(date);
      const eventExists = hasEvent(date);

      days.push(
        <motion.div
          key={day}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedDate(date)}
          className={`h-12 flex items-center justify-center rounded-lg cursor-pointer relative ${
            selected
              ? darkMode
                ? "bg-blue-600 text-white"
                : "bg-blue-500 text-white"
              : today
              ? darkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-900"
              : darkMode
              ? "hover:bg-gray-700 text-white"
              : "hover:bg-gray-100 text-gray-900"
          }`}
        >
          {day}
          {eventExists && (
            <div
              className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                darkMode ? "bg-blue-400" : "bg-blue-500"
              }`}
            ></div>
          )}
        </motion.div>
      );

      // Start a new row every 7 days
      if ((firstDay + day) % 7 === 0 || day === daysInMonth) {
        weeks.push(
          <div key={weeks} className="grid grid-cols-7 gap-1">
            {days}
          </div>
        );
        days = [];
      }
    }

    return weeks;
  };

  const renderDayView = () => {
    const eventsForDay = events.filter(
      (event) =>
        new Date(event.date).toDateString() === selectedDate.toDateString()
    );

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`rounded-2xl p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <h3
          className={`text-lg font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>

        {eventsForDay.length === 0 ? (
          <p
            className={`text-center py-8 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No events scheduled for this day
          </p>
        ) : (
          <div className="space-y-3">
            {eventsForDay.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4
                      className={`font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {event.title}
                    </h4>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {event.time}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      darkMode
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {event.type}
                  </span>
                </div>
                {event.description && (
                  <p
                    className={`mt-2 text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {event.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => console.log("Add event clicked")}
          className={`mt-4 w-full py-2 rounded-xl font-medium ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-100 hover:bg-blue-200 text-blue-800"
          }`}
        >
          Add Event
        </motion.button>
      </motion.div>
    );
  };

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <motion.div
      className={`rounded-2xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2
          className={`text-xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {monthName}
        </h2>

        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={navigateToToday}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Today
          </motion.button>

          <div
            className={`rounded-md overflow-hidden ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <button
              onClick={() => navigateMonth(-1)}
              className={`p-1.5 ${
                darkMode
                  ? "hover:bg-gray-600 text-gray-300"
                  : "hover:bg-gray-200 text-gray-600"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => navigateMonth(1)}
              className={`p-1.5 ${
                darkMode
                  ? "hover:bg-gray-600 text-gray-300"
                  : "hover:bg-gray-200 text-gray-600"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div
            className={`rounded-md px-3 py-1.5 text-sm ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              className={`bg-transparent ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <option value="month">Month</option>
              <option value="day">Day</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log("Add event clicked")}
            className={`p-2 rounded-xl ${
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
          </motion.button>
        </div>
      </div>

      {view === "month" ? (
        <>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className={`text-center text-sm font-medium py-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="space-y-1">{renderMonthView()}</div>
        </>
      ) : (
        renderDayView()
      )}
    </motion.div>
  );
};

// Komponen untuk event list
const EventList = ({ darkMode, events }) => {
  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date().setHours(0, 0, 0, 0))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

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
          Upcoming Events
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => console.log("View all events clicked")}
          className={`px-3 py-1 rounded-lg text-sm ${
            darkMode
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          View All
        </motion.button>
      </div>

      <div className="space-y-4">
        {upcomingEvents.length === 0 ? (
          <p
            className={`text-center py-4 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No upcoming events
          </p>
        ) : (
          upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-xl ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {event.title}
                  </h4>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    • {event.time}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    darkMode
                      ? "bg-blue-900/30 text-blue-400"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {event.type}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => console.log("Add event clicked")}
        className={`mt-4 w-full py-2 rounded-xl font-medium ${
          darkMode
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-100 hover:bg-blue-200 text-blue-800"
        }`}
      >
        Add Event
      </motion.button>
    </motion.div>
  );
};

// Komponen DateRangePicker untuk filter tanggal
const DateRangePicker = ({ darkMode, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("this_month");

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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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
            d="M19 9l-7 7-7-7"
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

export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  const handleDateChange = (range) => {
    console.log(`Date range changed to: ${range}`);
  };

  // Sample event data
  const events = [
    {
      title: "Team Meeting",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      time: "10:00 AM",
      type: "Meeting",
      description: "Weekly team sync",
    },
    {
      title: "Project Deadline",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      time: "5:00 PM",
      type: "Deadline",
    },
    {
      title: "Client Presentation",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      time: "2:00 PM",
      type: "Presentation",
      description: "Quarterly review with client",
    },
    {
      title: "Lunch with Team",
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      time: "12:30 PM",
      type: "Social",
    },
    {
      title: "Product Launch",
      date: new Date(new Date().setDate(new Date().getDate() + 10)),
      time: "9:00 AM",
      type: "Event",
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
                  Calendar
                </h1>
                <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                  Manage your schedule and events
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
                  title="Total Events"
                  value={events.length}
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  delay={0}
                />
                <StatCard
                  title="Upcoming Events"
                  value={
                    events.filter((event) => new Date(event.date) >= new Date())
                      .length
                  }
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
                  delay={0.1}
                />
                <StatCard
                  title="Meetings"
                  value={
                    events.filter((event) => event.type === "Meeting").length
                  }
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 极速赛车开奖直播 0 014 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  delay={0.2}
                />
                <StatCard
                  title="Deadlines"
                  value={
                    events.filter((event) => event.type === "Deadline").length
                  }
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
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  delay={0.3}
                />
              </div>
            </AnimatedSection>

            {/* Main Calendar Area */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Calendar darkMode={darkMode} events={events} />
                </div>
                <div className="lg:col-span-1">
                  <EventList darkMode={darkMode} events={events} />
                </div>
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
