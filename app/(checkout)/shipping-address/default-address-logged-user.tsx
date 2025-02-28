"use client";

import { Button } from "@/components/ui/button";
import { updateUserAddress } from "@/core/actions/user";
import { setDefaultAddress } from "@/core/actions/user/set-user-default-address.action";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DefaultAddressLoggedUser = ({
  addresses,
  user,
  setAddresses,
}: {
  addresses: any[];
  user: any;
  setAddresses: (addresses: any) => void;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  // ✅ Imposta un indirizzo come predefinito
  const handleSetDefault = async (id: string, userId: string) => {
    try {
      setIsUpdating(true);
      const res = await setDefaultAddress(id, userId);

      if (res.success) {
        toast({ description: res.message });

        setAddresses((prevAddresses) =>
          prevAddresses.map((addr) => ({
            ...addr,
            isDefault: addr.id === id,
          }))
        );
      } else {
        toast({ variant: "destructive", description: res.message });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Errore nell'aggiornamento dell'indirizzo.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // ✅ Aggiorna l'indirizzo e procede al pagamento
  const updateAddress = async () => {
    try {
      setIsUpdating(true);
      const addressUser = addresses.find(
        (address) => address.isDefault === true
      );

      if (user) {
        const res = await setDefaultAddress(addressUser?.id, user.id);
        if (res.data) {
          const t = await updateUserAddress({
            ...res.data,
            fullName: res.data.fullName || "",
            street: res.data.street,
            city: res.data.city,
            postalCode: res.data.postalCode || "",
            country: res.data.country || "",
          });
        }

        if (!res.success) {
          toast({ variant: "destructive", description: res.message });
          return;
        }
      } else {
        toast({ description: "Indirizzo salvato localmente" });
      }

      router.push("/payment-method");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Errore nell'aggiornamento dell'indirizzo.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      {addresses.length > 0 && (
        <div className="lg:w-10/12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            📍 I tuoi Indirizzi di Spedizione
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gestisci e seleziona l'indirizzo per una consegna più rapida.
          </p>

          <div className="mt-4 space-y-4">
            {addresses
              .sort((a, b) =>
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
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <Loader2 className="size-4 animate-spin text-gray-500" />
                        ) : (
                          <CheckCircle className="size-4 text-gray-500 hover:text-blue-500" />
                        )}
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>

          <Button
            variant="outline"
            className="mt-10 flex w-full items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none md:w-fit"
            onClick={updateAddress}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              "Continua al Metodo di Pagamento"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default DefaultAddressLoggedUser;
