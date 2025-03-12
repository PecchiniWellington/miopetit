import { Button } from "@/components/ui/button";
import { ICartItem } from "@/core/validators";
import { Loader, Minus, Plus } from "lucide-react";

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
      <Button
        variant="outline"
        size="icon"
        className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-md transition-all hover:brightness-110 active:scale-95"
        onClick={() => handleRemoveFromCart(item)}
        disabled={isPending}
      >
        {isPending ? (
          <Loader className="size-4 animate-spin" />
        ) : (
          <Minus className="size-4" />
        )}
      </Button>

      {/* Quantità prodotto */}
      <span className="w-6 text-center text-lg font-semibold text-gray-900">
        {existItem.toString()}
      </span>

      {/* Bottone aumenta */}
      <Button
        variant="outline"
        size="icon"
        className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-md transition-all hover:brightness-110 active:scale-95"
        onClick={() => handleAddToCart(item)}
        disabled={isPending}
      >
        {isPending ? (
          <Loader className="size-4 animate-spin" />
        ) : (
          <Plus className="size-4" />
        )}
      </Button>
    </div>
  );
};

export default IncreaseDecreaseProduct;
