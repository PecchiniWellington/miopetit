"use client";
import {
  addItemToCart,
  cancelItemFromCart,
  getMyCart,
  removeItemFromCart,
} from "@/core/actions/cart/cart.actions";
import { ICartItem } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import loader from "@/public/assets/loader.gif";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import CartTable from "./cart-table";
import EmptyCart from "./empty-cart";
import OrderSummary from "./order-summary";

export const Cart = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [fetching, startFetching] = useState(false);

  const [storedValue, setStoredValue] = useLocalStorage<ICartItem[]>(
    "cart",
    []
  );
  const [cleanedCartProduct, setCleanedCartProduct] = useState<ICartItem[]>([]);

  useEffect(() => {
    startFetching(true);
    const fetchCart = async () => {
      console.log("Cart status:", { status, session: session?.user?.id });

      if (status === "authenticated" && session?.user?.id) {
        console.log("Fetching cart from database...");
        const cartResponse = await getMyCart();
        if (cartResponse && !("success" in cartResponse)) {
          setCleanedCartProduct(cartResponse.items || []);
          startFetching(false);
        } else {
          console.error("Errore nel recupero del carrello:", cartResponse);
          startFetching(false);
        }
      } else {
        console.log("Fetching cart from localStorage...");
        setCleanedCartProduct(storedValue);
        startFetching(false);
      }
    };

    fetchCart();
  }, [status, session, storedValue, setCleanedCartProduct]);

  const handleRemoveFromCart = (item: ICartItem) => {
    startTransition(async () => {
      const updatedCart = cleanedCartProduct.map((cartItem) =>
        cartItem.productId === item.productId
          ? { ...cartItem, qty: cartItem.qty - 1 }
          : cartItem
      );
      if (session?.user?.id) {
        if (item.qty === 1) {
          const updatedCartDB = await cancelItemFromCart(item.productId);
          setCleanedCartProduct(updatedCartDB.items || []);
        } else {
          await removeItemFromCart(item.productId);
          setCleanedCartProduct(updatedCart);
        }
      } else {
        setStoredValue(updatedCart);
        setCleanedCartProduct(updatedCart);
      }
    });
  };

  const handleAddToCart = async (item: ICartItem) => {
    const updatedCart = cleanedCartProduct.map((cartItem) =>
      cartItem.productId === item.productId
        ? { ...cartItem, qty: cartItem.qty + 1 }
        : cartItem
    );
    if (session?.user?.id) {
      await addItemToCart(item);
    } else {
      setStoredValue(updatedCart);
    }
    setCleanedCartProduct(updatedCart);
  };

  const cancelProduct = (item: ICartItem) => {
    startTransition(async () => {
      const updatedCart = cleanedCartProduct.filter(
        (cartItem) => cartItem.productId !== item.productId
      );
      if (session?.user?.id) {
        await cancelItemFromCart(item.productId);
      } else {
        setStoredValue(updatedCart);
      }
      setCleanedCartProduct(updatedCart);
    });
  };

  const goToCheckout = () => {
    startTransition(() => router.push("/shipping-address"));
  };

  return fetching ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
      <Image src={loader} height={150} width={150} alt="Loading..." priority />
    </div>
  ) : (
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
            resume={{
              itemsPrice: 0,
              shippingPrice: 0,
              taxPrice: 0,
              totalPrice: 0,
              totalItems: 0,
            }}
            isPending={isPending}
            goToCheckout={goToCheckout}
          />
        </div>
      )}
    </>
  );
};
