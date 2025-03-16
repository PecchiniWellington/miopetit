import BrandButton from "@/components/shared/brand-components/brand-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICartItem } from "@/core/validators";
import { Minus, Plus, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const CartTable = ({
  cart,
  isPending,
  handleAddToCart,
  cancelProduct,
  handleRemoveFromCart,
}: {
  cart: ICartItem[];
  isPending: boolean;
  handleAddToCart: (item: ICartItem) => void;
  cancelProduct: (item: ICartItem) => void;
  handleRemoveFromCart: (item: ICartItem) => void;
}) => {
  const t = useTranslations("Shared");
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("product")}</TableHead>
          <TableHead className="text-center">{t("price")}</TableHead>
          <TableHead className="text-center">{t("quantity")}</TableHead>
          <TableHead className="text-center" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart?.map((item: ICartItem, index: number) => (
          <TableRow key={index}>
            <TableCell>
              <Link
                href={`/product/${item?.slug}`}
                className="flex items-center"
              >
                <Image
                  src={
                    Array.isArray(item?.image)
                      ? item?.image[0]
                      : item?.image || "/images/placeholder.jpg"
                  }
                  alt={item?.name || "Product Image"}
                  width={50}
                  height={50}
                />

                <span className="ml-4 text-sm text-gray-500">{item?.name}</span>
              </Link>
            </TableCell>
            <TableCell className="gap-2 text-center">€{item?.price}</TableCell>
            <TableCell className="gap-2 text-center">
              <div className="flex items-center justify-center space-x-2">
                <BrandButton
                  loading={isPending}
                  variant="primary"
                  onClick={() => handleRemoveFromCart(item)}
                  iconPosition="left"
                  icon={<Minus className="size-5" />}
                />

                <span className="w-10 text-center text-lg font-semibold text-gray-800">
                  {item.qty}
                </span>

                <BrandButton
                  loading={isPending}
                  variant="primary"
                  onClick={() => handleAddToCart(item)}
                  iconPosition="left"
                  icon={<Plus className="size-5" />}
                />
              </div>
            </TableCell>
            <TableCell className="w-16 text-center">
              <BrandButton
                loading={isPending}
                variant="flat"
                onClick={() => cancelProduct(item)}
              >
                <Trash className="text-red-600" />
              </BrandButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CartTable;
