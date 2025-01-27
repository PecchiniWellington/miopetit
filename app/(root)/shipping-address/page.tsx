import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.action";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import ShippingAddressForm from "./shipping-address-form";
import { IShippingAddress } from "@/types";
import { Check } from "lucide-react";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { useToast } from "@/hooks/use-toast";

export const metadata: Metadata = {
  title: "Shipping Address",
  description: "Shipping Address",
};

const ShippingAddress = async () => {
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/cart");

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    /* TODO: inserire le agevolazioni se ti autentichi */
    return (
      <div>
        <CheckoutSteps current={1} />
        <ShippingAddressForm />
      </div>
    );
  } else {
    const user = await getUserById(userId);
    return (
      <div>
        <CheckoutSteps current={1} />
        <ShippingAddressForm address={user.address as IShippingAddress} />
      </div>
    );
  }
};

export default ShippingAddress;
