import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const mockFavorites = [
  {
    id: "1",
    name: "Cibo Secco Monge",
    price: "€19.99",
    image: "/images/product1.png",
    slug: "cibo-secco-monge",
  },
  {
    id: "2",
    name: "Croccantini Royal Canin",
    price: "€24.50",
    image: "/images/product2.png",
    slug: "croccantini-royal-canin",
  },
  {
    id: "3",
    name: "Snack Naturali per Cani",
    price: "€9.99",
    image: "/images/product3.png",
    slug: "snack-naturali-cani",
  },
  {
    id: "4",
    name: "Umido Schesir per Gatti",
    price: "€15.90",
    image: "/images/product4.png",
    slug: "umido-schesir-gatti",
  },
];

export const FavoritesTab = () => {
  const [favorites, setFavorites] = useState(mockFavorites);

  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        ❤️ I tuoi preferiti
      </h2>
      {favorites.length === 0 ? (
        <p className="mt-4 text-gray-600">Non hai ancora aggiunto preferiti.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="relative flex flex-col items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-md transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-900"
            >
              {/* 🔹 Immagine prodotto */}
              <Link href={`/product/${fav.slug}`} className="block">
                <Image
                  src={fav.image}
                  alt={fav.name}
                  width={120}
                  height={120}
                  className="size-32 rounded-lg object-cover transition-transform hover:scale-105"
                />
              </Link>

              {/* 🔹 Dettagli prodotto */}
              <div className="mt-3 text-center">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                  {fav.name}
                </h3>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {fav.price}
                </p>
              </div>

              {/* 🔹 Azioni rapide */}
              <div className="mt-4 flex w-full items-center justify-between gap-2">
                <Button
                  className="flex-1 bg-indigo-600 text-white transition-all hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                  size="sm"
                >
                  <ShoppingCart className="mr-2 size-4" />
                  Aggiungi al Carrello
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromFavorites(fav.id)}
                >
                  <Trash className="size-5 text-red-500 hover:text-red-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
