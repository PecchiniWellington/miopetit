import DynamicButton from "@/components/dynamic-button";
import { updateOrderToPaidCOD } from "@/core/actions/admin/admin.actions";
import { IOrder } from "@/core/validators";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

import { useTransition } from "react";

export const MarkAsPaidButton = ({
  order,
}: {
  order: Omit<IOrder, "paymentResult">;
}) => {
  const [isPending, setIsPending] = useTransition();
  const { toast } = useToast();
  const t = useTranslations("OrderConfirmation");
  return (
    <DynamicButton
      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none"
      isPending={isPending}
      handleAction={() =>
        setIsPending(async () => {
          const res = await updateOrderToPaidCOD(order.id);
          toast({
            variant: res.success ? "default" : "destructive",
            description: res.message,
          });
        })
      }
    >
      {isPending ? "Processing..." : t("mark_as_paid")}
    </DynamicButton>
  );
};
