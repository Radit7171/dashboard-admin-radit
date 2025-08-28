"use client";

import React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeContext from "@/app/DarkModeContext";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/DashboardFooter";

// Komponen Input utama yang telah ditingkatkan
const Input = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  className = "",
  icon,
  iconPosition = "left",
  variant = "default",
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const containerClasses = `
    mb-6 transition-all duration-300 
    ${className}
    ${error ? "animate-shake" : ""}
  `;

  const inputContainerClasses = `
    relative rounded-xl overflow-hidden
    ${variant === "flushed" ? "border-b-2" : "border-2 p-1"}
    ${
      error
        ? "border-red-500"
        : isFocused
        ? "border-blue-500 shadow-lg"
        : darkMode
        ? "border-gray-700"
        : "border-gray-300"
    }
    ${disabled ? "opacity-60 cursor-not-allowed" : ""}
    transition-all duration-300
  `;

  const inputClasses = `
    w-full px-4 py-4 bg-transparent outline-none
    ${darkMode ? "text-white" : "text-gray-900"}
    ${icon && iconPosition === "left" ? "pl-12" : ""}
    ${icon && iconPosition === "right" ? "pr-12" : ""}
    ${variant === "flushed" ? "px-0" : ""}
  `;

  const labelClasses = `
    block text-sm font-semibold mb-3 transition-all duration-300
    ${darkMode ? "text-gray-300" : "text-gray-700"}
    ${error ? "text-red-500" : ""}
    ${isFocused ? "text-blue-500" : ""}
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={containerClasses}
    >
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.01 }}
        className={inputContainerClasses}
      >
        {icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {React.cloneElement(icon, {
              className: `w-5 h-5 transition-colors duration-300 ${
                error
                  ? "text-red-500"
                  : isFocused
                  ? "text-blue-500"
                  : "text-gray-400"
              }`,
            })}
          </div>
        )}

        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputClasses}
        />

        {icon && iconPosition === "right" && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            {React.cloneElement(icon, {
              className: `w-5 h-5 transition-colors duration-300 ${
                error
                  ? "text-red-500"
                  : isFocused
                  ? "text-blue-500"
                  : "text-gray-400"
              }`,
            })}
          </div>
        )}
      </motion.div>

      {helperText && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className={`mt-2 text-sm transition-colors duration-300 ${
            error
              ? "text-red-600"
              : darkMode
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          {helperText}
        </motion.p>
      )}
    </motion.div>
  );
};

// Komponen Textarea yang telah ditingkatkan
const Textarea = ({
  label,
  placeholder = "",
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  className = "",
  rows = 4,
  variant = "default",
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const containerClasses = `
    mb-6 transition-all duration-300 
    ${className}
    ${error ? "animate-shake" : ""}
  `;

  const textareaContainerClasses = `
    relative rounded-xl overflow-hidden
    ${variant === "flushed" ? "border-b-2" : "border-2 p-1"}
    ${
      error
        ? "border-red-500"
        : isFocused
        ? "border-blue-500 shadow-lg"
        : darkMode
        ? "border-gray-700"
        : "border-gray-300"
    }
    ${disabled ? "opacity-60 cursor-not-allowed" : ""}
    transition-all duration-300
  `;

  const textareaClasses = `
    w-full px-4 py-3 bg-transparent outline-none resize-none
    ${darkMode ? "text-white" : "text-gray-900"}
    ${variant === "flushed" ? "px-0" : ""}
  `;

  const labelClasses = `
    block text-sm font-semibold mb-3 transition-all duration-300
    ${darkMode ? "text-gray-300" : "text-gray-700"}
    ${error ? "text-red-500" : ""}
    ${isFocused ? "text-blue-500" : ""}
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={containerClasses}
    >
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.01 }}
        className={textareaContainerClasses}
      >
        <textarea
          ref={textareaRef}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={textareaClasses}
        />
      </motion.div>

      {helperText && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className={`mt-2 text-sm transition-colors duration-300 ${
            error
              ? "text-red-600"
              : darkMode
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          {helperText}
        </motion.p>
      )}
    </motion.div>
  );
};

