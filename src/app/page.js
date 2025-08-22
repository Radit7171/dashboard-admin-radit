"use client";

import DashboardHeader from "./components/Dashboard/DashboardHeader";
import StorageCard from "./components/Dashboard/StorageCard";
import GrowthCard from "./components/Dashboard/GrowthCard";
import StatsCardGroup from "./components/Dashboard/StatsCardGroup";
import DashboardWidgets from "./components/Dashboard/DashboardWidgets";
import AnalyticsRow from "./components/Dashboard/DashboardAnalytics";

export default function DashboardPage({ sidebarOpen }) {
  return (
    <div className={sidebarOpen ? "ml-64" : ""}>
      {/* Header */}
      <DashboardHeader sidebarOpen={sidebarOpen} />

      {/* Cards (Storage + Growth) */}
      <div className="m-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <StorageCard name="Radit" usage={75} total={100} />
        <GrowthCard /> {/* ✅ Panggil di sini */}
      </div>

      {/* Row 2: Stats Cards */}
      <div className="m-5">
        <StatsCardGroup />
      </div>

      {/* Row 3: Analytics Row (Sales Activity, Warehouse, Timeline, Visitors) */}
      <div className="m-5">
        <AnalyticsRow />
      </div>

      {/* Row 4: Browser Usage + Customers + Tasks */}
      <div className="m-5">
        <DashboardWidgets />
      </div>
    </div>
  );
}
