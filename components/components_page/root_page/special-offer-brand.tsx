"use client";
import DynamicCarousel from "@/components/carousels/carousel";
import BrandProductCard from "@/components/product/brand-product-card";
import { ICart, IProduct } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useMemo } from "react";

interface IProductListProps {
  data: IProduct[];
  myCart: ICart | null;
  userId?: string;
  brandName: string;
  image: string;
  animalName: string;
}

const SpecialOfferBrand = ({
  data,
  brandName,
  myCart,
  userId,
  image,
  animalName,
}: IProductListProps) => {
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
    <motion.div
      className="relative grid grid-cols-1 gap-10 rounded-xl bg-gray-100 p-6 shadow-lg md:my-12 md:grid-cols-4 md:p-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sezione Informativa */}
      <motion.div
        className="col-span-3 flex w-full flex-col gap-5 md:col-span-1 md:p-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h1 className="text-2xl font-extrabold text-gray-900">
          {t("HomePage.SpecialOffer.special_offers", { brand_name: brandName })}
        </h1>

        <div className="relative w-full overflow-hidden rounded-lg shadow-md">
          <Image
            src={image}
            alt={brandName}
            width={400}
            height={300}
            className="size-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {t("HomePage.SpecialOffer.exclusive_promotion_for", {
              animal: animalName,
            })}
          </h2>
          <p className="mt-2 text-gray-600">
            {t("HomePage.SpecialOffer.discover_best_offers", {
              brand_name: brandName,
            })}
          </p>
        </div>
      </motion.div>

      {/* Sezione Prodotti in Offerta */}
      <motion.div
        className="relative col-span-3 overflow-hidden"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
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
    </motion.div>
  );
};

export default SpecialOfferBrand;
