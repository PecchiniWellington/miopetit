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
  defaultValue?: string | string[] | { id: string; name: string }[]; // lasciamolo ampio
  variant?: "default" | "admin";
  isNumber?: boolean;
}

import { FieldValues } from "react-hook-form";
import BrandInput from "./brand-components/brand-input";
import BrandMultiSelect from "./brand-components/brand-multiple-select";
import BrandSelect from "./brand-components/brand-select";
import BrandTextArea from "./brand-components/brand-textarea";

const DynamicFormField = <T extends FieldValues>({
  disabled,
  isNumber,
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
      render={({ field }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = isNumber ? Number(e.target.value) : e.target.value;
          field.onChange(value);
        };
        return (
          <FormItem className="w-full">
            <FormLabel>{title}</FormLabel>
            <FormControl>
              {type === "textarea" ? (
                <BrandTextArea
                  variant={variant}
                  disabled={disabled}
                  placeholder={placeholder}
                  {...field}
                  value={typeof field.value === "string" ? field.value : ""}
                  className={`resize-none border-slate-700 bg-transparent ${className}`}
                />
              ) : type === "select" ? (
                <BrandSelect
                  variant={variant}
                  value={
                    typeof field.value === "object" && field.value !== null
                      ? field.value.id
                      : field.value || ""
                  }
                  onValueChange={(value) => {
                    if (name === "animalAge") {
                      // enum semplice
                      field.onChange(value);
                    } else if (name.includes("productUnitFormat.unitValue")) {
                      // productUnitFormat.unitValue expects object
                      const opt = options?.find((o) => o.value === value);
                      field.onChange({
                        id: value,
                        value: Number(opt?.label) || 0,
                      });
                    } else if (
                      name.includes("productUnitFormat.unitOfMeasure")
                    ) {
                      // productUnitFormat.unitOfMeasure expects object
                      const opt = options?.find((o) => o.value === value);
                      field.onChange({
                        id: value,
                        code: opt?.label || "",
                        name: opt?.label || "",
                      });
                    } else {
                      const opt = options?.find((o) => o.value === value);
                      field.onChange(
                        opt
                          ? { id: value, name: opt.label }
                          : { id: value, name: value }
                      );
                    }
                  }}
                  options={options || []}
                  placeholder="Choose an option"
                />
              ) : type === "multiple-select" ? (
                <BrandMultiSelect
                  variant={variant}
                  value={
                    Array.isArray(field.value)
                      ? field.value.map((id: any) => {
                          const opt = options?.find(
                            (o) =>
                              o.value === (typeof id === "string" ? id : id.id)
                          );
                          return opt
                            ? { id: opt.value, name: opt.label }
                            : { id: id as string, name: id as string };
                        })
                      : []
                  }
                  options={options! || []}
                  onSelect={(value) => field.onChange(value)}
                  placeholder={"custom placeholder"}
                  defaultValue={
                    Array.isArray(defaultValue) &&
                    typeof defaultValue[0] !== "string"
                      ? (defaultValue as { id: string; name: string }[])
                      : []
                  }
                />
              ) : (
                <BrandInput
                  isNumber={isNumber}
                  variant={variant}
                  disabled={disabled}
                  placeholder={placeholder}
                  onChange={handleChange}
                  /*  {...field} */
                  value={
                    !isNumber
                      ? field.value?.toString()
                      : Number(field.value) || ""
                  }
                  className={`${className}`}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default DynamicFormField;
