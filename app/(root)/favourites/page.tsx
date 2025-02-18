"use client";

import { useIndexedDB } from "@/hooks/use-indexDB";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  image: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
}

// Dati di esempio
const relatedProducts: Product[] = [
  {
    id: 3,
    image: "https://utfs.io/f/RnH9VIVP0zpxL8Sd59Kp86NzgPOkKSsma1BjXoZe9tA3HMCW",
    name: "Trainer Natural Medium Adult",
    brand: "Trainer",
    price: 44.99,
  },
  {
    id: 4,
    image: "https://utfs.io/f/RnH9VIVP0zpxL8Sd59Kp86NzgPOkKSsma1BjXoZe9tA3HMCW",
    name: "Farmina N&D Grain Free",
    brand: "Farmina",
    price: 59.99,
  },
];

export default function FavouritesPage() {
  // Usiamo il custom hook per IndexedDB
  const { favorites, removeFavorite } = useIndexedDB();

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900">⭐ I tuoi Preferiti</h1>

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
                src={product.image}
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
            <p className="text-xs text-gray-500">{product.brand}</p>

            {/* Prezzo */}
            <span className="text-lg font-bold text-red-600">
              €{product.price.toFixed(2)}
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
}
