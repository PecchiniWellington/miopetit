import { IOrder } from "@/core/validators";
import { PAYMENT_METHODS_TYPE } from "@/lib/constants/payment-methods";
import { MarkAsDeliveredButton } from "./mark-as-delivered";
import { MarkAsPaidButton } from "./mark-as-paid";
import PayPalPayment from "./paypal-payment";
import { ResumeCard } from "./resume-card";
import StripePayment from "./stripe-payment";
import GenericCard from "@/components/shared/brand-components/brand-card";

interface PaymentCardProps {
  order: /* IOrder */ Omit<IOrder, "paymentResult">;
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
    <GenericCard className="p-4">
      <div className="space-y-4">
        {/* Resume */}
        <ResumeCard
          itemsPrice={itemsPrice}
          taxPrice={taxPrice}
          shippingPrice={shippingPrice}
          totalPrice={totalPrice}
          showPlaceOrder={false}
        />

        {/* Paypal Payment */}
        {!isPaid && paymentMethod === PAYMENT_METHODS_TYPE.PAYPAL && (
          <PayPalPayment paypalClientId={paypalClientId} order={order} />
        )}

        {/* Stripe Payment */}
        {!isPaid &&
          paymentMethod === PAYMENT_METHODS_TYPE.STRIPE &&
          stripeClientSecret && (
            <StripePayment
              orderId={order.id}
              priceInCents={Number(order.totalPrice) * 100}
              clientSecret={stripeClientSecret}
            />
          )}

        {/* Cash On Delivery Payment */}
        {isAdmin &&
          !isPaid &&
          paymentMethod === PAYMENT_METHODS_TYPE.CASH_ON_DELIVERY && (
            <MarkAsPaidButton order={order} />
          )}

        {/* Mark as Delivered */}
        {isAdmin && isPaid && !isDelivered && (
          <MarkAsDeliveredButton order={order} />
        )}
      </div>
    </GenericCard>
  );
};

export default PaymentCard;
