"use client";

import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Eye,
  ShoppingBag,
  Users,
} from "lucide-react";

const overviewData = [
  { name: "Revenue", value: "$1,234,567", change: 12.5, icon: DollarSign },
  { name: "Users", value: "45,678", change: 8.3, icon: Users },
  { name: "Orders", value: "9,876", change: -3.2, icon: ShoppingBag },
  { name: "Page Views", value: "1,234,567", change: 15.7, icon: Eye },
];

const OverviewCards = () => {
  return (
    <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {overviewData.map((item, index) => (
        <motion.div
          key={item.name}
          className=" rounded-xl border border-gray-700 bg-gray-800
            p-6 shadow-lg backdrop-blur-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-400">{item.name}</h3>
              <p className="mt-1 text-xl font-semibold text-gray-100">
                {item.value}
              </p>
            </div>

            <div
              className={`
              rounded-full  p-3 ${item.change >= 0 ? "bg-green-500" : "bg-red-500"}
              `}
            >
              <item.icon
                className={`size-6  ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}
              />
            </div>
          </div>
          <div
            className={`
              mt-4 flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}
            `}
          >
            {item.change >= 0 ? (
              <ArrowUpRight size="20" />
            ) : (
              <ArrowDownRight size="20" />
            )}
            <span className="ml-1 text-sm font-medium">
              {Math.abs(item.change)}%
            </span>
            <span className="ml-2 text-sm text-gray-400">vs last period</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
export default OverviewCards;
