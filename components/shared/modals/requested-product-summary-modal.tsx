"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { IContributor } from "@/core/validators/contributors.validator";
import BrandButton from "../brand-components/brand-button";

interface RequestedProductSummaryModalProps {
  product: {
    name: string;
    image?: string;
    fundedAmount: number;
    targetAmount: number;
    notes?: string;
    status: "PENDING" | "FUNDED" | "DELIVERED";
  };
  contributor?: IContributor;
}

export default function RequestedProductSummaryModal({
  product,
  contributor,
}: RequestedProductSummaryModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <BrandButton
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="text-sm text-gray-600 hover:text-gray-800"
      >
        Info prodotto
      </BrandButton>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-slate-900"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                >
                  <X className="size-5" />
                </button>

                <div className="flex flex-col gap-4">
                  <div className="relative h-48 w-full overflow-hidden rounded-md">
                    <Image
                      src={product.image || "/images/placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    {product.name}
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {product.notes ||
                      "Questo prodotto è stato richiesto per aiutare gli animali ospitati da questo canile."}
                  </p>

                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <p>
                      🏷️ Stato: <strong>{product.status}</strong>
                    </p>
                    <p>
                      💶 Raccolti: {product.fundedAmount.toFixed(2)}€ su{" "}
                      {product.targetAmount.toFixed(2)}€
                    </p>
                    {contributor && (
                      <p>
                        🐶 Richiesto da: <strong>{contributor.name}</strong>
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
