// src/app/profile/page.jsx
"use client";

import { useRef, useContext, useState } from "react";
import { motion, useInView } from "framer-motion";
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

// Komponen untuk Profile Header
const ProfileHeader = ({ darkMode, user, isEditing, setIsEditing }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      // Simulasi upload
      setTimeout(() => {
        console.log("Image uploaded:", file.name);
        setIsUploading(false);
      }, 1500);
    }
  };

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <label
                htmlFor="avatar-upload"
                className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer ${
                  isUploading ? "opacity-100" : "opacity-0 hover:opacity-100"
                } transition-opacity`}
              >
                {isUploading ? (
                  <svg
                    className="w-6 h-6 text-white animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1
            className={`text-2xl md:text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {user.name}
          </h1>
          <p className={darkMode ? "text-gray-400 mt-1" : "text-gray-500 mt-1"}>
            {user.title}
          </p>
          <p className={darkMode ? "text-gray-400 mt-2" : "text-gray-500 mt-2"}>
            {user.bio}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
            <div className="text-center">
              <p
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {user.stats.posts}
              </p>
              <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                Posts
              </p>
            </div>
            <div className="text-center">
              <p
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {user.stats.followers}
              </p>
              <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                Followers
              </p>
            </div>
            <div className="text-center">
              <p
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {user.stats.following}
              </p>
              <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                Following
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                }`}
              >
                Edit Profile
              </button>
              <button
                onClick={() => console.log("Share profile")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              >
                Share
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  darkMode
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-green-100 hover:bg-green-200 text-green-800"
                }`}
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Komponen untuk Profile Form
const ProfileForm = ({ darkMode, user, setUser }) => {
  const handleInputChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2
        className={`text-xl font-semibold mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Full Name
          </label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Title
          </label>
          <input
            type="text"
            value={user.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Email
          </label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Phone
          </label>
          <input
            type="tel"
            value={user.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        <div className="md:col-span-2">
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Bio
          </label>
          <textarea
            value={user.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            rows={3}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Location
          </label>
          <input
            type="text"
            value={user.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Website
          </label>
          <input
            type="url"
            value={user.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

// Komponen untuk Account Settings
const AccountSettings = ({ darkMode, user, setUser }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      console.log("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2
        className={`text-xl font-semibold mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Account Settings
      </h2>

      <div className="space-y-6">
        <div>
          <h3
            className={`text-lg font-medium mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Change Password
          </h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <button
              type="submit"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-800"
              }`}
            >
              Update Password
            </button>
          </form>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3
            className={`text-lg font-medium mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Notification Preferences
          </h3>
          <div className="space-y-3">
            {user.notifications.map((notification, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                  {notification.label}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notification.enabled}
                    onChange={() => {
                      const updatedNotifications = [...user.notifications];
                      updatedNotifications[index].enabled =
                        !updatedNotifications[index].enabled;
                      setUser({ ...user, notifications: updatedNotifications });
                    }}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer ${
                      notification.enabled
                        ? darkMode
                          ? "bg-blue-600"
                          : "bg-blue-400"
                        : darkMode
                        ? "bg-gray-600"
                        : "bg-gray-300"
                    } peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
                  ></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3
            className={`text-lg font-medium mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Danger Zone
          </h3>
          <div className="space-y-4">
            <button
              onClick={() => console.log("Export data")}
              className={`px-4 me-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                darkMode
                  ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                  : "bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
              }`}
            >
              Export My Data
            </button>
            <button
              onClick={() => console.log("Delete account")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                darkMode
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-red-100 hover:bg-red-200 text-red-800"
              }`}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen untuk Recent Activity
const RecentActivity = ({ darkMode, activities }) => {
  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2
        className={`text-xl font-semibold mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`flex items-start pb-4 ${
              index < activities.length - 1
                ? "border-b border-gray-200 dark:border-gray-700"
                : ""
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              {activity.icon}
            </div>
            <div className="ml-4 flex-1">
              <p className={darkMode ? "text-white" : "text-gray-900"}>
                {activity.description}
              </p>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => console.log("View all activity")}
        className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          darkMode
            ? "bg-gray-700 hover:bg-gray-600 text-white"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
        }`}
      >
        View All Activity
      </button>
    </div>
  );
};

