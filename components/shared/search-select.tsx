"use client";

import { useState, useEffect } from "react";
import { Input } from "../ui/input";

interface SearchSelectProps {
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
  placeholder?: string;
  value?: string;
}

export default function SearchSelect({
  options,
  onSelect,
  placeholder,
  value,
}: SearchSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(
    value || null
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    }
  }, [value]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (selectedValue: string) => {
    setSelectedOption(selectedValue);
    setIsOpen(false);
    onSelect(selectedValue);
  };

  return (
    <div className="relative w-full max-w-sm min-w-[400px]">
      <div
        className="border border-slate-700 bg-transparent rounded-md p-2 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white">
          {selectedOption
            ? options.find((opt) => opt.value === selectedOption)?.label ||
              selectedOption
            : placeholder || "Select an option"}
        </span>
        <span className="text-gray-500">▼</span>
      </div>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-slate-700 rounded-md shadow-lg z-10">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border-none focus:outline-none bg-gray-900 rounded-b-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="max-h-60 overflow-y-auto border-t border-slate-700">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="p-2 cursor-pointer hover:bg-slate-900"
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500 text-center">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
