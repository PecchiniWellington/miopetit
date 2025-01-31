import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { updateOrderToDeliveredCOD } from "@/lib/actions/admin/admin.actions";

import { useTransition } from "react";

export const MarkAsDeliveredButton = ({ order }: any) => {
  const [isPending, setIsPending] = useTransition();
  const { toast } = useToast();

  return (
    <Button
      type="button"
      disabled={isPending}
      className="bg-slate-500 text-slate-100 "
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
      {isPending ? "Processing..." : "Mark as Delivered"}
    </Button>
  );
};
