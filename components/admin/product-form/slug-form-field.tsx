import DynamicFormField from "@/components/shared/dynamic-form-field";
import { Button } from "@/components/ui/button";
import slugify from "slugify";

import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
interface SlugFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
}

const SlugFormField = <T extends FieldValues>({
  form,
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
        control={form.control}
        name={"slug" as Path<T>}
        title="Slug"
        placeholder="Enter slug"
      />
      <Button
        className={`btn w-[200px] focus-visible:ring-0 focus-visible:ring-offset-0`}
        onClick={(e) => handleSetValue(e)}
      >
        Generate
      </Button>
    </div>
  );
};

export default SlugFormField;
