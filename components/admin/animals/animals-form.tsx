// AnimalForm.tsx

"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import { Form } from "@/components/ui/form";
import { IUpdateAnimal } from "@/core/validators/animal.validator";
import { AnimalFormFields } from "./animals-form-field";
import { useAnimalForm } from "./use-animals-form";

export default function AnimalForm({
  type,
  animal,
  folder,
}: {
  type: "Create" | "Update";
  animal?: IUpdateAnimal;
  folder?: string;
}) {
  const { form, onSubmit } = useAnimalForm({ type, animal, folder });

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
        <AnimalFormFields form={form} animal={animal} />

        <BrandButton
          type="submit"
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
        >
          {type === "Create" ? "Crea Animale" : "Aggiorna Animale"}
        </BrandButton>
      </form>
    </Form>
  );
}
