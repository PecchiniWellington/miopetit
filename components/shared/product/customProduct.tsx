"use client";

import { Card } from "@/components/ui/card";
import { IProduct } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProductProps {
  id: string;
  image: string;
  name: string;
  brand?: string;
  price: number;
  oldPrice?: number;
  productBrand?: string | null;
  rating: number;
  reviews: number;
  availability: string;
  pricePerKg?: string;
  product: IProduct;
  slug: string;
  addToCart: (product: IProduct) => void;
  getProductQuantity: (id: string) => number;
}

export default function CustomProduct({
  id,
  image,
  name,
  brand,
  productBrand,
  reviews,
  availability,
  price,
  oldPrice,
  pricePerKg,
  product,
  slug,
  addToCart,
  getProductQuantity,
}: ProductProps) {
  const [isWishlisted, setWishlisted] = useState(false);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  useEffect(() => {
    if (Array.isArray(favorites)) {
      setWishlisted(favorites.some((fav) => fav.id === id));
    }
  }, [favorites, id]);

  const toggleFavorite = () => {
    const product = { id, image, name, brand, price, oldPrice, slug };

    if (isWishlisted) {
      setFavorites(favorites.filter((fav) => fav.id !== id));
    } else {
      setFavorites([...favorites, product]);
    }
    setWishlisted(!isWishlisted);
  };

  return (
    <Card className="relative z-10 overflow-hidden rounded-xl border bg-white p-4 shadow-md transition hover:shadow-lg">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <div className="relative flex items-center justify-center rounded-lg bg-gray-100 p-6">
          {oldPrice && (
            <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow">
              -{Math.round(((oldPrice - price) / oldPrice) * 100)}%
            </span>
          )}
          <Link href={`/product/${product?.slug}`}>
            {Array.isArray(image) ? (
              <Image
                src={image[0] || "/images/placeholder.jpg"}
                alt={name}
                width={180}
                height={180}
                className="object-contain"
                loading="lazy"
              />
            ) : (
              <Image
                src={image || "/images/placeholder.jpg"}
                alt={name}
                width={180}
                height={180}
                className="object-contain"
                loading="lazy"
              />
            )}
          </Link>

          <motion.button
            onClick={toggleFavorite}
            whileTap={{ scale: 0.9 }}
            className={`absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white shadow-md transition ${
              isWishlisted ? "text-red-600" : "text-gray-500 hover:text-black"
            }`}
          >
            <Heart className="size-5" fill={isWishlisted ? "red" : "none"} />
          </motion.button>
        </div>
      </motion.div>

      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
        <p className="text-xs text-gray-500">{productBrand}</p>

        <div className="flex items-center space-x-1">
          <span className="text-sm font-bold text-yellow-500">★★★★★</span>
          <span className="text-xs font-semibold text-gray-700">
            ({reviews} recensioni)
          </span>
        </div>

        <p
          className={`text-xs font-medium ${
            availability === "Disponibile" ? "text-green-600" : "text-red-500"
          }`}
        >
          {availability}
        </p>

        <div className="flex items-center space-x-2">
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              €{oldPrice}
            </span>
          )}
          <span className="text-lg font-bold text-red-600">€{price}</span>
        </div>

        {pricePerKg && <p className="text-xs text-gray-500">({pricePerKg})</p>}
      </div>

      <motion.button
        onClick={() => addToCart(product)}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-4 right-4 flex size-12 items-center justify-center rounded-full bg-black p-2 transition hover:bg-gray-800"
      >
        <ShoppingCart className="size-6 text-white" />

        {getProductQuantity(product?.id) > 0 && (
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {getProductQuantity(product?.id)}
          </span>
        )}
      </motion.button>
    </Card>
  );
}
