"use client";
import DynamicButton from "@/components/dynamic-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  addItemToCart,
  removeItemFromCart,
} from "@/core/actions/cart/cart.actions";
import { ICart, ICartItem } from "@/core/types";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";

import { ToastAction } from "@radix-ui/react-toast";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { startTransition, useTransition } from "react";

export const CartTable = ({ cart }: { cart?: ICart }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, setIsPending] = useTransition();

  const handleRemoveFromCart = async (productId: string) => {
    setIsPending(async () => {
      const res = await removeItemFromCart(productId);
      toast({
        className: `${
          res.success
            ? "bg-green-100 text-green-700 px-5 py-2"
            : "bg-red-100 text-red-700 px-5 py-2"
        } `,
        variant: res.success ? "default" : "destructive",
        description: res.message,
      });

      return;
    });
    // removeItemFromCart(item.productId);
  };

  const handleAddToCart = async (item: ICartItem) => {
    setIsPending(async () => {
      const res = await addItemToCart(item);
      if (!res?.success) {
        toast({
          className: "bg-red-100 text-red-700 px-5 py-2",
          title: "Error",
          variant: "destructive",
          description: "Item is not added",
        });
      } else {
        toast({
          className: "bg-green-100 text-green-700 px-5 py-2",
          variant: "default",
          title: "Success",
          description: res.message,
          action: (
            <ToastAction
              altText="Go To Cart"
              className="bg-white text-gray-800 hover:bg-slate-200"
              onClick={() => router.push("/cart")}
            >
              Go To Cart
            </ToastAction>
          ),
        });
      }
    });
  };

  return (
    <>
      <h1 className="h2-bold py-4">Sopping Cart</h1>

      {!cart?.items || cart?.items?.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart?.items?.map((item: ICartItem) => (
                  <TableRow key={item?.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item?.slug}`}
                        className="flex items-center"
                      >
                        {/* {item?.image} */}
                        <Image
                          src={item?.image}
                          alt={item?.name}
                          width={50}
                          height={50}
                        />

                        <span className="ml-4 text-sm text-gray-500">
                          {item?.name}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell className="gap-2 text-center">
                      €{item?.price}
                    </TableCell>
                    <TableCell className="gap-2 text-center">
                      <DynamicButton
                        isPending={isPending}
                        handleAction={() =>
                          handleRemoveFromCart(item.productId)
                        }
                        icon={<Minus className="size-4" />}
                      />
                      <span className="px-3">{item.qty}</span>
                      <DynamicButton
                        isPending={isPending}
                        handleAction={() => handleAddToCart(item)} // TODO: prima era item.productId
                        icon={<Plus className="size-4" />}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card>
            <CardContent className="gap-4 p-4">
              <div className="pb-3 text-xl">
                Subtotal (
                {cart?.items?.reduce((a, c) => a + c?.qty, 0)?.toString()}):
                <span className="font-bold">
                  {formatCurrency(cart?.itemsPrice)}
                </span>
              </div>

              <DynamicButton
                isPending={isPending}
                handleAction={() =>
                  startTransition(() => router.push("/shipping-address"))
                }
              >
                {isPending ? (
                  <Loader className="size-4 animate-spin" />
                ) : (
                  <ArrowRight className="size-4 " />
                )}
                Proceed to Checkout
              </DynamicButton>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
