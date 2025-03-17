"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { Form } from "@/components/ui/form";
import BrandButton from "../brand-components/brand-button";
import DynamicFormField from "../dynamic-form-field";

interface SlugFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  isPending: boolean;
  onSubmit: (data: T) => void;
}

const TicketSupport = <T extends FieldValues>({
  form,
  isPending,
  onSubmit,
}: SlugFormFieldProps<T>) => {
  const t = useTranslations("ModalSupportTicket");
  const [isOpen, setIsOpen] = useState(false);

  // Blocca lo scroll quando la modale è aperta
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <BrandButton
        onClick={() => setIsOpen(true)}
        icon={<MessageCircle className="size-5" />}
      >
        {t("open_ticket")}
      </BrandButton>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <Form {...form}>
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl dark:bg-slate-900"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* 🔘 Bottone di Chiusura */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                  >
                    <X className="size-5" />
                  </button>

                  <div className="rounded-lg border bg-gray-50 p-4 dark:bg-slate-800">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      📩 {t("open_ticket")}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {t("describe_your_issue")}
                    </p>

                    <form
                      onSubmit={form.handleSubmit(
                        (data) => {
                          onSubmit(data);
                          setIsOpen(false);
                        },
                        (errors) => {
                          console.log("❌ Errori nel form:", errors);
                        }
                      )}
                      className="mt-4 space-y-4"
                    >
                      <DynamicFormField
                        control={form.control}
                        name={"subject" as Path<T>}
                        title={t("subject")}
                        placeholder={t("subject_of_request")}
                      />

                      <DynamicFormField
                        control={form.control}
                        name={"email" as Path<T>}
                        title={t("email")}
                        placeholder={t("your_email")}
                      />

                      <DynamicFormField
                        control={form.control}
                        name={"orderId" as Path<T>}
                        title={t("order")}
                        placeholder={t("n_order")}
                      />

                      <DynamicFormField
                        type="textarea"
                        control={form.control}
                        name={"description" as Path<T>}
                        title={t("description")}
                        placeholder={t("describe_your_request")}
                      />

                      <BrandButton
                        loading={isPending}
                        type="submit"
                        disabled={isPending}
                      >
                        {t("send_ticket")}
                      </BrandButton>
                    </form>
                  </div>
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

export default TicketSupport;
