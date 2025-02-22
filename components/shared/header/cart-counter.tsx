"use client";

import useLocalStorage from "@/hooks/use-local-storage-item";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartCounter() {
  const [storedValue] = useLocalStorage("cart", []);

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart
        height={28}
        width={28}
        className="text-white transition-all duration-300 hover:scale-110"
      />
      <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
        {storedValue.length}
      </span>
    </Link>
  );
}
