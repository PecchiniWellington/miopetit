"use client";
import DynamicButton from "@/components/dynamic-button";
import { CartItem } from "@/types";
import { Loader, Plus } from "lucide-react";
import React from "react";

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
    <DynamicButton handleAction={handleAddToCart}>
      {isPending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}
      Add to Cart
    </DynamicButton>
  );
};

export default AddToCartButton;
