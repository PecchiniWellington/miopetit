"use client";
import BrandButton from "@/components/shared/brand-components/brand-button";
import { ICartItem } from "@/core/validators";
import { ShoppingCart } from "lucide-react";

const AddToCartButton = ({
  handleAddToCart,
  isPending,
  item,
}: {
  handleAddToCart: (item: ICartItem) => Promise<void>;
  isPending: boolean;
  item?: ICartItem;
}) => {
  return (
    <BrandButton
      loading={isPending}
      icon={<ShoppingCart className="size-6" />}
      onClick={() => item && handleAddToCart(item)}
    >
      Aggiungi al Carrello
    </BrandButton>
  );
};

export default AddToCartButton;
