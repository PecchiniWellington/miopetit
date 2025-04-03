"use client";

import { CalendarIcon } from "lucide-react";
import { InputHTMLAttributes, forwardRef, useRef } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isNumber?: boolean;
  isDate?: boolean;
  variant?: "default" | "admin";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const BrandInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      className = "",
      variant = "default",
      type = "text",
      isNumber = false,
      isDate = false,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const inputType = isDate ? "date" : isNumber ? "number" : type;
    const inputRef = useRef<HTMLInputElement | null>(null);

    const baseClasses =
      "block w-full rounded-lg border px-4 py-2 text-sm shadow-lg transition placeholder:text-gray-400 focus:outline-none";

    const variants = {
      default:
        "border-slate-300 bg-white text-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-gray-500",
      admin:
        "border-slate-700 bg-slate-900 text-white focus:border-slate-500 focus:ring-2 focus:ring-slate-500",
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        inputType === "number" &&
        !/[0-9]/.test(event.key) &&
        event.key !== "Backspace"
      ) {
        event.preventDefault();
      }
    };

    const handleIconClick = () => {
      if (inputRef.current) {
        inputRef.current.showPicker?.();
      }
    };

    return (
      <div className="relative w-full">
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref)
              if (node) {
                (ref as React.MutableRefObject<HTMLInputElement>).current =
                  node;
              }
          }}
          {...props}
          type={inputType}
          className={`${baseClasses} ${variants[variant]} ${className} pr-10`}
          onKeyDown={handleKeyDown}
          onChange={onChange}
          onBlur={onBlur}
        />
        {isDate && (
          <button
            type="button"
            onClick={handleIconClick}
            className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-slate-600 hover:bg-slate-500 focus:outline-none"
          >
            <CalendarIcon className="size-4 text-white" />
          </button>
        )}
      </div>
    );
  }
);

BrandInput.displayName = "BrandInput";

export default BrandInput;
