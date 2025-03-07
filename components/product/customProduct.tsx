"use client";

import { Card } from "@/components/ui/card";
import { addItemToCart } from "@/core/actions/cart/cart.actions";
import { ICartItem, IProduct } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { default as image, default as Image } from "next/image";
import Link from "next/link";
import { startTransition, useEffect, useState } from "react";

export default function CustomProduct({
  product,
  getProductQuantity,
  userId,
}: {
  product: IProduct;
  getProductQuantity: number;
  userId?: string;
}) {
  const [isWishlisted, setWishlisted] = useState(false);
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
    startTransition(async () => {
      const updatedCart = storedValue.map((cartItem) =>
        cartItem.productId === item.id
          ? { ...cartItem, qty: cartItem.qty + 1 }
          : cartItem
      );
      if (userId) {
        await addItemToCart({ ...item, qty: 1, productId: item.id });
      } else {
        setStoredValue(updatedCart);
      }
    });
  };

  /* const { translatedText: translatedDesc, loading: loadingDesc } =
    useTranslateProduct(description, "en"); */
  const oldPrice =
    product.percentageDiscount > 0
      ? (
          parseFloat(product.price) /
          (1 - product.percentageDiscount / 100)
        ).toFixed(2)
      : null;

  return (
    <Card className="relative z-10 overflow-hidden rounded-xl border bg-white p-4 shadow-md transition hover:shadow-lg">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <div className="relative flex items-center justify-center rounded-lg bg-gray-100 p-6">
          {oldPrice && (
            <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow">
              -
              {Math.round(
                ((parseFloat(oldPrice) - parseFloat(product.price)) /
                  parseFloat(oldPrice)) *
                  100
              )}
              %
            </span>
          )}

          <Link href={`/product/${product?.slug}`}>
            {Array.isArray(image) ? (
              <Image
                src={image[0] || "/images/placeholder.jpg"}
                alt={product.name}
                width={180}
                height={180}
                className="object-contain"
                loading="lazy"
              />
            ) : (
              <Image
                src={product.images[0] || "/images/placeholder.jpg"}
                alt={product.name}
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

        {/*  {product.pricePerKg && <p className="text-xs text-gray-500">({pricePerKg})</p>} */}
      </div>

      <motion.button
        onClick={() => handlerAddToCart(product)}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-4 right-4 flex size-12 items-center justify-center rounded-full bg-black p-2 transition hover:bg-gray-800"
      >
        <ShoppingCart className="size-6 text-white" />

        {getProductQuantity > 0 && (
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {getProductQuantity}
          </span>
        )}
      </motion.button>
    </Card>
  );
}
