"use client";

import {
  addItemToCart,
  removeItemFromCart,
} from "@/core/actions/cart/cart.actions";
import { ICart, ICartItem } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { useTransition } from "react";
import AddToCartButton from "./add-to-cart-btn";
import IncreaseDecreaseProduct from "./increase-decrease-product";

export const AddToCart = ({
  myCart,
  item,
  userId,
}: {
  myCart: ICart | null;
  item: ICartItem;
  userId?: string;
}) => {
  const [isPending, setIsPending] = useTransition();
  const [storedValue, setValue] = useLocalStorage<ICartItem[]>("cart", []);

  const existItem = myCart
    ? myCart.items.find((i) => i.productId === item.productId)
    : storedValue.find((i: ICartItem) => i.productId === item.productId);

  const updateLocalCart = (item: ICartItem, qtyChange: number) => {
    const updatedCart = existItem
      ? storedValue.map((cartItem) =>
          cartItem.productId === item.productId
            ? { ...cartItem, qty: cartItem.qty + qtyChange }
            : cartItem
        )
      : [...storedValue, { ...item, productId: item.productId, qty: 1 }];

    setValue(updatedCart);
  };

  const handleRemoveFromCart = async () => {
    if (userId) {
      setIsPending(async () => {
        if (item.qty === 1) {
          await removeItemFromCart(item.productId);
        } else {
          setIsPending(async () => {
            await removeItemFromCart(item.productId);
          });
        }
        return;
      });
    } else {
      updateLocalCart(item, -1);
    }
  };

  const handleAddToCart = async () => {
    if (userId) {
      setIsPending(async () => {
        await addItemToCart({
          ...item,
          image: item.image || "",
          userId: userId || "",
        });
      });
    } else {
      updateLocalCart(item, 1);
    }
  };
  return existItem ? (
    <IncreaseDecreaseProduct
      existItem={existItem.qty}
      handleAddToCart={handleAddToCart}
      handleRemoveFromCart={handleRemoveFromCart}
      isPending={isPending}
      item={item}
    />
  ) : (
    <AddToCartButton
      item={item}
      handleAddToCart={handleAddToCart}
      isPending={isPending}
    />
  );
};
