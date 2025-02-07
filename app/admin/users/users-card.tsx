"use client";
import StatCard from "@/components/admin/common/StatCard";
import CardWorking from "@/components/dev/card-working";
import { IOrder, IUser } from "@/core/types";
import { motion } from "framer-motion";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";

const UsersCard = ({
  userStats,
  summary,
  users,
}: {
  userStats: {
    totalUsers: number;
    newUsersToday: number;
    activeUsers: number;
    churnRate: string;
  };
  summary: IOrder & { usersCount: number };
  users: { data: IUser[] };
}) => {
  const today = new Date().toISOString().split("T")[0];
  const newUserToday = users.data?.filter((user: IUser) =>
    String(user?.createdAt).startsWith(today)
  ).length;
  const active = users.data?.filter((user: IUser) => user.status === "ACTIVE");
  return (
    <motion.div
      className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <StatCard
        name="Total Users"
        icon={UsersIcon}
        value={(summary.usersCount - 1).toLocaleString()}
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
