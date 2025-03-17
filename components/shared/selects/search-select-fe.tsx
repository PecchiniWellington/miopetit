"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../../ui/input";

interface SearchSelectProps {
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  className?: string;
}

export default function SearchSelectFe({
  options,
  onSelect,
  placeholder = "Seleziona un'opzione",
  value,
  defaultValue,
  className,
}: SearchSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(
    value || defaultValue || null
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    } else if (defaultValue) {
      setSelectedOption(defaultValue);
    }
  }, [value, defaultValue]);

  const filteredOptions = options?.filter((option) =>
    option?.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (selectedValue: string) => {
    setSelectedOption(selectedValue);
    setIsOpen(false);
    onSelect(selectedValue);
  };

  return (
    <div className="relative w-full">
      {/* 📌 Trigger per aprire il dropdown */}
      <div className={`${className}`} onClick={() => setIsOpen(!isOpen)}>
        <span>
          {selectedOption
            ? options.find((opt) => opt.value === selectedOption)?.label ||
              selectedOption
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
            {/* 🔍 Input di ricerca */}
            <div className="relative flex items-center">
              <Search className="absolute left-3 text-gray-500" />
              <Input
                type="text"
                placeholder="Cerca..."
                className="w-full border-none py-2 pl-10 pr-3 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* 📌 Lista opzioni */}
            <ul className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`cursor-pointer px-4 py-3 transition-all ${
                      selectedOption === option.value
                        ? "bg-gray-200 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </li>
                ))
              ) : (
                <li className="p-4 text-center text-gray-500">
                  Nessun risultato
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
