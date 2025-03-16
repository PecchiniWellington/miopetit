import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { useState } from "react";
import BrandButton from "../brand-components/brand-button";
import DynamicFormField from "../dynamic-form-field";

interface SlugFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  isPending: boolean;
  onSubmit: (data: T) => void;
  isModal?: boolean;
}
const TicketSupport = <T extends FieldValues>({
  form,
  isPending,
  onSubmit,
}: SlugFormFieldProps<T>) => {
  const t = useTranslations("ModalSupportTicket");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex w-full justify-end">
      <BrandButton
        onClick={() => setIsOpen(true)}
        icon={<MessageCircle className="size-5" />}
      >
        {t("open_ticket")}
      </BrandButton>

      {isOpen && (
        <Form {...form}>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* 🔘 Bottone di Chiusura */}

              <BrandButton onClick={() => setIsOpen(false)}>
                <X className="size-5" />
              </BrandButton>

              <div className="rounded-lg border bg-gray-50 p-4">
                <h2 className="text-lg font-bold">📩 {t("open_ticket")}</h2>
                <p className="text-sm text-gray-500">
                  {t("describe_your_issue")}
                </p>
                <form
                  onSubmit={form.handleSubmit(
                    (data) => {
                      console.log("✅ Dati inviati:", data);
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
    </div>
  );
};

export default TicketSupport;
