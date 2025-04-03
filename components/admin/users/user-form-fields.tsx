"use client";

import DynamicFormField from "@/components/shared/dynamic-form-field";
import { IUpdateUser } from "@/core/validators/user.validator";

import { USER_ROLES } from "@/lib/constants/roles";
import { USER_STATUS } from "@/lib/constants/user-status";
import { UseFormReturn } from "react-hook-form";
import UploadImage from "../product-form/upload-image";

export function UserFormFields({
  form,
  user,
}: {
  form: UseFormReturn<IUpdateUser>;
  user: IUpdateUser;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 md:flex-row">
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="name"
          title="Nome"
          placeholder="Inserisci il nome"
        />
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="email"
          title="Email"
          placeholder="Inserisci l'email"
        />
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="role"
          type="select"
          title="Ruolo"
          options={USER_ROLES.map((role) => ({ label: role, value: role }))}
          placeholder="Seleziona il ruolo"
          defaultValue={user.role}
          onChange={(event) =>
            form.setValue(
              "role",
              event.target.value as
                | "SUPER_ADMIN"
                | "ADMIN"
                | "VETERINARIAN"
                | "VOLUNTEER"
                | "RETAILER"
                | "USER"
            )
          }
        />
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="status"
          type="select"
          title="Stato"
          options={USER_STATUS.map((status) => ({
            label: status,
            value: status,
          }))}
          placeholder="Seleziona lo stato"
          defaultValue={user.status}
          onChange={(event) => form.setValue("status", event.target.value)} // ✅ forza il tipo stringa
        />
      </div>

      <div>
        Immagine profilo
        <UploadImage
          images={[form.watch("image")].filter((img): img is string => !!img)}
          onChange={(data) => {
            form.setValue("image", data.images[0] || "");
          }}
        />
      </div>
    </div>
  );
}
