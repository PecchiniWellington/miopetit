"use client";
import { ICartItem } from "@/core/validators";
import useCartHandler from "@/hooks/use-cart-handler";
import { useRouter } from "next/navigation";
import { startTransition, useTransition } from "react";
import CartTable from "./cart-table";
import EmptyCart from "./empty-cart";
import OrderSummary from "./order-summary";

export const Cart = () => {
  const [isPending, setIsPending] = useTransition();
  const router = useRouter();

  const { cartItems, addToCart, removeFromCart, cancelFromCart, resume } =
    useCartHandler();

  const cleanedCartProduct = Array.isArray(cartItems)
    ? cartItems.map((item) => ({
        productId: item.productId,
        image: item.image,
        name: item.name,
        price: item.price,
        qty: item.qty,
        slug: item.slug,
      }))
    : [];

  console.log("cleanedCartProduct", cleanedCartProduct);

  const handleRemoveFromCart = async (item: any) => {
    await removeFromCart(item);
  };

  const handleAddToCart = async (item: ICartItem) => {
    await addToCart(item);
  };
  const cancelProduct = async (item: ICartItem) => {
    setIsPending(async () => {
      await cancelFromCart(item.productId);
    });
  };

  const goToCheckout = () => {
    startTransition(() => router.push("/shipping-address"));
  };

  return (
    <>
      <h1 className="h2-bold py-4">Shopping Cart</h1>

      {!cleanedCartProduct || cleanedCartProduct?.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <CartTable
              cart={cleanedCartProduct}
              isPending={isPending}
              cancelProduct={cancelProduct}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </div>

          <OrderSummary
            resume={resume}
            isPending={isPending}
            goToCheckout={goToCheckout}
          />
        </div>
      )}
    </>
  );
};
