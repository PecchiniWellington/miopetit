import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/images/bird.png",
  "/images/dog.png",
  "/images/cat.png",
  "/images/fish.png",
];

const BlockWhyUs = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="relative mx-auto mt-32 w-full max-w-6xl px-6">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-purple-100 via-white to-green-100 opacity-70 blur-xl" />

      <div className="relative z-10 flex flex-col items-center justify-between gap-10 rounded-xl bg-white px-6 py-12 shadow-xl md:flex-row md:gap-20 md:px-12">
        <div className="max-w-xl space-y-6">
          <h2 className="text-4xl font-extrabold text-purple-600 drop-shadow-sm">
            Cosa ci rende unici? 🏆
          </h2>
          <ul className="mt-4 space-y-4 text-gray-700">
            <li className="flex items-start gap-2">
              <Check className="mt-1 size-6 text-green-500" />
              <span>Prodotti testati e certificati</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 size-6 text-green-500" />
              <span>Spedizioni veloci in tutta Italia</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 size-6 text-green-500" />
              <span>Prezzi competitivi e offerte esclusive</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-1 size-6 text-green-500" />
              <span>Customer service sempre disponibile</span>
            </li>
          </ul>
        </div>

        <div className="relative h-72 w-full max-w-md overflow-hidden rounded-xl shadow-lg">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={images[index]}
                alt="Slideshow"
                fill
                className="rounded-xl object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BlockWhyUs;
