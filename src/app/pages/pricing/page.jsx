// src/app/pricing/page.jsx
"use client";

import { useRef, useContext, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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

// Komponen untuk Feature Tooltip
const FeatureTooltip = ({ feature, description, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center cursor-help"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
          {feature}
        </span>
        <svg
          className={`w-4 h-4 ml-1 ${
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
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-0 bottom-full mb-2 w-48 p-3 rounded-lg shadow-lg z-10 ${
              darkMode
                ? "bg-gray-700 text-gray-200"
                : "bg-white text-gray-800 border border-gray-200"
            }`}
          >
            <p className="text-sm">{description}</p>
            <div
              className={`absolute top-full left-4 border-4 border-transparent ${
                darkMode ? "border-t-gray-700" : "border-t-white"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Komponen untuk Pricing Card
const PricingCard = ({
  darkMode,
  plan,
  price,
  period,
  description,
  features,
  featureDescriptions = {},
  isPopular = false,
  onSelect,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedCard>
      <motion.div
        className={`rounded-xl p-8 shadow-lg transition-all duration-300 relative overflow-hidden ${
          darkMode
            ? isPopular
              ? "bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 border-2 border-blue-500"
              : "bg-gray-800 hover:bg-gray-750 border border-gray-700"
            : isPopular
            ? "bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 border-2 border-blue-400"
            : "bg-white hover:bg-gray-50 border border-gray-200"
        }`}
        whileHover={{
          y: -10,
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                darkMode
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              Most Popular
            </motion.span>
          </div>
        )}

        {/* Animated background element */}
        {isPopular && (
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-500 opacity-10"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        <div className="relative z-10">
          <div className="text-center mb-6">
            <h3
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {plan}
            </h3>
            <div className="my-4">
              <span
                className={`text-4xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                ${price}
              </span>
              <span
                className={`text-lg ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                /{period}
              </span>
            </div>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {description}
            </p>
          </div>

          <div className="mb-6">
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <motion.svg
                    className={`w-5 h-5 mr-3 ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                  {featureDescriptions[feature] ? (
                    <FeatureTooltip
                      feature={feature}
                      description={featureDescriptions[feature]}
                      darkMode={darkMode}
                    />
                  ) : (
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-700"}
                    >
                      {feature}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <motion.button
            onClick={() => onSelect(plan)}
            className={`w-full py-3 rounded-lg font-medium relative overflow-hidden ${
              isPopular
                ? darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
                : darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">
              {isPopular ? "Get Started" : "Choose Plan"}
            </span>
            {isHovered && (
              <motion.span
                className="absolute inset-0 bg-white bg-opacity-20"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            )}
          </motion.button>
        </div>
      </motion.div>
    </AnimatedCard>
  );
};

// Komponen untuk FAQ
const FAQ = ({ darkMode }) => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  const faqItems = [
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and applied to your next billing cycle.",
    },
    {
      question: "Do you offer discounts for non-profits?",
      answer:
        "Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "No, there are no setup fees for any of our plans. You only pay the monthly or annual subscription fee.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees.",
    },
    {
      question: "Do you offer custom plans?",
      answer:
        "Yes, we offer custom enterprise plans for large organizations with specific needs. Contact our sales team to discuss your requirements.",
    },
  ];

  return (
    <div
      className={`rounded-xl p-8 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2
        className={`text-2xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            className={`rounded-lg overflow-hidden ${
              darkMode ? "bg-gray-750" : "bg-gray-50"
            }`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => toggleItem(index)}
              className={`w-full px-6 py-4 text-left flex justify-between items-center ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="font-medium">{item.question}</span>
              <motion.svg
                className={`w-5 h-5 transition-transform ${
                  openItems.includes(index) ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>

            <AnimatePresence>
              {openItems.includes(index) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`px-6 pb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Komponen untuk Testimonials
const Testimonials = ({ darkMode }) => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp Inc.",
      content:
        "The Pro plan has transformed how our marketing team operates. We've seen a 40% increase in efficiency since switching.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      company: "StartUp Ventures",
      content:
        "The value we get from the Business plan is incredible. The features have helped us scale without increasing our team size.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Emily Rodriguez",
      role: "Freelancer",
      company: "Creative Solutions",
      content:
        "As a freelancer, the Starter plan gives me everything I need at an affordable price. It's perfect for my business needs.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  return (
    <div
      className={`rounded-xl p-8 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2
        className={`text-2xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        What Our Customers Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-lg ${
              darkMode ? "bg-gray-750" : "bg-gray-50"
            }`}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <div className="flex items-center mb-4">
              <motion.img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
              <div className="ml-4">
                <h4
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {testimonial.name}
                </h4>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              {testimonial.content}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Komponen untuk Billing Toggle
const BillingToggle = ({ darkMode, isAnnual, setIsAnnual }) => {
  return (
    <div className="flex justify-center items-center mb-12">
      <span className={`mr-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        Monthly
      </span>
      <button
        onClick={() => setIsAnnual(!isAnnual)}
        className={`relative inline-flex h-7 w-14 items-center rounded-full ${
          isAnnual
            ? darkMode
              ? "bg-blue-600"
              : "bg-blue-600"
            : darkMode
            ? "bg-gray-600"
            : "bg-gray-300"
        }`}
      >
        <span className="sr-only">Toggle billing</span>
        <motion.span
          className={`inline-block h-5 w-5 rounded-full bg-white`}
          animate={{
            x: isAnnual ? 32 : 4,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      <span className={`ml-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        Annual
        <span
          className={`ml-2 px-2 py-1 rounded-full text-xs ${
            darkMode
              ? "bg-green-800 text-green-200"
              : "bg-green-100 text-green-800"
          }`}
        >
          Save 20%
        </span>
      </span>
    </div>
  );
};

// Komponen Modal
const PlanModal = ({ darkMode, selectedPlan, onClose, isAnnual }) => {
  if (!selectedPlan) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className={`rounded-xl p-8 max-w-md w-full ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Confirm Your Selection
            </h3>
            <button
              onClick={onClose}
              className={`rounded-full p-2 ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div
            className={`rounded-lg p-4 mb-6 ${
              darkMode ? "bg-gray-750" : "bg-gray-100"
            }`}
          >
            <h4
              className={`text-lg font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {selectedPlan} Plan
            </h4>
            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              You've selected the {selectedPlan} plan at{" "}
              {selectedPlan === "Starter"
                ? isAnnual
                  ? "$15/year"
                  : "$19/month"
                : selectedPlan === "Professional"
                ? isAnnual
                  ? "$39/year"
                  : "$49/month"
                : isAnnual
                ? "$79/year"
                : "$99/month"}
              .
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className={`flex-1 py-3 rounded-lg font-medium ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log(`Proceeding with ${selectedPlan} plan`);
                onClose();
              }}
              className={`flex-1 py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white`}
            >
              Continue
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function PricingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
    console.log(`Selected plan: ${plan}`);
  };

  // Pricing data
  const pricingPlans = [
    {
      plan: "Starter",
      monthlyPrice: 19,
      annualPrice: 15,
      description: "Perfect for individuals and small teams",
      features: [
        "Up to 5 projects",
        "10GB storage",
        "Basic analytics",
        "Email support",
        "1 user included",
      ],
      featureDescriptions: {
        "Basic analytics":
          "Track basic metrics like page views and user engagement",
        "Email support": "Get help via email with 48-hour response time",
      },
    },
    {
      plan: "Professional",
      monthlyPrice: 49,
      annualPrice: 39,
      description: "Ideal for growing businesses",
      features: [
        "Unlimited projects",
        "50GB storage",
        "Advanced analytics",
        "Priority support",
        "5 users included",
        "API access",
        "Custom domains",
      ],
      isPopular: true,
      featureDescriptions: {
        "Advanced analytics":
          "Detailed analytics with custom reports and export options",
        "Priority support":
          "24-hour response time with dedicated support agent",
        "API access": "Full access to our REST API for custom integrations",
      },
    },
    {
      plan: "Enterprise",
      monthlyPrice: 99,
      annualPrice: 79,
      description: "For large organizations with complex needs",
      features: [
        "Unlimited projects",
        "500GB storage",
        "Advanced analytics",
        "24/7 dedicated support",
        "Unlimited users",
        "API access",
        "Custom domains",
        "SSO integration",
        "Advanced security",
        "Custom reporting",
      ],
      featureDescriptions: {
        "24/7 dedicated support":
          "Round-the-clock support with a dedicated account manager",
        "SSO integration":
          "Single sign-on integration with your existing identity provider",
        "Advanced security": "Enterprise-grade security with SOC 2 compliance",
      },
    },
  ];

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
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1
                className={`text-4xl md:text-5xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Simple, Transparent Pricing
              </h1>
              <p
                className={`text-xl max-w-2xl mx-auto ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Choose the plan that works best for you and your team
              </p>
            </motion.div>

            {/* Billing Toggle */}
            <AnimatedSection className="mb-12">
              <BillingToggle
                darkMode={darkMode}
                isAnnual={isAnnual}
                setIsAnnual={setIsAnnual}
              />
            </AnimatedSection>

            {/* Pricing Cards */}
            <AnimatedSection className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
                  <PricingCard
                    key={index}
                    darkMode={darkMode}
                    plan={plan.plan}
                    price={isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    period={isAnnual ? "year" : "month"}
                    description={plan.description}
                    features={plan.features}
                    featureDescriptions={plan.featureDescriptions || {}}
                    isPopular={plan.isPopular}
                    onSelect={handleSelectPlan}
                  />
                ))}
              </div>
            </AnimatedSection>

            {/* Comparison Chart */}
            <AnimatedSection className="mb-16">
              <div
                className={`rounded-xl p-8 shadow-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2
                  className={`text-2xl font-bold text-center mb-8 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Plan Comparison
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th
                          className={`text-left py-4 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          Feature
                        </th>
                        <th
                          className={`text-center py-4 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          Starter
                        </th>
                        <th
                          className={`text-center py-4 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          Professional
                        </th>
                        <th
                          className={`text-center py-4 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          Enterprise
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        className={
                          darkMode
                            ? "border-b border-gray-700"
                            : "border-b border-gray-200"
                        }
                      >
                        <td
                          className={`py-4 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Number of Projects
                        </td>
                        <td className="text-center py-4">5</td>
                        <td className="text-center py-4">Unlimited</td>
                        <td className="text-center py-4">Unlimited</td>
                      </tr>
                      <tr
                        className={
                          darkMode
                            ? "border-b border-gray-700"
                            : "border-b border-gray-200"
                        }
                      >
                        <td
                          className={`py-4 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Storage
                        </td>
                        <td className="text-center py-4">10GB</td>
                        <td className="text-center py-4">50GB</td>
                        <td className="text-center py-4">500GB</td>
                      </tr>
                      <tr
                        className={
                          darkMode
                            ? "border-b border-gray-700"
                            : "border-b border-gray-200"
                        }
                      >
                        <td
                          className={`py-4 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Support
                        </td>
                        <td className="text-center py-4">Email</td>
                        <td className="text-center py-4">Priority</td>
                        <td className="text-center py-4">24/7 Dedicated</td>
                      </tr>
                      <tr
                        className={
                          darkMode
                            ? "border-b border-gray-700"
                            : "border-b border-gray-200"
                        }
                      >
                        <td
                          className={`py-4 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Users
                        </td>
                        <td className="text-center py-4">1</td>
                        <td className="text-center py-4">5</td>
                        <td className="text-center py-4">Unlimited</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedSection>

            {/* Testimonials */}
            <AnimatedSection className="mb-16">
              <Testimonials darkMode={darkMode} />
            </AnimatedSection>

            {/* FAQ */}
            <AnimatedSection className="mb-6">
              <FAQ darkMode={darkMode} />
            </AnimatedSection>
          </div>
        </main>

        <div className="relative z-10 mt-auto">
          <Footer darkMode={darkMode} />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <PlanModal
          darkMode={darkMode}
          selectedPlan={selectedPlan}
          onClose={() => setShowModal(false)}
          isAnnual={isAnnual}
        />
      )}
    </div>
  );
}
