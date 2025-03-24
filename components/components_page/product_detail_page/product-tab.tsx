"use client";

import {
  TabsContainer,
  TabsList,
  TabsPanel,
} from "@/components/shared/brand-tabs";
import { motion } from "framer-motion";
import { Info, Star } from "lucide-react";
import ReviewsTab from "./review-tab";

const tabs = [
  {
    id: "description",
    label: "Descrizione",
    icon: Info,
  },
  {
    id: "reviews",
    label: "Recensioni",
    icon: Star,
  },
];

const ProductTabs = ({ description }: { description: string }) => {
  return (
    <TabsContainer defaultTab="description">
      {/* Header */}
      <TabsList
        tabs={tabs}
        className="mb-6 border-b border-gray-200 dark:border-gray-700"
      />

      {/* Content */}
      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <TabsPanel tabId="description" withAnimation={true}>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-gray-700 dark:text-gray-300"
          >
            <p className="text-lg leading-relaxed">{description}</p>
          </motion.div>
        </TabsPanel>

        <TabsPanel tabId="reviews" withAnimation={true}>
          <ReviewsTab />
        </TabsPanel>
      </div>
    </TabsContainer>
  );
};

export default ProductTabs;
