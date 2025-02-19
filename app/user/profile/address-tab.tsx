"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUserAddress } from "@/core/actions/user";
import { createUserAddress } from "@/core/actions/user/create-user-address.action";
import { deleteUserAddress } from "@/core/actions/user/delete-user-address.action";
import { getUserAddress } from "@/core/actions/user/get-user-address.action";
import { setDefaultAddress } from "@/core/actions/user/set-user-default-address.action";
import {
  IAddress,
  addressSchema,
} from "@/core/validators/user-address.validator";

import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Pencil, Plus, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";

export const AddressesTab = ({ user }: { user: any }) => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState<IAddress>({
    id: "",
    street: "",
    city: "",
    isDefault: false,
  });
  const [editingAddress, setEditingAddress] = useState<string | null>(null);

  const fetchAddresses = async () => {
    try {
      const r = await getUserAddress(user.id);
      setAddresses(r.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // 📌 Recupera gli indirizzi quando il componente viene montato
  useEffect(() => {
    fetchAddresses();
  }, [toast, user]);

  // 📌 Salvataggio o Modifica dell'indirizzo
  const handleSaveAddress = async () => {
    try {
      addressSchema.parse(newAddress);

      const res = newAddress.id
        ? await updateUserAddress(newAddress)
        : await createUserAddress(newAddress);

      if (res.success) {
        toast({
          description: res.message,
          icon: <CheckCircle className="size-4 text-green-500" />,
        });
        setIsModalOpen(false);
        setEditingAddress(null);
        setNewAddress({ id: "", street: "", city: "", isDefault: false });
        setAddresses(res.data); // Aggiorna la lista degli indirizzi
        fetchAddresses();
      } else {
        toast({
          variant: "destructive",
          description: res.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Dati non validi. Controlla i campi inseriti.",
      });
    }
  };

  // 📌 Eliminazione dell'indirizzo
  const handleDeleteAddress = async (addressId: string, userId: string) => {
    const res = await deleteUserAddress(addressId, userId);

    if (res.success) {
      toast({
        description: res.message,
        icon: <CheckCircle className="size-4 text-green-500" />,
      });

      // 📌 Aggiorna la lista degli indirizzi rimuovendo l'indirizzo eliminato
      setAddresses((prevAddresses) =>
        prevAddresses.filter((addr) => addr.id !== addressId)
      );
      fetchAddresses();
    } else {
      toast({
        variant: "destructive",
        description: res.message,
      });
    }
  };

  // 📌 Imposta l'indirizzo come predefinito
  const handleSetDefault = async (id: string, userId: string) => {
    try {
      // Effettua una chiamata al backend per impostare l'indirizzo come default
      const res = await setDefaultAddress(id, userId);

      if (res.success) {
        toast({
          description: res.message,
          icon: <CheckCircle className="size-4 text-green-500" />,
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
          "Errore durante l'aggiornamento dell'indirizzo predefinito.",
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

      {/* Lista Indirizzi */}
      <div className="mt-4 space-y-4">
        {addresses?.map((address) => (
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
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setNewAddress({
                    id: address.id,
                    street: address.street,
                    city: address.city,
                    isDefault: address.isDefault,
                  });
                  setEditingAddress(address.id);
                  setIsModalOpen(true);
                }}
              >
                <Pencil className="size-4 text-gray-500" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  handleDeleteAddress(address.id || "", user.id || "")
                }
              >
                <Trash className="size-4 text-red-500" />
              </Button>
              {!address.isDefault && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleSetDefault(address.id, user.id)}
                >
                  <CheckCircle className="size-4 text-green-500" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottone Aggiungi Indirizzo */}
      <Button
        className="mt-4 flex items-center gap-2"
        onClick={() => {
          setNewAddress({ id: "", street: "", city: "", isDefault: false });
          setEditingAddress(null);
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
            <h3 className="text-lg font-semibold text-gray-900">
              {editingAddress !== null
                ? "Modifica Indirizzo"
                : "Aggiungi Nuovo Indirizzo"}
            </h3>

            <div className="mt-4 space-y-3">
              <Input
                placeholder="Via, numero civico"
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                }
                className="w-full"
              />
              <Input
                placeholder="Città"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
                className="w-full"
              />
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex items-center gap-2"
              >
                <X className="size-4" /> Annulla
              </Button>
              <Button
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                onClick={handleSaveAddress}
              >
                {editingAddress !== null ? "Salva Modifiche" : "Aggiungi"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
