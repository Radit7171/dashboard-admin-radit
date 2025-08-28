"use client";

import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeContext from "../../DarkModeContext";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/DashboardFooter";

// Komponen Input untuk wizard
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
}) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`mb-5 ${className}`}>
      {label && (
        <label
          className={`block text-sm font-medium mb-2.5 flex items-center gap-1.5 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {icon && <span className="text-lg">{icon}</span>}
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <motion.input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3.5 rounded-xl border transition-all duration-300 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            : darkMode
            ? "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-gray-800 text-white"
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white text-gray-900"
        } ${icon ? "pl-10" : ""}`}
        whileFocus={{ scale: 1.01 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      />
      {helperText && (
        <p
          className={`mt-1.5 text-sm ${
            error
              ? "text-red-600"
              : darkMode
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Komponen Select untuk wizard
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
  icon,
}) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`mb-5 ${className}`}>
      {label && (
        <label
          className={`block text-sm font-medium mb-2.5 flex items-center gap-1.5 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {icon && <span className="text-lg">{icon}</span>}
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <motion.select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3.5 rounded-xl border appearance-none transition-all duration-300 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            : darkMode
            ? "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-gray-800 text-white"
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white text-gray-900"
        } ${icon ? "pl-10" : ""}`}
        whileFocus={{ scale: 1.01 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </motion.select>
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ${
          icon ? "pt-7" : "pt-0"
        }`}
      >
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {helperText && (
        <p
          className={`mt-1.5 text-sm ${
            error
              ? "text-red-600"
              : darkMode
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Komponen Checkbox untuk wizard
const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
  icon,
}) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <motion.div
      className={`flex items-start mb-5 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`w-4 h-4 rounded focus:ring-2 transition-colors duration-200 ${
            darkMode
              ? "bg-gray-700 border-gray-600 focus:ring-blue-500 text-blue-500"
              : "bg-gray-100 border-gray-300 focus:ring-blue-500 text-blue-600"
          }`}
        />
      </div>
      {label && (
        <label
          className={`ml-3 text-sm flex items-center gap-1.5 ${
            darkMode ? "text-gray-300" : "text-gray-900"
          }`}
        >
          {icon && <span className="text-lg">{icon}</span>}
          {label}
        </label>
      )}
    </motion.div>
  );
};

// Komponen Wizard utama
const Wizard = ({ steps, onComplete, className = "" }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const validateStep = () => {
    const currentStepConfig = steps[currentStep];
    const stepErrors = {};

    currentStepConfig.fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        stepErrors[field.name] = `${field.label} is required`;
      }
    });

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onComplete(formData);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const currentStepConfig = steps[currentStep];

  return (
    <div className={`w-full ${className}`}>
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <span
            className={`text-sm font-medium ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Step {currentStep + 1} of {steps.length}
          </span>
          <span
            className={`text-sm font-medium ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            {currentStepConfig.title}
          </span>
        </div>
        <div
          className={`w-full h-2.5 rounded-full ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          } overflow-hidden`}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mt-4 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center relative z-10"
            >
              <motion.div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium transition-all duration-300 ${
                  index <= currentStep
                    ? "bg-blue-500 border-blue-500 text-white"
                    : darkMode
                    ? "border-gray-600 text-gray-400"
                    : "border-gray-300 text-gray-400"
                }`}
                whileHover={{ scale: index <= currentStep ? 1.1 : 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {index < currentStep ? (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </motion.div>
              <span
                className={`text-xs mt-1.5 text-center max-w-20 truncate ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
          <div
            className={`absolute top-4 left-0 right-0 h-0.5 -z-10 ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2
            className={`text-2xl font-bold mb-3 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {currentStepConfig.title}
          </h2>
          <p
            className={`mb-6 text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {currentStepConfig.description}
          </p>

          <div className="space-y-5">
            {currentStepConfig.fields.map((field, index) => {
              const commonProps = {
                key: field.name,
                label: field.label,
                value: formData[field.name] || "",
                onChange: (e) => handleInputChange(field.name, e.target.value),
                error: errors[field.name],
                helperText: field.helperText,
                required: field.required,
                disabled: field.disabled,
                icon: field.icon,
              };

              switch (field.type) {
                case "select":
                  return <Select {...commonProps} options={field.options} />;
                case "checkbox":
                  return (
                    <Checkbox
                      {...commonProps}
                      checked={!!formData[field.name]}
                      onChange={(e) =>
                        handleInputChange(field.name, e.target.checked)
                      }
                    />
                  );
                default:
                  return <Input {...commonProps} type={field.type} />;
              }
            })}
          </div>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
        <motion.button
          onClick={handlePrevious}
          disabled={isFirstStep}
          className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
            isFirstStep
              ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
              : darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
          whileHover={!isFirstStep ? { scale: 1.03 } : {}}
          whileTap={!isFirstStep ? { scale: 0.97 } : {}}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </motion.button>

        {isLastStep ? (
          <motion.button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Complete
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </>
            )}
          </motion.button>
        ) : (
          <motion.button
            onClick={handleNext}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Next
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        )}
      </div>
    </div>
  );
};

// Komponen untuk contoh penggunaan wizard
const WizardExample = ({
  title,
  description,
  children,
  code,
  darkMode,
  tags,
}) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } mb-8 shadow-lg border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      } hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
            <div className="flex gap-1">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`text-xs px-2 py-1 rounded-full ${
                    darkMode
                      ? "bg-blue-900/30 text-blue-300"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
            {description}
          </p>
        </div>
        <div className="flex gap-2">
          <motion.button
            onClick={copyCode}
            className={`p-2.5 rounded-xl ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Copy code"
          >
            {copied ? (
              <svg
                className="w-4 h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </motion.button>
          <motion.button
            onClick={() => setIsCodeVisible(!isCodeVisible)}
            className={`px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isCodeVisible ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
                Hide Code
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                Show Code
              </>
            )}
          </motion.button>
        </div>
      </div>

      <div className="mb-6">{children}</div>

      <AnimatePresence>
        {isCodeVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <div
              className={`rounded-xl p-4 ${
                darkMode
                  ? "bg-gray-900 text-gray-200"
                  : "bg-gray-100 text-gray-800"
              } overflow-x-auto`}
            >
              <pre className="text-sm font-mono">{code}</pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Tab Component untuk navigasi
const Tab = ({ active, onClick, children, count }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <motion.button
      onClick={onClick}
      className={`px-5 py-2.5 font-medium rounded-lg flex items-center gap-2 transition-colors relative ${
        active
          ? darkMode
            ? "bg-blue-600 text-white"
            : "bg-blue-100 text-blue-700"
          : darkMode
          ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
      {count !== undefined && (
        <span
          className={`text-xs px-1.5 py-0.5 rounded-full ${
            active
              ? darkMode
                ? "bg-blue-700"
                : "bg-blue-200"
              : darkMode
              ? "bg-gray-600"
              : "bg-gray-200"
          }`}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
};

export default function WizardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Contoh konfigurasi wizard steps dengan ikon
  const registrationSteps = [
    {
      title: "Personal Information",
      description: "Please provide your basic information",
      fields: [
        {
          name: "firstName",
          label: "First Name",
          type: "text",
          required: true,
          icon: "👤",
        },
        {
          name: "lastName",
          label: "Last Name",
          type: "text",
          required: true,
        },
        {
          name: "email",
          label: "Email Address",
          type: "email",
          required: true,
          helperText: "We'll never share your email with anyone else",
          icon: "✉️",
        },
      ],
    },
    {
      title: "Account Details",
      description: "Set up your account credentials",
      fields: [
        {
          name: "username",
          label: "Username",
          type: "text",
          required: true,
          icon: "🔐",
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          required: true,
          helperText:
            "Use at least 8 characters with a mix of letters and numbers",
        },
        {
          name: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          required: true,
        },
      ],
    },
    {
      title: "Preferences",
      description: "Tell us about your preferences",
      fields: [
        {
          name: "newsletter",
          label: "Subscribe to newsletter",
          type: "checkbox",
          icon: "📰",
        },
        {
          name: "notifications",
          label: "Enable notifications",
          type: "checkbox",
          icon: "🔔",
        },
        {
          name: "theme",
          label: "Preferred Theme",
          type: "select",
          options: [
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
            { value: "auto", label: "Auto (System Default)" },
          ],
          icon: "🎨",
        },
      ],
    },
    {
      title: "Confirmation",
      description: "Review your information and complete registration",
      fields: [
        {
          name: "terms",
          label: "I agree to the terms and conditions",
          type: "checkbox",
          required: true,
          icon: "📝",
        },
      ],
    },
  ];

  const checkoutSteps = [
    {
      title: "Shipping Information",
      description: "Where should we deliver your order?",
      fields: [
        {
          name: "fullName",
          label: "Full Name",
          type: "text",
          required: true,
          icon: "👤",
        },
        {
          name: "address",
          label: "Shipping Address",
          type: "text",
          required: true,
          icon: "🏠",
        },
        {
          name: "city",
          label: "City",
          type: "text",
          required: true,
          icon: "🏙️",
        },
        {
          name: "zipCode",
          label: "ZIP Code",
          type: "text",
          required: true,
          icon: "📮",
        },
        {
          name: "country",
          label: "Country",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select a country" },
            { value: "us", label: "United States" },
            { value: "ca", label: "Canada" },
            { value: "uk", label: "United Kingdom" },
            { value: "au", label: "Australia" },
          ],
          icon: "🌎",
        },
      ],
    },
    {
      title: "Payment Method",
      description: "How would you like to pay?",
      fields: [
        {
          name: "paymentMethod",
          label: "Payment Method",
          type: "select",
          required: true,
          options: [
            { value: "", label: "Select a payment method" },
            { value: "credit", label: "Credit Card" },
            { value: "paypal", label: "PayPal" },
            { value: "bank", label: "Bank Transfer" },
          ],
          icon: "💳",
        },
        {
          name: "cardNumber",
          label: "Card Number",
          type: "text",
          required: true,
          helperText: "Enter your 16-digit card number",
        },
        {
          name: "expiry",
          label: "Expiry Date",
          type: "text",
          required: true,
          helperText: "MM/YY format",
        },
        {
          name: "cvv",
          label: "CVV",
          type: "text",
          required: true,
          helperText: "3-digit security code",
        },
      ],
    },
    {
      title: "Review Order",
      description: "Please review your order before completing the purchase",
      fields: [
        {
          name: "notes",
          label: "Order Notes",
          type: "text",
          helperText: "Special instructions for your order",
          icon: "📝",
        },
        {
          name: "gift",
          label: "This is a gift",
          type: "checkbox",
          icon: "🎁",
        },
      ],
    },
  ];

  const handleWizardComplete = (data) => {
    console.log("Wizard completed with data:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  // Filter wizards berdasarkan tab aktif
  const wizards = [
    {
      id: "registration",
      title: "Registration Wizard",
      description:
        "A multi-step registration form with personal information, account details, and preferences.",
      code: `// Code for registration wizard...`,
      content: (
        <Wizard steps={registrationSteps} onComplete={handleWizardComplete} />
      ),
      category: "forms",
      tags: ["Registration", "Multi-step"],
    },
    {
      id: "checkout",
      title: "Checkout Wizard",
      description:
        "A multi-step checkout process with shipping information and payment details.",
      code: `// Code for checkout wizard...`,
      content: (
        <Wizard steps={checkoutSteps} onComplete={handleWizardComplete} />
      ),
      category: "ecommerce",
      tags: ["E-commerce", "Checkout"],
    },
  ];

  const filteredWizards = wizards.filter((wizard) => {
    const matchesTab = activeTab === "all" || wizard.category === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      wizard.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wizard.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wizard.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesTab && matchesSearch;
  });

  const getTabCount = (tab) => {
    if (tab === "all") return wizards.length;
    return wizards.filter((wizard) => wizard.category === tab).length;
  };

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
          <div className="max-w-4xl mx-auto px-6">
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
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center p-2 mb-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5h6a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2zm5 4h-4m2 4h-2m4 4h-4"
                  />
                </svg>
              </motion.div>
              <h1
                className={`text-5xl font-bold mb-4 bg-gradient-to-r ${
                  darkMode
                    ? "from-blue-400 to-purple-400"
                    : "from-blue-600 to-purple-600"
                } bg-clip-text text-transparent`}
              >
                Form Wizard Components
              </h1>
              <p
                className={`text-xl max-w-3xl mx-auto ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Multi-step form wizards with progress indicators and validation.
                Simplify complex forms with our intuitive wizard components.
              </p>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`mb-8 p-6 rounded-2xl sticky top-24 z-10 ${
                isScrolled ? "shadow-lg backdrop-blur-sm bg-opacity-90 " : ""
              } ${
                darkMode
                  ? "bg-gray-800/90 border-gray-700"
                  : "bg-white/90 border-gray-200"
              } border transition-all duration-300`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <Tab
                    active={activeTab === "all"}
                    onClick={() => setActiveTab("all")}
                    count={getTabCount("all")}
                  >
                    All Wizards
                  </Tab>
                  <Tab
                    active={activeTab === "forms"}
                    onClick={() => setActiveTab("forms")}
                    count={getTabCount("forms")}
                  >
                    Forms
                  </Tab>
                  <Tab
                    active={activeTab === "ecommerce"}
                    onClick={() => setActiveTab("ecommerce")}
                    count={getTabCount("ecommerce")}
                  >
                    E-commerce
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
                    placeholder="Search wizards..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2.5 rounded-xl border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 transition-colors duration-200 w-full md:w-64`}
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
                Found {filteredWizards.length} wizard
                {filteredWizards.length !== 1 ? "s" : ""} matching "
                {searchQuery}"
              </motion.p>
            )}

            <div className="grid grid-cols-1 gap-8">
              {filteredWizards.length > 0 ? (
                filteredWizards.map((wizard, index) => (
                  <motion.div
                    key={wizard.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <WizardExample
                      title={wizard.title}
                      description={wizard.description}
                      code={wizard.code}
                      darkMode={darkMode}
                      tags={wizard.tags}
                    >
                      {wizard.content}
                    </WizardExample>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center py-16 rounded-2xl ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-lg border ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
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
                    No wizards found
                  </h3>
                  <p
                    className={`mt-2 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                  <motion.button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveTab("all");
                    }}
                    className={`mt-4 px-4 py-2 rounded-lg font-medium ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear Filters
                  </motion.button>
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
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2.5 rounded-full ${
                    darkMode ? "bg-blue-900/20" : "bg-blue-100"
                  } text-blue-500`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  How to Use These Wizards
                </h2>
              </div>

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
                  Copy the Wizard component and its dependencies into your
                  project.
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
                    <pre className="text-sm font-mono">{`import { Wizard } from '@/components/Wizard';

// Define your steps
const steps = [
  {
    title: "Step 1",
    description: "Description for step 1",
    fields: [
      {
        name: "field1",
        label: "Field 1",
        type: "text",
        required: true,
      },
      // More fields...
    ],
  },
  // More steps...
];

// Handle completion
const handleComplete = (data) => {
  console.log("Form data:", data);
  // Process the data
};

// Use the wizard
<Wizard 
  steps={steps} 
  onComplete={handleComplete}
/>`}</pre>
                  </div>
                </div>

                <h3
                  className={`mt-6 ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Field Types
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
                          Type
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Description
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Example
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        <td className="px-4 py-3 font-mono text-sm">text</td>
                        <td className="px-4 py-3 text-sm">
                          Standard text input
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <code>{`{ type: "text", name: "firstName", label: "First Name" }`}</code>
                        </td>
                      </tr>
                      <tr
                        className={`${
                          darkMode
                            ? "bg-gray-800 text-gray-300"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        <td className="px-4 py-3 font-mono text-sm">email</td>
                        <td className="px-4 py-3 text-sm">
                          Email input with validation
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <code>{`{ type: "email", name: "email", label: "Email" }`}</code>
                        </td>
                      </tr>
                      <tr
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        <td className="px-4 py-3 font-mono text-sm">
                          password
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Password input (masked)
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <code>{`{ type: "password", name: "password", label: "Password" }`}</code>
                        </td>
                      </tr>
                      <tr
                        className={`${
                          darkMode
                            ? "bg-gray-800 text-gray-300"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        <td className="px-4 py-3 font-mono text-sm">select</td>
                        <td className="px-4 py-3 text-sm">
                          Dropdown select with options
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <code>{`{ type: "select", name: "country", label: "Country", options: [{ value: "us", label: "USA" }] }`}</code>
                        </td>
                      </tr>
                      <tr
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        <td className="px-4 py-3 font-mono text-sm">
                          checkbox
                        </td>
                        <td className="px-4 py-3 text-sm">
                          Checkbox for boolean values
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <code>{`{ type: "checkbox", name: "newsletter", label: "Subscribe to newsletter" }`}</code>
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
