"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Product {
  id: number;
  image: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
}

const favouriteProducts: Product[] = [
  {
    id: 1,
    image: "https://utfs.io/f/RnH9VIVP0zpxL8Sd59Kp86NzgPOkKSsma1BjXoZe9tA3HMCW",
    name: "Monge Natural Superpremium Adult",
    brand: "Monge",
    price: 49.99,
    oldPrice: 54.99,
  },
  {
    id: 2,
    image: "https://utfs.io/f/RnH9VIVP0zpxL8Sd59Kp86NzgPOkKSsma1BjXoZe9tA3HMCW",
    name: "Royal Canin Maxi Puppy",
    brand: "Royal Canin",
    price: 39.99,
  },
];

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
  {
    id: 5,
    image: "https://utfs.io/f/RnH9VIVP0zpxL8Sd59Kp86NzgPOkKSsma1BjXoZe9tA3HMCW",
    name: "Trainer Natural Medium Adult",
    brand: "Trainer",
    price: 44.99,
  },
];

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState(favouriteProducts);

  const removeFromFavourites = (id: number) => {
    setFavourites(favourites.filter((product) => product.id !== id));
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900">⭐ I tuoi Preferiti</h1>

      {favourites.length === 0 ? (
        <p className="mt-4 text-gray-600">
          Non hai ancora aggiunto prodotti ai preferiti.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favourites.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              className="relative rounded-lg border p-4 shadow-md transition hover:shadow-lg"
            >
              {/* Rimuovi dai preferiti */}
              <button
                onClick={() => removeFromFavourites(product.id)}
                className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
              >
                <Trash2 className="size-5" />
              </button>

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

              {/* Prezzi */}
              <div className="mt-2 flex items-center space-x-2">
                {product.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    €{product.oldPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-lg font-bold text-red-600">
                  €{product.price.toFixed(2)}
                </span>
              </div>

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

            {/* Prezzi */}
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-lg font-bold text-red-600">
                €{product.price.toFixed(2)}
              </span>
            </div>

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

      {/* Sezione Prodotti Acquistati di recente */}
      <h2 className="mt-10 text-2xl font-bold text-gray-900">
        🛍 Prodotti Acquistati di recente
      </h2>
      <p className="text-gray-600">Scopri prodotti che hai acquistato.</p>

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

            {/* Prezzi */}
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-lg font-bold text-red-600">
                €{product.price.toFixed(2)}
              </span>
            </div>

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
