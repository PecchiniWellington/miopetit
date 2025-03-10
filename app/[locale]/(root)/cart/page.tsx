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

  if (!cartResponse) {
    return <div>Failed to load cart.</div>;
  }

  return (
    <ConfigCartPage userLogged={session?.user} cart={cartResponse.items} />
  );
};

export default CartPage;
