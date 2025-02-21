"use client";
import DynamicButton from "@/components/dynamic-button";
import { Button } from "@/components/ui/button";
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
  cancelItemFromCart,
  getMyCart,
  removeItemFromCart,
} from "@/core/actions/cart/cart.actions";
import { ICart, ICartItem } from "@/core/validators";
import { useIndexedDBCart } from "@/hooks/use-indexCart";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, Loader, Minus, Plus, Trash } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { startTransition, useTransition } from "react";

export const CartTable = ({ cart }: { cart?: ICart }) => {
  const [isPending, setIsPending] = useTransition();
  const router = useRouter();
  const { cartProduct, addToCartProduct, removeFromCartProduct } =
    useIndexedDBCart();

  const cleanedCartProduct = cartProduct.map((item) => ({
    productId: item.id,
    image: item.image,
    name: item.name,
    price: item.price,
    qty: item.qty,
    slug: item.slug,
  }));

  console.log("🛒 [CartTable] - Cart:", cartProduct);

  const handleRemoveFromCart = async (item: any) => {
    if (item.qty === 1) {
      await removeItemFromCart(item.id);
      await removeFromCartProduct(item.id);
    } else {
      setIsPending(async () => {
        await removeItemFromCart(item.id);

        await addToCartProduct(item, -1);
      });
    }
  };

  const handleAddToCart = async (item: ICartItem) => {
    setIsPending(async () => {
      //const existingProduct = await getProductById(item.productId);
      const existingProduct = await getMyCart();
      /*   const existingProduct = cartProduct.find(
        (product) => product.id === item.productId
      ); */
      console.log("Existing Product", existingProduct, item.productId);
      await addToCartProduct(item, 1);
      await addItemToCart(item);
    });
  };

  const cancelProduct = async (item: ICartItem) => {
    setIsPending(async () => {
      await cancelItemFromCart(item.productId);
      await removeFromCartProduct(item.productId);
    });
  };

  console.log("🛒 [CartTable] - Cart:", cleanedCartProduct);
  return (
    <>
      <h1 className="h2-bold py-4">Shopping Cart</h1>

      {!cleanedCartProduct || cleanedCartProduct?.length === 0 ? (
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
                  <TableHead className="text-center" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {cleanedCartProduct?.map((item: any, index: number) => (
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
                    <TableCell className="w-12 text-center">
                      <Button
                        onClick={() => cancelProduct(item)}
                        className="flex size-10 items-center justify-center rounded-full bg-white text-red-600 shadow transition-all duration-300 hover:border-red-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 active:scale-95"
                      >
                        {!isPending && <Trash className="size-5" />}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card className="rounded-lg border shadow-md">
            <CardContent className="gap-4 p-4">
              {/* Titolo */}
              <h2 className="text-2xl font-semibold text-gray-800">
                Order Summary
              </h2>

              {/* Dettaglio dei prezzi */}
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">
                    {isPending ? (
                      <Loader className="size-4 animate-spin" />
                    ) : (
                      formatCurrency(cart?.itemsPrice)
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="font-bold text-green-600">
                    -{formatCurrency(10.0)} {/* Sconto Mockato */}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold">
                    {formatCurrency(5.99)} {/* Spedizione Mockata */}
                  </span>
                </div>

                <hr className="my-2" />

                {/* Totale Finale */}
                <div className="flex items-center justify-between text-xl font-semibold text-gray-800">
                  <span>Total</span>
                  <span>
                    {isPending ? (
                      <Loader className="size-4 animate-spin" />
                    ) : (
                      formatCurrency((cart?.itemsPrice || 0) - 10.0 + 5.99)
                    )}
                  </span>
                </div>
              </div>

              <hr className="my-4" />

              {/* Subtotal Mockato */}
              <div className="flex items-center gap-2 pb-3 text-lg text-gray-700">
                Total Items:{" "}
                <span className=" font-semibold">
                  {isPending ? (
                    <Loader className="size-4 animate-spin" />
                  ) : (
                    cart?.items?.reduce((a, c) => a + c?.qty, 0)?.toString()
                  )}
                </span>
              </div>

              {/* Bottone di Checkout */}
              <DynamicButton
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none"
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
