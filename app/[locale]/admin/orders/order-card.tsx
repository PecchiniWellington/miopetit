"use client";
import StatCard from "@/components/admin/common/StatCard";
import { motion } from "framer-motion";
import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";

const OrderCards = ({
  orderStats,
}: {
  orderStats: {
    totalOrders: string;
    pendingOrders: string;
    completedOrders: string;
    totalRevenue: string;
  };
}) => {
  return (
    <div>
      <motion.div
        className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard
          name="Total Orders"
          icon={ShoppingBag}
          value={orderStats.totalOrders}
          color="#6366F1"
        />
        <StatCard
          name="Pending Orders"
          icon={Clock}
          value={orderStats.pendingOrders}
          color="#F59E0B"
        />
        <StatCard
          name="Completed Orders"
          icon={CheckCircle}
          value={orderStats.completedOrders}
          color="#10B981"
        />
        <StatCard
          name="Total Revenue"
          icon={DollarSign}
          value={orderStats.totalRevenue}
          color="#EF4444"
        />
      </motion.div>
    </div>
  );
};

export default OrderCards;
