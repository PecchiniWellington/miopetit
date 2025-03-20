"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface OptionType {
  value: string;
  label: string;
}

interface BrandMultipleSelectProps {
  value?: { id: string; name: string }[] | string[];
  options: OptionType[];
  onSelect: (value: { id: string; name: string }[]) => void;
  placeholder?: string;
  defaultValue?: { id: string; name: string }[] | string[];
  className?: string;
  variant?: "default" | "admin";
}

export default function BrandMultiSelect({
  value,
  options,
  onSelect,
  placeholder = "Seleziona una o più opzioni",
  defaultValue = [],
  className,
  variant = "default",
}: BrandMultipleSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue && !value) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const defaults = (defaultValue as any[]).map((val) => {
        if (typeof val === "string") {
          return options.find((opt) => opt.value === val)!;
        } else {
          return {
            value: val.id,
            label: val.name,
          };
        }
      });

      setSelectedOptions(defaults);
    }
  }, [defaultValue, options, value]);

  useEffect(() => {
    if (value && Array.isArray(value)) {
      const mapped = value.map((v) => {
        if (typeof v === "string") {
          const opt = options.find((o) => o.value === v);
          return opt
            ? { value: opt.value, label: opt.label }
            : { value: v, label: v };
        } else {
          return { value: v.id, label: v.name };
        }
      });
      setSelectedOptions(mapped);
    }
  }, [value, options]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedValue: string) => {
    let newSelection;
    if (selectedOptions.some((opt) => opt.value === selectedValue)) {
      newSelection = selectedOptions.filter(
        (opt) => opt.value !== selectedValue
      );
    } else {
      newSelection = [
        ...selectedOptions,
        options.find((opt) => opt.value === selectedValue)!,
      ];
    }
    setSelectedOptions(newSelection);
    onSelect(
      newSelection.map((opt) => ({
        id: opt.value,
        name: opt.label,
      }))
    );
  };

  const baseClasses =
    "block w-full rounded-lg border px-4 py-2 text-sm shadow-lg transition placeholder:text-gray-400 focus:outline-none";

  const buttonStyles =
    variant === "admin"
      ? `border-slate-700 bg-slate-900 text-white focus:border-slate-500 focus:ring-2 focus:ring-slate-500 ${baseClasses}`
      : `border-slate-700 bg-white text-gray-800 dark:border-slate-700 dark:bg-slate-900 dark:text-white ${baseClasses}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative w-full ${className}`}
      ref={dropdownRef}
    >
      <div
        className={`flex items-center justify-between px-4 py-2 text-sm ${buttonStyles} cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`truncate ${
            selectedOptions.length >= 4
              ? "inline-block max-w-[calc(100%-50px)] truncate"
              : ""
          }`}
        >
          {selectedOptions.length > 0
            ? selectedOptions
                .map((opt) => opt.label)
                .slice(0, 4)
                .join(", ") + (selectedOptions.length > 4 ? "..." : "")
            : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="size-6 text-gray-600" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 mt-2 ${
              variant === "admin"
                ? "w-full border-slate-700 bg-slate-900 text-white focus:border-slate-500 focus:ring-2 focus:ring-slate-500"
                : "w-full rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900"
            }`}
          >
            <ul className="max-h-40 w-full overflow-y-auto">
              {options.length > 0 ? (
                options.map((option) => (
                  <li
                    key={option.value}
                    className={`cursor-pointer px-4 py-3 transition-all ${
                      selectedOptions.some((opt) => opt.value === option.value)
                        ? "bg-p font-bold text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </li>
                ))
              ) : (
                <li className="p-4 text-center">Nessun risultato</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
