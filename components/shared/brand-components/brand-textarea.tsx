"use client";

import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface BrandTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  variant?: "default" | "admin";
}

const BrandTextArea = forwardRef<HTMLTextAreaElement, BrandTextAreaProps>(
  ({ className = "", disabled, variant = "default", ...props }, ref) => {
    const baseClasses =
      "min-h-[120px] w-full resize-none rounded-md px-3 py-2 text-sm shadow transition focus:outline-none";

    const styles =
      variant === "admin"
        ? "border border-slate-700 bg-slate-900 text-white placeholder:text-gray-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-500 "
        : "border border-slate-300 bg-white text-gray-800 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        {...props}
        className={cn(
          baseClasses,
          styles,
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      />
    );
  }
);

BrandTextArea.displayName = "BrandTextArea";

export default BrandTextArea;
