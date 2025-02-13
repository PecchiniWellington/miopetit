"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const presentationDeals = [
  {
    title: "Affari sotto il 15%",
    image: "/images/affari-quindici.png",
  },
  {
    title: "I nostri migliori Prodotti",
    image: "/images/migliori-prodotti.png",
  },
  {
    title: "Prendi 3 ricevi un Regalo",
    image: "/images/prendi-3.png",
  },
  {
    title: "Iscriviti e Risparmia fino a 30%",
    image: "/images/risparmia-30.png",
  },
];

export default function PresentationDeals() {
  return (
    <section className="mx-auto px-4 py-12">
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 ">
        {presentationDeals.map((deal, index) => (
          <motion.div
            key={deal.title}
            className="relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 p-1 shadow-md transition-transform duration-300 hover:scale-x-150 hover:shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div className="relative flex size-full max-w-[140px] items-center justify-center rounded-lg bg-white p-4 sm:max-w-[180px] sm:p-6 md:max-w-[200px] lg:max-w-[300px]">
              <Image
                src={deal.image}
                alt={deal.title}
                width={180}
                height={180}
                className="rounded-md object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
