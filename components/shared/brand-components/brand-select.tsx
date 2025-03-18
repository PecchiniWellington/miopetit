"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import BrandButton from "./brand-button";

interface OptionType {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: OptionType[];
  onOpenChange?: (isOpen: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const BrandSelect = ({
  value,
  onValueChange,
  placeholder = "Select an option",
  options,
  onOpenChange,
  disabled = false,
  className = "",
}: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    if (!disabled) {
      setOpen((prev) => {
        const next = !prev;
        // Evita di chiamare setState esterni durante il render
        setTimeout(() => onOpenChange?.(next), 0);
        return next;
      });
    }
  };
  const handleOptionClick = (val: string) => {
    onValueChange(val);
    setOpen(false);
    onOpenChange?.(false);
  };

  // Close on outside click
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
  }, []);

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <BrandButton tabIndex={0} onClick={toggleOpen}>
        <span>
          {options.find((o) => o.value === value)?.label || placeholder}
        </span>
        <ChevronDown
          className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </BrandButton>

      {open && (
        <div className="absolute z-50 mt-2  w-fit rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <div className="relative max-h-56 overflow-scroll">
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
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 dark:text-gray-200 dark:hover:bg-slate-800"
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
