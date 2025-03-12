"use client";
import {
  addItemToCart,
  cancelItemFromCart,
  removeItemFromCart,
} from "@/core/actions/cart/cart.actions";
import { ICartItem } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { calcPrice } from "@/lib/utils";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import CartTable from "./cart-table";
import EmptyCart from "./empty-cart";
import OrderSummary from "./order-summary";

export const ConfigCartPage = ({
  userLogged,
  cart,
}: {
  userLogged?: {
    role: string;
  } & User;
  cart: ICartItem[];
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [cleanedCartProduct, setCleanedCartProduct] = useState<ICartItem[]>([]);
  const [resume, setResume] = useState(calcPrice(cart));
  const [storedValue, setStoredValue] = useLocalStorage<ICartItem[]>(
    "cart",
    []
  );

  useEffect(() => {
    if (userLogged?.id) {
      if (cart) {
        setCleanedCartProduct(cart || []);
        setResume(calcPrice(cart));
      } else {
        console.error("Errore nel recupero del carrello:", cart);
      }
    } else {
      setCleanedCartProduct(storedValue);
    }
  }, [userLogged, storedValue, cart, setCleanedCartProduct]);

  const handleRemoveFromCart = (item: ICartItem) => {
    startTransition(async () => {
      const updatedCart = cleanedCartProduct.map((cartItem) =>
        cartItem.productId === item.productId
          ? { ...cartItem, qty: cartItem.qty - 1 }
          : cartItem
      );
      if (userLogged?.id) {
        if (item.qty === 1) {
          const updatedCartDB = await cancelItemFromCart(item.productId);

          setCleanedCartProduct(updatedCartDB?.items || []);
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
    if (userLogged?.id) {
      await addItemToCart({ ...item, userId: userLogged.id });
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
      if (userLogged?.id) {
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

  return (
    <>
      <span className="flex items-center justify-start gap-3">
        <h1 className="h2-bold py-4">Shopping Cart </h1>
        {/* {cleanedCartProduct.length !== 0 ? (
          <button
            className="flex items-center gap-2 rounded-md border border-red-500 bg-white px-5 py-2 text-base font-semibold text-red-500 shadow-md transition-colors duration-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 md:w-auto"
            onClick={() => {
              startTransition(async () => {
                if (userLogged?.id) {
                  await clearCart();
                } else {
                  setStoredValue([]);
                }
                setCleanedCartProduct([]);
              });
            }}
          >
            <Trash2 className="size-5 text-red-500" />
            <span>Pulisci carrello</span>
          </button>
        ) : null} */}
      </span>

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
              itemsPrice: Number(resume.itemsPrice),
              shippingPrice: Number(resume.shippingPrice),
              taxPrice: Number(resume.taxPrice),
              totalPrice: Number(resume.totalPrice),
              totalItems: Number(resume.totalItems),
            }}
            isPending={isPending}
            goToCheckout={goToCheckout}
            userLogged={userLogged}
          />
        </div>
      )}
    </>
  );
};
