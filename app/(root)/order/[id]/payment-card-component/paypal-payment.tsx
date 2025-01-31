import { toast } from "@/hooks/use-toast";
import {
  createPaypalOrder,
  approvePaypalOrder,
} from "@/lib/actions/order/paypal.action";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import router from "next/router";
import React from "react";

const PayPalPayment = ({ paypalClientId, order }: any) => {
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
  return (
    <div>
      <PayPalScriptProvider options={{ clientId: paypalClientId }}>
        <PrintLoadingState />
        <PayPalButtons
          createOrder={handleCreatePayPalOrder}
          onApprove={handleApprovePayPalOrder}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalPayment;
