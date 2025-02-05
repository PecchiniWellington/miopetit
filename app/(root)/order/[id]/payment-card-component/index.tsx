import { Card, CardContent } from "@/components/ui/card";
import { PAYMENT_METHODS_TYPE } from "@/lib/constants/payment-methods";
import PayPalPayment from "./paypal-payment";
import StripePayment from "./stripe-payment";
import { MarkAsDeliveredButton } from "./mark-as-delivered";
import { MarkAsPaidButton } from "./mark-as-paid";
import { ResumeCard } from "./resume-card";
import { IOrder } from "@/types";

interface PaymentCardProps {
  order: Omit<IOrder, "paymentResult">;
  itemsPrice: string;
  totalPrice: string;
  taxPrice: string;
  shippingPrice: string;
  isAdmin: boolean;
  isPaid: boolean;
  paymentMethod: string;
  isDelivered?: boolean;
  paypalClientId: string;
  stripeClientSecret: string | null;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  order,
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
}) => {
  return (
    <Card>
      <CardContent className="gap-4 space-y-4 p-4">
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
