import {
  approvePaypalOrder,
  createPaypalOrder,
} from "@/core/actions/order/paypal.action";
import { IOrder } from "@/core/validators";
import { toast } from "@/hooks/use-toast";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const PayPalPayment = ({
  paypalClientId,
  order,
}: {
  paypalClientId: string;
  order: Omit<IOrder, "paymentResult">;
}) => {
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
