/* components/DynamicFormField.tsx */

import { Control, Controller } from "react-hook-form";

import { z } from "zod";
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
  control: Control;
  name: string;
  schema: z.ZodType<unknown>;
  title: string;
  placeholder?: string;
  type?: "input" | "textarea" | "select";
  className?: string;
  options?: Option[];
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
                value={field.value}
                options={options! || []}
                onSelect={(value) => field.onChange(value)}
                placeholder="Choose an option"
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
