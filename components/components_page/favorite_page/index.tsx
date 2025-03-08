"use client";

import { IProduct } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";

export const ConfigFavoritePage = ({
  relatedProducts,
}: {
  relatedProducts: IProduct[];
}) => {
  const [storedFavorites] = useLocalStorage<IProduct[]>("favorites", []);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900">⭐ I tuoi Preferiti</h1>

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
              {storedFavorites.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-lg border p-4 shadow-md transition hover:shadow-lg"
                >
                  <button
                    /*  onClick={() => removeFavorite(product.id)} */
                    className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
                  >
                    <Trash2 className="size-5" />
                  </button>

                  {product.images && (
                    <Image
                      src={product.images[0]}
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
                    {product.productBrand?.name ?? "Marca sconosciuta"}
                  </p>

                  {/* Controllo su price */}
                  <span className="text-lg font-bold text-red-600">
                    €{Number(product.price ?? 0).toFixed(2)}
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

      {/* Sezione Prodotti Correlati */}
      <h2 className="mt-10 text-2xl font-bold text-gray-900">
        🔗 Prodotti Correlati
      </h2>
      <p className="text-gray-600">
        Scopri prodotti simili a quelli che ti piacciono.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            className="relative rounded-lg border p-4 shadow-md transition hover:shadow-lg"
          >
            {/* Immagine */}
            <div className="flex items-center justify-center bg-gray-100 p-4">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={120}
                height={120}
                className="object-contain"
                loading="lazy"
              />
            </div>

            {/* Dettagli Prodotto */}
            <h3 className="mt-3 text-sm font-semibold text-gray-900">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500">
              {product.productBrand?.name}
            </p>

            {/* Prezzo */}
            <span className="text-lg font-bold text-red-600">
              €{Number(product.price).toFixed(2)}
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
    </div>
  );
};
