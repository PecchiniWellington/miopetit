import DynamicButton from "@/components/dynamic-button";
import { Loader, Minus, Plus } from "lucide-react";

const IncreaseDecreaseProduct = ({
  handleAddToCart,
  handleRemoveFromCart,
  isPending,
  existItem,
}: {
  handleAddToCart: () => void;
  handleRemoveFromCart: () => void;
  isPending: boolean;
  existItem: number;
}) => {
  return (
    <>
      <DynamicButton handleAction={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="size-4 animate-spin" />
        ) : (
          <Minus className="size-4" />
        )}
      </DynamicButton>
      <span className="px-3">{existItem.toString()}</span>
      <DynamicButton handleAction={handleAddToCart}>
        {isPending ? (
          <Loader className="size-4 animate-spin" />
        ) : (
          <Plus className="size-4" />
        )}
      </DynamicButton>
    </>
  );
};

export default IncreaseDecreaseProduct;
