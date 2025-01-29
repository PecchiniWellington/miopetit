import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user/user.action";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import ShippingAddressForm from "./shipping-address-form";
import { IShippingAddress } from "@/types";

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
    /*  return <ShippingAddressForm />; */
    redirect("/login");
  } else {
    const user = await getUserById(userId);
    return <ShippingAddressForm address={user.address as IShippingAddress} />;
  }
};

export default ShippingAddress;
