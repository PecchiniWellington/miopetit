"use client";

import useLocalStorage from "@/hooks/use-local-storage";
import { Heart } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import BrandNotificationNumber from "../notification-number";

export default function FavoritesCounter() {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [storedFavorites] = useLocalStorage("favorites", []);
  const locale = useLocale();

  useEffect(() => {
    const loadFavorites = async () => {
      setFavoriteCount(storedFavorites.length);
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
  }, [storedFavorites]);

  if (favoriteCount === 0) {
    return (
      <div className="relative cursor-not-allowed opacity-20">
        <Heart height={28} width={28} className="text-white" />
      </div>
    );
  }

  return (
    <Link href={`/${locale}/user/profile#favorites`} className="relative">
      <Heart
        height={28}
        width={28}
        className="text-white transition-all duration-300 hover:scale-110"
      />
      {favoriteCount > 0 && (
        <BrandNotificationNumber>{favoriteCount}</BrandNotificationNumber>
      )}
    </Link>
  );
}
