"use client";

import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  image: string;
  name: string;
  brand: string;
  rating: number;
  reviews: number;
  availability: string;
  price: number;
  oldPrice?: number;
  pricePerKg?: string;
}

export default function ProductCard({
  image,
  name,
  brand,
  reviews,
  availability,
  price,
  oldPrice,
  pricePerKg,
}: ProductCardProps) {
  const [isWishlisted, setWishlisted] = useState(false);

  return (
    <Card className="relative overflow-hidden rounded-lg border p-4 shadow-sm transition hover:shadow-md">
      {/* Wishlist Icon */}
      <button
        onClick={() => setWishlisted(!isWishlisted)}
        className={`absolute right-4 top-4 transition ${
          isWishlisted ? "text-red-600" : "text-gray-500 hover:text-black"
        }`}
      >
        <Heart className="size-6" />
      </button>

      {/* Modale di anteprima */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="flex items-center justify-center bg-gray-50 p-4">
                <Image
                  src={image}
                  alt={name}
                  width={150}
                  height={150}
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <button className="absolute right-4 top-4 text-gray-500 hover:text-black">
            <X className="size-6" />
          </button>
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={image}
              alt={name}
              width={300}
              height={300}
              className="object-contain"
            />
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{brand}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Details */}
      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
        <p className="text-xs text-gray-500">{brand}</p>

        {/* Ratings */}
        <div className="flex items-center space-x-1">
          <span className="text-sm font-bold text-green-600">★★★★★</span>
          <span className="text-xs font-semibold text-gray-700">
            {reviews} recensioni
          </span>
        </div>

        {/* Availability */}
        <p className="text-xs text-green-600">{availability}</p>

        {/* Price */}
        <div className="flex items-center space-x-2">
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              €{oldPrice.toFixed(2)}
            </span>
          )}
          <span className="text-lg font-bold text-red-600">
            €{price.toFixed(2)}
          </span>
        </div>
        {pricePerKg && (
          <p className="text-xs text-gray-500">({pricePerKg}/KG)</p>
        )}
      </div>

      {/* Add to Cart Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-yellow-400 p-2 transition hover:bg-yellow-500"
      >
        <ShoppingCart className="size-5 text-black" />
      </motion.button>
    </Card>
  );
}
