"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

const CheckoutSteps = ({ current = 0 }) => {
  return (
    <div className="flex-between mx-auto my-8 w-full  flex-col space-y-4 md:flex-row md:items-center md:space-x-8 md:space-y-0">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <React.Fragment key={index}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                `relative flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition-all duration-300 w-full
                ${
                  index === current
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl"
                    : index < current
                      ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-500"
                }
              `
              )}
            >
              {index <= current && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute  -right-3 -top-3 flex size-6 items-center justify-center rounded-full bg-white shadow-md"
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
              {step}
            </motion.div>
            {step !== "Place Order" && (
              <motion.hr
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  `h-1 rounded-full transition-all duration-300  w-full
                  ${
                    index < current
                      ? "bg-gradient-to-r from-green-400 to-green-600 "
                      : index === current
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                        : "bg-gray-300"
                  }`
                )}
              />
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default CheckoutSteps;
