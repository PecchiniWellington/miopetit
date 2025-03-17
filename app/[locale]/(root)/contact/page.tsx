"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import DynamicFormFieldFE from "@/components/shared/dynamic-form-field-fe";
import Hero from "@/components/shared/hero";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

// Schema di validazione con campi obbligatori
const contactUsSchema = z.object({
  fullName: z.string().min(3, "⚠️ Il nome deve contenere almeno 3 caratteri"),
  object: z.string().min(3, "⚠️ l'oggetto deve contenere almeno 3 caratteri"),
  email: z.string().email("⚠️ Inserisci un'email valida"),
  description: z.string().optional(),
});

export default function ContactUs() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactUsSchema>>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      fullName: "",
      object: "",
      email: "",
      description: "",
    },
  });

  const { formState } = form;

  const onSubmit = async (values: z.infer<typeof contactUsSchema>) => {
    console.log(
      "📝 Dati pronti per il backend:",
      JSON.stringify(values, null, 2)
    );

    toast({
      className: "bg-green-100 text-green-700 px-5 py-2",
      title: "Richiesta Inviata!",
      description: "La tua richiesta è stata inviata con successo!",
    });
  };

  const ErrorMessage: React.FC<{ field: keyof typeof formState.errors }> = ({
    field,
  }) => (
    <div className="mt-2 flex items-center gap-1 text-sm text-orange-400">
      {formState.errors[field]?.message && formState.errors[field]?.message}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      {/* 📌 Hero Section */}

      <Hero
        title="Contattaci!"
        description="Siamo lieti di ascoltare ciò che ci chiedi."
      />

      {/* 📌 Form */}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800"
        >
          {/* 📌 Campi comuni */}
          <DynamicFormFieldFE
            control={form.control}
            name="fullName"
            title="Nome Completo *"
            placeholder="Inserisci il tuo nome"
          />
          <ErrorMessage field="fullName" />

          <DynamicFormFieldFE
            control={form.control}
            name="object"
            title="Oggetto richiesta *"
            placeholder="Inserisci un titolo alla tua richiesta"
          />
          <ErrorMessage field="email" />
          <DynamicFormFieldFE
            control={form.control}
            name="email"
            title="Email *"
            placeholder="Inserisci la tua email"
          />
          <ErrorMessage field="email" />
          <DynamicFormFieldFE
            type="textarea"
            control={form.control}
            name="description"
            title="Description"
            placeholder="Inserisci la tua richiesta"
          />
          <ErrorMessage field="description" />

          {/* 📌 Submit */}

          <BrandButton
            type="submit"
            variant="primary"
            iconPosition="left"
            icon={<ArrowRight className="ml-2 size-5" />}
          >
            Invia la Richiesta
          </BrandButton>

          {/* 📌 Messaggi di errore sotto ai campi */}
        </form>
      </FormProvider>
    </div>
  );
}
