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
          sessionCartId: cart!.sessionCartId ?? "",
          items: cart!.items ?? [],
          itemsPrice: cart!.itemsPrice.toString(),
          totalPrice: cart!.totalPrice.toString(),
          shippingPrice: cart!.shippingPrice.toString(),
          taxPrice: cart!.taxPrice.toString(),
        }}
      />
    </>
  );
};

export default CartPage;
