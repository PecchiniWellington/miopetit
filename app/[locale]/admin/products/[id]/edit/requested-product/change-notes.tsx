"use client";
import DynamicFormField from "@/components/shared/dynamic-form-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const notesProductSchema = z.object({
  notes: z.string().optional(),
});

const ChangeNotes = () => {
  const form = useForm<z.infer<typeof notesProductSchema>>({
    resolver: zodResolver(notesProductSchema),
    defaultValues: {
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof notesProductSchema>) => {
    console.log(
      "📝 Dati pronti per il backend:",
      JSON.stringify(values, null, 2)
    );
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800"
      >
        <label className="mb-1 block text-sm text-gray-400">Note:</label>
        <DynamicFormField
          type="textarea"
          control={form.control}
          name="notes"
          title="Note"
          placeholder="Inserisci la tua nota"
        />
      </form>
    </FormProvider>
  );
};

export default ChangeNotes;
