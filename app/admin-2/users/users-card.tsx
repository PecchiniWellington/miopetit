"use client";
import StatCard from "@/components/admin/common/StatCard";
import CardWorking from "@/components/dev/card-working";
import { motion } from "framer-motion";
import { UsersIcon, UserPlus, UserCheck, UserX } from "lucide-react";
import React from "react";

const UsersCard = ({
  userStats,
  summary,
  users,
}: {
  userStats: any;
  summary: any;
  users: any;
}) => {
  const getTodayNewActiveUsers = () => {
    const today = new Date().toISOString().split("T")[0];
    return users.filter(
      (user: any) =>
        user.createdAt.startsWith(today) && user.status === "Active"
    ).length;
  };

  const today = new Date().toISOString().split("T")[0];
  const newUserToday = users.data.filter((user: any) =>
    user.createdAt.startsWith(today)
  ).length;
  const active = users.data.filter((user: any) => user.status === "Active");
  return (
    <motion.div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <StatCard
        name="Total Users"
        icon={UsersIcon}
        value={summary.usersCount.toLocaleString() - 1}
        color="#6366F1"
      />
      <StatCard
        name="New Users Today"
        icon={UserPlus}
        value={newUserToday}
        color="#10B981"
      />
      <StatCard
        name="Active Users"
        icon={UserCheck}
        value={active ? active.length : 0}
        color="#F59E0B"
      />
      <CardWorking>
        <StatCard
          name="Churn Rate"
          icon={UserX}
          value={userStats.churnRate}
          color="#EF4444"
        />
      </CardWorking>
    </motion.div>
  );
};

export default UsersCard;
