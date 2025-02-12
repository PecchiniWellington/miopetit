"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  image: string;
  name: string;
  productBrand?: string | null;
  rating: number;
  reviews: number;
  availability: string;
  price: number;
  oldPrice?: number;
  slug?: string;
  pricePerKg?: string;
}

export default function ProductCard({
  image,
  name,
  productBrand,
  reviews,
  availability,
  price,
  oldPrice,
  pricePerKg,
}: ProductCardProps) {
  const [isWishlisted, setWishlisted] = useState(false);

  return (
    <Card className="relative overflow-hidden rounded-xl border bg-white p-4 shadow-md transition hover:shadow-lg">
      {/* Image with Hover Effect */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <div className="relative flex items-center justify-center rounded-lg bg-gray-100 p-6">
          {oldPrice && (
            <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow">
              -{Math.round(((oldPrice - price) / oldPrice) * 100)}%
            </span>
          )}
          <Link href={`/product/cibo-secco`}>
            <Image
              src={image}
              alt={name}
              width={180}
              height={180}
              className="object-contain"
              loading="lazy"
            />
          </Link>

          {/* Wishlist Button - Now in the top-right corner inside the image */}
          <motion.button
            onClick={() => setWishlisted(!isWishlisted)}
            whileTap={{ scale: 0.9 }}
            className={`absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white shadow-md transition ${
              isWishlisted ? "text-red-600" : "text-gray-500 hover:text-black"
            }`}
          >
            <Heart className="size-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Product Details */}
      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
        <p className="text-xs text-gray-500">{productBrand}</p>

        {/* Ratings */}
        <div className="flex items-center space-x-1">
          <span className="text-sm font-bold text-yellow-500">★★★★★</span>
          <span className="text-xs font-semibold text-gray-700">
            ({reviews} recensioni)
          </span>
        </div>

        {/* Availability */}
        <p
          className={`text-xs font-medium ${availability === "Disponibile" ? "text-green-600" : "text-red-500"}`}
        >
          {availability}
        </p>

        {/* Pricing */}
        <div className="flex items-center space-x-2">
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              €{oldPrice.toFixed(2)}
            </span>
          )}
          <span className="text-lg font-bold text-red-600">
            €{price.toFixed(2)}
          </span>
        </div>

        {pricePerKg && <p className="text-xs text-gray-500">({pricePerKg})</p>}
      </div>

      {/* Add to Cart Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-4 right-4 flex size-12 items-center justify-center rounded-full bg-black p-2 transition hover:bg-gray-800"
      >
        <ShoppingCart className="size-6 text-white" />
      </motion.button>
    </Card>
  );
}
