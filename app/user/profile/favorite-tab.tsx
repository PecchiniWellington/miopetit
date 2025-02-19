"use client";
import { useIndexedDB } from "@/hooks/use-indexDB";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";

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
  const { favorites, removeFavorite } = useIndexedDB();

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        ❤️ I tuoi preferiti
      </h2>

      {favorites.length === 0 ? (
        <p className="mt-4 text-gray-600">
          Non hai ancora aggiunto prodotti ai preferiti.
        </p>
      ) : (
        <div className="mt-6 ">
          {favorites.length === 0 ? (
            <p className="mt-4 text-gray-600">
              Non hai ancora aggiunto prodotti ai preferiti.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {favorites.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-lg border p-4 shadow-md transition hover:shadow-lg"
                >
                  <button
                    onClick={() => removeFavorite(product.id)}
                    className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
                  >
                    <Trash2 className="size-5" />
                  </button>

                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name || "Prodotto"}
                      width={120}
                      height={120}
                      className="object-contain"
                      loading="lazy"
                    />
                  )}

                  <h3 className="mt-3 text-sm font-semibold text-gray-900">
                    {product.name ?? "Nome non disponibile"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {product.brand ?? "Marca sconosciuta"}
                  </p>

                  {/* Controllo su price */}
                  <span className="text-lg font-bold text-red-600">
                    €{(product.price ?? 0).toFixed(2)}
                  </span>

                  {/* Bottone carrello */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-black p-2 transition hover:bg-gray-800"
                  >
                    <ShoppingCart className="size-5 text-white" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
