"use client";

import { APP_NAME } from "@/lib/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const NotFoundProduct = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex h-fit flex-col items-center justify-center  rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-700 p-6 text-white"
    >
      {/* Icona */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        className="mb-6"
      >
        <Image
          src="/images/petitLogo.png"
          alt={`${APP_NAME} logo`}
          priority={true}
          width={100}
          height={100}
        />
      </motion.div>

      {/* Testo principale */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        className="text-5xl font-extrabold text-white drop-shadow-lg"
      >
        Oops! Order Not Found
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-3 max-w-lg text-center text-lg text-gray-200"
      >
        No order was found with that id. Please check the name and try again.
      </motion.p>

      {/* Pulsante di ritorno alla home */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
      >
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-pink-500 px-8 py-4 text-xl font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-pink-600"
        >
          🔙 Go Back Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundProduct;
