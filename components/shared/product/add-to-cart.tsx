"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();
  const handleAddToCart = async () => {
    const res = await addItemToCart(item);
    if (!res.success) {
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
        description: `${item.name} added to cart`,
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
  };
  return (
    <Button
      type="button"
      className="w-full primary-gradient min-h-[24px] !text-light-900 border-0.2 border-slate-300"
      onClick={handleAddToCart}
    >
      <PlusIcon /> Add to cart
    </Button>
  );
};
