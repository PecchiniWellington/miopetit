"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ProductCarousel = ({
  images = [
    "/images/royal-canin-4.jpg",
    "/images/brand-2.avif",
    "/images/coccola-cani.png",
  ],
}: {
  images?: string[];
}) => {
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* Contenitore fisso per evitare resizing */}
      <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg shadow-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="absolute size-full"
          >
            <Image
              /*  src={images[current] || "/images/placeholder.jpg"} */
              src={images[current] || "/images/placeholder.jpg"}
              alt={`Product image ${current + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </motion.div>
        </AnimatePresence>

        {/* Pulsanti di navigazione */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-200"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-200"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Miniature */}
      <div className="mt-4 flex justify-center gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`cursor-pointer rounded-lg border p-1 transition ${
              current === index ? "border-blue-500" : "border-transparent"
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="size-16 rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
