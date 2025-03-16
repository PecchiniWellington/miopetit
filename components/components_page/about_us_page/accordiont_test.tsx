"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const AccordionFaq2 = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <BrandButton variant="flat" onClick={() => setIsOpen(!isOpen)}>
        {question}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="size-5 text-gray-600 dark:text-gray-400" />
        </motion.div>
      </BrandButton>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-4 text-gray-600 dark:text-gray-300">{answer}</p>
      </motion.div>
    </div>
  );
};

export default AccordionFaq2;
