import { auth } from "@/auth";
import { getOrderById } from "@/core/actions/order/order.action";
import ROLES from "@/lib/constants/roles";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import OrderDetailsTable from "./order-details-table";

export const metadata: Metadata = {
  title: "Order Details",
};
const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const order = await getOrderById(id);
  if (!order) notFound();

  const session = await auth();

  let client_secret = null;

  if (order.paymentMethod === "Stripe" && !order.isPaid) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY! as string);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "EUR",
      metadata: { orderId: order.id },
    });
    client_secret = paymentIntent.client_secret;
  }

  return (
    <OrderDetailsTable
      order={order}
      stripeClientSecret={client_secret}
      paypalClientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb"}
      isAdmin={session?.user?.role === ROLES.ADMIN || false}
    />
  );
};

export default OrderDetailsPage;
