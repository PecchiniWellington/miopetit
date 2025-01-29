import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import OrderDetailsTable from "./order-details-table";
import { IShippingAddress } from "@/types";
import { getOrderById } from "@/lib/actions/order/order.action";
import { auth } from "@/auth";
import ROLES from "@/lib/constants/roles";

export const metadata: Metadata = {
  title: "Order Details",
};
const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const order = await getOrderById(id);
  if (!order) notFound();

  const session = await auth();

  return (
    <div>
      <OrderDetailsTable
        order={{
          ...order,
          shippingAddress: order.shippingAddress as IShippingAddress,
        }}
        paypalClientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb"}
        isAdmin={session?.user?.role === ROLES.ADMIN || false}
      />
    </div>
  );
};

export default OrderDetailsPage;
