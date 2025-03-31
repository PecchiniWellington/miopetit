"use client";
import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react";

const INSIGHTS = [
  {
    icon: TrendingUp,
    color: "text-green-500",
    insight:
      "Revenue is up 15% compared to last month, driven primarily by a successful email campaign.",
  },
  {
    icon: Users,
    color: "text-blue-500",
    insight:
      "Customer retention has improved by 8% following the launch of the new loyalty program.",
  },
  {
    icon: ShoppingBag,
    color: "text-purple-500",
    insight:
      'Product category "Electronics" shows the highest growth potential based on recent market trends.',
  },
  {
    icon: DollarSign,
    color: "text-yellow-500",
    insight:
      "Optimizing pricing strategy could potentially increase overall profit margins by 5-7%.",
  },
];

const AIPoweredInsights = () => {
  return (
    <motion.div
      className="rounded-xl border border-gray-700 bg-gray-800/50 p-6 shadow-lg backdrop-blur-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-100">
        AI-Powered Insights
      </h2>
      <div className="space-y-4">
        {INSIGHTS.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`rounded-full p-2 ${item.color} `}>
              <item.icon className={`size-6 ${item.color}`} />
            </div>
            <p className="text-gray-300">{item.insight}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
export default AIPoweredInsights;
