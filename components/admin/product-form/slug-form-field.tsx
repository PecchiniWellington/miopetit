import DynamicFormField from "@/components/shared/dynamic-form-field";
import { Button } from "@/components/ui/button";
import { insertProductSchema } from "@/lib/validators";
import React from "react";
import slugify from "slugify";

const SlugFormField = ({ form }: any) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <DynamicFormField
        control={form.control}
        name="slug"
        schema={insertProductSchema}
        title="Slug"
        placeholder="Enter slug"
      />
      <Button
        type="button"
        variant="outline"
        className="bg-gray-500 hover:bg-gray-600 text-white  px-4 py-4 mt-2 w-min"
        onClick={() => {
          form.setValue(
            "slug",
            slugify(form.getValues("name"), { lower: true })
          );
        }}
      >
        Generate
      </Button>
    </div>
  );
};

export default SlugFormField;
