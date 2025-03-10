"use client";

import { ICartItem } from "@/core/validators";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartCounter({
  countLoggedUser,
}: {
  countLoggedUser: number;
}) {
  const storedValue =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [];
  const countCart = storedValue.reduce(
    (acc: number, item: ICartItem) => acc + item.qty,
    0
  );

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart
        height={28}
        width={28}
        className="text-white transition-all duration-300 hover:scale-110"
      />
      <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
        {countLoggedUser ? countLoggedUser : countCart || 0}
      </span>
    </Link>
  );
}
