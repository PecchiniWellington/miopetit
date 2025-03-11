import { motion } from "framer-motion";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex min-h-[60vh] flex-col items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-8 shadow-xl"
    >
      {/* Testo principale */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        className="text-4xl font-extrabold text-white"
      >
        Il tuo carrello è vuoto 🛒
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-3 max-w-lg text-center text-lg text-gray-200"
      >
        Sembra che tu non abbia ancora aggiunto nulla al carrello. Esplora il
        nostro shop e trova le migliori offerte!
      </motion.p>

      {/* SVG con animazione */}
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
            d="M6.6 18H19.5C20.3 18 20.8 17.2 20.5 16.5L17.5 9.5C17.4 9.2 17.1 9 16.8 9H8.4L7.5 6.5C7.3 6 6.8 5.8 6.3 5.8H4"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
            cx="10"
            cy="20"
            r="1.5"
            stroke="white"
            strokeWidth="1.5"
          />
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.7, duration: 0.5, ease: "easeOut" }}
            cx="17"
            cy="20"
            r="1.5"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>

      {/* Pulsante per lo shopping con animazione */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5, ease: "easeOut" }}
      >
        <Link
          href="/"
          className="mt-8 flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-3 text-lg font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-500"
        >
          🛍️ Torna allo Shopping
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default EmptyCart;
