"use client";

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
import { updateUserAddress } from "@/core/actions/user";
import { createUserAddress } from "@/core/actions/user/create-user-address.action";
import { deleteUserAddress } from "@/core/actions/user/delete-user-address.action";
import { getUserAddress } from "@/core/actions/user/get-user-address.action";
import { setDefaultAddress } from "@/core/actions/user/set-user-default-address.action";
import { IUser, shippingAddressSchema } from "@/core/validators";
import {
  addressSchema,
  IAddress,
} from "@/core/validators/user-address.validator";

import { useToast } from "@/hooks/use-toast";
import { SHIPPING_ADDRESS_DEFAULT_VALUES } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CheckCircle,
  CircleX,
  Pencil,
  Plus,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const AddressesTab = ({ user }: { user: IUser }) => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);

  console.log("👤 Utente:", user);
  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: SHIPPING_ADDRESS_DEFAULT_VALUES,
  });

  const fetchAddresses = async () => {
    try {
      const r = await getUserAddress(user.id);

      if (r.data) {
        setAddresses(
          r.data.map((address) => ({
            ...address,
            fullName: address.fullName || "",
            postalCode: address.postalCode || "",
            country: address.country || "",
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [toast, user]);

  // 📌 Gestisce l'apertura del form per l'editing di un indirizzo
  const handleEditAddress = (address: IAddress) => {
    setEditingAddress(address?.id ?? null);

    // 🔥 Reset dei valori del form con i dati dell'indirizzo selezionato
    form.reset({
      street: address.street,
      city: address.city,
      postalCode: address.postalCode || "",
      country: address.country || "",
      fullName: address.fullName || "",
    });

    setIsModalOpen(true);
  };

  // 📌 Salvataggio o Modifica dell'indirizzo
  const handleSaveAddress = async (data: z.infer<typeof addressSchema>) => {
    try {
      // 🔥 Aggiungi isDefault se manca
      const addressData = {
        ...data,
        isDefault:
          editingAddress !== null
            ? (addresses.find((addr) => addr.id === editingAddress)
                ?.isDefault ?? false)
            : false,
      };

      console.log("addressData con isDefault:", addressData, editingAddress);

      const res = editingAddress
        ? await updateUserAddress({ id: editingAddress, ...addressData })
        : await createUserAddress(addressData);

      if (res.success) {
        toast({
          description: res.message,
        });
        setIsModalOpen(false);
        setEditingAddress(null);
        fetchAddresses(); // Aggiorna la lista degli indirizzi
      } else {
        toast({
          variant: "destructive",
          description: res.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Dati non validi. Controlla i campi inseriti." + error,
      });
    }
  };

  const handleSetDefault = async (id: string, userId: string) => {
    try {
      // Effettua una chiamata al backend per impostare l'indirizzo come default
      const res = await setDefaultAddress(id, userId);

      if (res.success) {
        toast({
          description: res.message,
        });

        // 📌 Aggiorna lo stato locale impostando isDefault solo per l'indirizzo selezionato
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
          "Errore durante l'aggiornamento dell'indirizzo predefinito." + error,
      });
    }
  };

  return (
    <div className="relative rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        📍 Indirizzi di Spedizione
      </h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Gestisci i tuoi indirizzi per una consegna più rapida.
      </p>

      {console.log("📌 Indirizzi:", { addresses, user })}
      {/* Lista Indirizzi */}
      <div className="mt-4 space-y-4">
        {addresses
          ?.sort((a, b) => (a.isDefault ? -1 : b.isDefault ? 1 : 0))
          .map((address) => (
            <div
              key={address.id}
              className={`flex items-center justify-between rounded-md border p-4 transition ${
                address.isDefault
                  ? "border-indigo-500 shadow-md"
                  : "border-gray-300"
              }`}
            >
              <div>
                <p className="text-gray-800 dark:text-white">
                  {address.street}, {address.city}
                </p>
                {address.isDefault && (
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    ✅ Indirizzo Predefinito
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {!address.isDefault && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      address.id && handleSetDefault(address.id, user.id)
                    }
                  >
                    <CheckCircle className="size-4 text-green-500" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEditAddress(address)}
                >
                  <Pencil className="size-4 text-gray-500" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (address.id) {
                      deleteUserAddress(address.id, user.id);
                    }
                    fetchAddresses();
                  }}
                >
                  <Trash className="size-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
      </div>

      {/* Bottone Aggiungi Indirizzo */}
      <Button
        className="mt-4 flex items-center gap-2"
        onClick={() => {
          setEditingAddress(null);
          form.reset(SHIPPING_ADDRESS_DEFAULT_VALUES);
          setIsModalOpen(true);
        }}
      >
        <Plus className="size-5" />
        Aggiungi Indirizzo
      </Button>

      {/* Overlay Modale Aggiunta/Modifica */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg">
            <span className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingAddress
                  ? "Modifica Indirizzo"
                  : "Aggiungi Nuovo Indirizzo"}
              </h3>

              <CircleX
                className="cursor-pointer text-red-500"
                onClick={() => setIsModalOpen(false)}
              />
            </span>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(
                  (data) => {
                    console.log("✅ Dati inviati:", data);
                    handleSaveAddress(data);
                  },
                  (errors) => {
                    console.log("❌ Errori nel form:", errors);
                  }
                )}
                method="post"
                className="mt-4 space-y-4"
              >
                {["fullName", "street", "city", "postalCode", "country"].map(
                  (field) => (
                    <div key={field} className={field}>
                      <FormField
                        control={form.control}
                        name={
                          field as keyof z.infer<typeof shippingAddressSchema>
                        }
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{field.name}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value ?? ""}
                                placeholder={`Inserisci ${field.name}`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )
                )}

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  <ArrowRight className="size-5" />
                  {editingAddress ? "Salva Modifiche" : "Aggiungi"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};
