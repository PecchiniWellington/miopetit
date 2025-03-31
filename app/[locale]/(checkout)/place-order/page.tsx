// app/[locale]/place-order/page.tsx

import { auth } from "@/auth";
import ConfigPlaceOrderPage from "@/components/components_page/place_order_page";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getUserById } from "@/core/actions/user";
import { IUser } from "@/core/validators/user.validator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conferma Ordine",
};

const PlaceOrderPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const rawUser = userId ? await getUserById(userId) : null;

  // 🛠️ FIX: forziamo parsing di defaultAddress solo se è stringa
  const user: IUser | null = rawUser
    ? {
        ...rawUser,
      }
    : null;

  const myCart = user ? await getMyCart() : null;
  const defaultAddress = user?.defaultAddress
    ? {
        ...user.defaultAddress,
        street: user.defaultAddress.street ?? "",
        city: user.defaultAddress.city ?? "",
        country: user.defaultAddress.country ?? "",
        zipCode: user.defaultAddress.zipCode ?? "",
      }
    : null;

  return (
    <ConfigPlaceOrderPage
      user={user}
      myCart={myCart}
      defaultAddress={defaultAddress}
    />
  );
};

export default PlaceOrderPage;
