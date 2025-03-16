"use client";
import BrandButton from "@/components/shared/brand-components/brand-button";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const DangerZone = () => {
  return (
    <motion.div
      className="mb-8 rounded-xl border border-red-700 bg-red-900 bg-opacity-50 p-6 shadow-lg backdrop-blur-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="mb-4 flex items-center">
        <Trash2 className="mr-3 text-red-400" size={24} />
        <h2 className="text-xl font-semibold text-gray-100">Danger Zone</h2>
      </div>
      <p className="mb-4 text-gray-300">
        Permanently delete your account and all of your content.
      </p>
      <BrandButton type="submit" variant="danger">
        Delete Account
      </BrandButton>
    </motion.div>
  );
};
export default DangerZone;
