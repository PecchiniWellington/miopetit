import { IOrder } from "@/core/types";

const StripePayment = (
  {
    /*  order,
  stripeClientSecret, */
  }: {
    order: Omit<IOrder, "paymentResult">;
    stripeClientSecret: string;
  }
) => {
  return (
    <div>CIAO</div>
    /*  <StripePayment
      priceInCents={Number(order.totalPrice) * 100}
      orderId={order.id}
      clientSecret={stripeClientSecret}
    /> */
  );
};

export default StripePayment;
