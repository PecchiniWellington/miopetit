"use client";

import CheckoutSteps from "@/components/shared/checkout-steps";
import { Separator } from "@/components/ui/separator";
import { getUserAddress } from "@/core/actions/user/get-user-address.action";
import { IUser } from "@/core/validators";
import { IAddress } from "@/core/validators/user-address.validator";
import { useToast } from "@/hooks/use-toast";
import { SHIPPING_ADDRESS_DEFAULT_VALUES } from "@/lib/constants";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddNewAddressForm from "./add-new-address-form";
import DefaultAddressLoggedUser from "./default-address-logged-user";

const ShippingAddressForm = ({ user }: { user?: IUser }) => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<IAddress[]>([]);

  useEffect(() => {
    if (!user) {
      toast({
        className:
          "bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-6 rounded-lg shadow-xl border border-indigo-400 text-lg",

        description: (
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3">
              <svg
                className="size-8 animate-bounce"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2a10 10 0 1 1-7.07 17.07l-4.2 1.12a1 1 0 0 1-1.22-1.22l1.12-4.2A10 10 0 1 1 12 2zM12 4a8 8 0 1 0 5.66 13.66A8 8 0 0 0 12 4z"></path>
                <path d="M10 8a2 2 0 1 1 4 0v4a2 2 0 1 1-4 0V8z"></path>
                <path d="M10 16h4v2h-4z"></path>
              </svg>
              <span className="text-xl font-bold">Iscriviti subito! 🚀</span>
            </div>
            <p className="text-md mt-2 font-medium">
              Se vuoi maggiori agevolazioni, <br /> iscriviti ora al sito e
              approfitta delle offerte! 🎉
            </p>

            {/* Bottone di iscrizione */}
            <Link
              href="/signup"
              className="mt-4 inline-block w-full rounded-full bg-white px-5 py-3 text-center text-lg font-semibold text-indigo-600 shadow-md transition-all duration-300 hover:scale-105 hover:bg-indigo-100"
            >
              ✨ Registrati Ora!
            </Link>
          </div>
        ),
        duration: 8000, // Mostra il toast per 8 secondi
      });

      return;
    }

    const fetchAddresses = async () => {
      try {
        const r = await getUserAddress(user.id);
        if (r.data) {
          setAddresses(r.data);
        }
        console.log("r.data", r.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [toast, user]);

  return (
    <>
      <CheckoutSteps current={1} />

      <div className="flex flex-col items-center justify-center lg:flex-row lg:space-x-8">
        {user && (
          <>
            <DefaultAddressLoggedUser
              addresses={addresses}
              setAddresses={setAddresses}
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
    </>
  );
};

export default ShippingAddressForm;
