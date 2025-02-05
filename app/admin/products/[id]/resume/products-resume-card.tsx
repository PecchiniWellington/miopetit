"use client";
import StatCard from "@/components/admin/common/StatCard";
import CardWorking from "@/components/dev/card-working";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { color, motion } from "framer-motion";
import { Package, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";
import React from "react";

const ProductResumeCard = ({ product }: { product: any }) => {
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
          name="N° On stock"
          icon={Package}
          value={formatNumber(product.stock)}
          color="#6366F1"
        />

        <StatCard
          name="N° of Sales"
          icon={TrendingUp}
          value={formatNumber(product.totalSales)}
          color="#10B981"
        />

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
          value={formatCurrency(product.totalRevenue || "0")}
          color="#EF4444"
        />
      </motion.div>
    </div>
  );
};

export default ProductResumeCard;
