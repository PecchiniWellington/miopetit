import { Control, Controller, Path } from "react-hook-form";

import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import CustomMultipleSelect from "./selects/custom-multiple-select";
import SearchSelect from "./selects/search-select";

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
import BrandTextArea from "./brand-components/brand-textarea";

const DynamicFormField = <T extends FieldValues>({
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
              <BrandTextArea
                disabled={disabled}
                placeholder={placeholder}
                {...field}
                value={typeof field.value === "string" ? field.value : ""}
                className={`resize-none border-slate-700 bg-transparent ${className}`}
              />
            ) : type === "select" ? (
              <SearchSelect
                value={
                  options?.find((option) => option.value === field.value)?.value
                }
                options={options! || []}
                onSelect={(value) => field.onChange(value)}
                placeholder="Choose an option"
                defaultValue={defaultValue as string}
              />
            ) : type === "multiple-select" ? (
              <CustomMultipleSelect
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
                className={`border-slate-700 bg-transparent ${className}`}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DynamicFormField;
