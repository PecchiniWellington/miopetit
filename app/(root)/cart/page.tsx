import { Metadata } from "next";
import React from "react";
import { CartTable } from "./cart-table";
import { getMyCart } from "@/lib/actions/cart.actions";

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
          items: cart?.items as any,
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
