"use client";

import { Card } from "@/components/ui/card";
import { addItemToCart } from "@/core/actions/cart/cart.actions";
import { IProduct } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface Product {
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
}: Product & { currentUser?: { id: string } }) {
  /*  const { favorites, addFavorite, removeFavorite } = useIndexedDB(); */
  const [isWishlisted, setWishlisted] = useState(false);
  const [storedValue, setValue] = useLocalStorage("cart", []);
  const [storedFavorites, setFavorites, removeFavorite] = useLocalStorage(
    "favorites",
    []
  );

  // Hook useStorage per gestire il carrello nel localStorage

  useEffect(() => {
    setWishlisted(storedFavorites?.some((fav) => fav.id.toString() === id));
  }, [storedFavorites, id]);

  const toggleFavorite = () => {
    const product = { id, image, name, brand, price, oldPrice, slug };

    if (isWishlisted) {
      setFavorites(storedFavorites.filter((fav) => fav.id !== id));
    } else {
      setFavorites([...storedFavorites, product]);
    }
    setWishlisted(!isWishlisted);
  };

  const addToCart = useCallback(
    async (product: IProduct) => {
      const newItem = {
        productId: product.id,
        name: product.name,
        price: product.price.toString(),
        qty: 1,
        image: Array.isArray(product.image) ? product.image[0] : product.image,
        slug: product.slug,
      };

      const cart = Array.isArray(storedValue) ? [...storedValue] : [];

      const existingItemIndex = cart.findIndex(
        (i: { productId: string }) => i.productId === newItem.productId
      );

      if (existingItemIndex !== -1) {
        cart[existingItemIndex] = {
          ...cart[existingItemIndex],
          qty: cart[existingItemIndex].qty + 1,
        };
      } else {
        cart.push(newItem);
      }

      await addItemToCart(newItem);
      setValue(cart);
    },
    [setValue, storedValue]
  );

  return (
    <Card className="relative z-10 overflow-hidden rounded-xl border bg-white p-4 shadow-md transition hover:shadow-lg">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <div className="relative flex items-center justify-center rounded-lg bg-gray-100 p-6">
          {oldPrice && (
            <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow">
              -{Math.round(((oldPrice - price) / oldPrice) * 100)}%
            </span>
          )}
          <Link href={`/product/${product.slug}`}>
            <Image
              src={image || "/images/placeholder.jpg"}
              alt={name}
              width={180}
              height={180}
              className="object-contain"
              loading="lazy"
            />
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
          className={`text-xs font-medium ${
            availability === "Disponibile" ? "text-green-600" : "text-red-500"
          }`}
        >
          {availability}
        </p>

        {/* Pricing */}
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

      {/* Add to Cart Button */}
      <motion.button
        onClick={() => addToCart(product)}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-4 right-4 flex size-12 items-center justify-center rounded-full bg-black p-2 transition hover:bg-gray-800"
      >
        <ShoppingCart className="size-6 text-white" />
        {storedValue &&
          storedValue.some(
            (item: { productId: string }) => item.productId === id
          ) && (
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {
                storedValue.find(
                  (item: { productId: string }) => item.productId === id
                )?.qty
              }
            </span>
          )}
      </motion.button>
    </Card>
  );
}
