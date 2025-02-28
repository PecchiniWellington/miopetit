"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CreditCard, MapPin, PackageCheck, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const steps = [
  { label: "Login", href: "sign-in", icon: <User className="size-5" /> },
  {
    label: "Address",
    href: "shipping-address",
    icon: <MapPin className="size-5" />,
  },
  {
    label: "Payment",
    href: "payment-method",
    icon: <CreditCard className="size-5" />,
  },
  {
    label: "Order",
    href: "place-order",
    icon: <PackageCheck className="size-5" />,
  },
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
    <div className="mx-auto my-8 flex w-full max-w-4xl  items-center md:flex-row md:items-center md:space-x-6 md:space-y-0">
      {steps.map((step, index) => {
        const isActive = index === current;
        const isCompleted = index < current || completedSteps.includes(index);

        return (
          /* 🔗 Barra di collegamento tra gli step */
          <div
            key={index}
            className="relative flex w-full items-center justify-center"
          >
            {index < steps.length - 1 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  `absolute hidden md:flex left-0 top-1/2 h-1 transform -translate-y-1/2 transition-all duration-300 md:left-40 md:-translate-x-1/2 ${
                    isCompleted
                      ? "bg-gradient-to-r from-green-400 to-green-600"
                      : isActive
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                        : "bg-gray-300"
                  }`
                )}
                style={{ width: "100%", zIndex: -1 }}
              />
            )}

            {/* 🟢 Step */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                `relative z-10 flex  max-w-xs flex-col items-center justify-center rounded-full p-1 md:px-4 md:py-3 text-sm font-semibold shadow-lg transition-all duration-300 md:w-48 w-16 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl"
                    : isCompleted
                      ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md hover:scale-105 cursor-pointer"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`
              )}
            >
              {/* 📱 Mostra icona e testo in linea su mobile */}
              <Link
                href={step.href}
                className="flex w-full flex-col items-center justify-center gap-0 md:flex-row md:gap-2"
              >
                <span>{step.icon}</span>
                <span className="text-center text-[10px] md:block md:text-base">
                  {step.label}
                </span>
              </Link>

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
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutSteps;
