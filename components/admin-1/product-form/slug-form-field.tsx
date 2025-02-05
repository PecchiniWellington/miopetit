import DynamicFormField from "@/components/shared/dynamic-form-field";
import { Button } from "@/components/ui/button";
import { insertProductSchema } from "@/lib/validators";
import { updateProductSchema } from "@/lib/validators/product.validator";
import { FormProviderProps } from "react-hook-form";
import slugify from "slugify";
import { z } from "zod";

const SlugFormField = ({
  form,
}: {
  form: FormProviderProps<
    z.infer<typeof insertProductSchema | typeof updateProductSchema>
  >;
}) => {
  const handleSetValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.setValue("slug", slugify(form.getValues("name"), { lower: true }));
  };
  return (
    <div className="flex w-full flex-col space-y-2">
      <DynamicFormField
        control={form.control}
        name="slug"
        schema={insertProductSchema}
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
