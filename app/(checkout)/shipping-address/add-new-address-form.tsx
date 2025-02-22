"use client";
import DynamicButton from "@/components/dynamic-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createUserAddress } from "@/core/actions/user/create-user-address.action";
import { addressSchema } from "@/core/validators/user-address.validator";
import useLocalStorage from "@/hooks/use-local-storage-item";
import { useToast } from "@/hooks/use-toast";
import { SHIPPING_ADDRESS_DEFAULT_VALUES } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const AddNewAddressForm = ({
  addresses,
}: {
  addresses?: z.infer<typeof addressSchema>[];
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const [storedValue, setStoredValue] = useLocalStorage("addresses", addresses);

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: addresses?.[0] || SHIPPING_ADDRESS_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<z.infer<typeof addressSchema>> = async (
    values
  ) => {
    startTransition(async () => {
      const addressUser = addresses?.find(
        (address) => address.isDefault === true
      );
      setStoredValue(values);

      if (session?.user) {
        const res = await createUserAddress({
          ...values,
          isDefault: true,
        });
        if (!res.success) {
          toast({
            description: res.message,
          });
          return;
        }
      } else {
        toast({
          description: "Indirizzo salvato localmente",
        });
      }

      router.push("/payment-method");
    });
  };

  return (
    <div>
      <h1 className="flex items-center text-2xl font-bold text-gray-800 dark:text-white">
        🚚 Aggiungi Nuovo Indirizzo
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Inserisci un nuovo indirizzo per la spedizione.
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
            {
              name: "fullName",
              label: "Nome Completo",
              placeholder: "Mario Rossi",
            },
            {
              name: "street",
              label: "Indirizzo",
              placeholder: "Via Roma 123",
            },
            { name: "city", label: "Città", placeholder: "Padova" },
            {
              name: "postalCode",
              label: "CAP",
              placeholder: "35100",
            },
            {
              name: "country",
              label: "Nazione",
              placeholder: "Italia",
            },
          ].map(({ name, label, placeholder }) => (
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
                    <Input
                      {...field}
                      value={
                        typeof field.value === "boolean"
                          ? ""
                          : (field.value ?? "")
                      }
                      placeholder={placeholder}
                      className="w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <DynamicButton className="mt-10 flex w-full items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none md:w-fit">
            {/*  {isPending ? (
              <Loader className="size-5 animate-spin" />
            ) : ( */}
            <ArrowRight className="size-5" />
            {/* )} */}
            Aggiungi Indirizzo
          </DynamicButton>
        </form>
      </Form>
    </div>
  );
};

export default AddNewAddressForm;
