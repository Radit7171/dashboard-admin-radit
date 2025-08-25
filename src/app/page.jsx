"use client";

import { useRef, useEffect, useState, useContext } from "react";
import { motion, useInView } from "framer-motion";
import DashboardHeader from "./components/Dashboard/DashboardHeader";
import StorageCard from "./components/Dashboard/StorageCard";
import GrowthCard from "./components/Dashboard/GrowthCard";
import StatsCardGroup from "./components/Dashboard/StatsCardGroup";
import DashboardWidgets from "./components/Dashboard/DashboardWidgets";
import AnalyticsRow from "./components/Dashboard/DashboardAnalytics";
import ProductSummaryTable from "./components/Dashboard/ProductSummaryTable";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/DashboardFooter";
import DarkModeContex from "./DarkModeContext";

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

// Komponen AnimatedSection untuk mengamati ketika section masuk/keluar viewport
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

// Komponen AnimatedCard untuk kartu individual
const AnimatedCard = ({ children }) => {
  return <motion.div variants={itemVariants}>{children}</motion.div>;
};

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContex);

  const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Sidebar open={sidebarOpen} darkMode={darkMode} />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 min-h-screen ${
          sidebarOpen ? "ml-64" : "ml-0"
        } ${darkMode ? "" : "bg-white"}`}
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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DashboardHeader sidebarOpen={sidebarOpen} darkMode={darkMode} />
            </motion.div>

            <AnimatedSection className="m-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                <AnimatedCard>
                  <StorageCard name="Radit" usage={75} total={100} />
                </AnimatedCard>
                <AnimatedCard>
                  <GrowthCard />
                </AnimatedCard>
              </div>
            </AnimatedSection>

            <AnimatedSection className="m-5">
              <StatsCardGroup />
            </AnimatedSection>
            <AnimatedSection className="m-5">
              <AnalyticsRow />
            </AnimatedSection>
            <AnimatedSection className="m-5">
              <DashboardWidgets />
            </AnimatedSection>
            <AnimatedSection className="m-5">
              <ProductSummaryTable />
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
