import { auth } from "@/auth";
import ConfigShippingAddressPage from "@/components/components_page/shipping_address";
import { getUserById } from "@/core/actions/user";
import { getUserAddress } from "@/core/actions/user/get-user-address.action";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Shipping Address",
  description: "Shipping Address",
};

const ShippingAddress = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.log("cart is empty");
    redirect("/cart");
  } else {
  }

  if (!userId) {
    return;
  } else {
    const user = await getUserById(userId);
    const userAddress = await getUserAddress(userId);
    if (user) {
      const defaultAddress = user.defaultAddress;
      return (
        <ConfigShippingAddressPage
          user={{ ...user, defaultAddress }}
          userAddressList={userAddress.data}
        />
      );
    }
  }
};

export default ShippingAddress;
