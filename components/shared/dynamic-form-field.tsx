/* components/DynamicFormField.tsx */

import { Control, Controller } from "react-hook-form";

import CustomMultipleSelect from "../custom-multiple-select";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import SearchSelect from "./search-select";

interface Option {
  label: string;
  value: string;
}
interface DynamicFormFieldProps {
  disabled?: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  title: string;
  placeholder?: string;
  type?: "input" | "textarea" | "select" | "multiple-select";
  className?: string;
  options?: Option[];
  defaultValue?: string | string[];
}

const DynamicFormField = ({
  disabled,
  control,
  name,
  title,
  placeholder,
  type = "input",
  className,
  options,
  defaultValue,
}: DynamicFormFieldProps) => {
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
              />
            ) : type === "multiple-select" ? (
              <CustomMultipleSelect
                defaultValue={defaultValue as string[]}
                value={field.value || []}
                options={options! || []}
                onSelect={(value) => field.onChange(value)}
                placeholder={"custom placheholder"}
              />
            ) : (
              <Input
                disabled={disabled}
                placeholder={placeholder}
                {...field}
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
