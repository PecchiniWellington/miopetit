"use client";

import { ILatestProduct } from "@/core/validators";
import { motion } from "framer-motion";
import DynamicCarousel from "./carousels/carousel";
import CarouselBrands from "./carousels/carousel-brands";
import CustomProduct from "./shared/product/customProduct";
import ProductList from "./shared/product/product-list";

const BestSellingProduct = ({
  latestProducts,
  animalName = "Cane",
}: {
  latestProducts: ILatestProduct[];
  animalName?: string;
}) => {
  return (
    <section className="my-12 rounded-lg border border-gray-200 bg-white p-8 shadow-md">
      {/* Titolo */}
      <motion.h1
        className="text-center text-3xl font-extrabold text-gray-900 md:text-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {animalName === "Cane" ? "🐶" : "🐱"} {animalName.toUpperCase()}
      </motion.h1>

      {/* Barra decorativa sottile */}
      <motion.div
        className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Carousel Brands */}
      <div className="mt-6">
        <CarouselBrands />
      </div>

      {/* Contenitore prodotti */}
      <div className="mt-8 rounded-lg shadow-sm md:border md:border-gray-100 md:bg-gray-50 md:p-6">
        {/* Mobile: Carousel */}
        <motion.div
          className="block md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/*  <CarouselProducts data={latestProducts} /> */}
          <DynamicCarousel
            data={latestProducts}
            itemsPerView={3}
            gap={20}
            renderItem={(latestProducts) => (
              <CustomProduct {...latestProducts} />
            )}
          />
        </motion.div>

        {/* Desktop: Lista prodotti */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4 text-center text-xl font-semibold text-gray-800">
            🔥 I Prodotti più venduti
          </h2>
          <ProductList data={latestProducts} />
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellingProduct;
