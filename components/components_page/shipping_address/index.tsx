"use client";

import { Separator } from "@/components/ui/separator";
import { IUser } from "@/core/validators";
import { IAddress } from "@/core/validators/user-address.validator";
import { SHIPPING_ADDRESS_DEFAULT_VALUES } from "@/lib/constants";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AddNewAddressForm from "./add-new-address-form";
import DefaultAddressLoggedUser from "./default-address-logged-user";

const ConfigShippingAddressPage = ({
  user,
  userAddress,
}: {
  user?: IUser;
  userAddress?: any;
}) => {
  const [addresses, setAddresses] = useState<IAddress[]>([]);

  useEffect(() => {
    if (userAddress.data) {
      setAddresses(
        userAddress.data.map((address: any) => ({
          ...address,
          fullName: address.fullName ?? "",
          postalCode: address.postalCode ?? "",
          country: address.country ?? "",
        }))
      );
    }
  }, [userAddress.data]);

  return (
    <div className="flex flex-col items-center justify-center lg:flex-row lg:space-x-8">
      {user && (
        <>
          <DefaultAddressLoggedUser
            addresses={addresses}
            /*  setAddresses={setAddresses} */
            user={user}
          />

          <div className="my-auto lg:w-1/12">
            <Separator className="hidden h-96 w-[2px] bg-slate-100 md:block" />
            <Separator className="mt-6 h-px w-96 bg-slate-100 md:hidden" />
          </div>
        </>
      )}
      <motion.div
        className="mt-8 w-full space-y-6 rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700 lg:mt-0 lg:w-10/12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AddNewAddressForm
          user={user}
          addresses={addresses ?? SHIPPING_ADDRESS_DEFAULT_VALUES}
        />
      </motion.div>
    </div>
  );
};

export default ConfigShippingAddressPage;
