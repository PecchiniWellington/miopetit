import { auth } from "@/auth";
import { getUserById } from "@/core/actions/user";
import { Metadata } from "next";
import PaymentMethodForm from "./payment-method-form";

export const metadata: Metadata = {
  title: "Select Payment Method",
  description: "Payment Method",
};

const PaymentMethod = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const user = userId ? await getUserById(userId) : null;
  return (
    <PaymentMethodForm
      preferredPaymentMethod={user?.paymentMethod}
      userId={userId}
    />
  );
};

export default PaymentMethod;
