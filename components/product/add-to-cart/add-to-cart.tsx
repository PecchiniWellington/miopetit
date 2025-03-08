"use client";

import { ToastAction } from "@/components/ui/toast";
import {
  addItemToCart,
  removeItemFromCart,
} from "@/core/actions/cart/cart.actions";
import { ICart, ICartItem } from "@/core/validators";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import AddToCartButton from "./add-to-cart-btn";
import IncreaseDecreaseProduct from "./increase-decrease-product";

export const AddToCart = ({
  myCart,
  item,
}: {
  myCart: ICart | null;
  item: ICartItem;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, setIsPending] = useTransition();

  //Check if the item is already in the cart
  const existItem =
    myCart && myCart?.items?.find((i) => i.productId === item.productId);

  const handleRemoveFromCart = async () => {
    setIsPending(async () => {
      if (item.qty === 1) {
        await removeItemFromCart(item.productId);
      } else {
        setIsPending(async () => {
          await removeItemFromCart(item.productId);
        });
      }

      /*  toast({
        className: `${
          res.success
            ? "bg-green-100 text-green-700 px-5 py-2"
            : "bg-red-100 text-red-700 px-5 py-2"
        } `,
        variant: res.success ? "default" : "destructive",
        description: res.message,
      }); */

      return;
    });
  };

  const handleAddToCart = async () => {
    setIsPending(async () => {
      const res = await addItemToCart({ ...item, image: item.image || "" });

      if (!res?.success) {
        toast({
          className: "bg-red-100 text-red-700 px-5 py-2",
          title: "Error",
          variant: "destructive",
          description: "Item is not added",
        });
      } else {
        toast({
          className: "bg-green-100 text-green-700 px-5 py-2",
          variant: "default",
          title: "Success",
          description: res.message,
          action: (
            <ToastAction
              altText="Go To Cart"
              className="bg-white text-gray-800 hover:bg-slate-200"
              onClick={() => router.push("/cart")}
            >
              Go To Cart
            </ToastAction>
          ),
        });
      }
    });
  };
  return existItem ? (
    <IncreaseDecreaseProduct
      existItem={existItem.qty}
      handleAddToCart={handleAddToCart}
      handleRemoveFromCart={handleRemoveFromCart}
      isPending={isPending}
    />
  ) : (
    <AddToCartButton
      item={item}
      handleAddToCart={handleAddToCart}
      isPending={isPending}
    />
  );
};
