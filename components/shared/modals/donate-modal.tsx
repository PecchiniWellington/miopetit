"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HandHeart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import BrandButton from "../brand-components/brand-button";
import DynamicFormField from "../dynamic-form-field";

interface DonateModalProps {
  productName?: string;
  onDonate: (amount: number) => void;
}

type DonateFormValues = {
  amount: number;
  message?: string;
};

const DonateModal = ({ productName, onDonate }: DonateModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<DonateFormValues>({
    defaultValues: {
      amount: 5,
      message: "",
    },
  });

  // Blocca lo scroll quando modale attiva
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (data: DonateFormValues) => {
    onDonate(data.amount);
    setIsOpen(false);
  };

  return (
    <>
      <BrandButton onClick={() => setIsOpen(true)} icon={<HandHeart />}>
        Dona a {productName}
      </BrandButton>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <Form {...form}>
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-2xl dark:bg-slate-900"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                  >
                    <X className="size-5" />
                  </button>

                  <h2 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                    💚 Dona a {productName}
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Puoi scegliere un importo e lasciare un messaggio opzionale.
                  </p>

                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="mt-4 space-y-4"
                  >
                    <DynamicFormField
                      control={form.control}
                      name="amount"
                      title="Importo (€)"
                      placeholder="Es. 10"
                      isNumber={true}
                    />

                    <DynamicFormField
                      control={form.control}
                      name="message"
                      title="Messaggio (opzionale)"
                      placeholder="Un pensiero per il canile..."
                      type="textarea"
                    />

                    <BrandButton type="submit">Invia Donazione</BrandButton>
                  </form>
                </motion.div>
              </motion.div>
            </Form>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default DonateModal;
