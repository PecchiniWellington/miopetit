"use client";
import StatCard from "@/components/admin/common/StatCard";
import { motion } from "framer-motion";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";

const OverviewCard = () => {
  return (
    <div>
      <motion.div
        className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard
          name="Total Sales"
          icon={Zap}
          value="$12,345"
          color="#6366F1"
        />
        <StatCard name="New Users" icon={Users} value="1,234" color="#8B5CF6" />
        <StatCard
          name="Total Products"
          icon={ShoppingBag}
          value="567"
          color="#EC4899"
        />
        <StatCard
          name="Conversion Rate"
          icon={BarChart2}
          value="12.5%"
          color="#10B981"
        />
      </motion.div>
    </div>
  );
};

export default OverviewCard;