// Komponen Select yang telah ditingkatkan
const Select = ({
  label,
  options = [],
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  className = "",
  variant = "default",
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const containerClasses = `
    mb-6 transition-all duration-300 
    ${className}
    ${error ? "animate-shake" : ""}
  `;

  const selectContainerClasses = `
    relative rounded-xl overflow-hidden
    ${variant === "flushed" ? "border-b-2" : "border-2 p-1"}
    ${
      error
        ? "border-red-500"
        : isFocused
        ? "border-blue-500 shadow-lg"
        : darkMode
        ? "border-gray-700"
        : "border-gray-300"
    }
    ${disabled ? "opacity-60 cursor-not-allowed" : ""}
    transition-all duration-300
  `;

  const selectClasses = `
    w-full px-4 py-4 bg-transparent outline-none appearance-none
    ${darkMode ? "text-white" : "text-gray-900"}
    ${variant === "flushed" ? "px-0" : ""}
  `;

  const labelClasses = `
    block text-sm font-semibold mb-3 transition-all duration-300
    ${darkMode ? "text-gray-300" : "text-gray-700"}
    ${error ? "text-red-500" : ""}
    ${isFocused ? "text-blue-500" : ""}
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={containerClasses}
    >
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.01 }}
        className={selectContainerClasses}
      >
        <select
          ref={selectRef}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={selectClasses}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className={`w-5 h-5 transition-colors duration-300 ${
              error
                ? "text-red-500"
                : isFocused
                ? "text-blue-500"
                : "text-gray-400"
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </motion.div>

      {helperText && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className={`mt-2 text-sm transition-colors duration-300 ${
            error
              ? "text-red-600"
              : darkMode
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          {helperText}
        </motion.p>
      )}
    </motion.div>
  );
};

// Komponen Checkbox yang telah ditingkatkan
const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isFocused, setIsFocused] = useState(false);
  const checkboxRef = useRef(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center mb-4 ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
    >
      <label className="relative flex items-center cursor-pointer">
        <input
          ref={checkboxRef}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="sr-only"
        />
        <div
          className={`
          w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300
          ${
            checked
              ? "bg-blue-500 border-blue-500"
              : isFocused
              ? "border-blue-500"
              : darkMode
              ? "border-gray-600 bg-gray-700"
              : "border-gray-300 bg-white"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        {label && (
          <span
            className={`ml-3 text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-900"
            }`}
          >
            {label}
          </span>
        )}
      </label>
    </motion.div>
  );
};

// Komponen Radio yang telah ditingkatkan
const Radio = ({
  label,
  name,
  value,
  checked,
  onChange,
  disabled = false,
  className = "",
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isFocused, setIsFocused] = useState(false);
  const radioRef = useRef(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center mb-4 ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
    >
      <label className="relative flex items-center cursor-pointer">
        <input
          ref={radioRef}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="sr-only"
        />
        <div
          className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
          ${
            checked
              ? "border-blue-500"
              : isFocused
              ? "border-blue-500"
              : darkMode
              ? "border-gray-600"
              : "border-gray-300"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        >
          {checked && (
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
          )}
        </div>
        {label && (
          <span
            className={`ml-3 text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-900"
            }`}
          >
            {label}
          </span>
        )}
      </label>
    </motion.div>
  );
};

// Komponen Toggle Switch yang telah ditingkatkan
const Toggle = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isFocused, setIsFocused] = useState(false);
  const toggleRef = useRef(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center mb-4 ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
    >
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          ref={toggleRef}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="sr-only"
        />
        <div
          className={`
          w-11 h-6 rounded-full transition-all duration-300 relative
          ${
            checked
              ? "bg-blue-500"
              : isFocused
              ? "bg-gray-400"
              : darkMode
              ? "bg-gray-700"
              : "bg-gray-300"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        >
          <div
            className={`
            absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform duration-300
            ${checked ? "transform translate-x-5" : ""}
          `}
          ></div>
        </div>
        {label && (
          <span
            className={`ml-3 text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-900"
            }`}
          >
            {label}
          </span>
        )}
      </label>
    </motion.div>
  );
};

// Komponen Button untuk form yang telah ditingkatkan
const Button = ({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  onClick,
  size = "medium",
  icon,
  iconPosition = "left",
}) => {
  const { darkMode } = useContext(DarkModeContext);

  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-xl 
    transition-all duration-300 focus:outline-none focus:ring-4
    ${disabled ? "opacity-50 cursor-not-allowed" : "transform hover:scale-105"}
  `;

  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: darkMode
      ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-800"
      : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300",
    secondary: darkMode
      ? "bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-800"
      : "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-300",
    success: darkMode
      ? "bg-green-600 hover:bg-green-700 text-white focus:ring-green-800"
      : "bg-green-600 hover:bg-green-700 text-white focus:ring-green-300",
    danger: darkMode
      ? "bg-red-600 hover:bg-red-700 text-white focus:ring-red-800"
      : "bg-red-600 hover:bg-red-700 text-white focus:ring-red-300",
    ghost: darkMode
      ? "bg-transparent hover:bg-gray-800 text-white focus:ring-gray-800 border border-gray-700"
      : "bg-transparent hover:bg-gray-100 text-gray-900 focus:ring-gray-300 border border-gray-300",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
};

// Komponen untuk contoh penggunaan form elements yang telah ditingkatkan
const FormExample = ({
  title,
  description,
  children,
  code,
  darkMode,
  onVariantChange,
  currentVariant,
}) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } mb-8 shadow-xl border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h3
            className={`text-xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h3>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
            {description}
          </p>
        </div>
        <div className="flex space-x-2">
          {onVariantChange && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onVariantChange}
              className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Change Style
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCodeVisible(!isCodeVisible)}
            className={`px-4 py-2 rounded-lg font-medium flex items-center ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            {isCodeVisible ? "Hide Code" : "Show Code"}
          </motion.button>
        </div>
      </div>

      {currentVariant && (
        <div className="mb-4 flex justify-end">
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {currentVariant === "default" ? "Default Style" : "Flushed Style"}
          </span>
        </div>
      )}

      <div className="mb-6">{children}</div>

      {isCodeVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden mt-4"
        >
          <div
            className={`rounded-xl p-4 relative ${
              darkMode
                ? "bg-gray-900 text-gray-200"
                : "bg-gray-100 text-gray-800"
            } overflow-x-auto`}
          >
            <button
              onClick={copyToClipboard}
              className={`absolute top-2 right-2 p-2 rounded-lg flex items-center ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                  : "bg-white hover:bg-gray-200 text-gray-800"
              }`}
            >
              {isCopied ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy
                </>
              )}
            </button>
            <pre className="text-sm font-mono overflow-x-auto">{code}</pre>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Tab Component untuk navigasi yang telah ditingkatkan
const Tab = ({ active, onClick, children, darkMode }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 font-medium rounded-lg transition-colors relative ${
        active
          ? darkMode
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-blue-500 text-white shadow-lg"
          : darkMode
          ? "text-gray-400 hover:text-gray-300 bg-gray-700"
          : "text-gray-500 hover:text-gray-700 bg-gray-100"
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="activeTab"
          className={`absolute inset-0 rounded-lg ${
            darkMode ? "bg-blue-600" : "bg-blue-500"
          } z-[-1]`}
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
};

// Skeleton Loader untuk form elements
const FormSkeleton = ({ darkMode }) => {
  return (
    <div
      className={`rounded-2xl p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      } mb-8`}
    >
      <div className="animate-pulse">
        <div
          className={`h-6 w-1/3 rounded-md ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          } mb-4`}
        ></div>
        <div
          className={`h-4 w-2/3 rounded-md ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          } mb-6`}
        ></div>
        <div className="space-y-4">
          <div
            className={`h-12 rounded-xl ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-12 rounded-xl ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-12 rounded-xl ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default function FormsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [formVariants, setFormVariants] = useState({
    textInputs: "default",
    textareaSelect: "default",
    checkboxesRadios: "default",
    toggleButtons: "default",
    formLayout: "default",
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleFormVariant = (formId) => {
    setFormVariants((prev) => {
      const currentVariant = prev[formId];
      const nextVariant = currentVariant === "default" ? "flushed" : "default";
      return { ...prev, [formId]: nextVariant };
    });
  };

  // State untuk form elements
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
    country: "",
    newsletter: false,
    terms: false,
    notifications: true,
    gender: "male",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Icon untuk input fields
  const userIcon = (
    <svg
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
  );

  const emailIcon = (
    <svg
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
  );

  const lockIcon = (
    <svg
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
  );

  // Filter form elements berdasarkan tab aktif
  const filteredForms = [
    {
      id: "text-inputs",
      title: "Text Inputs",
      description: "Various text input fields with different types and styles.",
      code: `<Input
  label="Name"
  placeholder="Enter your name"
  value={formData.name}
  onChange={(e) => handleInputChange("name", e.target.value)}
  required
/>

<Input
  type="email"
  label="Email"
  placeholder="Enter your email"
  value={formData.email}
  onChange={(e) => handleInputChange("email", e.target.value)}
  icon={emailIcon}
  required
/>

<Input
  type="password"
  label="Password"
  placeholder="Enter your password"
  value={formData.password}
  onChange={(e) => handleInputChange("password", e.target.value)}
  icon={lockIcon}
  helperText="Use at least 8 characters with a mix of letters and numbers"
  required
/>

<Input
  label="Disabled Input"
  placeholder="This input is disabled"
  value="Disabled value"
  disabled
/>`,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label="Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              variant={formVariants.textInputs}
            />
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              icon={emailIcon}
              required
              variant={formVariants.textInputs}
            />
          </div>
          <div>
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              icon={lockIcon}
              helperText="Use at least 8 characters with a mix of letters and numbers"
              required
              variant={formVariants.textInputs}
            />
            <Input
              label="Disabled Input"
              placeholder="This input is disabled"
              value="Disabled value"
              disabled
              variant={formVariants.textInputs}
            />
          </div>
        </div>
      ),
      category: "inputs",
    },
    {
      id: "textarea-select",
      title: "Textarea and Select",
      description: "Textarea for multi-line input and select dropdowns.",
      code: `<Textarea
  label="Message"
  placeholder="Enter your message"
  value={formData.message}
  onChange={(e) => handleInputChange("message", e.target.value)}
  rows={4}
/>

<Select
  label="Country"
  value={formData.country}
  onChange={(e) => handleInputChange("country", e.target.value)}
  options={[
    { value: "", label: "Select a country" },
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
  ]}
  required
/>`,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Textarea
            label="Message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            rows={4}
            variant={formVariants.textareaSelect}
          />
          <Select
            label="Country"
            value={formData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            options={[
              { value: "", label: "Select a country" },
              { value: "us", label: "United States" },
              { value: "ca", label: "Canada" },
              { value: "uk", label: "United Kingdom" },
              { value: "au", label: "Australia" },
            ]}
            required
            variant={formVariants.textareaSelect}
          />
        </div>
      ),
      category: "inputs",
    },
    {
      id: "checkboxes-radios",
      title: "Checkboxes and Radio Buttons",
      description: "Checkbox and radio button form elements.",
      code: `<Checkbox
  label="Subscribe to newsletter"
  checked={formData.newsletter}
  onChange={(e) => handleInputChange("newsletter", e.target.checked)}
/>

<Checkbox
  label="I agree to the terms and conditions"
  checked={formData.terms}
  onChange={(e) => handleInputChange("terms", e.target.checked)}
  required
/>

<div className="mb-4">
  <label className="block text-sm font-medium mb-2">Gender</label>
  <div className="space-y-2">
    <Radio
      name="gender"
      label="Male"
      value="male"
      checked={formData.gender === "male"}
      onChange={(e) => handleInputChange("gender", e.target.value)}
    />
    <Radio
      name="gender"
      label="Female"
      value="female"
      checked={formData.gender === "female"}
      onChange={(e) => handleInputChange("gender", e.target.value)}
    />
    <Radio
      name="gender"
      label="Other"
      value="other"
      checked={formData.gender === "other"}
      onChange={(e) => handleInputChange("gender", e.target.value)}
    />
  </div>
</div>`,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Checkbox
              label="Subscribe to newsletter"
              checked={formData.newsletter}
              onChange={(e) =>
                handleInputChange("newsletter", e.target.checked)
              }
            />
            <Checkbox
              label="I agree to the terms and conditions"
              checked={formData.terms}
              onChange={(e) => handleInputChange("terms", e.target.checked)}
              required
            />
          </div>
          <div>
            <div className="mb-4">
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Gender
              </label>
              <div className="space-y-2">
                <Radio
                  name="gender"
                  label="Male"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                />
                <Radio
                  name="gender"
                  label="Female"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                />
                <Radio
                  name="gender"
                  label="Other"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      category: "selection",
    },
    {
      id: "toggle-buttons",
      title: "Toggle Switches and Buttons",
      description: "Toggle switches and various button styles.",
      code: `<Toggle
  label="Enable notifications"
  checked={formData.notifications}
  onChange={(e) => handleInputChange("notifications", e.target.checked)}
/>

<div className="flex flex-wrap gap-2 mt-4">
  <Button variant="primary">Primary Button</Button>
  <Button variant="secondary">Secondary Button</Button>
  <Button variant="success">Success Button</Button>
  <Button variant="danger">Danger Button</Button>
  <Button disabled>Disabled Button</Button>
</div>`,
      content: (
        <div>
          <Toggle
            label="Enable notifications"
            checked={formData.notifications}
            onChange={(e) =>
              handleInputChange("notifications", e.target.checked)
            }
          />
          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="success">Success Button</Button>
            <Button variant="danger">Danger Button</Button>
            <Button disabled>Disabled Button</Button>
          </div>
        </div>
      ),
      category: "interactive",
    },
    {
      id: "form-layout",
      title: "Form Layout Example",
      description: "A complete form layout with various elements.",
      code: `<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <Input
    label="First Name"
    placeholder="Enter your first name"
    required
  />
  <Input
    label="Last Name"
    placeholder="Enter your last name"
    required
  />
</div>

<Input
  type="email"
  label="Email Address"
  placeholder="Enter your email"
  icon={emailIcon}
  required
/>

<Textarea
  label="Message"
  placeholder="Enter your message"
  rows={4}
/>

<Select
  label="Subject"
  options={[
    { value: "", label: "Select a subject" },
    { value: "support", label: "Support" },
    { value: "sales", label: "Sales" },
    { value: "billing", label: "Billing" },
  ]}
  required
/>

<div className="flex items-center mb-4">
  <Checkbox
    label="I agree to the terms and conditions"
    required
  />
</div>

<Button variant="primary" className="w-full md:w-auto">
  Submit Form
</Button>`,
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <Input
              label="First Name"
              placeholder="Enter your first name"
              required
              variant={formVariants.formLayout}
            />
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              required
              variant={formVariants.formLayout}
            />
          </div>

          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            icon={emailIcon}
            required
            className="mb-4"
            variant={formVariants.formLayout}
          />

          <Textarea
            label="Message"
            placeholder="Enter your message"
            rows={4}
            className="mb-4"
            variant={formVariants.formLayout}
          />

          <Select
            label="Subject"
            options={[
              { value: "", label: "Select a subject" },
              { value: "support", label: "Support" },
              { value: "sales", label: "Sales" },
              { value: "billing", label: "Billing" },
            ]}
            required
            className="mb-4"
            variant={formVariants.formLayout}
          />

          <div className="flex items-center mb-4">
            <Checkbox label="I agree to the terms and conditions" required />
          </div>

          <Button variant="primary" className="w-full md:w-auto">
            Submit Form
          </Button>
        </div>
      ),
      category: "layout",
    },
  ].filter((form) => {
    const matchesTab = activeTab === "all" || form.category === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className={darkMode ? "dark" : ""}>
      <Sidebar open={sidebarOpen} darkMode={darkMode} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 min-h-screen ${
          sidebarOpen ? "ml-64" : "ml-0"
        } ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
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

        <main className="flex-1 relative z-10 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1
                className={`text-5xl font-bold mb-4 bg-gradient-to-r ${
                  darkMode
                    ? "from-blue-400 to-purple-400"
                    : "from-blue-600 to-purple-600"
                } bg-clip-text text-transparent`}
              >
                Form Elements
              </h1>
              <p
                className={`text-xl max-w-3xl mx-auto ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Beautiful, accessible, and customizable form components with
                light and dark mode support
              </p>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`mb-8 p-6 rounded-2xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <Tab
                    active={activeTab === "all"}
                    onClick={() => setActiveTab("all")}
                    darkMode={darkMode}
                  >
                    All Elements
                  </Tab>
                  <Tab
                    active={activeTab === "inputs"}
                    onClick={() => setActiveTab("inputs")}
                    darkMode={darkMode}
                  >
                    Inputs
                  </Tab>
                  <Tab
                    active={activeTab === "selection"}
                    onClick={() => setActiveTab("selection")}
                    darkMode={darkMode}
                  >
                    Selection
                  </Tab>
                  <Tab
                    active={activeTab === "interactive"}
                    onClick={() => setActiveTab("interactive")}
                    darkMode={darkMode}
                  >
                    Interactive
                  </Tab>
                  <Tab
                    active={activeTab === "layout"}
                    onClick={() => setActiveTab("layout")}
                    darkMode={darkMode}
                  >
                    Layout
                  </Tab>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
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
                    placeholder="Search form elements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-3 rounded-xl border-2 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                        : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                  />
                </div>
              </div>
            </motion.div>

            {/* Results Count */}
            {searchQuery && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mb-6 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Found {filteredForms.length} form element
                {filteredForms.length !== 1 ? "s" : ""} matching "{searchQuery}"
              </motion.p>
            )}

            <div className="grid grid-cols-1 gap-8">
              {isLoading ? (
                // Show skeleton loaders while loading
                Array.from({ length: 4 }).map((_, index) => (
                  <FormSkeleton key={index} darkMode={darkMode} />
                ))
              ) : filteredForms.length > 0 ? (
                filteredForms.map((form, index) => (
                  <motion.div
                    key={form.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FormExample
                      title={form.title}
                      description={form.description}
                      code={form.code}
                      darkMode={darkMode}
                      onVariantChange={() => toggleFormVariant(form.id)}
                      currentVariant={formVariants[form.id]}
                    >
                      {form.content}
                    </FormExample>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center py-12 rounded-2xl ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
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
                    className={`mt-4 text-lg font-medium ${
                      darkMode ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    No form elements found
                  </h3>
                  <p
                    className={`mt-2 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Usage Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-2xl p-8 mt-12 shadow-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                How to Use These Form Elements
              </h2>

              <div
                className={`prose prose-lg ${
                  darkMode ? "prose-invert" : ""
                } max-w-none`}
              >
                <h3
                  className={`${darkMode ? "text-gray-200" : "text-gray-800"}`}
                >
                  Installation
                </h3>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  Copy the form component code into your project. Each component
                  is designed to work independently.
                </p>

                <h3
                  className={`mt-6 ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Basic Usage
                </h3>
                <div className="relative my-4">
                  <div
                    className={`rounded-xl p-4 ${
                      darkMode
                        ? "bg-gray-900 text-gray-200"
                        : "bg-gray-100 text-gray-800"
                    } overflow-x-auto`}
                  >
                    <pre className="text-sm font-mono">{`import { Input, Textarea, Select, Checkbox, Radio, Toggle, Button } from '@/components/FormElements';

// Basic input field
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

// Textarea
<Textarea
  label="Message"
  placeholder="Enter your message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  rows={4}
/>

// Select dropdown
<Select
  label="Country"
  value={country}
  onChange={(e) => setCountry(e.target.value)}
  options={[
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
  ]}
/>

// Checkbox
<Checkbox
  label="I agree to terms"
  checked={terms}
  onChange={(e) => setTerms(e.target.checked)}
/>

// Radio buttons
<Radio
  name="gender"
  label="Male"
  value="male"
  checked={gender === "male"}
  onChange={(e) => setGender(e.target.value)}
/>

// Toggle switch
<Toggle
  label="Enable notifications"
  checked={notifications}
  onChange={(e) => setNotifications(e.target.checked)}
/>

// Button
<Button variant="primary" onClick={handleSubmit}>
  Submit
</Button>`}</pre>
                  </div>
                </div>

                <h3
                  className={`mt-6 ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Props
                </h3>
                <div
                  className={`rounded-xl border ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } overflow-hidden mt-4`}
                >
                  <table className="w-full">
                    <thead
                      className={
                        darkMode
                          ? "bg-gray-700 text-gray-200"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">
                          Component
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Key Props
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className={darkMode ? "text-white" : "text-black"}>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">Input</td>
                        <td className="px-4 py-3 text-sm">
                          type, label, placeholder, value, onChange, icon,
                          iconPosition
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Text input field with optional icon and validation
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          Textarea
                        </td>
                        <td className="px-4 py-3 text-sm">
                          label, placeholder, value, onChange, rows
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Multi-line text input field
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">Select</td>
                        <td className="px-4 py-3 text-sm">
                          label, value, onChange, options
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Dropdown select menu with options
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          Checkbox
                        </td>
                        <td className="px-4 py-3 text-sm">
                          label, checked, onChange
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Checkbox input for binary choices
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">Radio</td>
                        <td className="px-4 py-3 text-sm">
                          name, label, value, checked, onChange
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Radio button for single selection from multiple
                          options
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">Toggle</td>
                        <td className="px-4 py-3 text-sm">
                          label, checked, onChange
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Toggle switch for on/off states
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">Button</td>
                        <td className="px-4 py-3 text-sm">
                          variant, onClick, disabled
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Button with different style variants
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <div className="relative z-10 mt-auto">
          <Footer darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}
