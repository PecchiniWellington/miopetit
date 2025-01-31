const StripePayment = ({ order, stripeClientSecret }: any) => {
  return (
    <StripePayment
      priceInCents={Number(order.totalPrice) * 100}
      orderId={order.id}
      clientSecret={stripeClientSecret}
    />
  );
};

export default StripePayment;
