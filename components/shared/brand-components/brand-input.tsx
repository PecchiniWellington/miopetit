"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: "default" | "admin"; // <-- aggiunta della variante
}

const BrandInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const baseClasses =
      "block w-full rounded-lg border px-4 py-2 text-sm shadow-lg  transition placeholder:text-gray-400 focus:outline-none";

    const variants = {
      default:
        "border-slate-300 bg-white text-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-gray-500",
      admin:
        "border-slate-700 bg-slate-900 text-white focus:border-slate-500 focus:ring-2 focus:ring-slate-500",
    };

    return (
      <input
        ref={ref}
        {...props}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      />
    );
  }
);

BrandInput.displayName = "BrandInput";

export default BrandInput;
