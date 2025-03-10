"use client";
import { IProduct } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";

export const FavoritesTab = () => {
  /* const { favorites, removeFavorite } = useIndexedDB(); */
  const [storedFavorites] = useLocalStorage("favorites", []);
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        ❤️ I tuoi preferiti
      </h2>

      {storedFavorites.length === 0 ? (
        <p className="mt-4 text-gray-600">
          Non hai ancora aggiunto prodotti ai preferiti.
        </p>
      ) : (
        <div className="mt-6 ">
          {storedFavorites.length === 0 ? (
            <p className="mt-4 text-gray-600">
              Non hai ancora aggiunto prodotti ai preferiti.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {storedFavorites?.map((product: IProduct) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-lg border p-4 shadow-md transition hover:shadow-lg"
                >
                  <button
                    /*   onClick={() => removeFavorite(product.id)} */
                    className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
                  >
                    <Trash2 className="size-5" />
                  </button>

                  {Array.isArray(product.images) ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name || "Prodotto"}
                      width={120}
                      height={120}
                      className="object-contain"
                      loading="lazy"
                    />
                  ) : (
                    product.images && (
                      <Image
                        src={product.images}
                        alt={product.name || "Prodotto"}
                        width={120}
                        height={120}
                        className="object-contain"
                        loading="lazy"
                      />
                    )
                  )}

                  <h3 className="mt-3 text-sm font-semibold text-gray-900">
                    {product.name ?? "Nome non disponibile"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {typeof product.productBrand === "string"
                      ? product.productBrand
                      : "Marca sconosciuta"}
                  </p>

                  {/* Controllo su price */}
                  <span className="text-lg font-bold text-red-600">
                    €{(parseFloat(product.price) ?? 0).toFixed(2)}
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
