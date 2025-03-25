import SlugFormField from "@/components/admin/product-form/slug-form-field";
import UploadImage from "@/components/admin/product-form/upload-image";
import DynamicFormField from "@/components/shared/dynamic-form-field";
import { IContributor } from "@/core/validators/contributors.validator";
import { UseFormReturn } from "react-hook-form";

export function ContributorFormFields({
  form,
  contributor,
}: {
  form: UseFormReturn<IContributor>;
  contributor?: IContributor;
}) {
  return (
    <>
      {/* Base info */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="name"
          title="Name"
          placeholder="Nome del contributor"
        />
        <SlugFormField variant="admin" form={form} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DynamicFormField
          variant="admin"
          type="select"
          options={[
            { value: "PARTNER", label: "Partner" },
            { value: "CANILE", label: "Canile" },
            { value: "GATTILE", label: "Gattile" },
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
        />
      </div>

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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* <DynamicFormField
          variant="admin"
          type="tags"
          control={form.control}
          name="tags"
          title="Tags"
          placeholder="Inserisci tags"
        /> */}
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="partitaIva"
          title="Partita IVA"
        />
      </div>

      {/* Location */}
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
          isNumber={true}
          control={form.control}
          name="latitude"
          title="Latitudine"
        />
        <DynamicFormField
          variant="admin"
          isNumber={true}
          control={form.control}
          name="longitude"
          title="Longitudine"
        />
      </div>

      {/* Disponibilità */}
      {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DynamicFormField
          variant="admin"
          type="boolean"
          control={form.control}
          name="isOnlineShop"
          title="Shop online attivo"
        />
        <DynamicFormField
          variant="admin"
          type="boolean"
          control={form.control}
          name="isPickupAvailable"
          title="Ritiro in sede disponibile"
        />
        <DynamicFormField
          variant="admin"
          type="boolean"
          control={form.control}
          name="deliveryAvailable"
          title="Consegna disponibile"
        />
      </div> */}

      {/* Social e contatti */}
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

      {/* Animali */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DynamicFormField
          variant="admin"
          isNumber={true}
          control={form.control}
          name="animalsAvailable"
          title="Numero animali presenti"
        />
        {/* <DynamicFormField
          variant="admin"
          type="tags"
          control={form.control}
          name="animalTypes"
          title="Tipi di animali"
        /> */}
      </div>

      {/* Volontariato & Donazioni */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* <DynamicFormField
          variant="admin"
          type="boolean"
          control={form.control}
          name="acceptsDonations"
          title="Accetta donazioni"
        /> */}
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="donationLink"
          title="Link donazione"
        />
        {/* <DynamicFormField
          variant="admin"
          type="boolean"
          control={form.control}
          name="volunteerNeeded"
          title="Ha bisogno di volontari"
        />
        <DynamicFormField
          variant="admin"
          type="tags"
          control={form.control}
          name="needs"
          title="Necessità (es: cibo, volontari, ecc)"
        /> */}
      </div>

      {/* SEO */}
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
