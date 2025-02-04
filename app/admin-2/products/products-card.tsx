"use client";
import StatCard from "@/components/admin/common/StatCard";
import CardWorking from "@/components/dev/card-working";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { motion } from "framer-motion";
import { Package, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";
import React from "react";

const ProductCard = ({ overviewSummary }: { overviewSummary: any }) => {
  return (
    <div>
      {" "}
      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard
          name="Total Products"
          icon={Package}
          value={formatNumber(overviewSummary.productsCount)}
          color="#6366F1"
        />
        <CardWorking>
          <StatCard
            name="Top Selling"
            icon={TrendingUp}
            value={89}
            color="#10B981"
          />
        </CardWorking>

        <CardWorking>
          <StatCard
            name="Low Stock"
            icon={AlertTriangle}
            value={23}
            color="#F59E0B"
          />
        </CardWorking>

        <StatCard
          name="Total Revenue"
          icon={DollarSign}
          value={formatCurrency(
            overviewSummary.totalSales._sum.totalPrice?.toString() || "0"
          )}
          color="#EF4444"
        />
      </motion.div>
    </div>
  );
};

export default ProductCard;
