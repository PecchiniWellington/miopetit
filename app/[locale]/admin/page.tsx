"use client";
import Header from "@/components/admin/common/Header";
import StatCard from "@/components/admin/common/StatCard";
import UserActivityHeatmap from "@/components/admin/users/UserActivityHeatmap";
import UserDemographicsChart from "@/components/admin/users/UserDemographicsChart";
import UserGrowthChart from "@/components/admin/users/UserGrowthChart";
import UsersTable from "@/components/admin/users/UsersTable";
import { motion } from "framer-motion";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { usePathname } from "next/navigation";

const userStats = {
  totalUsers: 152845,
  newUsersToday: 243,
  activeUsers: 98520,
  churnRate: "2.4%",
};

const Admin2Page = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop();

  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title={lastSegment} />

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        {/* STATS */}
        <motion.div
          className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Users"
            icon={UsersIcon}
            value={userStats.totalUsers.toLocaleString()}
            color="#6366F1"
          />
          <StatCard
            name="New Users Today"
            icon={UserPlus}
            value={userStats.newUsersToday}
            color="#10B981"
          />
          <StatCard
            name="Active Users"
            icon={UserCheck}
            value={userStats.activeUsers.toLocaleString()}
            color="#F59E0B"
          />
          <StatCard
            name="Churn Rate"
            icon={UserX}
            value={userStats.churnRate}
            color="#EF4444"
          />
        </motion.div>

        <UsersTable />

        {/* USER CHARTS */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <UserGrowthChart />
          <UserActivityHeatmap />
          <UserDemographicsChart />
        </div>
      </main>
    </div>
  );
};
export default Admin2Page;
