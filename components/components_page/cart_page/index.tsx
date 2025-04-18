"use client";
import {
  addItemToCart,
  cancelItemFromCart,
  removeItemFromCart,
} from "@/core/actions/cart/cart.actions";
import { ICartItem } from "@/core/validators";
import { IContributor } from "@/core/validators/contributors.validator";
import useLocalStorage from "@/hooks/use-local-storage";
import { calcPrice } from "@/lib/utils";
import { User } from "next-auth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import CartTable from "./cart-table";
import EmptyCart from "./empty-cart";
import OrderSummary from "./order-summary";

export const ConfigCartPage = ({
  userLogged,
  cart,
  hasContributor,
}: {
  userLogged?: {
    role: string;
  } & User;
  cart: ICartItem[];
  hasContributor?: IContributor | null;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [cleanedCartProduct, setCleanedCartProduct] = useState<ICartItem[]>([]);
  const [resume, setResume] = useState(calcPrice(cart));
  const [storedValue, setStoredValue] = useLocalStorage<ICartItem[]>(
    "cart",
    []
  );
  const t = useTranslations("Cart");

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
    startTransition(async () => {
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
    });
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
    if (!hasContributor) {
      startTransition(() => router.push("/shipping-address"));
    } else {
      startTransition(() => router.push("/request-product"));
    }
  };

  return (
    <>
      <span className="flex items-center justify-start gap-3">
        <h1 className="h2-bold py-4">{t("title")} </h1>
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
            hasContributor={hasContributor}
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
