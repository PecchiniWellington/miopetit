import { getMyCart } from "@/core/actions/cart/cart.actions";
import { ICartItem } from "@/core/validators";
import { Metadata } from "next";
import { CartTable } from "./cart-table";

export const metadata: Metadata = {
  title: "Shopping Cart",
};

const CartPage = async () => {
  const cart = await getMyCart();

  return (
    <>
      <CartTable
        cart={{
          ...cart,
          items: cart?.items as ICartItem[],
          sessionCartId: cart?.id as string,
          itemsPrice: cart?.itemsPrice as unknown as string,
          totalPrice: cart?.totalPrice as unknown as string,
          shippingPrice: cart?.totalPrice as unknown as string,
          taxPrice: cart?.taxPrice as unknown as string,
        }}
      />
    </>
  );
};

export default CartPage;
