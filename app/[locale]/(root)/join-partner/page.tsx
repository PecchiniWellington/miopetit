"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import DynamicFormFieldFE from "@/components/shared/dynamic-form-field-fe";
import Hero from "@/components/shared/hero";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

// Schema di validazione con campi obbligatori
const joinPartnerSchema = z.object({
  fullName: z.string().min(3, "⚠️ Il nome deve contenere almeno 3 caratteri"),
  email: z.string().email("⚠️ Inserisci un'email valida"),
  phone: z.string().min(10, "⚠️ Inserisci un numero di telefono valido"),
  businessName: z.string().min(3, "⚠️ Il nome dell'azienda è obbligatorio"),
  businessType: z.string().min(1, "⚠️ Seleziona una tipologia di attività"),
  city: z.string().optional(),
  website: z.string().optional(),
  yearsInBusiness: z.string().optional(),
  estimatedSales: z.string().optional(),
  stockManagement: z.array(z.string()).optional(),
  shippingMethods: z.array(z.string()).optional(),
  whyJoin: z.string().min(10, "⚠️ Descrivi il motivo della partnership"),
  additionalNotes: z.string().optional(),
  logo: z.string().optional(),
  numberOfAnimals: z.string().optional(),
  maxCapacity: z.string().optional(),
  servicesOffered: z.array(z.string()).optional(),
  volunteerCount: z.string().optional(),
  interventionSector: z.string().optional(),
});

export default function JoinPartner() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof joinPartnerSchema>>({
    resolver: zodResolver(joinPartnerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      businessType: "",
      city: "",
      website: "",
      yearsInBusiness: "",
      estimatedSales: "",
      stockManagement: [],
      shippingMethods: [],
      whyJoin: "",
      additionalNotes: "",
      logo: "",
      numberOfAnimals: "",
      maxCapacity: "",
      servicesOffered: [],
      volunteerCount: "",
      interventionSector: "",
    },
  });

  const businessType = useWatch({
    control: form.control,
    name: "businessType",
  });

  const { formState } = form;

  const onSubmit = async (values: z.infer<typeof joinPartnerSchema>) => {
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
        title="Unisciti a MioPetit e Diventa un Partner! 🚀"
        description=" Compila il modulo per candidarti come partner di MioPetit. Ti
          contatteremo al più presto per valutare la collaborazione!"
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
            name="email"
            title="Email *"
            placeholder="Inserisci la tua email"
          />
          <ErrorMessage field="email" />

          <DynamicFormFieldFE
            control={form.control}
            name="phone"
            title="Numero di Telefono *"
            placeholder="Inserisci il tuo numero"
          />
          <ErrorMessage field="phone" />
          <DynamicFormFieldFE
            control={form.control}
            name="businessName"
            title="Nome Azienda *"
            placeholder="Inserisci il nome della tua azienda"
          />
          <ErrorMessage field="businessName" />
          {/* 📌 Tipologia di Partner */}
          <DynamicFormFieldFE
            type="select"
            options={[
              { label: "Venditore", value: "venditore" },
              { label: "Canile", value: "canile" },
              { label: "Gattile", value: "gattile" },
              { label: "Pensione per Animali", value: "pensione" },
              { label: "ONG / Associazione", value: "ong" },
            ]}
            control={form.control}
            name="businessType"
            title="Tipologia di Attività *"
          />
          <ErrorMessage field="businessType" />

          {/* 📌 Campi dinamici */}
          {businessType === "venditore" && (
            <>
              <DynamicFormFieldFE
                control={form.control}
                name="city"
                title="Città *"
                placeholder="Inserisci la tua città"
              />
              <ErrorMessage field="city" />
              <DynamicFormFieldFE
                control={form.control}
                name="estimatedSales"
                title="Volume di Vendita *"
                placeholder="Esempio: 500+ prodotti al mese"
              />
              <ErrorMessage field="estimatedSales" />
              <DynamicFormFieldFE
                type="multiple-select"
                control={form.control}
                name="stockManagement"
                title="Gestione dei Prodotti *"
                options={[
                  { label: "Dropshipping", value: "dropshipping" },
                  {
                    label: "Produzione su richiesta",
                    value: "produzione_su_richiesta",
                  },
                ]}
              />
              <DynamicFormFieldFE
                type="multiple-select"
                control={form.control}
                name="shippingMethods"
                title="Metodi di Spedizione *"
                options={[
                  { label: "Corriere Espresso", value: "corriere" },
                  { label: "Spedizione Standard", value: "standard" },
                ]}
              />
            </>
          )}

          {/* 📌 Campi comuni */}
          <DynamicFormFieldFE
            type="textarea"
            control={form.control}
            name="whyJoin"
            title="Perché vuoi diventare partner? *"
            placeholder="Scrivi le motivazioni"
          />

          <ErrorMessage field="whyJoin" />

          <DynamicFormFieldFE
            type="textarea"
            control={form.control}
            name="additionalNotes"
            title="Note Aggiuntive"
            placeholder="Aggiungi dettagli utili"
          />

          {/* 📌 Submit */}

          <BrandButton
            icon={<ArrowRight className="size-5" />}
            type="submit"
            disabled={formState.isSubmitting}
            loading={formState.isSubmitting}
          >
            Invia la Richiesta
          </BrandButton>

          {/* 📌 Messaggi di errore sotto ai campi */}
        </form>
      </FormProvider>
    </div>
  );
}
