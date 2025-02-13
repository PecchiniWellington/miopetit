"use client";

import { useState } from "react";
import Select, { SingleValue } from "react-select";

const options = [
  { value: "cane", label: "Cane" },
  { value: "gatto", label: "Gatto" },
  { value: "uccello", label: "Uccello" },
  { value: "pesce", label: "Pesce" },
];

interface OptionType {
  value: string;
  label: string;
}

interface CustomSelectProps {
  onChange: (value: string) => void;
}

export default function CustomSelect({ onChange }: CustomSelectProps) {
  const [, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const handleChange = (selected: SingleValue<OptionType>) => {
    setSelectedOption(selected);
    onChange(selected?.value || "");
  };

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  return (
    <div className="w-full">
      <Select
        styles={{
          control: (provided) => ({
            ...provided,
            color: `#ffff`,
            backgroundColor: `#1F2937`,
            border: "1px solid #1F2937",
          }),
          menu: (provided) => ({
            ...provided,
            color: "white",
            backgroundColor: `#1F2937`,
          }),
          option: (provided, state) => ({
            ...provided,
            color: "white",
            backgroundColor: state.isSelected
              ? `#1F2937`
              : state.isFocused
                ? `#1F2937`
                : `#1F2937`,
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "white",
          }),
          input: (provided) => ({
            ...provided,
            color: "white", // Set the input text color to white
          }),
        }}
        className="w-full text-white"
        options={options}
        value={selectedOption}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable
        placeholder="Seleziona un'opzione o scrivi..."
      />
    </div>
  );
}
