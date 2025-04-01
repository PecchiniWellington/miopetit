"use client";
import {
  addItemToCart,
  cancelItemFromCart,
  removeItemFromCart,
} from "@/core/actions/cart/cart.actions";
import { ICart, ICartItem } from "@/core/validators";
import { formatCurrency, round2 } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import BrandButton from "../shared/brand-components/brand-button";

const SummaryRequestCard = ({
  item,
  cart,
  userId,
}: {
  item: ICartItem & { costPrice: number };
  cart: ICart;
  userId?: string;
}) => {
  const publicPrice = item.qty * Number(item.price);
  const ivaTotal = round2(0.22 * Number(publicPrice));

  console.log("🚀 [SummaryRequestCard] - item:", item);

  const shelterPrice = item.qty * Number(item.costPrice);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const increaseQty = () => {
    startTransition(async () => {
      if (!userId) {
        toast.error("User ID is required to add items to the cart");
        return;
      }
      await addItemToCart({ ...item, userId });
      router.refresh();
      toast.success("Quantità aumentata");
    });
  };

  const decreaseQty = () => {
    startTransition(async () => {
      if (item.qty === 1) {
        await cancelItemFromCart(item.productId);
        toast.success("Prodotto rimosso dal carrello");
      } else {
        await removeItemFromCart(item.productId);
        toast.success("Quantità diminuita");
      }
      router.refresh();
    });
  };

  const removeItem = () => {
    startTransition(async () => {
      await cancelItemFromCart(item.productId);
      router.refresh();
      toast.success("Prodotto eliminato dal carrello");
    });
  };

  return (
    <div className="relative flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      {item.image && (
        <Image
          src={item.image}
          alt={item.name}
          width={400}
          height={250}
          className="h-48 w-full object-cover"
        />
      )}

      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
          <BrandButton
            variant="ghost"
            size="medium"
            onClick={removeItem}
            disabled={isPending}
            className="text-red-600 hover:bg-red-50"
          >
            <Trash2 size={20} />
          </BrandButton>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <p>Prezzo:</p>
          <p className="font-medium">{formatCurrency(publicPrice)}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <p className="">IVA:</p>
          <p className="">{formatCurrency(ivaTotal)}</p>
        </div>

        {/* <div className="border-t border-gray-100"></div>

        <div className="flex items-center justify-between text-sm text-green-600">
          <p>Prezzo per rifugio:</p>
          <p className="font-semibold">{formatCurrency(shelterPrice)}</p>
        </div>

        <div className="flex items-center justify-between text-sm font-semibold text-green-500">
          <p>Risparmio:</p>
          <p>{formatCurrency(totalSavings)}</p>
        </div> */}

        <div className="flex flex-col gap-2  pt-4">
          <div className="flex items-center justify-between border-t border-gray-100 pt-2">
            <p className="text-base font-semibold text-gray-800">Totale:</p>
            <p className=" text-lg font-bold line-through">
              {formatCurrency(ivaTotal + publicPrice)}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm text-green-600">
            <p>Prezzo per rifugio:</p>
            <p className="font-semibold">{formatCurrency(shelterPrice)}</p>
          </div>

          <div className="flex items-center justify-between text-sm font-semibold text-green-500">
            <p>Risparmio:</p>
            <p>{formatCurrency(ivaTotal + publicPrice - shelterPrice)}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <BrandButton
            variant="outline"
            size="medium"
            onClick={decreaseQty}
            disabled={isPending}
          >
            -
          </BrandButton>
          <span className="text-sm font-medium text-gray-800">{item.qty}</span>
          <BrandButton
            variant="outline"
            size="medium"
            onClick={increaseQty}
            disabled={isPending}
          >
            +
          </BrandButton>
        </div>
      </div>
    </div>
  );
};

export default SummaryRequestCard;
