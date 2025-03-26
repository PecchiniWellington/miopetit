"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import { Form } from "@/components/ui/form";
import { IUser } from "@/core/validators";
import { IContributor } from "@/core/validators/contributors.validator";
import { ContributorFormFields } from "./contributor-form-fields";
import { useContributorForm } from "./useContributorForm";

const ContributorForm = ({
  type,
  contributor,
  contributorId,
  users,
  isAdmin,
}: {
  type: "Create" | "Update";
  contributor?: IContributor;
  contributorId?: string;
  users: IUser[];
  isAdmin?: boolean;
}) => {
  const { form, onSubmit } = useContributorForm({
    type,
    contributor,
    contributorId,
  });

  return (
    <Form {...form}>
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
        <ContributorFormFields form={form} users={users} isAdmin={isAdmin} />

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
