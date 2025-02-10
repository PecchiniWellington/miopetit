"use client";

import Select, { MultiValue } from "react-select";

interface OptionType {
  value: string;
  label: string;
}

interface CustomMultipleSelectProps {
  value: string[]; // Array di valori selezionati
  options: OptionType[];
  onSelect: (value: string[]) => void;
  placeholder?: string;
}

export default function CustomMultipleSelect({
  value,
  options,
  onSelect,
  placeholder = "Choose an option",
}: CustomMultipleSelectProps) {
  // Convertiamo `value` in formato compatibile con react-select
  const selectedOptions = options.filter((option) =>
    value.includes(option.value)
  );

  const handleChange = (selected: MultiValue<OptionType>) => {
    const selectedValues = selected.map((option) => option.value);
    onSelect(selectedValues);
  };

  /* const removeBadge = (valueToRemove: string) => {
    const updatedValues = value.filter((val) => val !== valueToRemove);
    onSelect(updatedValues);
  };
 */
  return (
    <div className="w-full">
      <Select
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: `#1F2937`,
            border: "1px solid #1F2937",
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: `#1F2937`,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? `#374151` : `#1F2937`,
            color: "white",
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: `#4B5563`,
            color: "white",
            borderRadius: "5px",
            padding: "2px 5px",
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: "white",
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            color: "white",
            cursor: "pointer",
            ":hover": {
              backgroundColor: "red",
              color: "white",
            },
          }),
          input: (provided) => ({
            ...provided,
            color: "white",
          }),
        }}
        className="w-full text-white"
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        isMulti
        placeholder={placeholder}
      />

      {/* Badges per i valori selezionati */}
      {/* <div className="mt-2 flex flex-wrap gap-2">
        {selectedOptions.map((option) => (
          <div
            key={option.value}
            className="flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-1 text-white"
          >
            {option.label}
            <button onClick={() => removeBadge(option.value)}>
              <X className="size-4 cursor-pointer text-white hover:text-red-400" />
            </button>
          </div>
        ))}
      </div> */}
    </div>
  );
}
