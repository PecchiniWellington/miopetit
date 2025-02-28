import { auth } from "@/auth";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getUserById } from "@/core/actions/user";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ShippingAddressForm from "./shipping-address-container";

export const metadata: Metadata = {
  title: "Shipping Address",
  description: "Shipping Address",
};

const ShippingAddress = async () => {
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/cart");

  const session = await auth();
  const userId = session?.user?.id;

  /* TODO: inserire le agevolazioni se ti autentichi */

  if (!userId) {
    return <ShippingAddressForm />;
  } else {
    const user = await getUserById(userId);
    if (user) {
      return <ShippingAddressForm user={user} />;
    }
  }
};

export default ShippingAddress;
