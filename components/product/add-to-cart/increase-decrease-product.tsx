import BrandButton from "@/components/shared/brand-components/brand-button";
import { ICartItem } from "@/core/validators";
import { Minus, Plus } from "lucide-react";

const IncreaseDecreaseProduct = ({
  handleAddToCart,
  handleRemoveFromCart,
  isPending,
  existItem,
  item,
}: {
  handleAddToCart: (item: ICartItem) => Promise<void>;
  handleRemoveFromCart: (item: ICartItem) => Promise<void>;
  isPending: boolean;
  existItem: number;
  item: ICartItem;
}) => {
  return (
    <div className="flex items-center gap-3">
      {/* Bottone diminuisci */}
      <BrandButton
        variant="flat"
        loading={isPending}
        onClick={() => handleRemoveFromCart(item)}
        disabled={isPending}
      >
        <Minus className="size-4" />
      </BrandButton>

      {/* Quantità prodotto */}
      <span className="w-6 text-center text-lg font-semibold text-gray-900">
        {existItem.toString()}
      </span>

      {/* Bottone aumenta */}
      <BrandButton
        variant="flat"
        loading={isPending}
        onClick={() => handleAddToCart(item)}
        disabled={isPending}
      >
        <Plus className="size-4" />
      </BrandButton>
    </div>
  );
};

export default IncreaseDecreaseProduct;
