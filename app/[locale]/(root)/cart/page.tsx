import { auth } from "@/auth";
import { ConfigCartPage } from "@/components/components_page/cart_page";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
};

const CartPage = async () => {
  const session = await auth();
  const cartResponse = await getMyCart();

  return (
    <ConfigCartPage
      userLogged={
        session?.user && { ...session.user, role: session.user.role || "" }
      }
      cart={cartResponse?.items || []}
    />
  );
};

export default CartPage;
