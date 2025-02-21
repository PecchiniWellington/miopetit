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
  if (!userId) {
    /* TODO: inserire le agevolazioni se ti autentichi */
    /* redirect("/sign-in"); */
    return <PaymentMethodForm />;
  } else {
    const user = await getUserById(userId);
    return <PaymentMethodForm preferredPaymentMethod={user?.paymentMethod} />;
  }
};

export default PaymentMethod;
