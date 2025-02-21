import { auth } from "@/auth";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getUserById } from "@/core/actions/user";
import { IShippingAddress } from "@/core/validators";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import ShippingAddressForm from "./shipping-address-form";

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
    if (user) {
      return (
        <SessionProvider>
          <ShippingAddressForm
            address={user.defaultAddress as IShippingAddress}
            user={user}
          />
        </SessionProvider>
      );
    } else {
      redirect("/login");
    }
  }
};

export default ShippingAddress;
