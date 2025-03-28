import SlugFormField from "@/components/admin/product-form/slug-form-field";
import UploadImage from "@/components/admin/product-form/upload-image";
import DynamicFormField from "@/components/shared/dynamic-form-field";
import { animalTypesOptions } from "@/core/db-static/db_contributors_page/animal_types_options";
import { needsOptions } from "@/core/db-static/db_contributors_page/needs_options";
import { IUser } from "@/core/validators";
import { IContributor } from "@/core/validators/contributors.validator";
import ROLES from "@/lib/constants/roles";
import { normalizeUrl } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

export function ContributorFormFields({
  form,
  users,
  isAdmin,
}: {
  form: UseFormReturn<IContributor>;
  users?: IUser[];
  isAdmin?: boolean;
}) {
  const userOptions =
    users?.map((user) => ({
      label: user.name || "Unknown User",
      value: user.id,
    })) || [];

  const contributorType = form.watch("type");
  return (
    <>
      {/* 📌 Base info */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="name"
          title="Nome"
          placeholder="Nome del contributor"
        />
        <SlugFormField variant="admin" form={form} />
        {/* <DynamicFormField
          type="select"
          variant="admin"
          options={userOptions}
          control={form.control}
          name="users"
          title="Persona fisica"
          placeholder="Associa persona fisica"
          onChange={(event) => form.setValue("userId", event.target.value)}
        /> */}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DynamicFormField
          variant="admin"
          type="select"
          options={[
            { value: ROLES.ADMIN, label: "Admin" },
            { value: ROLES.RETAILER, label: "Retailer" },
            { value: ROLES.USER, label: "User" },
            { value: ROLES.VETERINARIAN, label: "Veterinary" },
            { value: ROLES.VOLUNTEER, label: "Volunteer" },
          ]}
          control={form.control}
          name="type"
          title="Tipo"
        />
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="email"
          title="Email"
          placeholder="Email del contributor"
        />
      </div>

      {/* 📸 Immagini */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <UploadImage
          images={[form.watch("logo")].filter((img): img is string => !!img)}
          onChange={(data) => {
            form.setValue("logo", data.images[0] || "");
          }}
        />
        <UploadImage
          images={[form.watch("coverImage")].filter(
            (img): img is string => !!img
          )}
          onChange={(data) => {
            form.setValue("coverImage", data.images[0] || "");
          }}
        />
      </div>

      {/* 📝 Descrizioni */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DynamicFormField
          variant="admin"
          type="textarea"
          control={form.control}
          name="description"
          title="Descrizione breve"
        />
        <DynamicFormField
          variant="admin"
          type="textarea"
          control={form.control}
          name="descriptionLong"
          title="Descrizione lunga"
        />
      </div>

      {/* 📍 Location */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="address"
          title="Indirizzo"
        />
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="city"
          title="Città"
        />
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="province"
          title="Provincia"
        />
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="region"
          title="Regione"
        />
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="zipCode"
          title="CAP"
        />
        <DynamicFormField
          variant="admin"
          isNumber
          control={form.control}
          name="latitude"
          title="Latitudine"
        />
        <DynamicFormField
          variant="admin"
          isNumber
          control={form.control}
          name="longitude"
          title="Longitudine"
        />
      </div>

      {/* 🧾 Info fiscali e contatto */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="partitaIva"
          title="Partita IVA"
        />
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="phone"
          title="Telefono"
        />
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="website"
          title="Sito web"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const normalized = normalizeUrl(e.target.value);
            form.setValue("website", normalized);
          }}
        />
      </div>

      {/* 🔄 Disponibilità */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DynamicFormField
          variant="admin"
          type="checkbox"
          control={form.control}
          name="isOnlineShop"
          title="Shop online attivo"
        />
        <DynamicFormField
          variant="admin"
          type="checkbox"
          control={form.control}
          name="isPickupAvailable"
          title="Ritiro in sede disponibile"
        />
        <DynamicFormField
          variant="admin"
          type="checkbox"
          control={form.control}
          name="deliveryAvailable"
          title="Consegna disponibile"
        />
      </div>

      {/* 🌐 Social */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DynamicFormField
          control={form.control}
          name="socialLinks.instagram"
          title="Instagram"
          variant="admin"
        />
        <DynamicFormField
          control={form.control}
          name="socialLinks.facebook"
          title="Facebook"
          variant="admin"
        />
        <DynamicFormField
          control={form.control}
          name="socialLinks.tiktok"
          title="TikTok"
          variant="admin"
        />
        <DynamicFormField
          control={form.control}
          name="whatsappNumber"
          title="WhatsApp"
          variant="admin"
        />
      </div>

      {/* 🐾 Solo per Canile/Gattile */}
      {["ADMIN", "ADMIN"].includes(contributorType) && (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <DynamicFormField
              variant="admin"
              isNumber
              control={form.control}
              name="animalsAvailable"
              title="Numero animali presenti"
            />
            <DynamicFormField
              variant="admin"
              type="multiple-select"
              control={form.control}
              name="animalTypes"
              title="Tipi di animali"
              options={animalTypesOptions}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <DynamicFormField
              variant="admin"
              type="checkbox"
              control={form.control}
              name="acceptsDonations"
              title="Accetta donazioni"
            />
            <DynamicFormField
              variant="admin"
              control={form.control}
              name="donationLink"
              title="Link donazione"
            />
            <DynamicFormField
              variant="admin"
              type="checkbox"
              control={form.control}
              name="volunteerNeeded"
              title="Ha bisogno di volontari"
            />
            <DynamicFormField
              variant="admin"
              type="multiple-select"
              control={form.control}
              name="needs"
              title="Necessità (es: cibo, volontari, ecc)"
              options={needsOptions}
            />
          </div>
        </>
      )}

      {/* 🔍 SEO */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="seoTitle"
          title="SEO Title"
        />
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="seoDescription"
          title="SEO Description"
          type="textarea"
        />
      </div>
    </>
  );
}
