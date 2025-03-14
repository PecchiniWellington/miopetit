"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface OptionType {
  value: string;
  label: string;
}

interface CustomMultipleSelectProps {
  value: string[];
  options: OptionType[];
  onSelect: (value: string[]) => void;
  placeholder?: string;
  defaultValue?: string[];
}

export default function CustomMultipleSelectFe({
  value,
  options,
  onSelect,
  placeholder = "Seleziona una o più opzioni",
  defaultValue = [],
}: CustomMultipleSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Imposta il valore di default solo una volta all'inizio
    if (defaultValue.length > 0) {
      const defaultSelections = options.filter((option) =>
        defaultValue.includes(option.value)
      );
      setSelectedOptions(defaultSelections);
    }
  }, [defaultValue, options]);

  useEffect(() => {
    // Aggiorna le selezioni quando cambia il valore esterno
    setSelectedOptions(
      options.filter((option) => value.includes(option.value))
    );
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
      // Se è già selezionato, lo rimuoviamo
      newSelection = selectedOptions.filter(
        (opt) => opt.value !== selectedValue
      );
    } else {
      // Altrimenti lo aggiungiamo
      newSelection = [
        ...selectedOptions,
        options.find((opt) => opt.value === selectedValue)!,
      ];
    }

    setSelectedOptions(newSelection);
    onSelect(newSelection.map((opt) => opt.value));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full"
      ref={dropdownRef}
    >
      {/* 📌 Trigger per aprire il dropdown */}
      <div
        className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-600 bg-white p-3 shadow-md transition-all hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {selectedOptions.length > 0
            ? selectedOptions.map((opt) => opt.label).join(", ")
            : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="size-5 text-gray-600" />
        </motion.div>
      </div>

      {/* 📌 Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 z-10 mt-2 w-full overflow-hidden rounded-xl border border-gray-600 bg-white shadow-xl"
          >
            <ul className="max-h-60 overflow-y-auto">
              {options.length > 0 ? (
                options.map((option) => (
                  <li
                    key={option.value}
                    className={`cursor-pointer px-4 py-3 transition-all ${
                      selectedOptions.some((opt) => opt.value === option.value)
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100"
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

      {/* 📌 Selezioni attive */}
      {selectedOptions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedOptions.map((opt) => (
            <motion.div
              key={opt.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center rounded-full bg-blue-500 px-3 py-1 text-white"
            >
              {opt.label}
              <XCircle
                className="ml-2 size-4 cursor-pointer text-gray-300 hover:text-red-500"
                onClick={() => handleSelect(opt.value)}
              />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
