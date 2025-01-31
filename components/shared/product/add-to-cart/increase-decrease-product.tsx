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
      <Button
        variant="outline"
        className="primary-gradient min-h-[24px] !text-light-900 border-0.2 border-slate-300"
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
    </>
  );
};

export default IncreaseDecreaseProduct;
