import DynamicButton from "@/components/dynamic-button";
import { useToast } from "@/hooks/use-toast";
import { updateOrderToPaidCOD } from "@/lib/actions/admin/admin.actions";

import { useTransition } from "react";

export const MarkAsPaidButton = ({ order }: any) => {
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
