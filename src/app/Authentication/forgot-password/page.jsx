// src/app/forgot-password/page.jsx
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
    const count = 40;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.classList.add("absolute", "rounded-full");
      particle.style.width = `${Math.random() * 8 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.background = darkMode
        ? `rgba(96, 165, 250, ${Math.random() * 0.3})`
        : `rgba(59, 130, 246, ${Math.random() * 0.2})`;
      particle.style.opacity = `${Math.random() * 0.7 + 0.1}`;

      // Add animation
      particle.style.animation = `floatParticle ${
        Math.random() * 10 + 10
      }s infinite ease-in-out`;
      particle.style.animationDelay = `${Math.random() * 5}s`;

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

// Animated Checkmark for Success
const AnimatedCheckmark = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="flex justify-center mb-4"
    >
      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
        <motion.svg
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
          className="w-10 h-10 text-green-500 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </motion.svg>
      </div>
    </motion.div>
  );
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulasi proses reset password
    try {
      // Delay untuk simulasi request
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Validasi sederhana
      if (!email) {
        throw new Error("Please enter your email address");
      }

      // Validasi format email sederhana
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      // Simulasi pengiriman email berhasil
      console.log("Password reset requested for:", email);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
            <div className="px-8 py-8">
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
                  Reset your password
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Enter your email address and we'll send you a link to reset
                  your password
                </p>
              </motion.div>

              {success ? (
                /* Success Message */
                <motion.div
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <AnimatedCheckmark />

                  <h3
                    className={`text-lg font-medium mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Check your email
                  </h3>
                  <p
                    className={`mb-6 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    We've sent a password reset link to
                    <br />
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {email}
                    </span>
                  </p>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                    <p
                      className={`text-sm ${
                        darkMode ? "text-blue-300" : "text-blue-700"
                      }`}
                    >
                      <span className="font-medium">
                        Didn't receive the email?
                      </span>{" "}
                      Check your spam folder or resend the link.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <motion.button
                      onClick={() => setSuccess(false)}
                      className={`py-3 px-4 rounded-lg font-medium ${
                        darkMode
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Resend email
                    </motion.button>

                    <motion.button
                      onClick={() => router.push("/Authentication/login-register")}
                      className={`py-3 px-4 rounded-lg font-medium ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Return to sign in
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                /* Form Reset Password */
                <motion.div variants={itemVariants}>
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
                          placeholder="Enter your email address"
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

                    {/* Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -10, height: 0 }}
                          className={`rounded-md p-3 text-sm flex items-center ${
                            darkMode
                              ? "bg-red-900/30 text-red-300"
                              : "bg-red-50 text-red-700"
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
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

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
                          <>
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
                                strokeWidth={4}
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          "Send reset link"
                        )}
                      </motion.button>
                    </motion.div>
                  </form>

                  <motion.div
                    variants={itemVariants}
                    className={`mt-6 text-center text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Remember your password?{" "}
                    <button
                      onClick={() => router.push("/Authentication/login-register")}
                      className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Sign in
                    </button>
                  </motion.div>
                </motion.div>
              )}
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

        {/* Tambahkan style untuk animasi particles */}
        <style jsx>{`
          @keyframes floatParticle {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            25% {
              transform: translateY(-20px) translateX(10px);
            }
            50% {
              transform: translateY(-10px) translateX(20px);
            }
            75% {
              transform: translateY(10px) translateX(10px);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
