"use client";

import { useIndexedDBCart } from "@/hooks/use-indexCart";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartCounter() {
  const { cartProduct, dbError } = useIndexedDBCart();
  const [favoriteCount, setFavoriteCount] = useState(0);
  useEffect(() => {
    const loadCartProduct = async () => {
      setFavoriteCount(cartProduct.length);
    };

    loadCartProduct();

    const updateCount = (event: Event) => {
      const newCount = (event as CustomEvent).detail;
      setFavoriteCount(newCount);
    };

    window.addEventListener("cartProductUpdated", updateCount);

    return () => {
      window.removeEventListener("cartProductUpdated", updateCount);
    };
  }, [cartProduct]);

  if (dbError) {
    return (
      <div className="relative cursor-not-allowed opacity-50">
        <Heart height={28} width={28} className="text-gray-500" />
      </div>
    );
  }

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart
        height={28}
        width={28}
        className="text-white transition-all duration-300 hover:scale-110"
      />
      <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
        {favoriteCount}
      </span>
    </Link>
  );
}
