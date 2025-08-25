// src/app/ecommerce/page.jsx
"use client";

import { useRef, useContext, useState } from "react";
import { motion, useInView } from "framer-motion";
import DarkModeContext from "../DarkModeContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/DashboardFooter";

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

// Komponen untuk kartu statistik dengan tooltip
const StatCard = ({
  title,
  value,
  change,
  icon,
  darkMode,
  tooltip,
  currency = false,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const formattedValue = currency
    ? `$${value.toLocaleString()}`
    : value.toLocaleString();

  return (
    <AnimatedCard>
      <div
        className={`rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${
          darkMode
            ? "bg-gray-800 hover:bg-gray-750"
            : "bg-white hover:bg-gray-50"
        } relative`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {tooltip && showTooltip && (
          <div
            className={`absolute -top-10 left-0 px-3 py-2 rounded-lg text-xs ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {tooltip}
          </div>
        )}

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
              {formattedValue}
            </h3>
            <p
              className={`text-sm mt-2 ${
                change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from last week
            </p>
          </div>
          <div
            className={`p-3 rounded-lg ${
              darkMode ? "bg-blue-900/30" : "bg-blue-100"
            }`}
          >
            {icon}
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

// Komponen untuk Sales Chart
const SalesChart = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  // Data untuk sales chart
  const data = [
    { day: "Mon", sales: 4200, orders: 45 },
    { day: "Tue", sales: 3800, orders: 38 },
    { day: "Wed", sales: 5100, orders: 52 },
    { day: "Thu", sales: 4800, orders: 47 },
    { day: "Fri", sales: 6200, orders: 63 },
    { day: "Sat", sales: 7300, orders: 71 },
    { day: "Sun", sales: 6900, orders: 68 },
  ];

  const maxSales = Math.max(...data.map((d) => d.sales));
  const maxOrders = Math.max(...data.map((d) => d.orders));

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Sales Overview
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
          <button
            onClick={onOptionsClick}
            className={`p-2 rounded-lg hover:opacity-80 ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
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
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="h-64">
        <div className="flex items-end justify-between h-48 mt-4 space-x-2">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="flex items-end justify-center h-full space-x-1">
                <div
                  className={`w-3 rounded-t-md ${
                    darkMode ? "bg-blue-500" : "bg-blue-400"
                  }`}
                  style={{ height: `${(item.sales / maxSales) * 100}%` }}
                  title={`Sales: $${item.sales}`}
                ></div>
                <div
                  className={`w-3 rounded-t-md ${
                    darkMode ? "bg-green-500" : "bg-green-400"
                  }`}
                  style={{ height: `${(item.orders / maxOrders) * 70}%` }}
                  title={`Orders: ${item.orders}`}
                ></div>
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
              Sales ($)
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
              Orders
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div
          className={`text-sm ${darkMode ? "text-blue-400" : "text-blue-600"}`}
        >
          <span className="font-medium">+15.7%</span> sales vs previous week
        </div>
        <button
          onClick={() => console.log("Explore Sales data")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-100 hover:bg-blue-200 text-blue-800"
          }`}
        >
          Explore Data
        </button>
      </div>
    </div>
  );
};

// Komponen untuk Top Products
const TopProducts = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  // Data untuk top products
  const products = [
    { name: "Wireless Headphones", sales: 245, revenue: 12250, stock: 42 },
    { name: "Smart Watch", sales: 189, revenue: 28350, stock: 15 },
    { name: "Bluetooth Speaker", sales: 156, revenue: 10920, stock: 28 },
    { name: "Phone Case", sales: 132, revenue: 3960, stock: 87 },
    { name: "USB-C Cable", sales: 121, revenue: 2420, stock: 120 },
  ];

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Top Selling Products
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
          <button
            onClick={onOptionsClick}
            className={`p-2 rounded-lg hover:opacity-80 ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
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
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={darkMode ? "text-gray-400" : "text-gray-500"}>
              <th className="text-left py-3 px-4">Product</th>
              <th className="text-left py-3 px-4">Sales</th>
              <th className="text-left py-3 px-4">Revenue</th>
              <th className="text-left py-3 px-4">Stock</th>
              <th className="text-left py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
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
              >
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {product.name}
                </td>
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {product.sales}
                </td>
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  ${product.revenue.toLocaleString()}
                </td>
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {product.stock}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() =>
                      console.log(`View details for ${product.name}`)
                    }
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      darkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                    }`}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => console.log("View all products")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

// Komponen untuk Recent Orders
const RecentOrders = ({ darkMode, onOptionsClick }) => {
  const [timeRange, setTimeRange] = useState("7d");

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Time range changed to: ${range}`);
  };

  // Data untuk recent orders
  const orders = [
    {
      id: "#ORD-2871",
      customer: "John Doe",
      date: "2023-04-15",
      amount: 249.99,
      status: "Completed",
    },
    {
      id: "#ORD-2872",
      customer: "Jane Smith",
      date: "2023-04-15",
      amount: 149.5,
      status: "Processing",
    },
    {
      id: "#ORD-2873",
      customer: "Robert Johnson",
      date: "2023-04-14",
      amount: 89.99,
      status: "Completed",
    },
    {
      id: "#ORD-2874",
      customer: "Sarah Williams",
      date: "2023-04-14",
      amount: 459.0,
      status: "Shipped",
    },
    {
      id: "#ORD-2875",
      customer: "Michael Brown",
      date: "2023-04-13",
      amount: 199.99,
      status: "Processing",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Recent Orders
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
          <button
            onClick={onOptionsClick}
            className={`p-2 rounded-lg hover:opacity-80 ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
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
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={darkMode ? "text-gray-400" : "text-gray-500"}>
              <th className="text-left py-3 px-4">Order ID</th>
              <th className="text-left py-3 px-4">Customer</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Amount</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
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
              >
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {order.id}
                </td>
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {order.customer}
                </td>
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {order.date}
                </td>
                <td
                  className={`py-3 px-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  ${order.amount}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => console.log(`View order ${order.id}`)}
                    className={`p-1 rounded-md hover:opacity-80 ${
                      darkMode
                        ? "text-blue-400 hover:bg-blue-900/30"
                        : "text-blue-600 hover:bg-blue-100"
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2 15.5v-11a2 2 0 012-2h16a2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => console.log("View all orders")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
        >
          View All Orders
        </button>
      </div>
    </div>
  );
};

// Komponen untuk Customer Reviews
const CustomerReviews = ({ darkMode }) => {
  const reviews = [
    {
      name: "John Doe",
      rating: 5,
      comment: "Excellent product! Fast shipping.",
      date: "2023-04-15",
    },
    {
      name: "Jane Smith",
      rating: 4,
      comment: "Good quality but a bit expensive.",
      date: "2023-04-14",
    },
    {
      name: "Robert Johnson",
      rating: 5,
      comment: "Absolutely love it! Will buy again.",
      date: "2023-04-13",
    },
    {
      name: "Sarah Williams",
      rating: 3,
      comment: "Average product. Could be better.",
      date: "2023-04-12",
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Customer Reviews
      </h3>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className={`pb-4 ${
              index < reviews.length - 1
                ? "border-b border-gray-200 dark:border-gray-700"
                : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {review.name}
                </h4>
                <div className="flex items-center mt-1">
                  {renderStars(review.rating)}
                </div>
                <p
                  className={`mt-2 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {review.comment}
                </p>
              </div>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {review.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => console.log("View all reviews")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
        >
          View All Reviews
        </button>
      </div>
    </div>
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
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
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-1 py-2 rounded-lg shadow-lg z-10 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {ranges.map((range) => (
            <button
              key={range.id}
              onClick={() => handleRangeSelect(range.id)}
              className={`block w-full text-left px-4 py-2 text-sm hover:opacity-80 ${
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
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function EcommercePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  const handleDateChange = (range) => {
    console.log(`Date range changed to: ${range}`);
    // Dummy function - would fetch new data based on date range in a real app
  };

  const handleChartOptions = (chartTitle) => {
    console.log(`Options clicked for: ${chartTitle}`);
    // Dummy function - would show chart options modal in a real app
  };

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Sidebar open={sidebarOpen} darkMode={darkMode} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 min-h-screen ${
          sidebarOpen ? "ml-64" : "ml-0"
        } ${darkMode ? "" : "bg-white"} overflow-x-hidden`}
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
              className="mb-6 flex justify-between items-center"
            >
              <div>
                <h1
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Ecommerce Dashboard
                </h1>
                <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                  Monitor your store performance and sales
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
                  title="Total Revenue"
                  value={45200}
                  change={15.7}
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Total revenue in the selected period"
                  currency={true}
                />
                <StatCard
                  title="Total Orders"
                  value={384}
                  change={8.2}
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
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Total number of orders in the selected period"
                />
                <StatCard
                  title="Conversion Rate"
                  value={3.8}
                  change={-2.1}
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
                        d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Percentage of visitors who complete a purchase"
                />
                <StatCard
                  title="Average Order Value"
                  value={117.7}
                  change={5.3}
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
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  }
                  darkMode={darkMode}
                  tooltip="Average value of each order"
                  currency={true}
                />
              </div>
            </AnimatedSection>

            {/* Charts Row */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesChart
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("Sales Chart")}
                />
                <TopProducts
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("Top Products")}
                />
              </div>
            </AnimatedSection>

            {/* Recent Orders and Customer Reviews */}
            <AnimatedSection className="mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentOrders
                  darkMode={darkMode}
                  onOptionsClick={() => handleChartOptions("Recent Orders")}
                />
                <CustomerReviews darkMode={darkMode} />
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
