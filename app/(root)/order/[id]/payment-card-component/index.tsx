import { Card, CardContent } from "@/components/ui/card";
import { PAYMENT_METHODS_TYPE } from "@/lib/constants/payment-methods";
import PayPalPayment from "./paypal-payment";
import StripePayment from "./stripe-payment";
import { MarkAsDeliveredButton } from "./mark-as-delivered";
import { MarkAsPaidButton } from "./mark-as-paid";
import { ResumeCard } from "./resume-card";

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
  stripeClientSecret,
}: any) => {
  // Button to mark order as paid

  return (
    <Card>
      <CardContent className="p-4 gap-4 space-y-4">
        <ResumeCard
          itemsPrice={itemsPrice}
          taxPrice={taxPrice}
          shippingPrice={shippingPrice}
          totalPrice={totalPrice}
        />

        {/* Paypal Payment */}
        {!isPaid && paymentMethod === PAYMENT_METHODS_TYPE.PAYPAL && (
          <PayPalPayment paypalClientId={paypalClientId} order={order} />
        )}
        {/* Stripe Payment */}
        {!isPaid &&
          paymentMethod === PAYMENT_METHODS_TYPE.STRIPE &&
          stripeClientSecret && (
            <StripePayment order={order} clientSecret={stripeClientSecret} />
          )}
        {/* Cash On Delivery Payment */}
        {isAdmin &&
          !isPaid &&
          paymentMethod === PAYMENT_METHODS_TYPE.CASH_ON_DELIVERY && (
            <MarkAsPaidButton order={order} />
          )}
        {/*Mark as Paid */}
        {isAdmin && isPaid && !isDelivered && (
          <MarkAsDeliveredButton order={order} />
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentCard;
