"use client";

import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface BrandTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const BrandTextArea = forwardRef<HTMLTextAreaElement, BrandTextAreaProps>(
  ({ className = "", disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        {...props}
        className={cn(
          "min-h-[120px] w-full resize-none rounded-md border border-slate-700 bg-transparent px-3 py-2 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:text-white dark:placeholder-slate-500",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      />
    );
  }
);

BrandTextArea.displayName = "BrandTextArea";

export default BrandTextArea;
