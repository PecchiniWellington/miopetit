"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface OptionType {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: OptionType[];
  onOpenChange?: (isOpen: boolean) => void;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "admin";
  btnVariant?:
    | "primary"
    | "secondary"
    | "danger"
    | "confirm"
    | "flat"
    | "warning"
    | "tertiary"
    | "outline"
    | "outline-white"
    | "ghost"
    | "ghost-white";
  defaultValue?: string | string[] | { id: string; name: string }[];
}

const BrandSelect = ({
  value,
  onValueChange,
  placeholder = "Select an option",
  options,
  onOpenChange,
  disabled = false,
  className = "",
  variant = "default",
  defaultValue = "",
  btnVariant,
}: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string>(
    typeof defaultValue === "string" ? defaultValue : ""
  );
  const ref = useRef<HTMLDivElement>(null);
  // Sincronizza il valore esterno (per react-hook-form o simili)
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const toggleOpen = () => {
    if (!disabled) {
      setOpen((prev) => {
        const next = !prev;
        setTimeout(() => onOpenChange?.(next), 0);
        return next;
      });
    }
  };

  const handleOptionClick = (val: string) => {
    setInternalValue(val);
    onValueChange(val);
    setOpen(false);
    onOpenChange?.(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        onOpenChange?.(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const baseClasses =
    "block w-full rounded-lg border px-4 py-2 text-sm  transition placeholder:text-gray-400 focus:outline-none";

  const buttonStyles =
    variant === "admin"
      ? `border-slate-700 bg-slate-900 text-white focus:border-slate-500 focus:ring-2 focus:ring-slate-500 ${baseClasses}`
      : `border-slate-700 bg-white text-gray-800  dark:border-slate-700 dark:bg-slate-900 dark:text-white ${baseClasses}`;

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <button
        type="button"
        tabIndex={0}
        onClick={toggleOpen}
        disabled={disabled}
        className={`flex w-full items-center justify-between px-4 py-2 text-sm  transition-all  ${buttonStyles} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${btnVariant === "ghost" ? "border-0 shadow-none" : "shadow-lg "}`}
      >
        <span>
          {options.find((o) => o.value === internalValue)?.label || placeholder}
        </span>
        <ChevronDown
          className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={`absolute z-50 mt-2 ${variant === "admin" ? "w-full  border-slate-700 bg-slate-900 text-white focus:border-slate-500 focus:ring-2 focus:ring-slate-500" : "w-full min-w-fit rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900"} ${className} `}
        >
          <div className="relative max-h-56 overflow-y-auto">
            {options.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                No options
              </div>
            ) : (
              options.map((option) => (
                <div
                  role="button"
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className={`flex w-full items-center gap-2 px-4 py-2 text-sm ${variant === "admin" ? "text-gray-200 hover:bg-slate-800" : "text-gray-700 hover:bg-slate-100"}`}
                >
                  {option.icon}
                  {option.label}
                </div>
              ))
            )}
          </div>
          <span className="z-10 flex justify-center border-t border-gray-200 p-2 shadow-lg dark:border-gray-700">
            <ChevronDown size={20} color="gray" />
          </span>
        </div>
      )}
    </div>
  );
};

export default BrandSelect;
