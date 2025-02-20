"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const steps = [
  "User Login",
  "Shipping Address",
  "Payment Method",
  "Place Order",
];

const CheckoutSteps = ({ current = 0 }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // ✅ Recupera i dati dal localStorage al mount
  useEffect(() => {
    const savedSteps = localStorage.getItem("completedCheckoutSteps");
    if (savedSteps) {
      try {
        const parsedSteps = JSON.parse(savedSteps);
        setCompletedSteps(Array.isArray(parsedSteps) ? parsedSteps : []);
      } catch (error) {
        console.error("Errore nel parsing del localStorage:", error);
      }
    }
  }, []);

  // ✅ Aggiorna localStorage solo se lo step non è già salvato
  useEffect(() => {
    setCompletedSteps((prevSteps) => {
      if (!prevSteps.includes(current)) {
        const newSteps = [...prevSteps, current];
        localStorage.setItem(
          "completedCheckoutSteps",
          JSON.stringify(newSteps)
        );
        return newSteps;
      }
      return prevSteps;
    });
  }, [current]);

  return (
    <div className="flex-between mx-auto my-8 w-full flex-col space-y-4 md:flex-row md:items-center  md:space-y-0">
      {/* md:space-x-8 */}
      {steps.map((step, index) => {
        const stepUrl = `/${step.toLowerCase().replace(/\s+/g, "-")}`;
        const isActive = index === current;
        const isCompleted = index < current || completedSteps.includes(index);
        const isClickable = isCompleted || index === current;

        return (
          <div key={index} className="flex w-full items-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                `relative flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-300 w-full ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl"
                    : isCompleted
                      ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md hover:scale-105 cursor-pointer"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`
              )}
            >
              {/* Link se è attivo o già confermato */}
              {isClickable ? (
                <Link href={stepUrl} className="w-full text-center">
                  {step}
                </Link>
              ) : (
                <span className="w-full text-center">{step}</span>
              )}

              {/* ✅ Checkmark sugli step completati */}
              {isCompleted && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -right-3 -top-3 flex size-6 items-center justify-center rounded-full bg-white shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-2.293-2.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.span>
              )}
            </motion.div>

            {/* 🔗 Barra di collegamento tra gli step */}
            {step !== "Place Order" && (
              <motion.hr
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  `h-1 rounded-full transition-all duration-300 w-full   ${
                    isCompleted
                      ? "bg-gradient-to-r from-green-400 to-green-600"
                      : isActive
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                        : "bg-gray-300"
                  }`
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutSteps;
