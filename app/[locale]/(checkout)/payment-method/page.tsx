import { auth } from "@/auth";
import ConfigPaymentMethodsPage from "@/components/components_page/payment_methods_page";
import { getUserById } from "@/core/actions/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Select Payment Method",
  description: "Payment Method",
};

const PaymentMethod = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const user = userId ? await getUserById(userId) : null;

  return (
    <ConfigPaymentMethodsPage
      preferredPaymentMethod={user?.paymentMethod}
      userId={userId}
    />
  );
};

export default PaymentMethod;
