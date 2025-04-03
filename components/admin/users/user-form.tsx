"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import { Form } from "@/components/ui/form";

import { IUpdateUser } from "@/core/validators/user.validator";
import { useUserForm } from "./use-user-form";
import { UserFormFields } from "./user-form-fields";

export default function UserForm({
  type,
  user,
  folder,
}: {
  type: "Create" | "Update";
  user?: IUpdateUser;
  folder?: string;
}) {
  const { form, onSubmit } = useUserForm({ type, user, folder });

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        method="POST"
        onSubmit={form.handleSubmit(
          (data) => onSubmit(data),
          (errors) => {
            console.log("❌ Errori nel form:", errors);
          }
        )}
      >
        <UserFormFields form={form} user={user} />

        <BrandButton
          type="submit"
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
        >
          Aggiorna Utente
        </BrandButton>
      </form>
    </Form>
  );
}
