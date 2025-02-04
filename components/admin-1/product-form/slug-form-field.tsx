import DynamicButton from "@/components/dynamic-button";
import DynamicFormField from "@/components/shared/dynamic-form-field";
import { Button } from "@/components/ui/button";
import { insertProductSchema } from "@/lib/validators";
import React from "react";
import slugify from "slugify";

const SlugFormField = ({ form }: any) => {
  const handleSetValue = (e: any) => {
    e.preventDefault();
    form.setValue("slug", slugify(form.getValues("name"), { lower: true }));
  };
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
        className={`focus-visible:ring-0 focus-visible:ring-offset-0 btn w-[200px]`}
        onClick={(e) => handleSetValue(e)}
      >
        Generate
      </Button>
    </div>
  );
};

export default SlugFormField;
