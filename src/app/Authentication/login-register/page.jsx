// src/app/login/page.jsx
"use client";

import { useState, useContext, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import DarkModeContext from "@/app/DarkModeContext";

// Animasi varians
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1,
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
};

// Floating Particles Background
const FloatingParticles = ({ darkMode }) => {
  const particlesRef = useRef(null);

  useEffect(() => {
    if (!particlesRef.current) return;

    const particles = particlesRef.current;
    const count = 50;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.classList.add("absolute", "rounded-full");
      particle.style.width = `${Math.random() * 10 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.background = darkMode
        ? `rgba(59, 130, 246, ${Math.random() * 0.3})`
        : `rgba(59, 130, 246, ${Math.random() * 0.2})`;
      particle.style.opacity = `${Math.random() * 0.7 + 0.1}`;

      particles.appendChild(particle);
    }

    return () => {
      particles.innerHTML = "";
    };
  }, [darkMode]);

  return (
    <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />
  );
};

// Password Strength Indicator
const PasswordStrength = ({ password }) => {
  if (!password) return null;

  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length > 5) strength++;
    if (pass.length > 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const strength = getStrength(password);
  const strengthText = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Very Strong",
  ][strength];
  const strengthColor = [
    "bg-red-500",
    "bg-red-400",
    "bg-yellow-500",
    "bg-yellow-400",
    "bg-green-500",
    "bg-green-400",
  ][strength];

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Password strength:
        </span>
        <span
          className={`text-xs font-medium ${strengthColor.replace(
            "bg-",
            "text-"
          )}`}
        >
          {strengthText}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
        <div
          className={`h-1.5 rounded-full ${strengthColor}`}
          style={{ width: `${(strength / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

// Toggle Password Visibility Component
const PasswordToggle = ({ isVisible, toggleVisibility, darkMode }) => (
  <button
    type="button"
    onClick={toggleVisibility}
    className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
      darkMode ? "text-gray-400" : "text-gray-500"
    }`}
  >
    {isVisible ? (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
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
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ) : (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
        />
      </svg>
    )}
  </button>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulasi proses login
    try {
      // Delay untuk simulasi request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Validasi sederhana
      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }

      // Simulasi login berhasil
      console.log("Login attempted with:", { email, password, rememberMe });

      // Redirect ke dashboard setelah login berhasil
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Di aplikasi nyata, ini akan mengarahkan ke provider OAuth
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        {/* Background dengan gradient dan particles */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div
            className={`absolute inset-0 ${
              darkMode
                ? "bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"
                : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
            }`}
          ></div>
          <FloatingParticles darkMode={darkMode} />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-md w-full space-y-8 z-10"
        >
          {/* Card Container */}
          <motion.div
            variants={itemVariants}
            className={`rounded-2xl shadow-xl overflow-hidden ${
              darkMode
                ? "bg-gray-800/90 backdrop-blur-md"
                : "bg-white/90 backdrop-blur-md"
            }`}
          >
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === "login"
                    ? darkMode
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-blue-600 border-b-2 border-blue-600"
                    : darkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === "signup"
                    ? darkMode
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-blue-600 border-b-2 border-blue-600"
                    : darkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="px-8 py-6">
              {/* Logo dan Judul */}
              <motion.div variants={itemVariants} className="text-center mb-6">
                <div className="flex justify-center">
                  <motion.div
                    className={`rounded-2xl p-4 ${
                      darkMode ? "bg-blue-900/30" : "bg-blue-100"
                    }`}
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <svg
                      className={`w-12 h-12 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </motion.div>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                  {activeTab === "login" ? "Welcome back" : "Create an account"}
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {activeTab === "login"
                    ? "Sign in to your account to continue"
                    : "Join us today and get started"}
                </p>
              </motion.div>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className={`appearance-none relative block w-full px-4 py-3 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      } focus:outline-none focus:z-10 sm:text-sm`}
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className={`appearance-none relative block w-full px-4 py-3 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      } focus:outline-none focus:z-10 sm:text-sm`}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <PasswordToggle
                      isVisible={passwordVisible}
                      toggleVisibility={togglePasswordVisibility}
                      darkMode={darkMode}
                    />
                  </div>
                  {activeTab === "signup" && (
                    <PasswordStrength password={password} />
                  )}
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className={`rounded-md p-3 text-sm ${
                        darkMode
                          ? "bg-red-900/30 text-red-300"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      <div className="flex items-center">
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
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {error}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {activeTab === "login" && (
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className={`h-4 w-4 rounded focus:ring-blue-500 ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-blue-500"
                            : "bg-white border-gray-300 text-blue-600"
                        }`}
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label
                        htmlFor="remember-me"
                        className={`ml-2 block text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-900"
                        }`}
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <button
                        type="button"
                        onClick={() => console.log("Forgot password clicked")}
                        className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === "signup" && (
                  <motion.div variants={itemVariants} className="text-sm">
                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                      By signing up, you agree to our{" "}
                      <button
                        type="button"
                        className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Privacy Policy
                      </button>
                      .
                    </p>
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    } ${
                      darkMode
                        ? "focus:ring-offset-gray-800"
                        : "focus:ring-offset-white"
                    }`}
                    whileHover={isLoading ? {} : { scale: 1.02 }}
                    whileTap={isLoading ? {} : { scale: 0.98 }}
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    ) : null}
                    <span>
                      {isLoading
                        ? "Processing..."
                        : activeTab === "login"
                        ? "Sign in"
                        : "Create account"}
                    </span>
                  </motion.button>
                </motion.div>
              </form>

              {/* Social Login Options */}
              <motion.div variants={itemVariants} className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div
                      className={`w-full border-t ${
                        darkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                    ></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span
                      className={`px-2 ${
                        darkMode
                          ? "bg-gray-800 text-gray-400"
                          : "bg-white text-gray-500"
                      }`}
                    >
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    {
                      name: "Google",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                        </svg>
                      ),
                      color: darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300 border-gray-600"
                        : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300",
                    },
                    {
                      name: "GitHub",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      ),
                      color: darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300 border-gray-600"
                        : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300",
                    },
                    {
                      name: "Twitter",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      ),
                      color: darkMode
                        ? "bg-blue-500 hover:bg-blue-600 text-white border-blue-500"
                        : "bg-blue-500 hover:bg-blue-600 text-white border-blue-500",
                    },
                  ].map((provider, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleSocialLogin(provider.name)}
                      className={`inline-flex justify-center py-2 px-2 border rounded-md shadow-sm text-sm font-medium ${provider.color}`}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      {provider.icon}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className={`mt-6 text-center text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {activeTab === "login" ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("signup")}
                      className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("login")}
                      className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Dark Mode Toggle */}
          <motion.div
            variants={itemVariants}
            className="absolute top-4 right-4"
          >
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-full shadow-lg ${
                darkMode
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Toggle dark mode"
              whileHover={{ rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? (
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
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
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
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
