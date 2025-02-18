"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Pencil, Plus, Trash, X } from "lucide-react";
import { useState } from "react";

export const AddressesTab = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, street: "Via Roma, 10", city: "Milano", isDefault: true },
    { id: 2, street: "Viale Italia, 22", city: "Torino", isDefault: false },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: "", city: "" });
  const [editingAddress, setEditingAddress] = useState<number | null>(null);

  const handleSaveAddress = () => {
    if (newAddress.street && newAddress.city) {
      if (editingAddress !== null) {
        // Modifica un indirizzo esistente
        setAddresses((prev) =>
          prev.map((addr) =>
            addr.id === editingAddress
              ? { ...addr, street: newAddress.street, city: newAddress.city }
              : addr
          )
        );
      } else {
        // Aggiunge un nuovo indirizzo
        setAddresses([
          ...addresses,
          {
            id: Date.now(),
            street: newAddress.street,
            city: newAddress.city,
            isDefault: false,
          },
        ]);
      }
      setNewAddress({ street: "", city: "" });
      setEditingAddress(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleSetDefault = (id: number) => {
    setAddresses(
      addresses.map((addr) => ({ ...addr, isDefault: addr.id === id }))
    );
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
        {addresses.map((address) => (
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
                  setNewAddress({ street: address.street, city: address.city });
                  setEditingAddress(address.id);
                  setIsModalOpen(true);
                }}
              >
                <Pencil className="size-4 text-gray-500" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDeleteAddress(address.id)}
              >
                <Trash className="size-4 text-red-500" />
              </Button>
              {!address.isDefault && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleSetDefault(address.id)}
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
          setNewAddress({ street: "", city: "" });
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
