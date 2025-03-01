"use client";
import { IProduct } from "@/core/validators";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import DynamicCarousel from "./carousels/carousel";
import CustomProduct from "./shared/product/customProduct";

interface IProductListProps {
  data: IProduct[];
  title?: string;
}

const SpecialOfferBrand = ({ data, title }: IProductListProps) => {
  /*  const { addToCart, getProductQuantity } = useCartHandler(); */
  const memoizedData = useMemo(() => data, [data]);
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
        {title && (
          <h1 className="text-2xl font-extrabold text-gray-900">{title}</h1>
        )}

        <div className="relative w-full overflow-hidden rounded-lg shadow-md">
          <Image
            src="/images/royalCanin-deal.webp"
            alt="product"
            width={400}
            height={300}
            className="size-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Promozione esclusiva per il tuo cane!
          </h2>
          <p className="mt-2 text-gray-600">
            Scopri le migliori offerte su Royal Canin! Approfitta delle
            promozioni esclusive per il tuo amico a quattro zampe.
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
        {/* <CarouselProducts data={memoizedData} /> */}
        <DynamicCarousel
          data={memoizedData}
          itemsPerView={3}
          gap={20}
          renderItem={(memoizedData) => (
            <CustomProduct
              key={memoizedData.id}
              id={memoizedData.id}
              image={memoizedData.image[0]}
              name={memoizedData.name}
              productBrand={memoizedData?.productBrand?.name}
              rating={Number(memoizedData.rating)}
              reviews={memoizedData.numReviews}
              availability={memoizedData.stock ? true : false}
              price={Number(memoizedData.price)}
              oldPrice={54.99}
              pricePerKg="€4,16/KG (FAKE)"
              product={memoizedData}
              slug={memoizedData.slug}
              /* getProductQuantity={getProductQuantity}
              addToCart={addToCart} */
            />
          )}
        />
      </motion.div>
    </motion.div>
  );
};

export default SpecialOfferBrand;
