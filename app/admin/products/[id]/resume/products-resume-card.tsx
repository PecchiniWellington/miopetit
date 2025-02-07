"use client";
import StatCard from "@/components/admin/common/StatCard";
import CardWorking from "@/components/dev/card-working";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Product } from "@/types/_index";
import { motion } from "framer-motion";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";

const ProductResumeCard = ({
  product,
}: {
  product: Product & {
    stock: string;
    totalSales: number;
    totalRevenue: string;
  };
}) => {
  return (
    <div>
      {" "}
      <motion.div
        className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
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
