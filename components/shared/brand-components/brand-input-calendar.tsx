"use client";
import { CalendarIcon } from "lucide-react";
import { useRef } from "react";

const BrandInputCalendar = ({
  field,
  variant = "default",
  className,
  disabled = false,
  placeholder,
  onChange,
  onBlur,
}: {
  field: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
  };
  variant?: "default" | "admin";
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleIconClick = () => {
    inputRef.current?.showPicker?.();
  };
  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="date"
        disabled={disabled}
        value={
          field.value ? new Date(field.value).toISOString().split("T")[0] : ""
        }
        onChange={(e) => {
          field.onChange(e.target.value);
          onChange?.(e);
        }}
        onBlur={(e) => {
          field.onBlur();
          onBlur?.(e);
        }}
        placeholder={placeholder}
        className={`block w-full rounded-lg border px-4 py-2 pr-10 text-sm shadow-lg transition placeholder:text-gray-400 focus:outline-none ${
          variant === "admin"
            ? "border-slate-700 bg-slate-900 text-white focus:border-slate-500 focus:ring-2 focus:ring-slate-500"
            : "border-slate-300 bg-white text-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
        } ${className}`}
      />
      <button
        type="button"
        onClick={handleIconClick}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
      >
        <CalendarIcon className="size-5" />
      </button>
    </div>
  );
};

export default BrandInputCalendar;
