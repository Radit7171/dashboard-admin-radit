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
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5,
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
const StatCard = ({ title, value, icon, darkMode, delay = 0, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedCard delay={delay}>
      <motion.div
        className={`rounded-2xl p-6 shadow-lg transition-all duration-300 cursor-pointer ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-750 hover:to-gray-850"
            : "bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 border border-gray-100"
        }`}
        whileHover={{ y: -5, scale: 1.02 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {/* Highlight effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="flex justify-between items-start relative z-10">
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
          <motion.div
            className={`p-3 rounded-xl ${
              darkMode ? "bg-blue-900/30" : "bg-blue-100"
            }`}
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {icon}
          </motion.div>
        </div>
      </motion.div>
    </AnimatedCard>
  );
};

// Komponen kalender utama
const Calendar = ({ darkMode, events, onEventClick, onAddEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month"); // 'month', 'week', or 'day'

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

  const getEventsForDate = (date) => {
    return events.filter(
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
      days.push(<div key={`empty-${i}`} className="h-24"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const today = isToday(date);
      const selected = isSelected(date);
      const dateEvents = getEventsForDate(date);

      days.push(
        <motion.div
          key={day}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedDate(date)}
          className={`h-24 p-1 border rounded-lg cursor-pointer relative overflow-hidden ${
            selected
              ? darkMode
                ? "bg-blue-600 text-white border-blue-500"
                : "bg-blue-500 text-white border-blue-400"
              : today
              ? darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-gray-900 border-gray-200"
              : darkMode
              ? "hover:bg-gray-700 text-white border-gray-600"
              : "hover:bg-gray-100 text-gray-900 border-gray-200"
          }`}
        >
          <div className="flex justify-between items-start">
            <span
              className={`text-sm font-medium ${
                selected
                  ? "text-white"
                  : today
                  ? darkMode
                    ? "text-white"
                    : "text-gray-900"
                  : darkMode
                  ? "text-gray-300"
                  : "text-gray-700"
              }`}
            >
              {day}
            </span>
            {today && (
              <span
                className={`text-xs px-1 rounded ${
                  darkMode ? "bg-blue-500" : "bg-blue-100 text-blue-800"
                }`}
              >
                Today
              </span>
            )}
          </div>

          <div className="mt-1 space-y-1">
            {dateEvents.slice(0, 2).map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick(event);
                }}
                className={`text-xs p-1 rounded truncate cursor-pointer ${
                  darkMode
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <span className="font-medium">{event.time}</span> {event.title}
              </motion.div>
            ))}
            {dateEvents.length > 2 && (
              <div
                className={`text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                +{dateEvents.length - 2} more
              </div>
            )}
          </div>
        </motion.div>
      );

      // Start a new row every 7 days
      if ((firstDay + day) % 7 === 0 || day === daysInMonth) {
        weeks.push(
          <div key={weeks.length} className="grid grid-cols-7 gap-2">
            {days}
          </div>
        );
        days = [];
      }
    }

    return weeks;
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

    const weekDays = [];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const today = isToday(date);
      const selected = isSelected(date);
      const dateEvents = getEventsForDate(date);

      weekDays.push(
        <div
          key={i}
          className={`flex-1 p-3 border rounded-xl ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } ${today ? (darkMode ? "bg-gray-800" : "bg-gray-100") : ""}`}
        >
          <div
            className={`text-center font-medium mb-3 ${
              today
                ? darkMode
                  ? "text-blue-400"
                  : "text-blue-600"
                : darkMode
                ? "text-gray-300"
                : "text-gray-700"
            }`}
            onClick={() => setSelectedDate(date)}
          >
            <div className="text-sm">{daysOfWeek[i]}</div>
            <div
              className={`text-lg rounded-full h-8 w-8 flex items-center justify-center mx-auto ${
                selected
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                  : ""
              }`}
            >
              {date.getDate()}
            </div>
          </div>

          <div className="space-y-2">
            {dateEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onEventClick(event)}
                className={`p-2 rounded-lg text-sm cursor-pointer ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <div className="font-medium">{event.title}</div>
                <div
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {event.time}
                </div>
              </motion.div>
            ))}

            {dateEvents.length === 0 && (
              <div
                className={`text-center text-xs ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                No events
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="flex space-x-4 overflow-x-auto py-2">{weekDays}</div>
    );
  };

  const renderDayView = () => {
    const eventsForDay = getEventsForDate(selectedDate);
    const hours = [];

    for (let hour = 0; hour < 24; hour++) {
      const hourEvents = eventsForDay.filter((event) => {
        const eventHour = parseInt(event.time.split(":")[0]);
        const isAM = event.time.includes("AM");
        // Convert to 24-hour format
        const hour24 = isAM
          ? eventHour === 12
            ? 0
            : eventHour
          : eventHour === 12
          ? 12
          : eventHour + 12;
        return hour24 === hour;
      });

      hours.push(
        <div
          key={hour}
          className="flex border-b border-gray-200 dark:border-gray-700 py-2"
        >
          <div
            className={`w-16 font-medium ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {hour === 0
              ? "12 AM"
              : hour < 12
              ? `${hour} AM`
              : hour === 12
              ? "12 PM"
              : `${hour - 12} PM`}
          </div>
          <div className="flex-1">
            {hourEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onEventClick(event)}
                className={`p-2 rounded-lg mb-2 cursor-pointer ${
                  darkMode
                    ? "bg-blue-900/30 hover:bg-blue-900/50 border border-blue-800/50"
                    : "bg-blue-100 hover:bg-blue-200 border border-blue-200"
                }`}
              >
                <div className="font-medium">{event.title}</div>
                <div
                  className={`text-xs ${
                    darkMode ? "text-blue-300" : "text-blue-600"
                  }`}
                >
                  {event.time}
                </div>
                {event.description && (
                  <div
                    className={`text-xs mt-1 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {event.description}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`rounded-2xl p-4 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } max-h-96 overflow-y-auto`}
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
          <div className="text-center py-8">
            <div
              className={`text-4xl mb-2 ${
                darkMode ? "text-gray-600" : "text-gray-300"
              }`}
            >
              📅
            </div>
            <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
              No events scheduled for this day
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddEvent}
              className={`mt-4 px-4 py-2 rounded-xl font-medium ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-800"
              }`}
            >
              Schedule an Event
            </motion.button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {hours}
          </div>
        )}
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
        darkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900"
          : "bg-gradient-to-br from-white to-gray-50 border border-gray-100"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2
          className={`text-2xl font-bold ${
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
            className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center ${
              darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <svg
              className="w-4 h-4 mr-1"
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
            Today
          </motion.button>

          <div
            className={`rounded-xl overflow-hidden ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <motion.button
              whileHover={{ backgroundColor: darkMode ? "#4B5563" : "#E5E7EB" }}
              onClick={() => navigateMonth(-1)}
              className={`p-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
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
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: darkMode ? "#4B5563" : "#E5E7EB" }}
              onClick={() => navigateMonth(1)}
              className={`p-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
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
            </motion.button>
          </div>

          <div
            className={`rounded-xl px-3 py-2 text-sm ${
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
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddEvent}
            className={`p-3 rounded-xl flex items-center ${
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
            <span className="ml-2 hidden sm:inline">Add Event</span>
          </motion.button>
        </div>
      </div>

      {view === "month" ? (
        <>
          <div className="grid grid-cols-7 gap-2 mb-3">
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

          <div className="space-y-2">{renderMonthView()}</div>
        </>
      ) : view === "week" ? (
        renderWeekView()
      ) : (
        renderDayView()
      )}
    </motion.div>
  );
};

// Komponen untuk event list
const EventList = ({ darkMode, events, onEventClick, onAddEvent }) => {
  const [filter, setFilter] = useState("upcoming"); // 'upcoming' or 'all'

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date().setHours(0, 0, 0, 0))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const filteredEvents =
    filter === "upcoming" ? upcomingEvents.slice(0, 5) : events;

  const getEventTypeColor = (type) => {
    switch (type) {
      case "Meeting":
        return darkMode
          ? "bg-blue-900/30 text-blue-400"
          : "bg-blue-100 text-blue-800";
      case "Deadline":
        return darkMode
          ? "bg-red-900/30 text-red-400"
          : "bg-red-100 text-red-800";
      case "Presentation":
        return darkMode
          ? "bg-purple-900/30 text-purple-400"
          : "bg-purple-100 text-purple-800";
      case "Social":
        return darkMode
          ? "bg-green-900/30 text-green-400"
          : "bg-green-100 text-green-800";
      case "Event":
        return darkMode
          ? "bg-yellow-900/30 text-yellow-400"
          : "bg-yellow-100 text-yellow-800";
      default:
        return darkMode
          ? "bg-gray-700 text-gray-300"
          : "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      className={`rounded-2xl p-6 shadow-lg ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900"
          : "bg-gradient-to-br from-white to-gray-50 border border-gray-100"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3
          className={`text-xl font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Events
        </h3>
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-xl px-3 py-1.5 text-sm ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`bg-transparent ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <option value="upcoming">Upcoming</option>
              <option value="all">All Events</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log("View all events clicked")}
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-8">
            <div
              className={`text-4xl mb-2 ${
                darkMode ? "text-gray-600" : "text-gray-300"
              }`}
            >
              🎯
            </div>
            <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
              No events found
            </p>
          </div>
        ) : (
          filteredEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onEventClick(event)}
              className={`p-4 rounded-xl cursor-pointer ${
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
                  className={`px-2 py-1 rounded-full text-xs ${getEventTypeColor(
                    event.type
                  )}`}
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
          ))
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddEvent}
        className={`mt-6 w-full py-3 rounded-xl font-medium flex items-center justify-center ${
          darkMode
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-100 hover:bg-blue-200 text-blue-800"
        }`}
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Add New Event
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
        className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center ${
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
            className={`absolute top-full left-0 mt-1 py-2 rounded-xl shadow-lg z-10 min-w-full ${
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

// Quick Actions Component
const QuickActions = ({ darkMode, onActionClick }) => {
  const actions = [
    {
      title: "Add Event",
      icon: (
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
      action: "add_event",
      color: "bg-blue-500",
    },
    {
      title: "View Schedule",
      icon: (
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      action: "view_schedule",
      color: "bg-green-500",
    },
    {
      title: "Set Reminder",
      icon: (
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
            d="M15 17h5l-1.405-1.405A2.032 2.032 极速赛车开奖直播 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 极速赛车开奖直播 0 11-6 0v-1m6 0H9"
          />
        </svg>
      ),
      action: "set_reminder",
      color: "bg-yellow-500",
    },
    {
      title: "Share Calendar",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 极速赛车开奖直播 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      ),
      action: "share_calendar",
      color: "bg-purple-500",
    },
  ];

  return (
    <AnimatedSection className="mb-6">
      <div
        className={`rounded-2xl p-6 shadow-lg ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-900"
            : "bg-gradient-to-br from-white to-gray-50 border border-gray-100"
        }`}
      >
        <h3
          className={`text-xl font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <motion.button
              key={index}
              onClick={() => onActionClick(action.action)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              } hover:opacity-90 transition-opacity`}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`p-3 rounded-full ${action.color} text-white mb-2`}
              >
                {action.icon}
              </div>
              <span
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {action.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  const handleDateChange = (range) => {
    console.log(`Date range changed to: ${range}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
    console.log("Event clicked:", event);
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setShowEventModal(true);
    console.log("Add event clicked");
  };

  const handleQuickAction = (action) => {
    console.log("Quick action:", action);
    switch (action) {
      case "add_event":
        handleAddEvent();
        break;
      case "view_schedule":
        // Logic to view schedule
        break;
      case "set_reminder":
        // Logic to set reminder
        break;
      case "share_calendar":
        // Logic to share calendar
        break;
      default:
        break;
    }
  };

  // Sample event data
  const events = [
    {
      id: 1,
      title: "Team Meeting",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      time: "10:00 AM",
      type: "Meeting",
      description:
        "Weekly team sync to discuss project progress and upcoming tasks",
      attendees: ["John Doe", "Jane Smith", "Robert Johnson"],
    },
    {
      id: 2,
      title: "Project Deadline",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      time: "5:00 PM",
      type: "Deadline",
      description: "Final submission for the quarterly project",
    },
    {
      id: 3,
      title: "Client Presentation",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      time: "2:00 PM",
      type: "Presentation",
      description:
        "Quarterly review with client to showcase progress and gather feedback",
      location: "Conference Room A",
    },
    {
      id: 4,
      title: "Lunch with Team",
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      time: "12:30 PM",
      type: "Social",
      description: "Team lunch to celebrate project completion",
      location: "Downtown Cafe",
    },
    {
      id: 5,
      title: "Product Launch",
      date: new Date(new Date().setDate(new Date().getDate() + 10)),
      time: "9:00 AM",
      type: "Event",
      description: "Launch event for the new product line",
      location: "Main Auditorium",
    },
    {
      id: 6,
      title: "Budget Planning",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      time: "11:00 AM",
      type: "Meeting",
      description: "Quarterly budget planning session with finance team",
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
                  className={`text-3xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Calendar
                </h1>
                <p
                  className={`mt-2 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Manage your schedule and events
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-xl ${
                      darkMode
                        ? "bg-gray-800 text-white placeholder-gray-500"
                        : "bg-white text-gray-900 placeholder-gray-400 border"
                    }`}
                  />
                  <svg
                    className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 极速赛车开奖直播 0z"
                    />
                  </svg>
                </form>
                <DateRangePicker
                  darkMode={darkMode}
                  onDateChange={handleDateChange}
                />
              </div>
            </motion.div>

            {/* Quick Actions */}
            <QuickActions
              darkMode={darkMode}
              onActionClick={handleQuickAction}
            />

            {/* Stat Cards */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  onClick={() => console.log("Total events clicked")}
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
                      xmlns="http://www.w3.org/2000/s极速赛车开奖直播vg"
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
                  onClick={() => console.log("Upcoming events clicked")}
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 极速赛车开奖直播 20H7m10 0v-2c极速赛车开奖直播 0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 极速赛车开奖直播 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  delay={0.2}
                  onClick={() => console.log("Meetings clicked")}
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
                  onClick={() => console.log("Deadlines clicked")}
                />
              </div>
            </AnimatedSection>

            {/* Main Calendar Area */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Calendar
                    darkMode={darkMode}
                    events={events}
                    onEventClick={handleEventClick}
                    onAddEvent={handleAddEvent}
                  />
                </div>
                <div className="lg:col-span-1">
                  <EventList
                    darkMode={darkMode}
                    events={events}
                    onEventClick={handleEventClick}
                    onAddEvent={handleAddEvent}
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </main>

        <div className="relative z-10 mt-auto">
          <Footer darkMode={darkMode} />
        </div>

        {/* Event Modal */}
        <AnimatePresence>
          {showEventModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowEventModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`rounded-2xl p-6 max-w-md w-full ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <h2
                  className={`text-xl font-bold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {selectedEvent ? "Event Details" : "Add New Event"}
                </h2>

                {selectedEvent ? (
                  <div className="space-y-4">
                    <div>
                      <h3
                        className={`font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {selectedEvent.title}
                      </h3>
                      <p
                        className={`${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {new Date(selectedEvent.date).toLocaleDateString()} •{" "}
                        {selectedEvent.time}
                      </p>
                      <p
                        className={`mt-2 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {selectedEvent.description}
                      </p>
                    </div>

                    {selectedEvent.location && (
                      <div>
                        <p
                          className={`font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Location:
                        </p>
                        <p
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        >
                          {selectedEvent.location}
                        </p>
                      </div>
                    )}

                    {selectedEvent.attendees && (
                      <div>
                        <p
                          className={`font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Attendees:
                        </p>
                        <div className="mt-1">
                          {selectedEvent.attendees.map((attendee, index) => (
                            <span
                              key={index}
                              className={`inline-block px-2 py-1 rounded-full text-xs mr-1 mb-1 ${
                                darkMode
                                  ? "bg-gray-700 text-gray-300"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {attendee}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end space-x-3 mt-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowEventModal(false)}
                        className={`px-4 py-2 rounded-xl ${
                          darkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        Close
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => console.log("Edit event", selectedEvent)}
                        className={`px-4 py-2 rounded-xl ${
                          darkMode
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }`}
                      >
                        Edit Event
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                      Create a new event with details like title, date, time,
                      and description.
                    </p>
                    <div className="flex justify-end space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowEventModal(false)}
                        className={`px-4 py-2 rounded-xl ${
                          darkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => console.log("Create new event")}
                        className={`px-4 py-2 rounded-xl ${
                          darkMode
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }`}
                      >
                        Create Event
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
