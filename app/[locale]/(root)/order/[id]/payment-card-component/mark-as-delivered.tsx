import BrandButton from "@/components/shared/brand-components/brand-button";
import { updateOrderToDeliveredCOD } from "@/core/actions/admin/admin.actions";
import { IOrder } from "@/core/validators";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { useTransition } from "react";

export const MarkAsDeliveredButton = ({
  order,
}: {
  order: Omit<IOrder, "paymentResult">;
}) => {
  const [isPending, setIsPending] = useTransition();
  const { toast } = useToast();
  const t = useTranslations("OrderConfirmation");
  return (
    <div className="flex items-center gap-2">
      <BrandButton
        loading={isPending}
        disabled={order.isDelivered}
        variant={order.isDelivered ? "confirm" : "primary"}
        onClick={() =>
          setIsPending(async () => {
            const res = await updateOrderToDeliveredCOD(order.id);

            toast({
              variant: res.success ? "default" : "destructive",
              description: res.message,
            });
          })
        }
      >
        {order.isDelivered ? t("delivered") : t("mark_as_delivered")}
      </BrandButton>

      {order.isDelivered && (
        <Link
          className={`flex items-center gap-2 rounded-full  bg-gradient-to-r from-indigo-500  to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none  
        `}
          href={"/admin/products"}
        >
          {t("go_to_product_list")}
        </Link>
      )}
    </div>
  );
};
