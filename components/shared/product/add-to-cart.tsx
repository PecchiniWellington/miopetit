"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";
import { Loader, Minus, Plus, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, setIsPending] = useTransition();

  const handleAddToCart = async () => {
    setIsPending(async () => {
      const res = await addItemToCart(item);
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

  //Check if the item is already in the cart
  const existItem =
    cart && cart?.items.find((i) => i.productId === item.productId);

  const handleRemoveFromCart = async () => {
    setIsPending(async () => {
      const res = await removeItemFromCart(item.productId);
      toast({
        className: `${
          res.success
            ? "bg-green-100 text-green-700 px-5 py-2"
            : "bg-red-100 text-red-700 px-5 py-2"
        } `,
        variant: res.success ? "default" : "destructive",
        description: res.message,
      });

      return;
    });
    // removeItemFromCart(item.productId);
  };

  return existItem ? (
    <div>
      <Button
        variant="outline"
        className=" primary-gradient min-h-[24px] !text-light-900 border-0.2 border-slate-300"
        onClick={handleRemoveFromCart}
      >
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>
      <span className="px-3">{existItem.qty}</span>
      <Button
        variant="outline"
        className=" primary-gradient min-h-[24px] !text-light-900 border-0.2 border-slate-300"
        onClick={handleAddToCart}
      >
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      type="button"
      className="w-full primary-gradient min-h-[24px] !text-light-900 border-0.2 border-slate-300"
      onClick={handleAddToCart}
    >
      {isPending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}
      Add to Cart
    </Button>
  );
};
