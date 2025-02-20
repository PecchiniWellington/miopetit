"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import DynamicButton from "@/components/dynamic-button";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createUserAddress } from "@/core/actions/user/create-user-address.action";
import { getUserAddress } from "@/core/actions/user/get-user-address.action";
import { setDefaultAddress } from "@/core/actions/user/set-user-default-address.action";
import { IShippingAddress, shippingAddressSchema } from "@/core/validators";
import { IAddress } from "@/core/validators/user-address.validator";
import { useToast } from "@/hooks/use-toast";
import { SHIPPING_ADDRESS_DEFAULT_VALUES } from "@/lib/constants";
import { ArrowRight, CheckCircle, Loader, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const ShippingAddressForm = ({
  address,
  user,
}: {
  address?: IShippingAddress;
  user: any;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, setIsPending] = useTransition();
  const [addresses, setAddresses] = useState<IAddress[]>([]);

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || SHIPPING_ADDRESS_DEFAULT_VALUES,
  });

  const fetchAddresses = async () => {
    try {
      const r = await getUserAddress(user.id);
      setAddresses(r.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [toast, user]);

  const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (
    values
  ) => {
    setIsPending(async () => {
      const res = await createUserAddress(values);

      if (!res.success) {
        toast({
          title: "Error",
          description: res.message,
        });
        return;
      }

      router.push("/payment-method");
    });
  };

  const handleSetDefault = async (id: string, userId: string) => {
    try {
      const res = await setDefaultAddress(id, userId);

      if (res.success) {
        toast({
          description: res.message,
          icon: <CheckCircle className="size-4 text-green-500" />,
        });

        setAddresses((prevAddresses) =>
          prevAddresses.map((addr) => ({
            ...addr,
            isDefault: addr.id === id,
          }))
        );
      } else {
        toast({
          variant: "destructive",
          description: res.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          "Errore durante l'aggiornamento dell'indirizzo predefinito.",
      });
    }
  };

  return (
    <>
      <CheckoutSteps current={1} />

      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Colonna Sinistra - Lista Indirizzi */}
        <div className="flex-col items-center justify-center lg:w-10/12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            📍 I tuoi Indirizzi di Spedizione
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gestisci e seleziona l'indirizzo per una consegna più rapida.
          </p>

          <div className="mt-4 space-y-4">
            {addresses
              ?.sort((a, b) =>
                a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1
              )
              .map((address) => (
                <motion.div
                  key={address.id}
                  className={`flex items-start justify-between rounded-lg border p-4 transition-shadow hover:shadow-lg ${
                    address.isDefault
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div>
                    <p className="text-gray-800 dark:text-white">
                      <MapPin className="mr-2 inline-block text-gray-600 dark:text-gray-400" />
                      {address.street}, {address.city}
                    </p>
                    {address.isDefault && (
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        ✅ Indirizzo Predefinito
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!address.isDefault && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleSetDefault(address.id, user.id)}
                      >
                        <CheckCircle className="size-4 text-gray-500 hover:text-blue-500" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
          <Button
            variant="outline"
            className="mt-10 flex w-full items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none md:w-fit"
            onClick={() => router.push("/payment-method")}
          >
            Continua al Metodo di Pagamento
          </Button>
        </div>

        <div className="my-auto hidden md:block lg:w-1/12">
          <Separator className="h-96 w-[2px]  bg-slate-100 " />
        </div>
        <div className="my-auto  md:hidden lg:w-1/12">
          <Separator className="mt-6 h-px  w-96 bg-slate-100" />
        </div>

        {/* Colonna Destra - Form Aggiunta Indirizzo */}
        <motion.div
          className="mt-8 w-full space-y-6 rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700 lg:mt-0 lg:w-10/12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
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
                  name={name as keyof z.infer<typeof shippingAddressSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        {label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          placeholder={placeholder}
                          className="w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <DynamicButton
                className="mt-10 flex w-full items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none md:w-fit"
                isPending={isPending}
              >
                {isPending ? (
                  <Loader className="size-5 animate-spin" />
                ) : (
                  <ArrowRight className="size-5" />
                )}
                Aggiungi Indirizzo
              </DynamicButton>
            </form>
          </Form>
        </motion.div>
      </div>
    </>
  );
};

export default ShippingAddressForm;
