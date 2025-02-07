"use client";

import { formatId } from "@/lib/utils";
import { IOrder } from "@/types/_index";

import OrderCard from "./order-card";
import PaymentCard from "./payment-card-component";
import ResumeItemsTable from "./resume-items-table";

const OrderDetailsTable = ({
  order,
  stripeClientSecret,
  paypalClientId,
  isAdmin,
}: {
  order: /* IOrder */ Omit<IOrder, "paymentResult">;
  stripeClientSecret: string | null;
  paypalClientId: string;
  isAdmin: boolean;
}) => {
  const {
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
  } = order;

  return (
    <>
      <h1 className="py-4 text-2xl">Order {formatId(order.id)}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 flex flex-col gap-2 space-y-4 overflow-x-auto">
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
        <div className="col-span-2 mt-2 flex flex-col gap-4 md:col-span-1 md:mt-0">
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
