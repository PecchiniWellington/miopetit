"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import { setDefaultAddress } from "@/core/actions/user/set-user-default-address.action";
import { IUser } from "@/core/validators";
import { IAddress } from "@/core/validators/user-address.validator";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { CheckCircle, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DefaultAddressLoggedUser = ({
  addresses,
  user,
}: {
  addresses: IAddress[];
  user: IUser;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSetDefault = async (id: string, userId: string) => {
    try {
      setIsUpdating(true);
      const res = await setDefaultAddress(id, userId);

      if (res.success) {
        toast({ description: res.message });
      } else {
        toast({ variant: "destructive", description: res.message });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Errore nell'aggiornamento dell'indirizzo." + error,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const updateAddress = async () => {
    try {
      setIsUpdating(true);

      router.push("/payment-method");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Errore nell'aggiornamento dell'indirizzo." + error,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const t = useTranslations("Checkout.shipping_address");
  return (
    <div>
      {addresses.length > 0 && (
        <div className="lg:w-10/12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t("subtitle")}
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
                        ✅ {t("default_address")}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!address.isDefault && (
                      <BrandButton
                        variant="flat"
                        loading={isUpdating}
                        onClick={() =>
                          address.id &&
                          user.id &&
                          handleSetDefault(address.id, user.id)
                        }
                        disabled={isUpdating}
                      >
                        <CheckCircle className="size-4 text-gray-500 hover:text-blue-500" />
                      </BrandButton>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>

          <BrandButton
            className="mt-4"
            onClick={() => updateAddress()}
            disabled={isUpdating}
            loading={isUpdating}
          >
            {t("continue_button")}
          </BrandButton>
        </div>
      )}
    </div>
  );
};

export default DefaultAddressLoggedUser;
