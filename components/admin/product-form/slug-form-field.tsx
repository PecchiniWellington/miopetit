import DynamicFormField from "@/components/shared/dynamic-form-field";
import { Button } from "@/components/ui/button";
import slugify from "slugify";

import { IProduct } from "@/core/validators";
import { UseFormReturn } from "react-hook-form";

const SlugFormField = ({ form }: { form: UseFormReturn<IProduct> }) => {
  const handleSetValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.setValue("slug", slugify(form.getValues("name"), { lower: true }));
  };
  return (
    <div className="flex w-full flex-col space-y-2">
      <DynamicFormField
        control={form.control}
        name="slug"
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
