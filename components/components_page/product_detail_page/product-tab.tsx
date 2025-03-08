"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Info, Star } from "lucide-react";
import { useState } from "react";
import ReviewsTab from "./review-tab";

const tabs = [
  {
    id: "description",
    label: "Descrizione",
    icon: <Info className="size-5" />,
  },
  { id: "reviews", label: "Recensioni", icon: <Star className="size-5" /> },
];

const ProductTabs = ({
  description,
}: {
  description: string;
  productId: string;
}) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-10 w-full  rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      {/* Tab Navigation */}
      <div className="relative flex items-center border-b dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`relative flex w-1/2 items-center justify-center gap-2 py-3 text-lg font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-gray-500 hover:text-indigo-500 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 h-[3px] w-full rounded bg-indigo-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative mt-6 min-h-[250px]">
        <AnimatePresence mode="wait">
          {activeTab === "description" && (
            <motion.div
              key="description"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-gray-700 dark:text-gray-300"
            >
              <p className="text-lg leading-relaxed">{description}</p>
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ReviewsTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductTabs;
