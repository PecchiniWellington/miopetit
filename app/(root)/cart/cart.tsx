"use client";
import { ICartItem } from "@/core/validators";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import CartTable from "./cart-table";
import EmptyCart from "./empty-cart";
import OrderSummary from "./order-summary";
import useLocalStorage from "@/hooks/use-local-storage";

export const Cart = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [storedValue, setStoredValue] = useLocalStorage<ICartItem[]>(
    "cart",
    []
  );

  // ✅ Controlla se storedValue è un array, altrimenti usa un array vuoto
  const cleanedCartProduct = Array.isArray(storedValue)
    ? storedValue.map((item) => ({
        productId: item.productId,
        image: item.image,
        name: item.name,
        price: item.price,
        qty: item.qty,
        slug: item.slug,
      }))
    : [];

  const handleRemoveFromCart = (item: ICartItem) => {
    console.log("removeFromCart", item);
    const updatedCart = cleanedCartProduct.filter(
      (cartItem) => cartItem.productId !== item.productId
    );
    setStoredValue(updatedCart);
  };

  const handleAddToCart = (item: ICartItem) => {
    console.log("addToCart", item);
    const updatedCart = cleanedCartProduct.map((cartItem) =>
      cartItem.productId === item.productId
        ? { ...cartItem, qty: cartItem.qty + 1 }
        : cartItem
    );
    setStoredValue(updatedCart);
  };

  const cancelProduct = async (item: ICartItem) => {
    startTransition(() => {
      console.log("cancelFromCart", item.productId);
      const updatedCart = cleanedCartProduct.filter(
        (cartItem) => cartItem.productId !== item.productId
      );
      setStoredValue(updatedCart);
    });
  };

  const goToCheckout = () => {
    startTransition(() => router.push("/shipping-address"));
  };

  return (
    <>
      <h1 className="h2-bold py-4">Shopping Cart</h1>

      {cleanedCartProduct.length === 0 ? (
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
            resume={{ total: 0, subtotal: 0, shipping: 0 }}
            isPending={isPending}
            goToCheckout={goToCheckout}
          />
        </div>
      )}
    </>
  );
};
