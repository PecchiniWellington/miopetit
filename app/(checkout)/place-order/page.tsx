import { auth } from "@/auth";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getUserById } from "@/core/actions/user";
import { Metadata } from "next";
import PlaceOrderLogged from "./place-order-logged";
import PlaceOrderPageGuest from "./place-order-not-logged";

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
    <>
      <CheckoutSteps current={3} />
      {user ? (
        <PlaceOrderLogged
          cart={cart}
          defaultAddress={defaultAddress}
          user={user}
        />
      ) : (
        <PlaceOrderPageGuest />
      )}
    </>
  );
};

export default PlaceOrderPage;
