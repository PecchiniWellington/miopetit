"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import { Form } from "@/components/ui/form";
import { contributorSchema } from "@/core/validators/contributors.validator";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ContributorFormFields } from "./contributor-form-fields";
import { useContributorForm } from "./useContributorForm";

export type ContributorFormSchema = z.infer<typeof contributorSchema>;

const ContributorForm = ({
  type,
  contributor,
  contributorId,
}: {
  type: "Create" | "Update";
  contributor?: ContributorFormSchema;
  contributorId?: string;
}) => {
  const { form, onSubmit } = useContributorForm({
    type,
    contributor,
    contributorId,
  });

  return (
    <Form {...(form as UseFormReturn<ContributorFormSchema>)}>
      <form
        className="space-y-8"
        method="POST"
        onSubmit={form.handleSubmit(
          (data) => {
            console.log("✅ Dati inviati:", data);
            onSubmit(data);
          },
          (errors) => {
            console.log("❌ Errori nel form:", form.getValues());
            console.log("❌ Errori nel form:", errors);
          }
        )}
      >
        <ContributorFormFields
          form={form as UseFormReturn<ContributorFormSchema>}
        />

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
