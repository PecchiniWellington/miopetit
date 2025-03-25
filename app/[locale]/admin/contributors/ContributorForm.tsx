// contributor-form.tsx

"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import DynamicFormField from "@/components/shared/dynamic-form-field";
import { Form } from "react-hook-form";
import { useContributorForm } from "./useContributorForm";

const ContributorForm = ({
  type,
  contributor,
  contributorId,
}: {
  type: "Create" | "Update";
  contributor?: any;
  contributorId?: string;
}) => {
  const { form, onSubmit, fields } = useContributorForm({
    type,
    contributor,
    contributorId,
  });

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <DynamicFormField form={form} fields={fields} />

        <BrandButton
          type="submit"
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
        >
          {`${type} Contributor`}
        </BrandButton>
      </form>
    </Form>
  );
};

export default ContributorForm;
