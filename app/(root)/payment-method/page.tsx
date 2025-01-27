import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.action";
import { Metadata } from "next";
import React from "react";
import PaymentMethodForm from "./payment-method-form";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Select Payment Method",
  description: "Payment Method",
};

const PaymentMethod = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    /* TODO: inserire le agevolazioni se ti autentichi */
    redirect("/login");
    /* return (
      <>
        <PaymentMethodForm />
      </>
    ); */
  } else {
    const user = await getUserById(userId);
    return (
      <>
        <PaymentMethodForm preferredPaymentMethod={user?.paymentMethod} />
      </>
    );
  }
};

export default PaymentMethod;
