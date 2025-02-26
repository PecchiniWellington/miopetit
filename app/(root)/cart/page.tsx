import { Metadata } from "next";
import { Cart } from "./cart";

export const metadata: Metadata = {
  title: "Shopping Cart",
};

const CartPage = async () => {
  return <Cart />;
};

export default CartPage;
