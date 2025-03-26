"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface BrandCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  variant?: "default" | "admin";
  placeholder?: string;
}

const BrandCheckbox = forwardRef<HTMLInputElement, BrandCheckboxProps>(
  (
    {
      className = "",
      disabled,
      label,
      variant = "default",
      placeholder,
      ...props
    },
    ref
  ) => {
    const wrapperClasses = cn(
      "flex items-center gap-2 text-sm",
      variant === "admin" ? "text-white" : "text-gray-800 dark:text-white",
      disabled && "opacity-50 cursor-not-allowed",
      className
    );

    const checkboxClasses = cn(
      "size-4 rounded-sm border transition-colors focus:outline-none focus:ring-2",
      variant === "admin"
        ? "border-slate-700 bg-slate-900 text-white focus:ring-slate-500 checked:bg-slate-500"
        : "border-slate-300 bg-white text-gray-800 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white checked:bg-indigo-500"
    );

    return (
      <label className={wrapperClasses}>
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          className={checkboxClasses}
          {...props}
        />
        {label && <span>{label || placeholder}</span>}
      </label>
    );
  }
);

BrandCheckbox.displayName = "BrandCheckbox";

export default BrandCheckbox;
