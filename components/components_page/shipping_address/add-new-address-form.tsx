"use client";
import BrandButton from "@/components/shared/brand-components/brand-button";
import BrandInput from "@/components/shared/brand-components/brand-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createUserAddress } from "@/core/actions/user/create-user-address.action";
import { useAddNewAddress } from "@/core/db-static/db_checkout_pages/add_new_address";
import { IUser } from "@/core/validators";
import { addressSchema } from "@/core/validators/user-address.validator";
import useLocalStorage from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { SHIPPING_ADDRESS_DEFAULT_VALUES } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const AddNewAddressForm = ({
  addresses,
  user,
}: {
  addresses?: z.infer<typeof addressSchema>[];
  user?: IUser;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [, setStoredValue] = useLocalStorage("addresses", addresses);
  const t = useTranslations("Checkout.new_address");
  const locale = useLocale();

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: addresses?.[0] || SHIPPING_ADDRESS_DEFAULT_VALUES,
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<z.infer<typeof addressSchema>> = async (
    values
  ) => {
    startTransition(async () => {
      setStoredValue([values]);

      if (user) {
        const res = await createUserAddress({
          ...values,
          isDefault: true,
        });
        if (!res.success) {
          toast({ description: res.message });
          return;
        }
      } else {
        toast({ description: "Indirizzo salvato localmente" });
      }

      router.push("/payment-method");
    });
  };

  // 📌 Mappa dei placeholder in base alla nazione
  const placeholders = useAddNewAddress();

  return (
    <div>
      <h1 className="flex items-center text-2xl font-bold text-gray-800 dark:text-white">
        {t("title")}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t("subtitle")}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            (data) => {
              console.log("✅ Dati inviati:", data);
              onSubmit(data);
            },
            (errors) => {
              console.log("❌ Errori nel form:", errors);
            }
          )}
          method="post"
          className="space-y-5"
        >
          {[
            { name: "fullName", label: t("full_name"), type: "text" },
            { name: "email", label: t("email"), type: "email" },
            { name: "street", label: t("address"), type: "text" },
            { name: "city", label: t("city"), type: "text" },
            { name: "postalCode", label: t("zip_code"), type: "text" },
            { name: "country", label: t("country"), type: "text" },
          ].map(({ name, label, type }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof z.infer<typeof addressSchema>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    {label}
                  </FormLabel>
                  <FormControl>
                    <BrandInput
                      {...field}
                      type={type}
                      value={
                        typeof field.value === "boolean"
                          ? ""
                          : (field.value ?? "")
                      }
                      placeholder={
                        placeholders[name as keyof typeof placeholders][
                          locale as keyof (typeof placeholders)["fullName"]
                        ] ||
                        placeholders[name as keyof typeof placeholders].default
                      }
                      className="w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <BrandButton type="submit">{t("add_address_button")}</BrandButton>
        </form>
        <FormMessage />
      </Form>
    </div>
  );
};

export default AddNewAddressForm;
