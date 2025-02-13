"use client";
import { motion } from "framer-motion";
import { DollarSign, Headset, ShoppingBag, WalletCards } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    icon: ShoppingBag,
    title: "Free Shipping",
    description: "Free Shipping on orders above €100",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: DollarSign,
    title: "Money Back Guarantee",
    description: "Within 30 days of purchase",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    icon: WalletCards,
    title: "Flexible Payment",
    description: "Pay with credit card, PayPal or COD",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Get support at any time",
    color: "text-red-600",
    bg: "bg-red-100",
  },
];

const IconBoxes = () => {
  return (
    <Card className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
      <CardContent className="grid gap-6 md:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center gap-3 rounded-lg p-4 text-center transition-all duration-300 "
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div
              className={`flex size-12 items-center justify-center rounded-full ${feature.bg} ${feature.color}`}
            >
              <feature.icon size={28} />
            </div>
            <div className="text-lg font-semibold text-gray-800 dark:text-white">
              {feature.title}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {feature.description}
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default IconBoxes;
