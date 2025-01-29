"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatId } from "@/lib/utils";
import { IOrder } from "@/types";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import Link from "next/link";
import Image from "next/image";

import PaymentCard from "./payment-card";
import OrderCard from "./order-card";

const OrderDetailsTable = ({
  order,
  paypalClientId,
  isAdmin,
}: {
  order: Omit<IOrder, "paymentResult">;
  paypalClientId: string;
  isAdmin: boolean;
}) => {
  const {
    id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
    orderitems,
    user,
  } = order;

  return (
    <>
      <h1 className="py-4 text-2xl">Order {formatId(order.id)}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-4-y overflow-x-auto flex flex-col gap-2">
          <OrderCard
            isPaid={isPaid}
            subtitle={paymentMethod}
            paidAt={paidAt}
            title="Payment Method"
            type="Paid"
          />

          <OrderCard
            isPaid={isDelivered}
            subtitle={shippingAddress.fullname}
            paidAt={deliveredAt}
            title="Shipping Address"
            type="Delivered"
          >
            <p className="mb-2">
              {shippingAddress.streetAddress}, {shippingAddress.city}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </OrderCard>

          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderitems.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />

                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/product/${item.slug}`}>
                          <span className="px-2">{item.qty}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/product/${item.slug}`}>
                          <span className="px-2">
                            {formatCurrency(item?.price)}
                          </span>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <PaymentCard
            itemsPrice={itemsPrice}
            taxPrice={taxPrice}
            shippingPrice={shippingPrice}
            totalPrice={totalPrice}
            isPaid={isPaid}
            paymentMethod={paymentMethod}
            paypalClientId={paypalClientId}
            isAdmin={isAdmin}
            order={order}
          />
        </div>
      </div>
    </>
  );
};

export default OrderDetailsTable;
