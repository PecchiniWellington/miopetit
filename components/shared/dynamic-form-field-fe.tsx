import { Control, Controller, Path } from "react-hook-form";

import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Option {
  label: string;
  value: string;
}
interface DynamicFormFieldProps<T extends FieldValues> {
  disabled?: boolean;
  control: Control<T>;
  name: Path<T>;
  title: string;
  placeholder?: string;
  type?: "input" | "textarea" | "select" | "multiple-select";
  className?: string;
  options?: Option[];
  defaultValue?: string | string[];
}

import { FieldValues } from "react-hook-form";
import CustomMultipleSelectFe from "./selects/custom-multiple-select-fe";
import SearchSelectFe from "./selects/search-select-fe";

const DynamicFormFieldFE = <T extends FieldValues>({
  disabled,
  control,
  name,
  title,
  placeholder,
  type = "input",
  className,
  options,
  defaultValue,
}: DynamicFormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{title}</FormLabel>
          <FormControl>
            {type === "textarea" ? (
              <Textarea
                disabled={disabled}
                placeholder={placeholder}
                {...field}
                value={typeof field.value === "string" ? field.value : ""}
                className={`resize-none rounded-xl border border-gray-600 bg-white p-3 text-gray-900 shadow-md transition-all focus:border-blue-500 focus:ring focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gray-200 ${className}`}
              />
            ) : type === "select" ? (
              <SearchSelectFe
                value={
                  options?.find((option) => option.value === field.value)?.value
                }
                options={options! || []}
                onSelect={(value) => field.onChange(value)}
                placeholder="Choose an option"
                defaultValue={defaultValue as string}
              />
            ) : type === "multiple-select" ? (
              <CustomMultipleSelectFe
                value={
                  Array.isArray(field.value) &&
                  field.value.every((item: unknown) => typeof item === "string")
                    ? field.value
                    : []
                }
                options={options! || []}
                onSelect={(value) => field.onChange(value)}
                placeholder={"custom placeholder"}
              />
            ) : (
              <Input
                disabled={disabled}
                placeholder={placeholder}
                {...field}
                value={typeof field.value === "string" ? field.value : ""}
                className={`rounded-xl border border-gray-600 bg-white p-3 text-gray-900 shadow-md transition-all focus:border-blue-500 focus:ring focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gray-200 ${className}`}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DynamicFormFieldFE;
