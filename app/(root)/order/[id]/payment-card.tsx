import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast, useToast } from "@/hooks/use-toast";
import {
  updateOrderToPaidCOD,
  updateOrderToDeliveredCOD,
} from "@/lib/actions/order/order.action";
import {
  createPaypalOrder,
  approvePaypalOrder,
} from "@/lib/actions/order/paypal.action";
import { PAYMENT_METHODS_TYPE } from "@/lib/constants/payment-methods";
import { formatCurrency } from "@/lib/utils";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import router from "next/router";
import React, { useTransition } from "react";

const PaymentCard = ({
  order,
  id,
  itemsPrice,
  totalPrice,
  taxPrice,
  shippingPrice,
  isAdmin,
  isPaid,
  paymentMethod,
  isDelivered,
  paypalClientId,
}: any) => {
  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    let status = "";

    if (isPending) {
      status = "Loading Paypal...";
    } else if (isRejected) {
      status = "Failed to load Paypal";
    }
    return status;
  };

  const handleCreatePayPalOrder = async () => {
    const res = await createPaypalOrder(order.id);

    if (!res.success) {
      toast({
        variant: "destructive",
        description: res.message,
      });
    }
    return res.data;
  };

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const res = await approvePaypalOrder(order.id, data);

    toast({
      variant: res.success ? "default" : "destructive",
      description: res.message,
    });

    router.push(`/order/${order.id}`);
  };

  // Button to mark order as paid

  const MarkAsPaidButton = () => {
    const [isPending, setIsPending] = useTransition();
    const { toast } = useToast();

    return (
      <Button
        type="button"
        disabled={isPending}
        className="bg-slate-500 text-slate-100 "
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
        {isPending ? "Processing..." : "Mark as Paid"}
      </Button>
    );
  };
  const MarkAsDeliveredButton = () => {
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

  return (
    <Card>
      <CardContent className="p-4 gap-4 space-y-4">
        <div className="flex justify-between">
          <div>Items</div>
          <div>{formatCurrency(itemsPrice as unknown as string)}</div>
        </div>
        <div className="flex justify-between">
          <div>Tax</div>
          <div>{formatCurrency(taxPrice as unknown as string)}</div>
        </div>
        <div className="flex justify-between">
          <div>Shipping</div>
          <div>{formatCurrency(shippingPrice as unknown as string)}</div>
        </div>
        <div className="flex justify-between">
          <div>Total</div>
          <div>{formatCurrency(totalPrice as unknown as string)}</div>
        </div>

        {/* Paypal Payment */}
        {!isPaid && paymentMethod === PAYMENT_METHODS_TYPE.PAYPAL && (
          <div>
            <PayPalScriptProvider options={{ clientId: paypalClientId }}>
              <PrintLoadingState />
              <PayPalButtons
                createOrder={handleCreatePayPalOrder}
                onApprove={handleApprovePayPalOrder}
              />
            </PayPalScriptProvider>
          </div>
        )}
        {isAdmin &&
          !isPaid &&
          paymentMethod === PAYMENT_METHODS_TYPE.CASH_ON_DELIVERY && (
            <MarkAsPaidButton />
          )}
        {isAdmin && isPaid && !isDelivered && <MarkAsDeliveredButton />}
      </CardContent>
    </Card>
  );
};

export default PaymentCard;
