// AnimalFormFields.tsx

"use client";

import UploadImage from "@/components/admin/product-form/upload-image";
import DynamicFormField from "@/components/shared/dynamic-form-field";
import {
  AnimalStatus,
  Gender,
  IUpdateAnimal,
} from "@/core/validators/animal.validator";
import { UseFormReturn } from "react-hook-form";

export function AnimalFormFields({
  form,
  animal,
}: {
  form: UseFormReturn<IUpdateAnimal>;
  animal?: IUpdateAnimal;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 md:flex-row">
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="name"
          title="Nome"
          placeholder="Inserisci il nome dell'animale"
        />
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="microchipCode"
          title="Microchip"
          placeholder="Codice microchip"
        />
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="breed"
          title="Razza"
          placeholder="Inserisci la razza"
        />
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="gender"
          title="Genere"
          type="select"
          options={[
            { label: "Maschio", value: "MALE" },
            { label: "Femmina", value: "FEMALE" },
          ]}
          defaultValue={animal?.gender}
          onChange={(e) => {
            form.setValue("gender", e.target.value as Gender);
          }}
        />
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="age"
          title="Età"
          isNumber={true}
          placeholder="Età in anni"
        />
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="intakeDate"
          title="Data di ingresso"
          type="date"
        />
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="origin"
          title="Provenienza"
          placeholder="Inserisci la provenienza"
        />
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="status"
          title="Stato"
          type="select"
          options={[
            { label: "Adottabile", value: "ADOPTABLE" },
            { label: "In cura", value: "IN_CARE" },
            { label: "Adottato", value: "ADOPTED" },
            { label: "Deceduto", value: "DECEASED" },
          ]}
          defaultValue={animal?.status}
          onChange={(e) => {
            form.setValue("status", e.target.value as AnimalStatus);
          }}
        />
      </div>

      <DynamicFormField
        variant="admin"
        control={form.control}
        name="animalType"
        title="Tipo animale"
        type="select"
        options={[
          { label: "Dog", value: "dog" },
          { label: "Cat", value: "cat" },
          { label: "Small Animal", value: "small-animal" },
        ]}
        defaultValue={animal?.status}
        onChange={(e) => {
          form.setValue("animalType", e.target.value);
        }}
        placeholder="Es. Cane, Gatto..."
      />

      <DynamicFormField
        variant="admin"
        control={form.control}
        name="description"
        title="Descrizione"
        type="textarea"
        placeholder="Inserisci una descrizione opzionale"
      />

      <div>
        Foto animale
        <UploadImage
          images={[form.watch("photoUrl")].filter(
            (img): img is string => !!img
          )}
          onChange={(data) => {
            form.setValue("photoUrl", data.images[0] || "");
          }}
        />
      </div>
    </div>
  );
}
