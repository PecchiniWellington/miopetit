"use client";

import { ILatestProduct } from "@/core/validators";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import DynamicCarousel from "./carousels/carousel";
import CustomProduct from "./shared/product/customProduct";
import ProductList from "./shared/product/product-list";
const brands = [
  {
    name: "brand1",
    image: "/images/brands/brand-1.avif",
    href: "/brand1",
  },
  {
    name: "brand2",
    image: "/images/brands/brand-2.avif",
    href: "/brand2",
  },
  {
    name: "brand3",
    image: "/images/brands/brand-3.avif",
    href: "/brand3",
  },
  {
    name: "brand4",
    image: "/images/brands/brand-4.avif",
    href: "/brand4",
  },
  {
    name: "brand5",
    image: "/images/brands/brand-5.avif",
    href: "/brand5",
  },
  {
    name: "brand6",
    image: "/images/brands/brand-6.avif",
    href: "/brand6",
  },
  {
    name: "brand7",
    image: "/images/brands/brand-7.avif",
    href: "/brand7",
  },
];

const BestSellingProduct = ({
  latestProducts,
  animalName = "Cane",
}: {
  latestProducts: ILatestProduct[];
  animalName?: string;
}) => {
  return (
    <section className="my-12 rounded-lg border border-gray-200 bg-white p-8 shadow-md">
      <motion.h1
        className="text-center text-3xl font-extrabold text-gray-900 md:text-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {animalName === "Cane" ? "🐶" : "🐱"} {animalName.toUpperCase()}
      </motion.h1>

      <motion.div
        className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Carousel Brands */}
      <div className="mt-6">
        <DynamicCarousel
          data={brands}
          itemsPerView={3}
          gap={20}
          renderItem={({ name, image }) => (
            <Link href={`/${name}`}>
              <div className="relative mx-auto flex size-full justify-center align-middle">
                <Image
                  priority
                  src={`${image}`}
                  alt={name}
                  height="0"
                  width="0"
                  sizes="100vw"
                  className="size-48 object-cover object-center"
                />
              </div>
            </Link>
          )}
        />
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
              <CustomProduct
                {...latestProducts}
                reviews={latestProducts.numReviews}
                availability={latestProducts.stock ? true : false}
                product={latestProducts}
                image={latestProducts.image[0]}
                price={Number(latestProducts.price)}
                productBrand={
                  typeof latestProducts.productBrand === "string"
                    ? latestProducts.productBrand
                    : undefined
                }
                /*  addToCart={addToCart}
                getProductQuantity={getProductQuantity} */
              />
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
