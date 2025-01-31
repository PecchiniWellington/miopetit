import DynamicButton from "@/components/dynamic-button";
import { Button } from "@/components/ui/button";
import { Loader, Minus, Plus } from "lucide-react";
import React from "react";

const IncreaseDecreaseProduct = ({
  handleAddToCart,
  handleRemoveFromCart,
  isPending,
  existItem,
}: {
  handleAddToCart: () => void;
  handleRemoveFromCart: () => void;
  isPending: boolean;
  existItem: any;
}) => {
  return (
    <>
      <DynamicButton handleAction={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </DynamicButton>
      <span className="px-3">{existItem.qty}</span>
      <DynamicButton handleAction={handleAddToCart}>
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </DynamicButton>
    </>
  );
};

export default IncreaseDecreaseProduct;
