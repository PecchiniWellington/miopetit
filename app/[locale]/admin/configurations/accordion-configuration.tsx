"use client";
import MenuEditor from "@/components/admin/mega-menu-config/menu-editor";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import UploadFiles from "./upload-files";
import UploadImage from "./upload-images";

const AccordionConfiguration = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm transition hover:shadow-md"
      >
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-800">
            Configura Menu
            <ChevronDown className="transition-transform group-open:rotate-180" />
          </summary>
          <div className="mt-2 border border-gray-700">
            <MenuEditor />
          </div>
        </details>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm transition hover:shadow-md"
      >
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-800">
            Carica file
            <ChevronDown className="transition-transform group-open:rotate-180" />
          </summary>
          <div className="mt-2 h-96">
            <UploadFiles />
          </div>
        </details>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm transition hover:shadow-md"
      >
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-800">
            Carica Immagine
            <ChevronDown className="transition-transform group-open:rotate-180" />
          </summary>
          <div className="mt-2">
            <UploadImage />
          </div>
        </details>
      </motion.div>
    </>
  );
};

export default AccordionConfiguration;
