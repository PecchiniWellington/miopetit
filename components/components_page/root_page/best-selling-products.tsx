"use client";

import DynamicCarousel from "@/components/carousels/carousel";
import BrandProductCard from "@/components/product/brand-product-card";
import ProductList from "@/components/product/product-list";
import { brands } from "@/core/db-static/db_root_page";
import { ICart, IProduct } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo } from "react";

const BestSellingProduct = ({
  data,
  animalName = "Cane",
  myCart,
  userId,
}: {
  data: IProduct[];
  animalName?: string;
  myCart: ICart | null;
  userId?: string;
}) => {
  const [storedValue] = useLocalStorage<{ productId: string; qty: number }[]>(
    "cart",
    []
  );
  const t = useTranslations();
  const memoizedData = useMemo(() => data, [data]);

  const getProductQuantity = useCallback(
    (productId: string) => {
      if (!userId) {
        const product = storedValue.find(
          (item) => item.productId === productId
        );
        return product ? product.qty : 0;
      } else {
        const product = myCart?.items?.find(
          (item) => item.productId === productId
        );

        return product ? product.qty : 0;
      }
    },
    [storedValue, userId, myCart]
  );

  return (
    <section className="my-12 rounded-lg border border-gray-200 bg-white p-8 shadow-md">
      <motion.h1
        className="text-center text-3xl font-extrabold text-gray-900 md:text-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {animalName === t("Shared.dogs") ? "🐶" : "🐱"}{" "}
        {animalName.toUpperCase()}
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
          <DynamicCarousel
            data={memoizedData}
            itemsPerView={3}
            gap={20}
            renderItem={(memoizedData) => (
              <BrandProductCard
                userId={userId}
                key={memoizedData.id}
                product={memoizedData}
                getProductQuantity={
                  memoizedData.id ? getProductQuantity(memoizedData.id) : 0
                }
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
            🔥 {t("HomePage.best_selling_products")}
          </h2>

          <ProductList
            product={data}
            userId={userId}
            getProductQuantity={getProductQuantity}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellingProduct;
