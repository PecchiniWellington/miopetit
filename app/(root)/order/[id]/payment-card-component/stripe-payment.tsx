import { IOrder } from "@/types";

const StripePayment = (
  {
    /*  order,
  stripeClientSecret, */
  }: {
    order: IOrder;
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
