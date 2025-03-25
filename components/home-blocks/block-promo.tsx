"use client";

import { motion } from "framer-motion";
import BrandButton from "../shared/brand-components/brand-button";
import BrandCard from "../shared/brand-components/brand-card";

const promoData = [
  {
    title: "Deals under 15%",
    description: "Scopri le offerte speciali",
    text: "Prezzi ribassati su una selezione green!",
    button: "Scopri",
    gradient: "from-pink-500 to-orange-500",
  },
  {
    title: "I nostri best seller",
    description: "Prodotti più amati",
    text: "Prova gli articoli preferiti dai clienti!",
    button: "Vedi tutto",
    gradient: "from-yellow-400 to-pink-400",
  },
  {
    title: "Compra 3 Ricevi un Gift",
    description: "Promozione esclusiva",
    text: "Solo per un periodo limitato!",
    button: "Acquista ora",
    gradient: "from-purple-600 to-indigo-500",
  },
  {
    title: "Subscribe & Save",
    description: "Risparmia con l’abbonamento",
    text: "Ricevi i tuoi prodotti preferiti a casa tua.",
    button: "Iscriviti",
    gradient: "from-blue-400 to-violet-500",
  },
];

const BlockPromo = () => {
  return (
    <section className="mx-auto max-w-6xl space-y-16 ">
      <h2 className="text-center text-4xl font-bold text-purple-600">
        Le nostre offerte top!
      </h2>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {promoData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <BrandCard
              className={`bg-gradient-to-tr ${item.gradient} flex h-full min-h-[320px] flex-col justify-between text-center text-white shadow-xl`}
              title={
                <h3 className="text-center text-2xl font-semibold text-white">
                  {item.title}
                </h3>
              }
              description={
                <div className="text-center text-sm font-semibold text-gray-300">
                  {item.description}
                </div>
              }
              arragementChild="flex flex-col justify-between flex-1 text-center space-y-4"
            >
              <div className="flex flex-1 flex-col items-center justify-center ">
                <p className="text-sm text-white">{item.text}</p>
              </div>
              <div className="mt-auto flex items-center justify-center  px-4">
                <BrandButton variant="outline">{item.button}</BrandButton>
              </div>
            </BrandCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlockPromo;
