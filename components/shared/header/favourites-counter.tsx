"use client";

import { useIndexedDB } from "@/hooks/use-indexDB";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FavoritesCounter() {
  const { favorites, dbError } = useIndexedDB();
  const [favoriteCount, setFavoriteCount] = useState(0);
  useEffect(() => {
    const loadFavorites = async () => {
      setFavoriteCount(favorites.length);
    };

    loadFavorites();

    const updateCount = (event: Event) => {
      const newCount = (event as CustomEvent).detail;
      setFavoriteCount(newCount);
    };

    window.addEventListener("favoritesUpdated", updateCount);

    return () => {
      window.removeEventListener("favoritesUpdated", updateCount);
    };
  }, [favorites]);

  if (dbError) {
    return (
      <div className="relative cursor-not-allowed opacity-50">
        <Heart height={28} width={28} className="text-gray-500" />
      </div>
    );
  }

  return (
    <Link href="/favourites" className="relative">
      <Heart
        height={28}
        width={28}
        className="text-white transition-all duration-300 hover:scale-110"
      />
      {favoriteCount > 0 && (
        <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {favoriteCount}
        </span>
      )}
    </Link>
  );
}
