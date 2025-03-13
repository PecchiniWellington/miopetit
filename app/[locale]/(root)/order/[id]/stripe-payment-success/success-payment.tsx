"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link"; // CORRETTO IMPORT

const SuccessPayment = ({ id }: { id: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex min-h-[60vh] flex-col items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-blue-600 p-8 shadow-xl"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        className="text-4xl font-extrabold text-white"
      >
        🎉 Grazie per il tuo acquisto!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-3 max-w-lg text-center text-lg text-gray-200"
      >
        Il tuo ordine è stato ricevuto e stiamo processando la spedizione.
      </motion.p>

      {/* Icona animata */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
        className="mt-6"
      >
        <svg
          width="180"
          height="180"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white drop-shadow-lg"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
            d="M4 12l6 6L20 6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Pulsante animato */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5, ease: "easeOut" }}
      >
        <Button asChild>
          <Link
            href={`/order/${id}`}
            className="mt-8 flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-3 text-lg font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-500"
          >
            📦 Visualizza Ordine
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SuccessPayment;
