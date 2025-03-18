import DynamicFormField from "@/components/shared/dynamic-form-field";
import slugify from "slugify";

import BrandButton from "@/components/shared/brand-components/brand-button";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
interface SlugFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  variant?: "default" | "admin";
}

const SlugFormField = <T extends FieldValues>({
  form,
  variant,
}: SlugFormFieldProps<T>) => {
  const handleSetValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.setValue(
      "slug" as Path<T>,
      slugify(form.getValues("name" as Path<T>), { lower: true }) as PathValue<
        T,
        Path<T>
      >
    );
  };
  return (
    <div className="flex w-full flex-col space-y-2">
      <DynamicFormField
        variant={variant}
        control={form.control}
        name={"slug" as Path<T>}
        title="Slug"
        placeholder="Enter slug"
      />
      <BrandButton
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSetValue(e)}
      >
        Generate
      </BrandButton>
    </div>
  );
};

export default SlugFormField;
