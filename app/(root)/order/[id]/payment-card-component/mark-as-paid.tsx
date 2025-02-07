import DynamicButton from "@/components/dynamic-button";
import { updateOrderToPaidCOD } from "@/core/actions/admin/admin.actions";
import { useToast } from "@/hooks/use-toast";
import { IOrder } from "@/types";

import { useTransition } from "react";

export const MarkAsPaidButton = ({
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
          const res = await updateOrderToPaidCOD(order.id);
          toast({
            variant: res.success ? "default" : "destructive",
            description: res.message,
          });
        })
      }
    >
      {isPending ? "Processing..." : "Mark as Paid"}
    </DynamicButton>
  );
};
