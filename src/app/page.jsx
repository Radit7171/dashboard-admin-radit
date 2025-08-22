"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DashboardHeader from "./components/Dashboard/DashboardHeader";
import StorageCard from "./components/Dashboard/StorageCard";
import GrowthCard from "./components/Dashboard/GrowthCard";
import StatsCardGroup from "./components/Dashboard/StatsCardGroup";
import DashboardWidgets from "./components/Dashboard/DashboardWidgets";
import AnalyticsRow from "./components/Dashboard/DashboardAnalytics";
import ProductSummaryTable from "./components/Dashboard/ProductSummaryTable";

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

export default function DashboardPage({ sidebarOpen, darkMode }) {
  return (
    <div className={sidebarOpen ? "ml-64" : ""}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DashboardHeader sidebarOpen={sidebarOpen} darkMode={darkMode} />
      </motion.div>

      {/* Cards (Storage + Growth) */}
      <AnimatedSection className="m-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <AnimatedCard>
            <StorageCard
              name="Radit"
              usage={75}
              total={100}
              darkMode={darkMode}
            />
          </AnimatedCard>
          <AnimatedCard>
            <GrowthCard darkMode={darkMode} />
          </AnimatedCard>
        </div>
      </AnimatedSection>

      {/* Row 2: Stats Cards */}
      <AnimatedSection className="m-5">
        <StatsCardGroup darkMode={darkMode} />
      </AnimatedSection>

      {/* Row 3: Analytics Row (Sales Activity, Warehouse, Timeline, Visitors) */}
      <AnimatedSection className="m-5">
        <AnalyticsRow darkMode={darkMode} />
      </AnimatedSection>

      {/* Row 4: Browser Usage + Customers + Tasks */}
      <AnimatedSection className="m-5">
        <DashboardWidgets darkMode={darkMode} />
      </AnimatedSection>

      {/* New Row: Product Summary Table */}
      <AnimatedSection className="m-5">
        <ProductSummaryTable darkMode={darkMode} />
      </AnimatedSection>
    </div>
  );
}
