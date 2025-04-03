import { Control, Controller, Path, PathValue } from "react-hook-form";

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
  type?:
    | "input"
    | "textarea"
    | "select"
    | "multiple-select"
    | "checkbox"
    | "date";
  className?: string;
  options?: Option[];
  defaultValue?: string | string[] | { id: string; name: string }[]; // lasciamolo ampio
  variant?: "default" | "admin";
  isNumber?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

import { FieldValues } from "react-hook-form";
import BrandCheckbox from "./brand-components/brand-checkbox";
import BrandInput from "./brand-components/brand-input";
import BrandInputCalendar from "./brand-components/brand-input-calendar";
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
  onChange,
  onBlur,
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
                  className={`${className}`}
                />
              ) : type === "checkbox" ? (
                <BrandCheckbox
                  label="Accetto le condizioni"
                  variant="admin"
                  placeholder="Seleziona"
                  {...field}
                  checked={field.value === true}
                />
              ) : type === "select" ? (
                <BrandSelect
                  variant={variant}
                  value={
                    typeof field.value === "object" && field.value !== null
                      ? typeof field.value === "object" &&
                        field.value !== null &&
                        "id" in field.value
                        ? field.value.id
                        : ""
                      : field.value || ""
                  }
                  onValueChange={(value) => {
                    if (onChange) {
                      onChange?.({
                        target: { value },
                      } as React.FocusEvent<HTMLInputElement>); // override esterno se definito
                    } else {
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
                      ? field.value.map((id: PathValue<T, Path<T>>) => {
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
              ) : type === "date" ? (
                <BrandInputCalendar
                  field={field}
                  variant={variant}
                  disabled={disabled}
                  className={className}
                  placeholder={placeholder}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    onChange?.(
                      e as unknown as React.FocusEvent<HTMLInputElement>
                    ); // trigger esterno se serve
                  }}
                  onBlur={field.onBlur}
                />
              ) : (
                <BrandInput
                  onBlur={onBlur}
                  isNumber={isNumber}
                  variant={variant}
                  disabled={disabled}
                  placeholder={placeholder}
                  onChange={handleChange}
                  /*  {...field} */
                  value={
                    isNumber
                      ? Number(field.value ?? "") // fallback su "" che React accetta
                      : (field.value ?? "").toString()
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
