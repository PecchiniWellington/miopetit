import BrandButton from "@/components/shared/brand-components/brand-button";
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
    <BrandButton
      loading={isPending}
      onClick={() =>
        setIsPending(async () => {
          const res = await updateOrderToPaidCOD(order.id);
          toast({
            variant: res.success ? "default" : "destructive",
            description: res.message,
          });
        })
      }
    >
      {t("mark_as_paid")}
    </BrandButton>
  );
};
