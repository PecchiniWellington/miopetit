import { auth } from "@/auth";
import { getOrderById } from "@/core/actions/order/order.action";
import { IShippingAddress } from "@/core/types";
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

  // CHeck if is not paid and using stripe
  if (order.paymentMethod === "stripe" && !order.isPaid) {
    // Initialize Stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY! as string);

    // Create a PaymentIntent with the order total price
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "USD",
      metadata: { orderId: order.id },
    });
    client_secret = paymentIntent.client_secret;
  }

  return (
    <div>
      <OrderDetailsTable
        order={{
          ...order,
          shippingAddress: order.shippingAddress as IShippingAddress,
          orderitems: order.orderitems.map((item) => ({
            ...item,
            name: item.name || "",
          })),
        }}
        stripeClientSecret={client_secret}
        paypalClientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb"}
        isAdmin={session?.user?.role === ROLES.ADMIN || false}
      />
    </div>
  );
};

export default OrderDetailsPage;
