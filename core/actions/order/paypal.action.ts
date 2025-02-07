"use server";

// Get new paypal order

import { prisma } from "@/core/prisma/prisma";
import { paypal } from "@/lib/paypal";
import { formatError } from "@/lib/utils";
import { IPaymentResult } from "@/types";
import { revalidatePath } from "next/cache";
import { updateOrderToPaid } from "./order.action";

export async function createPaypalOrder(orderId: string) {
  try {
    const order = await prisma.order.findFirst({
      where: { id: orderId },
      select: { id: true, totalPrice: true },
    });

    if (!order) throw new Error("Order not found");

    // Create paypal order
    const paypalOrder = await paypal.createOrder(Number(order.totalPrice));

    // Update order with paypal order id
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentResult: {
          id: paypalOrder.id,
          status: "",
          email_address: "",
          pricePaid: 0,
        },
      },
    });

    return {
      success: true,
      message: "Item order created successfully",
      data: paypalOrder.id,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Approve paypal order and update order to paid
export async function approvePaypalOrder(
  orderId: string,
  data: { orderID: string }
) {
  console.log("APPROVE PAYPAL ORDER", orderId, data);
  try {
    const order = await prisma.order.findFirst({
      where: { id: orderId },
    });

    if (!order) throw new Error("Order not found");

    const captureData = await paypal.capturePayment(data.orderID);

    if (
      !captureData ||
      captureData.id !== (order.paymentResult as IPaymentResult).id ||
      captureData.status !== "COMPLETED"
    ) {
      throw new Error("Invalid payment");
    }

    // Update order to paid
    updateOrderToPaid({
      orderId,
      paymentResult: {
        id: captureData.id,
        status: captureData.status,
        email_address: captureData.payer.email_address,
        pricePaid:
          captureData.purchase_units[0]?.payments?.captures[0]?.amount?.value,
      },
    });

    revalidatePath(`/order/${orderId}`);
    return { success: true, message: "Order paid successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
