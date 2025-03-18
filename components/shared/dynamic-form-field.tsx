import { Control, Controller, Path } from "react-hook-form";

import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";

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
  variant?: "default" | "admin";
}

import { FieldValues } from "react-hook-form";
import BrandInput from "./brand-components/brand-input";
import BrandMultiSelect from "./brand-components/brand-multiple-select";
import BrandSelect from "./brand-components/brand-select";
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
  variant,
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
              <BrandSelect
                variant={variant}
                value={field.value.toString()}
                onValueChange={(value) => field.onChange(value)}
                options={options || []}
                placeholder="Choose an option"
                defaultValue={defaultValue}
              />
            ) : type === "multiple-select" ? (
              <BrandMultiSelect
                variant={variant}
                value={
                  Array.isArray(field.value) &&
                  field.value.every((item: unknown) => typeof item === "string")
                    ? field.value
                    : []
                }
                options={options! || []}
                onSelect={(value) => field.onChange(value)}
                placeholder={"custom placeholder"}
                defaultValue={defaultValue}
              />
            ) : (
              <BrandInput
                variant={variant}
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
