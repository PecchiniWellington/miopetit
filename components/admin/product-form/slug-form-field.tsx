import DynamicButton from "@/components/dynamic-button";
import DynamicFormField from "@/components/shared/dynamic-form-field";
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
      <DynamicButton
        handleAction={() => {
          form.setValue(
            "slug",
            slugify(form.getValues("name"), { lower: true })
          );
        }}
      >
        Generate
      </DynamicButton>
    </div>
  );
};

export default SlugFormField;
