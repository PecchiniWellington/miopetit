"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { formatCurrency } from "@/lib/utils";
import { CartItem } from "@/types";
import { Cart } from "@/types";
import { ToastAction } from "@radix-ui/react-toast";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { format } from "path";
import React, { startTransition, useTransition } from "react";

export const CartTable = ({ cart }: { cart?: Cart }) => {
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

  const handleAddToCart = async (item: CartItem) => {
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
      <h1 className="py-4 h2-bold">Sopping Cart</h1>

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
                {cart?.items?.map((item: any) => (
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

                        <span className="text-gray-500 text-sm ml-4">
                          {item?.name}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center gap-2">
                      €{item?.price}
                    </TableCell>
                    <TableCell className="text-center gap-2">
                      <Button
                        disabled={isPending}
                        variant="outline"
                        className=" primary-gradient min-h-[24px] !text-light-900 border-0.2 border-slate-300"
                        onClick={() => handleRemoveFromCart(item.productId)}
                      >
                        {isPending ? (
                          <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                          <Minus className="h-4 w-4" />
                        )}
                      </Button>
                      <span className="px-3">{item.qty}</span>
                      <Button
                        disabled={isPending}
                        variant="outline"
                        className=" primary-gradient min-h-[24px] !text-light-900 border-0.2 border-slate-300"
                        onClick={() => handleAddToCart(item)}
                      >
                        {isPending ? (
                          <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card>
            <CardContent className="p-4 gap-4">
              <div className="pb-3 text-xl">
                Subtotal (
                {cart?.items?.reduce((a, c) => a + c?.qty, 0)?.toString()}):
                <span className="font-bold">
                  {formatCurrency(cart?.itemsPrice)}
                </span>
              </div>
              <Button
                className=" w-full primary-gradient min-h-[24px] !text-light-900 border-0.2 border-slate-300"
                disabled={isPending}
                onClick={() =>
                  startTransition(() => router.push("/shipping-address"))
                }
              >
                {isPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4 " />
                )}
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
