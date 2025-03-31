import BrandButton from "@/components/shared/brand-components/brand-button";
import { BASE_URL } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import {
  Elements,
  ExpressCheckoutElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Loader } from "lucide-react";
import { useLocale } from "next-intl";
import { FormEvent, useState } from "react";

const StripePayment = ({
  priceInCents,
  orderId,
  clientSecret,
}: {
  priceInCents: number;
  orderId: string;
  clientSecret: string;
}) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );
  const locale = useLocale();

  // Stripe Form Component
  const StripeForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");

    const onConfirmCheckout = async () => {
      if (stripe == null || elements == null || email == null) return;
      stripe
        .confirmPayment({
          elements,
          confirmParams: {
            return_url: `${BASE_URL}/${locale}/order/${orderId}/stripe-payment-success`,
          },
        })
        .then(({ error }) => {
          if (
            error?.type === "card_error" ||
            error?.type === "validation_error"
          ) {
            setErrorMessage(error?.message ?? "An unknown error occurred");
          } else if (error) {
            setErrorMessage("An unknown error occurred");
          }
        })
        .finally(() => setIsLoading(false));
      setIsLoading(true);
    };

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      onConfirmCheckout();
    };

    if (!stripe || !elements || !clientSecret) {
      return <Loader className="size-6 animate-spin text-indigo-600" />;
    }
    return (
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="text-xl">Stripe Checkout</div>
        {errorMessage && <div>{errorMessage}</div>}
        <PaymentElement />
        <ExpressCheckoutElement
          onConfirm={onConfirmCheckout}
          options={{
            paymentMethods: {
              googlePay: "always",
              applePay: "always",
              link: "never",
            },
          }}
        />

        <div>
          <LinkAuthenticationElement
            onChange={(e) => setEmail(e.value.email)}
          />
        </div>

        <BrandButton
          loading={isLoading}
          type="submit"
          disabled={stripe == null || elements == null || isLoading}
        >
          {`Purchase ${formatCurrency(priceInCents / 100)}`}
        </BrandButton>
      </form>
    );
  };
  /* ExpressCheckoutElement */
  return (
    <>
      <Elements
        options={{
          clientSecret,
          appearance: {
            theme: "flat",
          },
        }}
        stripe={stripePromise}
      >
        <StripeForm />
      </Elements>
    </>
  );
};

export default StripePayment;
