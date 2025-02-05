import DynamicButton from "@/components/dynamic-button";
import { useToast } from "@/hooks/use-toast";
import { updateOrderToDeliveredCOD } from "@/lib/actions/admin/admin.actions";
import { IOrder } from "@/types";

import { useTransition } from "react";

export const MarkAsDeliveredButton = ({ order }: { order: IOrder }) => {
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
