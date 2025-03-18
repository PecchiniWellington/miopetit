"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import BrandBadge from "./brand-badge";

interface OptionType {
  value: string;
  label: string;
}

interface BrandMultipleSelectProps {
  value?: string[];
  options: OptionType[];
  onSelect: (value: string[]) => void;
  placeholder?: string;
  defaultValue?: string[];
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
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>(
    defaultValue.map(
      (value) => options.find((option) => option.value === value)!
    )
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue.length > 0 && !value) {
      const defaultSelections = options.filter((option) =>
        defaultValue.includes(option.value)
      );
      setSelectedOptions(defaultSelections);
    }
  }, [defaultValue, options, value]);

  useEffect(() => {
    if (value) {
      setSelectedOptions(
        options.filter((option) => value.includes(option.value))
      );
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
    onSelect(newSelection.map((opt) => opt.value));
  };

  const baseClasses =
    "block w-full rounded-lg border px-4 py-2 text-sm shadow-sm transition placeholder:text-gray-400 focus:outline-none";

  const buttonStyles =
    variant === "admin"
      ? `border-slate-700 bg-slate-900 text-white focus:border-slate-500 focus:ring-2 focus:ring-slate-500 ${baseClasses}`
      : `border-slate-700 bg-white text-gray-800 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white ${baseClasses}`;

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
          className={`truncate ${selectedOptions.length >= 4 ? "inline-block max-w-[calc(100%-50px)] truncate" : ""}`}
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
            className={`absolute z-50 mt-2 ${variant === "admin" ? "w-full border-slate-700 bg-slate-900 text-white focus:border-slate-500 focus:ring-2 focus:ring-slate-500" : "w-full rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900"}`}
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

      {selectedOptions.length > 0 && (
        <div className="mt-2 flex max-h-32 w-full flex-wrap gap-2 overflow-y-auto">
          {selectedOptions.map((opt) => (
            <BrandBadge
              key={opt.label}
              label={opt.label}
              onCloseBadge={() => handleSelect(opt.value)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