// Komponen untuk Connected Accounts
const ConnectedAccounts = ({ darkMode, accounts, setAccounts }) => {
  const toggleAccountConnection = (index) => {
    const updatedAccounts = [...accounts];
    updatedAccounts[index].connected = !updatedAccounts[index].connected;
    setAccounts(updatedAccounts);
  };

  return (
    <div
      className={`rounded-xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2
        className={`text-xl font-semibold mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Connected Accounts
      </h2>

      <div className="space-y-4">
        {accounts.map((account, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`p-2 rounded-lg ${
                  darkMode ? "bg-gray-600" : "bg-white"
                }`}
              >
                {account.icon}
              </div>
              <div className="ml-4">
                <p className={darkMode ? "text-white" : "text-gray-900"}>
                  {account.name}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {account.connected ? "Connected" : "Not connected"}
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleAccountConnection(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                account.connected
                  ? darkMode
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-red-100 hover:bg-red-200 text-red-800"
                  : darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-800"
              }`}
            >
              {account.connected ? "Disconnect" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    title: "Senior Software Engineer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Passionate about building innovative web applications and user experiences.",
    location: "San Francisco, CA",
    website: "johndoe.dev",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    stats: {
      posts: 124,
      followers: 1245,
      following: 321,
    },
    notifications: [
      { label: "Email Notifications", enabled: true },
      { label: "Push Notifications", enabled: false },
      { label: "SMS Notifications", enabled: true },
      { label: "Marketing Emails", enabled: false },
    ],
  });

  const [accounts, setAccounts] = useState([
    {
      name: "Google",
      connected: true,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      connected: true,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      connected: false,
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 01.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      connected: true,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      ),
    },
  ]);

  const activities = [
    {
      description: "You updated your profile information",
      time: "2 hours ago",
      icon: (
        <svg
          className="w-5 h-5 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      description: "You changed your password",
      time: "1 day ago",
      icon: (
        <svg
          className="w-5 h-5 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      description: "You connected your Google account",
      time: "3 days ago",
      icon: (
        <svg
          className="w-5 h-5 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 14v6m-3-3h6M6 10h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm5-3a2 2 0 11-4 0 2 2 0 014 0zm4 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ];

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

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
          <div className="p-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1
                className={`text-3xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Profile Settings
              </h1>
              <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                Manage your profile and account settings
              </p>
            </motion.div>

            {/* Profile Header */}
            <AnimatedSection className="mb-8">
              <ProfileHeader
                darkMode={darkMode}
                user={user}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            </AnimatedSection>

            {/* Main Content */}
            <AnimatedSection className="mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {isEditing ? (
                    <ProfileForm
                      darkMode={darkMode}
                      user={user}
                      setUser={setUser}
                    />
                  ) : (
                    <RecentActivity
                      darkMode={darkMode}
                      activities={activities}
                    />
                  )}
                  <AccountSettings
                    darkMode={darkMode}
                    user={user}
                    setUser={setUser}
                  />
                </div>
                <div className="space-y-8">
                  <ConnectedAccounts
                    darkMode={darkMode}
                    accounts={accounts}
                    setAccounts={setAccounts}
                  />
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
                      Security
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span
                          className={
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }
                        >
                          Two-factor authentication
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            darkMode
                              ? "bg-yellow-800 text-yellow-200"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          Disabled
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }
                        >
                          Login activity
                        </span>
                        <button
                          onClick={() => console.log("View login activity")}
                          className={`text-sm transition-colors duration-200 ${
                            darkMode
                              ? "text-blue-400 hover:text-blue-300"
                              : "text-blue-600 hover:text-blue-800"
                          }`}
                        >
                          View
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }
                        >
                          Active sessions
                        </span>
                        <span
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          2 devices
                        </span>
                      </div>
                    </div>
                  </div>
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
