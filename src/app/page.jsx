"use client";

import { useRef, useEffect, useState } from "react";
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

export default function DashboardPage({ sidebarOpen, darkMode, setDarkMode }) {
  return (
    <div className={sidebarOpen ? "ml-64" : ""}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <DashboardHeader sidebarOpen={sidebarOpen} darkMode={darkMode} />
      </motion.div>

      {/* sisanya pakai langsung darkMode */}
      <AnimatedSection className="m-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <AnimatedCard><StorageCard name="Radit" usage={75} total={100} /></AnimatedCard>
          <AnimatedCard><GrowthCard /></AnimatedCard>
        </div>
      </AnimatedSection>

      <AnimatedSection className="m-5"><StatsCardGroup /></AnimatedSection>
      <AnimatedSection className="m-5"><AnalyticsRow /></AnimatedSection>
      <AnimatedSection className="m-5"><DashboardWidgets /></AnimatedSection>
      <AnimatedSection className="m-5"><ProductSummaryTable /></AnimatedSection>
    </div>
  );
}
