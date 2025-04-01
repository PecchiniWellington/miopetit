import { auth } from "@/auth";
import { ConfigCartPage } from "@/components/components_page/cart_page";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getContributorByUserId } from "@/core/actions/contributors/get-contributor-by-user-id";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
};

const CartPage = async () => {
  const session = await auth();
  const cartResponse = await getMyCart();
  const hasContributor = await getContributorByUserId(session?.user.id);
  return (
    <ConfigCartPage
      hasContributor={hasContributor}
      userLogged={
        session?.user && { ...session.user, role: session.user.role || "" }
      }
      cart={cartResponse?.items || []}
    />
  );
};

export default CartPage;
