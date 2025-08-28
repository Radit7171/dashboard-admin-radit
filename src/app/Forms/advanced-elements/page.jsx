"use client";

import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeContext from "../../DarkModeContext";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/DashboardFooter";

// Komponen Date Picker yang telah ditingkatkan
const DatePicker = ({
  label,
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

  return (
    <motion.div whileHover={{ y: -2 }} className={`mb-6 ${className}`}>
      {label && (
        <label
          className={`block text-sm font-medium mb-3 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : variant === "filled"
              ? darkMode
                ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white"
                : "border-gray-200 bg-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900"
              : darkMode
              ? "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-gray-800 text-white"
              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white text-gray-900"
          } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        />
      </div>
      {helperText && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-2 text-sm ${
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

// Komponen File Upload yang telah ditingkatkan
const FileUpload = ({
  label,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  className = "",
  accept = "*",
  multiple = false,
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(multiple ? `${files.length} files selected` : files[0].name);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = e.dataTransfer.files;
      setFileName(multiple ? `${files.length} files selected` : files[0].name);

      // Create a synthetic event for the onChange handler
      const event = {
        target: {
          files: e.dataTransfer.files,
        },
      };

      if (onChange) {
        onChange(event);
      }
    }
  };

  return (
    <motion.div whileHover={{ y: -2 }} className={`mb-6 ${className}`}>
      {label && (
        <label
          className={`block text-sm font-medium mb-3 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : error
            ? "border-red-500"
            : darkMode
            ? "border-gray-600 hover:border-gray-500 bg-gray-800"
            : "border-gray-300 hover:border-gray-400 bg-gray-50"
        } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          disabled={disabled}
          accept={accept}
          multiple={multiple}
        />
        <div className="text-center">
          <svg
            className={`w-12 h-12 mx-auto mb-3 ${
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
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div className="flex flex-col items-center justify-center gap-1">
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {isDragging
                ? "Drop files here"
                : "Drag & drop files or click to browse"}
            </p>
            <p
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {accept === "*" ? "Any file type" : `Supported: ${accept}`}
            </p>
          </div>
        </div>
      </div>
      {fileName && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center"
        >
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {fileName}
          </span>
        </motion.div>
      )}
      {helperText && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-2 text-sm ${
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

// Komponen Range Slider yang telah ditingkatkan
const RangeSlider = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className = "",
  showTooltip = true,
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div whileHover={{ y: -2 }} className={`mb-6 ${className}`}>
      <div className="flex justify-between items-center mb-3">
        {label && (
          <label
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {label}
          </label>
        )}
        {showTooltip && (
          <span
            className={`text-sm font-medium px-2 py-1 rounded-lg ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {value}
          </span>
        )}
      </div>
      <div className="relative py-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className={`w-full h-2 rounded-full appearance-none cursor-pointer transition-all ${
            darkMode
              ? "bg-gray-700 accent-blue-500"
              : "bg-gray-200 accent-blue-600"
          } ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${
            isDragging ? "scale-105" : ""
          }`}
          style={{
            backgroundSize: `${((value - min) * 100) / (max - min)}% 100%`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Komponen Color Picker yang telah ditingkatkan
const ColorPicker = ({
  label,
  value,
  onChange,
  disabled = false,
  className = "",
  presets = [],
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false);

  const colorPresets =
    presets.length > 0
      ? presets
      : [
          "#3B82F6",
          "#EF4444",
          "#10B981",
          "#F59E0B",
          "#8B5CF6",
          "#EC4899",
          "#6EE7B7",
          "#6366F1",
          "#F97316",
          "#14B8A6",
        ];

  return (
    <motion.div whileHover={{ y: -2 }} className={`mb-6 ${className}`}>
      {label && (
        <label
          className={`block text-sm font-medium mb-3 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {label}
        </label>
      )}
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-12 h-12 rounded-xl cursor-pointer border-2 ${
              darkMode ? "border-gray-700" : "border-gray-300"
            } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
          />
        </div>
        <span
          className={`text-sm font-mono ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {value}
        </span>
      </div>

      {colorPresets.length > 0 && (
        <div className="mt-4">
          <p
            className={`text-xs mb-2 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Color presets
          </p>
          <div className="flex flex-wrap gap-2">
            {colorPresets.map((color, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className={`w-8 h-8 rounded-lg border-2 ${
                  darkMode ? "border-gray-700" : "border-gray-300"
                } ${
                  value === color ? "ring-2 ring-blue-500 ring-offset-2" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() =>
                  !disabled && onChange({ target: { value: color } })
                }
                disabled={disabled}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Komponen Toggle Switch (Advanced) yang telah ditingkatkan
const AdvancedToggle = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  className = "",
  variant = "default",
  icon = null,
}) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`flex items-start mb-6 ${className}`}
    >
      <div className="flex items-center h-5">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => !disabled && onChange(!checked)}
          disabled={disabled}
          className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            checked
              ? variant === "primary"
                ? "bg-blue-600"
                : variant === "success"
                ? "bg-green-600"
                : "bg-gray-600"
              : darkMode
              ? "bg-gray-600"
              : "bg-gray-200"
          } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
              checked ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <div className="ml-4">
        {label && (
          <label
            className={`text-sm font-medium flex items-center gap-2 ${
              darkMode ? "text-gray-300" : "text-gray-900"
            } ${disabled ? "opacity-50" : ""}`}
          >
            {icon && <span className="text-lg">{icon}</span>}
            {label}
          </label>
        )}
        {description && (
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            } ${disabled ? "opacity-50" : ""}`}
          >
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// Komponen Autocomplete yang telah ditingkatkan
const Autocomplete = ({
  label,
  value,
  onChange,
  options = [],
  error,
  helperText,
  disabled = false,
  required = false,
  className = "",
  icon = null,
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (inputValue) {
      setFilteredOptions(
        options.filter((option) =>
          option.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    } else {
      setFilteredOptions(options);
    }

    setIsOpen(true);
  };

  const handleOptionSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <motion.div whileHover={{ y: -2 }} className={`relative mb-6 ${className}`}>
      {label && (
        <label
          className={`block text-sm font-medium mb-3 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          disabled={disabled}
          className={`w-full px-4 py-3.5 rounded-xl border-2 transition-colors duration-200 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : darkMode
              ? "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-gray-800 text-white"
              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white text-gray-900"
          } ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${
            icon ? "pl-10" : ""
          }`}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <svg
            className="w-5 h-5 text-gray-400"
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
        {isOpen && filteredOptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-10 w-full mt-1 rounded-xl shadow-lg max-h-60 overflow-y-auto"
          >
            <ul
              className={`py-2 ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`px-4 py-2 cursor-pointer transition-colors ${
                    darkMode
                      ? "hover:bg-gray-700 text-white"
                      : "hover:bg-gray-100 text-gray-900"
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
      {helperText && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-2 text-sm ${
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

// Komponen Rich Text Editor (Sederhana) yang telah ditingkatkan
const RichTextEditor = ({
  label,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  className = "",
}) => {
  const { darkMode } = useContext(DarkModeContext);

  const handleFormat = (format) => {
    document.execCommand(format, false, null);
  };

  const toolbarButtons = [
    { format: "bold", icon: "B", label: "Bold" },
    { format: "italic", icon: "I", label: "Italic" },
    { format: "underline", icon: "U", label: "Underline" },
    { format: "insertUnorderedList", icon: "≡", label: "Bullet List" },
    { format: "insertOrderedList", icon: "1.", label: "Numbered List" },
  ];

  return (
    <motion.div whileHover={{ y: -2 }} className={`mb-6 ${className}`}>
      {label && (
        <label
          className={`block text-sm font-medium mb-3 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Toolbar */}
      <div
        className={`flex flex-wrap gap-1 p-3 rounded-t-xl border ${
          darkMode
            ? "bg-gray-700 border-gray-600"
            : "bg-gray-100 border-gray-300"
        }`}
      >
        {toolbarButtons.map((button) => (
          <motion.button
            key={button.format}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleFormat(button.format)}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? "hover:bg-gray-600 text-white"
                : "hover:bg-gray-200 text-gray-700"
            }`}
            title={button.label}
            disabled={disabled}
          >
            {button.icon}
          </motion.button>
        ))}
      </div>

      {/* Editor Area */}
      <div
        contentEditable={!disabled}
        onInput={(e) => onChange(e.target.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
        className={`min-h-40 p-4 rounded-b-xl border border-t-0 transition-colors duration-200 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            : darkMode
            ? "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-gray-800 text-white"
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white text-gray-900"
        } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      />

      {helperText && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-2 text-sm ${
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

// Komponen untuk contoh penggunaan form elements
const FormExample = ({
  title,
  description,
  children,
  code,
  darkMode,
  onReset,
  canReset = false,
}) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-1 ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900"
          : "bg-gradient-to-br from-white to-gray-50"
      } mb-8 shadow-lg`}
    >
      <div
        className={`rounded-2xl p-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3
              className={`text-xl font-bold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {description}
            </p>
          </div>
          <div className="flex space-x-2">
            {canReset && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onReset}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                Reset
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
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
              </motion.button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {isExpanded ? "Collapse" : "Expand"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => setIsCodeVisible(!isCodeVisible)}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {isCodeVisible ? "Hide Code" : "Show Code"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
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
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isCodeVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div
                className={`rounded-xl p-4 ${
                  darkMode
                    ? "bg-gray-900 text-gray-200"
                    : "bg-gray-100 text-gray-800"
                } overflow-x-auto mt-4`}
              >
                <pre className="text-sm font-mono">{code}</pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Tab Component untuk navigasi
const Tab = ({ active, onClick, children, count }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 font-medium rounded-xl transition-all flex items-center ${
        active
          ? darkMode
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-blue-500 text-white shadow-lg"
          : darkMode
          ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
      {count !== undefined && (
        <span
          className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
            active
              ? darkMode
                ? "bg-blue-800"
                : "bg-blue-600"
              : darkMode
              ? "bg-gray-600"
              : "bg-gray-300"
          }`}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
};

// Skeleton loader untuk forms
const FormSkeleton = ({ darkMode }) => {
  return (
    <div
      className={`rounded-2xl p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } mb-8 shadow-lg border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      } animate-pulse`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div
            className={`h-7 rounded-lg mb-2 ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-4 rounded-lg w-3/4 ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
        </div>
        <div className="flex space-x-2">
          <div
            className={`h-8 w-8 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-8 w-8 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
        </div>
      </div>
      <div
        className={`h-48 rounded-xl ${
          darkMode ? "bg-gray-700" : "bg-gray-300"
        }`}
      ></div>
    </div>
  );
};

export default function AdvancedFormsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // State untuk form elements
  const [formData, setFormData] = useState({
    date: "",
    file: null,
    range: 50,
    color: "#3b82f6",
    advancedToggle: false,
    autocomplete: "",
    richText: "<p>Type your content here...</p>",
  });

  useEffect(() => {
    // Simulasi loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetForm = () => {
    setFormData({
      date: "",
      file: null,
      range: 50,
      color: "#3b82f6",
      advancedToggle: false,
      autocomplete: "",
      richText: "<p>Type your content here...</p>",
    });
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Options untuk autocomplete
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "South Korea",
    "Brazil",
    "India",
    "China",
    "Russia",
  ];

  // Filter form elements berdasarkan tab aktif
  const filteredForms = [
    {
      id: "date-picker",
      title: "Date Picker",
      description: "A date picker input with calendar interface.",
      code: `<DatePicker
  label="Select Date"
  value={formData.date}
  onChange={(e) => handleInputChange("date", e.target.value)}
  required
  helperText="Select a date for your appointment"
/>`,
      content: (
        <DatePicker
          label="Select Date"
          value={formData.date}
          onChange={(e) => handleInputChange("date", e.target.value)}
          required
          helperText="Select a date for your appointment"
        />
      ),
      category: "pickers",
    },
    {
      id: "file-upload",
      title: "File Upload",
      description: "A drag-and-drop file upload area with preview.",
      code: `<FileUpload
  label="Upload Files"
  onChange={(e) => handleInputChange("file", e.target.files[0])}
  helperText="Upload PDF, JPG, PNG up to 10MB"
  accept=".pdf,.jpg,.jpeg,.png"
  multiple
/>`,
      content: (
        <FileUpload
          label="Upload Files"
          onChange={(e) => handleInputChange("file", e.target.files[0])}
          helperText="Upload PDF, JPG, PNG up to 10MB"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
        />
      ),
      category: "upload",
    },
    {
      id: "range-slider",
      title: "Range Slider",
      description: "A slider for selecting values from a range.",
      code: `<RangeSlider
  label="Volume Level"
  value={formData.range}
  onChange={(e) => handleInputChange("range", e.target.value)}
  min={0}
  max={100}
  step={5}
  showTooltip={true}
/>`,
      content: (
        <RangeSlider
          label="Volume Level"
          value={formData.range}
          onChange={(e) => handleInputChange("range", e.target.value)}
          min={0}
          max={100}
          step={5}
          showTooltip={true}
        />
      ),
      category: "inputs",
    },
    {
      id: "color-picker",
      title: "Color Picker",
      description: "A color selector with visual color picker.",
      code: `<ColorPicker
  label="Select Color"
  value={formData.color}
  onChange={(e) => handleInputChange("color", e.target.value)}
  presets={["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"]}
/>`,
      content: (
        <ColorPicker
          label="Select Color"
          value={formData.color}
          onChange={(e) => handleInputChange("color", e.target.value)}
          presets={["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"]}
        />
      ),
      category: "pickers",
    },
    {
      id: "advanced-toggle",
      title: "Advanced Toggle",
      description: "A toggle switch with description support.",
      code: `<AdvancedToggle
  label="Enable notifications"
  description="Receive email notifications for important updates"
  checked={formData.advancedToggle}
  onChange={(value) => handleInputChange("advancedToggle", value)}
  variant="primary"
  icon="🔔"
/>`,
      content: (
        <AdvancedToggle
          label="Enable notifications"
          description="Receive email notifications for important updates"
          checked={formData.advancedToggle}
          onChange={(value) => handleInputChange("advancedToggle", value)}
          variant="primary"
          icon="🔔"
        />
      ),
      category: "selection",
    },
    {
      id: "autocomplete",
      title: "Autocomplete",
      description: "An input with suggested options as you type.",
      code: `<Autocomplete
  label="Country"
  value={formData.autocomplete}
  onChange={(value) => handleInputChange("autocomplete", value)}
  options={countries}
  helperText="Start typing to see suggestions"
  icon="🌎"
/>`,
      content: (
        <Autocomplete
          label="Country"
          value={formData.autocomplete}
          onChange={(value) => handleInputChange("autocomplete", value)}
          options={countries}
          helperText="Start typing to see suggestions"
          icon="🌎"
        />
      ),
      category: "inputs",
    },
    {
      id: "rich-text-editor",
      title: "Rich Text Editor",
      description: "A simple rich text editor with formatting options.",
      code: `<RichTextEditor
  label="Content"
  value={formData.richText}
  onChange={(value) => handleInputChange("richText", value)}
  helperText="Format your content with bold, italic, etc."
/>`,
      content: (
        <RichTextEditor
          label="Content"
          value={formData.richText}
          onChange={(value) => handleInputChange("richText", value)}
          helperText="Format your content with bold, italic, etc."
        />
      ),
      category: "editors",
    },
    {
      id: "combined-form",
      title: "Combined Advanced Form",
      description: "A form combining multiple advanced elements.",
      code: `<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <DatePicker
    label="Event Date"
    value={formData.date}
    onChange={(e) => handleInputChange("date", e.target.value)}
    required
  />
  <Autocomplete
    label="Location"
    value={formData.autocomplete}
    onChange={(value) => handleInputChange("autocomplete", value)}
    options={countries}
  />
</div>

<RangeSlider
  label="Priority Level"
  value={formData.range}
  onChange={(e) => handleInputChange("range", e.target.value)}
  min={1}
  max={10}
/>

<ColorPicker
  label="Event Color Theme"
  value={formData.color}
  onChange={(e) => handleInputChange("color", e.target.value)}
/>

<AdvancedToggle
  label="Public Event"
  description="Make this event visible to everyone"
  checked={formData.advancedToggle}
  onChange={(value) => handleInputChange("advancedToggle", value)}
/>

<RichTextEditor
  label="Event Description"
  value={formData.richText}
  onChange={(value) => handleInputChange("richText", value)}
/>`,
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <DatePicker
              label="Event Date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              required
            />
            <Autocomplete
              label="Location"
              value={formData.autocomplete}
              onChange={(value) => handleInputChange("autocomplete", value)}
              options={countries}
            />
          </div>

          <RangeSlider
            label="Priority Level"
            value={formData.range}
            onChange={(e) => handleInputChange("range", e.target.value)}
            min={1}
            max={10}
            className="mb-6"
          />

          <ColorPicker
            label="Event Color Theme"
            value={formData.color}
            onChange={(e) => handleInputChange("color", e.target.value)}
            className="mb-6"
          />

          <AdvancedToggle
            label="Public Event"
            description="Make this event visible to everyone"
            checked={formData.advancedToggle}
            onChange={(value) => handleInputChange("advancedToggle", value)}
            className="mb-6"
          />

          <RichTextEditor
            label="Event Description"
            value={formData.richText}
            onChange={(value) => handleInputChange("richText", value)}
          />
        </div>
      ),
      category: "layout",
      canReset: true,
    },
  ].filter((form) => {
    const matchesTab = activeTab === "all" || form.category === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Count forms per category for tabs
  const formCounts = {
    all: filteredForms.length,
    pickers: filteredForms.filter((form) => form.category === "pickers").length,
    upload: filteredForms.filter((form) => form.category === "upload").length,
    inputs: filteredForms.filter((form) => form.category === "inputs").length,
    selection: filteredForms.filter((form) => form.category === "selection")
      .length,
    editors: filteredForms.filter((form) => form.category === "editors").length,
    layout: filteredForms.filter((form) => form.category === "layout").length,
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Sidebar open={sidebarOpen} darkMode={darkMode} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 min-h-screen ${
          sidebarOpen ? "ml-64" : "ml-0"
        } ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 to-gray-800"
            : "bg-gradient-to-br from-gray-50 to-gray-100"
        }`}
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
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block p-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 mb-6"
              >
                <div
                  className={`p-3 rounded-xl ${
                    darkMode ? "bg-gray-900" : "bg-white"
                  } bg-opacity-90 backdrop-blur-sm`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 mx-auto text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
              </motion.div>

              <h1
                className={`text-5xl font-bold mb-4 bg-gradient-to-r ${
                  darkMode
                    ? "from-blue-400 to-purple-400"
                    : "from-blue-600 to-purple-600"
                } bg-clip-text text-transparent`}
              >
                Advanced Form Elements
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
              } shadow-xl border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  <Tab
                    active={activeTab === "all"}
                    onClick={() => setActiveTab("all")}
                    count={formCounts.all}
                  >
                    All Elements
                  </Tab>
                  <Tab
                    active={activeTab === "pickers"}
                    onClick={() => setActiveTab("pickers")}
                    count={formCounts.pickers}
                  >
                    Pickers
                  </Tab>
                  <Tab
                    active={activeTab === "upload"}
                    onClick={() => setActiveTab("upload")}
                    count={formCounts.upload}
                  >
                    Upload
                  </Tab>
                  <Tab
                    active={activeTab === "inputs"}
                    onClick={() => setActiveTab("inputs")}
                    count={formCounts.inputs}
                  >
                    Inputs
                  </Tab>
                  <Tab
                    active={activeTab === "selection"}
                    onClick={() => setActiveTab("selection")}
                    count={formCounts.selection}
                  >
                    Selection
                  </Tab>
                  <Tab
                    active={activeTab === "editors"}
                    onClick={() => setActiveTab("editors")}
                    count={formCounts.editors}
                  >
                    Editors
                  </Tab>
                  <Tab
                    active={activeTab === "layout"}
                    onClick={() => setActiveTab("layout")}
                    count={formCounts.layout}
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
                    className={`pl-10 pr-4 py-2 rounded-xl border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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
                // Skeleton loaders
                [...Array(3)].map((_, index) => (
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
                      onReset={form.canReset ? handleResetForm : undefined}
                      canReset={form.canReset || false}
                    >
                      {form.content}
                    </FormExample>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center py-16 rounded-2xl ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-lg`}
                >
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400 mb-4"
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
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveTab("all");
                    }}
                    className={`mt-4 px-4 py-2 rounded-xl font-medium ${
                      darkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </div>

            {/* Usage Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-2xl p-8 mt-12 shadow-xl border ${
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
                How to Use These Advanced Form Elements
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
                  Copy the advanced form component code into your project. Each
                  component is designed to work independently.
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
                    <pre className="text-sm font-mono">{`import { 
  DatePicker, 
  FileUpload, 
  RangeSlider, 
  ColorPicker, 
  AdvancedToggle, 
  Autocomplete, 
  RichTextEditor 
} from '@/components/AdvancedFormElements';

// Date picker
<DatePicker
  label="Select Date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>

// File upload
<FileUpload
  label="Upload File"
  onChange={(e) => setFile(e.target.files[0])}
  accept=".pdf,.jpg,.png"
/>

// Range slider
<RangeSlider
  label="Volume"
  value={volume}
  onChange={(e) => setVolume(e.target.value)}
  min={0}
  max={100}
/>

// Color picker
<ColorPicker
  label="Select Color"
  value={color}
  onChange={(e) => setColor(e.target.value)}
/>

// Advanced toggle
<AdvancedToggle
  label="Enable Feature"
  description="Turn this feature on or off"
  checked={enabled}
  onChange={setEnabled}
/>

// Autocomplete
<Autocomplete
  label="Country"
  value={country}
  onChange={setCountry}
  options={countriesList}
/>

// Rich text editor
<RichTextEditor
  label="Content"
  value={content}
  onChange={setContent}
/>`}</pre>
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
                        <td className="px-4 py-3 font-mono text-sm">
                          DatePicker
                        </td>
                        <td className="px-4 py-3 text-sm">
                          label, value, onChange, min, max
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Date input with calendar picker
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          FileUpload
                        </td>
                        <td className="px-4 py-3 text-sm">
                          label, onChange, accept, multiple
                        </td>
                        <td className="px-4 py-3 text-sm">
                          File upload with drag and drop support
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">
                          RangeSlider
                        </td>
                        <td className="px-4 py-3 text-sm">
                          label, value, onChange, min, max, step
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Slider for selecting values from a range
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          ColorPicker
                        </td>
                        <td className="px-4 py-3 text-sm">
                          label, value, onChange, presets
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Color selection input with visual picker
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">
                          AdvancedToggle
                        </td>
                        <td className="px-4 py-3 text-sm">
                          label, description, checked, onChange, variant
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Toggle switch with label and description
                        </td>
                      </tr>
                      <tr className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-mono text-sm">
                          Autocomplete
                        </td>
                        <td className="px-4 py-3 text-sm">
                          label, value, onChange, options, icon
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Input with autocomplete suggestions
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">
                          RichTextEditor
                        </td>
                        <td className="px-4 py-3 text-sm">
                          label, value, onChange
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Simple rich text editor with formatting tools
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
