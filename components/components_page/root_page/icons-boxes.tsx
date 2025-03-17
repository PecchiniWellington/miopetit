"use client";
import GenericCard from "@/components/shared/brand-components/brand-card";
import { useFeatures } from "@/core/db-static/db_root_page/features";
import { motion } from "framer-motion";

const IconBoxes = () => {
  const features = useFeatures();

  return (
    <GenericCard arragementChild="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
    </GenericCard>
  );
};

export default IconBoxes;
