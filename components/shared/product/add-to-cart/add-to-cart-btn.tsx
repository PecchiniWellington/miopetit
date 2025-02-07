"use client";
import DynamicButton from "@/components/dynamic-button";
import { CartItem } from "@/types/_index";
import { Loader, Plus } from "lucide-react";

const AddToCartButton = ({
  handleAddToCart,
  isPending,
}: {
  handleAddToCart: () => void;
  isPending: boolean;
  item: CartItem;
}) => {
  return (
    <DynamicButton handleAction={handleAddToCart}>
      {isPending ? (
        <Loader className="size-4 animate-spin" />
      ) : (
        <Plus className="size-4" />
      )}
      Add to Cart
    </DynamicButton>
  );
};

export default AddToCartButton;
