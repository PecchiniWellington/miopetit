"use client";

import { usePresentationDeals } from "@/core/db-static/db_root_page/presentation_deals";
import { motion } from "framer-motion";

export default function PresentationDeals() {
  const presentation_deals = usePresentationDeals();
  return (
    <section className="mx-auto ">
      <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 ">
        {presentation_deals.map((deal, index) => (
          <motion.div
            key={deal.title}
            className="flex items-center justify-center p-2 "
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
          >
            {/* Contenitore con bordo sfumato animato */}
            <motion.div
              className="relative rounded-lg bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 p-1 shadow-lg"
              whileHover={{ scale: 1.05 }}
              animate={{
                transition: { duration: 2 },
              }}
            >
              {/* Sfondo bianco dentro il bordo sfumato */}
              <div className="relative flex items-center justify-center rounded-lg bg-white p-2">
                {/* Quadrato con angoli decorati */}
                <motion.div
                  className="relative flex size-28 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br via-pink-500 to-sky-900 p-2 sm:size-56 sm:p-4"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 2, -2, 0] }}
                  transition={{
                    duration: 2,

                    ease: "easeInOut",
                  }}
                >
                  {/* Angolo superiore sinistro */}
                  <div className="absolute -left-10 -top-10 z-10 size-16 rotate-45 rounded-lg bg-orange-400 sm:-left-16 sm:-top-16 sm:size-28"></div>
                  {/* Angolo inferiore destro */}
                  <div className="absolute -bottom-10 -right-10 z-10 size-16 rotate-45 rounded-lg bg-pink-400 sm:-bottom-16  sm:-right-16 sm:size-28"></div>

                  {/* Testo centrale */}
                  <motion.div
                    className="flex size-full items-center bg-secondary-900 text-center text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                  >
                    <h3 className="p-2 font-bold md:text-lg lg:text-2xl">
                      {deal.title}
                    </h3>
                    {/*  <p className="text-md">sotto il 15%</p> */}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
