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
  removeItemFromCart,
} from "@/core/actions/cart/cart.actions";
import { ICart, ICartItem } from "@/core/validators";
import useLocalStorageItem from "@/hooks/use-local-storage-item";
import { formatCurrency, round2 } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Loader, Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState, useTransition } from "react";

const calcPrice = (items: ICartItem[]) => {
  const itemsPrice = items?.reduce(
    (acc, item) => acc + Number(item.price) * item.qty,
    0
  );

  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10); // Free shipping over €100
  const taxPrice = round2(0.15 * itemsPrice); // 15% tax
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice); // Total price

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export const CartTable = ({ cart }: { cart?: ICart }) => {
  const [isPending, setIsPending] = useTransition();
  const [resume, setResume] = useState<ICart[] | null>(null);
  const router = useRouter();
  const [storedValue, addItem, removeItem, decreaseItem] = useLocalStorageItem(
    "cart",
    cart
  );

  useEffect(() => {
    if ((storedValue as ICartItem[])?.length > 0) {
      setResume({
        resumeCart: calcPrice(storedValue),
        totalItems: storedValue,
      });
    }
  }, [storedValue]);

  const cleanedCartProduct = Array.isArray(storedValue)
    ? storedValue.map((item) => ({
        productId: item.productId,
        image: item.image,
        name: item.name,
        price: item.price,
        qty: item.qty,
        slug: item.slug,
      }))
    : [];

  const handleRemoveFromCart = async (item: any) => {
    if (item.qty === 1) {
      await removeItemFromCart(item.productId);
      removeItem(item.productId);
    } else {
      setIsPending(async () => {
        await removeItemFromCart(item.productId);
        decreaseItem(item.productId);
      });
    }
  };

  const handleAddToCart = async (item: ICartItem) => {
    setIsPending(async () => {
      await addItemToCart(item);
      addItem(item);
    });
  };

  const cancelProduct = async (item: ICartItem) => {
    setIsPending(async () => {
      await cancelItemFromCart(item.productId);
      removeItem(item.productId);
    });
  };

  const goToCheckout = () => {
    startTransition(() => router.push("/shipping-address"));
  };

  const EmptyCart = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex min-h-[60vh] flex-col items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-8 shadow-xl"
      >
        {/* Testo principale */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="text-4xl font-extrabold text-white"
        >
          Il tuo carrello è vuoto 🛒
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-3 max-w-lg text-center text-lg text-gray-200"
        >
          Sembra che tu non abbia ancora aggiunto nulla al carrello. Esplora il
          nostro shop e trova le migliori offerte!
        </motion.p>

        {/* SVG con animazione */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
          className="mt-6"
        >
          <svg
            width="180"
            height="180"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white drop-shadow-lg"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
              d="M6.6 18H19.5C20.3 18 20.8 17.2 20.5 16.5L17.5 9.5C17.4 9.2 17.1 9 16.8 9H8.4L7.5 6.5C7.3 6 6.8 5.8 6.3 5.8H4"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
              cx="10"
              cy="20"
              r="1.5"
              stroke="white"
              strokeWidth="1.5"
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.7, duration: 0.5, ease: "easeOut" }}
              cx="17"
              cy="20"
              r="1.5"
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>

        {/* Pulsante per lo shopping con animazione */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5, ease: "easeOut" }}
        >
          <Link
            href="/"
            className="mt-8 flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-3 text-lg font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-500"
          >
            🛍️ Torna allo Shopping
          </Link>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <h1 className="h2-bold py-4">Shopping Cart</h1>

      {!cleanedCartProduct || cleanedCartProduct?.length === 0 ? (
        <EmptyCart />
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
          <Card className="mt-10 rounded-lg border shadow-md md:mt-0">
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
                      formatCurrency(
                        resume?.resumeCart.itemsPrice || cart?.itemsPrice
                      )
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
                    {formatCurrency(
                      resume?.resumeCart.taxPrice || cart?.taxPrice
                    )}{" "}
                    {/* Spedizione Mockata */}
                  </span>
                </div>

                <hr className="my-2" />

                {/* Totale Finale */}
                <div className="flex items-center justify-between text-xl font-semibold text-gray-800">
                  <span>Total</span>
                  <span>
                    {isPending ? (
                      <Loader className="size-4 animate-spin" />
                    ) : resume ? (
                      formatCurrency(
                        (resume?.resumeCart.totalPrice || 0) - 10.0 + 5.99
                      )
                    ) : (
                      formatCurrency((cart?.totalPrice || 0) - 10.0 + 5.99)
                    )}
                  </span>
                </div>
              </div>

              <hr className="my-4" />

              {/* Subtotal Mockato */}
              <div className="flex items-center gap-2 pb-3 text-lg text-gray-700">
                Total Items:
                <span className=" font-semibold">
                  {isPending ? (
                    <Loader className="size-4 animate-spin" />
                  ) : resume ? (
                    resume?.totalItems
                      ?.reduce((a, c) => a + c?.qty, 0)
                      ?.toString()
                  ) : (
                    cart?.items?.reduce((a, c) => a + c?.qty, 0)?.toString()
                  )}
                </span>
              </div>

              {/* Bottone di Checkout */}
              <DynamicButton
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none"
                handleAction={goToCheckout}
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
