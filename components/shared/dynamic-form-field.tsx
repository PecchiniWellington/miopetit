/* components/DynamicFormField.tsx */

import { Controller } from "react-hook-form";

import { z } from "zod";
import { FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import SearchSelect from "./search-select";

interface DynamicFormFieldProps {
  disabled?: boolean;
  control: any;
  name: string;
  schema: z.ZodType<any, any>;
  title: string;
  placeholder?: string;
  type?: "input" | "textarea" | "select";
  className?: string;
  options?: { label: string; value: string }[];
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
                className={`resize-none bg-transparent border-slate-700 ${className}`}
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
                className={`bg-transparent border-slate-700 ${className}`}
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
