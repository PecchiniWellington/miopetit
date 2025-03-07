"use client";
import { Button } from "@/components/ui/button";
import { ICartItem } from "@/core/validators";
import { Loader, ShoppingCart } from "lucide-react";

const AddToCartButton = ({
  handleAddToCart,
  isPending,
}: {
  handleAddToCart: () => void;
  isPending: boolean;
  item: ICartItem;
}) => {
  return (
    <Button
      onClick={handleAddToCart}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-lg font-medium text-white transition-all duration-300 hover:bg-indigo-700 active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-400"
    >
      {isPending ? (
        <Loader className="size-4 animate-spin" />
      ) : (
        <ShoppingCart className="size-6" />
      )}
      <span>Aggiungi al Carrello</span>
    </Button>
  );
};

export default AddToCartButton;
