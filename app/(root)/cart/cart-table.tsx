import DynamicButton from "@/components/dynamic-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICartItem } from "@/core/validators";
import { Button } from "@react-email/components";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CartTable = ({
  cart,
  isPending,
  handleAddToCart,
  cancelProduct,
  handleRemoveFromCart,
}: {
  cart: any;
  isPending: boolean;
  handleAddToCart: (item: ICartItem) => void;
  cancelProduct: (item: ICartItem) => void;
  handleRemoveFromCart: (item: ICartItem) => void;
}) => {
  console.log("cart", cart);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-center" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart?.map((item: any, index: number) => (
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
                <DynamicButton
                  isPending={isPending}
                  handleAction={() => handleRemoveFromCart(item)}
                  className="flex size-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white bg-gradient-to-r from-indigo-500 to-purple-600 text-gray-600 shadow transition-all duration-300 hover:border-red-400 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 active:scale-95"
                >
                  {!isPending && <Minus className="size-5" />}
                </DynamicButton>

                <span className="w-10 text-center text-lg font-semibold text-gray-800">
                  {item.qty}
                </span>

                <DynamicButton
                  isPending={isPending}
                  handleAction={() => handleAddToCart(item)}
                  className="flex size-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white bg-gradient-to-r from-indigo-500 to-purple-600 text-gray-600 shadow transition-all duration-300 hover:border-green-400 hover:bg-green-50 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 active:scale-95"
                >
                  {!isPending && <Plus className="size-5" />}
                </DynamicButton>
              </div>
            </TableCell>
            <TableCell className="w-16 text-center">
              <Button
                onClick={() => cancelProduct(item)}
                className="flex items-center justify-center rounded-full bg-white text-red-600 shadow transition-all duration-300 hover:border-red-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 active:scale-95"
              >
                {!isPending && <Trash />}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CartTable;
