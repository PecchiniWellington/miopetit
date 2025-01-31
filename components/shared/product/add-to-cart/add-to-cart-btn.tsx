"use client";
import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/hooks/use-toast";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import { ToastAction } from "@radix-ui/react-toast";
import { Loader, Plus } from "lucide-react";
import router from "next/router";
import React, { useTransition } from "react";

const AddToCartButton = ({
  item,
  handleAddToCart,
  isPending,
}: {
  handleAddToCart: () => void;
  isPending: boolean;
  item: CartItem;
}) => {
  return (
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

export default AddToCartButton;
