import DynamicButton from "@/components/dynamic-button";
import { updateOrderToDeliveredCOD } from "@/core/actions/admin/admin.actions";
import { IOrder } from "@/core/validators";
import { useToast } from "@/hooks/use-toast";

import { useTransition } from "react";

export const MarkAsDeliveredButton = ({
  order,
}: {
  order: Omit<IOrder, "paymentResult">;
}) => {
  const [isPending, setIsPending] = useTransition();
  const { toast } = useToast();

  return (
    <DynamicButton
      isPending={isPending}
      handleAction={() =>
        setIsPending(async () => {
          const res = await updateOrderToDeliveredCOD(order.id);
          toast({
            variant: res.success ? "default" : "destructive",
            description: res.message,
          });
        })
      }
    >
      {isPending ? "Processing..." : "Mark as Delivered"}
    </DynamicButton>
  );
};
