"use client";

import { motion } from "framer-motion";

import AnimalAvatar from "@/components/animal-avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGiftData } from "@/core/db-static/db_root_page/gift_data";
import { useTranslations } from "next-intl";

const Gifts = () => {
  const gift_data = useGiftData();
  const t = useTranslations();
  return (
    <div className="my-12 ">
      {/* Titolo */}
      <motion.h2
        className="mb-6 text-center text-2xl font-extrabold text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🎁 {t("HomePage.discover_best_gift")}
      </motion.h2>

      {/* Layout Desktop */}
      <motion.div
        className="hidden cursor-pointer grid-cols-2 justify-center gap-4 rounded-lg sm:grid md:grid-cols-3 lg:grid-cols-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {gift_data.map(({ name, image }) => (
          <motion.div
            key={name}
            className="group relative  rounded-3xl bg-white   transition-transform duration-300 hover:scale-105 "
            whileHover={{ scale: 1.05 }}
          >
            <AnimalAvatar name={name} image={image} />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="text-lg font-bold text-white">{name}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Layout Mobile - Carousel */}
      <motion.div
        className="relative block w-full md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Carousel
          className="mb-12 w-full"
          opts={{
            loop: true,
            startIndex: 0,
            align: "start",
          }}
        >
          <CarouselContent>
            {gift_data.map(({ name, image }) => (
              <CarouselItem key={name} className="md:basis-1/2 lg:basis-1/4">
                <div className="relative mx-auto h-full">
                  <motion.div
                    className="overflow-hidden rounded-lg bg-white p-4 shadow-md transition-transform duration-300 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                  >
                    <AnimalAvatar key={name} name={name} image={image} />
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
        </Carousel>
      </motion.div>
    </div>
  );
};

export default Gifts;
