import { auth } from "@/auth";
import ConfigPlaceOrderPage from "@/components/components_page/place_order_page";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getUserById } from "@/core/actions/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conferma Ordine",
};

const PlaceOrderPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const user = userId ? await getUserById(userId) : null;
  const cart = user ? await getMyCart() : null;
  const defaultAddress = user?.defaultAddress as {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };

  return (
    <ConfigPlaceOrderPage
      cart={cart}
      defaultAddress={defaultAddress}
      user={user}
    />
  );
};

export default PlaceOrderPage;
