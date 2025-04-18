"use client";

import { addItemToCart } from "@/core/actions/cart/cart.actions";
import { ICartItem, IProduct } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { motion } from "framer-motion";
import { Heart, Loader2, ShoppingCart } from "lucide-react";
import { default as Image } from "next/image";
import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import BrandButton from "../shared/brand-components/brand-button";
import BrandCard from "../shared/brand-components/brand-card";
import BrandNotificationNumber from "../shared/notification-number";

export default function BrandProductCard({
  product,
  getProductQuantity,
  userId,
}: {
  product: IProduct;
  getProductQuantity?: number;
  userId?: string;
}) {
  console.log(product);
  const [isWishlisted, setWishlisted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [favorites, setFavorites] = useLocalStorage<IProduct[]>(
    "favorites",
    []
  );

  const [storedValue, setStoredValue] = useLocalStorage<ICartItem[]>(
    "cart",
    []
  );

  useEffect(() => {
    if (Array.isArray(favorites)) {
      setWishlisted(favorites.some((fav) => fav.id === product.id));
    }
  }, [favorites, product.id]);

  const toggleFavorite = () => {
    if (isWishlisted) {
      setFavorites(
        favorites.filter((fav): fav is IProduct => fav.id !== product.id)
      );
    } else {
      setFavorites([...favorites, product]);
    }
    setWishlisted(!isWishlisted);
  };

  const handlerAddToCart = async (item: IProduct) => {
    setIsPending(true);
    startTransition(async () => {
      const existingItem = storedValue.find(
        (cartItem) => cartItem.productId === item.id
      );

      const updatedCart = existingItem
        ? storedValue.map((cartItem) =>
            cartItem.productId === item.id
              ? { ...cartItem, qty: cartItem.qty + 1 }
              : cartItem
          )
        : [
            ...storedValue,
            {
              ...item,
              productId: item.id || "",
              costPrice:
                item.costPrice !== undefined ? Number(item.costPrice) : 0,
              qty: 1,
              price: item.price.toString(), // Ensure price is a string
            },
          ];

      if (userId) {
        await addItemToCart({
          ...item,
          qty: 1,
          productId: item.id || "",
          userId: userId || "",
          price: item.price.toString(), // Ensure price is a string
          costPrice: item.costPrice !== undefined ? Number(item.costPrice) : 0,
        });
      } else {
        setStoredValue(updatedCart);
      }
      setIsPending(false);
    });
  };

  const oldPrice =
    (product.percentageDiscount ?? 0) > 0
      ? (
          parseFloat(product.price.toString()) /
          (1 - (product.percentageDiscount ?? 0) / 100)
        ).toFixed(2)
      : null;

  return (
    <BrandCard>
      {/* Glow + inward border effect */}
      <div className="pointer-events-none absolute inset-0 rounded-xl">
        <div className="absolute inset-0 rounded-xl shadow-[0_0_80px_rgba(255,255,255,1)] ring-2 ring-white blur-[6px]"></div>
        <div className="absolute inset-[2px] rounded-[11px]  shadow-inner"></div>
      </div>

      {/* CONTENUTO CARD */}
      <motion.div
        className="relative z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center justify-center rounded-lg bg-gray-100 ">
          <div className="relative h-[180px] w-full overflow-hidden rounded-lg bg-gray-100">
            <Link
              href={`/product/${product?.slug}`}
              className="block size-full"
            >
              <Image
                src={product.images[0] || "/images/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-cover"
                loading="lazy"
              />
            </Link>
          </div>
          {oldPrice && (
            <BrandNotificationNumber className="left-3 top-3 w-fit px-1 shadow-2xl">
              -
              {Math.round(
                ((parseFloat(oldPrice) - product.price) /
                  parseFloat(oldPrice)) *
                  100
              )}
              %
            </BrandNotificationNumber>
          )}
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

      {/* testo e dettagli */}
      <div className="relative z-10 mt-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
        {product.productBrand && (
          <p className="text-xs text-gray-500">{product.productBrand.name}</p>
        )}

        <div className="flex items-center space-x-1">
          <span className="text-sm font-bold text-yellow-500">★★★★★</span>
          <span className="text-xs font-semibold text-gray-700">
            ({product.numReviews} recensioni)
          </span>
        </div>

        <p
          className={`text-xs font-medium ${
            product.stock ? "text-green-600" : "text-red-500"
          }`}
        >
          {product.stock ? "Disponibile" : "Non disponibile"}
        </p>

        <div className="flex items-center space-x-2">
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              €{oldPrice}
            </span>
          )}
          <span className="text-lg font-bold text-red-600">
            €{product.price}
          </span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-10 size-14 rounded-full border-2 border-primary-900 bg-white p-1 shadow-2xl">
        <BrandButton
          onClick={() => handlerAddToCart(product)}
          variant="tertiary"
          className="relative size-full shadow-2xl"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin text-white" />
          ) : (
            <ShoppingCart className="size-6 text-white" />
          )}

          {(getProductQuantity ?? 0) > 0 && (
            <BrandNotificationNumber>
              {getProductQuantity}
            </BrandNotificationNumber>
          )}
        </BrandButton>
      </div>
    </BrandCard>
  );
}
