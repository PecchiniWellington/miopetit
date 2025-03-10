import { auth } from "@/auth";
import ConfigShippingAddressPage from "@/components/components_page/shipping_address";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getUserById } from "@/core/actions/user";
import { getUserAddress } from "@/core/actions/user/get-user-address.action";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Shipping Address",
  description: "Shipping Address",
};

const ShippingAddress = async () => {
  const cart = await getMyCart();
  if (!cart || !("items" in cart) || cart.items.length === 0) redirect("/cart");

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <ConfigShippingAddressPage />;
  } else {
    const user = await getUserById(userId);
    const userAddress = await getUserAddress(userId);
    if (user) {
      const defaultAddress = user.defaultAddress as {
        street: string;
        city: string;
        fullName: string;
        postalCode: string;
        country: string;
        id?: string;
        userId?: string;
        isDefault?: boolean;
      };
      return (
        <ConfigShippingAddressPage
          user={{ ...user, defaultAddress }}
          userAddress={userAddress.data}
        />
      );
    }
  }
};

export default ShippingAddress;
