import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const AccordionFaq = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm transition hover:shadow-md"
    >
      <details className="group  ">
        <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-800">
          {question}
          <ChevronDown className="transition-transform group-open:rotate-180" />
        </summary>
        <p className="mt-2 text-gray-600">{answer}</p>
      </details>
    </motion.div>
  );
};

export default AccordionFaq;
