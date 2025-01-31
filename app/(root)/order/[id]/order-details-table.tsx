"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatId } from "@/lib/utils";
import { IOrder } from "@/types";

import PaymentCard from "./payment-card-component";
import OrderCard from "./order-card";
import ResumeItemsTable from "./resume-items-table";

const OrderDetailsTable = ({
  order,
  stripeClientSecret,
  paypalClientId,
  isAdmin,
}: {
  order: Omit<IOrder, "paymentResult">;
  stripeClientSecret: string | null;
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

          <OrderCard title="Order Items">
            <ResumeItemsTable orderitems={orderitems} />
          </OrderCard>
        </div>
        <div className="col-span-2 md:col-span-1 mt-2 md:mt-0 flex flex-col gap-4">
          <PaymentCard
            itemsPrice={itemsPrice}
            taxPrice={taxPrice}
            shippingPrice={shippingPrice}
            totalPrice={totalPrice}
            isPaid={isPaid}
            paymentMethod={paymentMethod}
            paypalClientId={paypalClientId}
            stripeClientSecret={stripeClientSecret}
            isAdmin={isAdmin}
            order={order}
          />
        </div>
      </div>
    </>
  );
};

export default OrderDetailsTable;
