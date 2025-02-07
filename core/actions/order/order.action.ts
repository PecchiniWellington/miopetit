"use server";

import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { insertOrderSchema } from "@/core/validators";
import { sendPurchaseReceipt } from "@/email";
import { PAGE_SIZE } from "@/lib/constants";

import { Prisma } from "@prisma/client";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { ICartItem } from "@/core/types/cart.type";
import { IPaymentResult } from "@/core/types/payment.type";
import { ISalesDataType } from "@/core/types/sales.type";
import { IShippingAddress } from "@/core/types/shipping-address.type";
import { convertToPlainObject, formatError } from "@/lib/utils";
import { getMyCart } from "../cart/cart.actions";
import { getUserById } from "../user";

export async function createOrder() {
  try {
    const session = await auth();
    if (!session) throw new Error("User not authenticated");

    const cart = await getMyCart();
    const userId = session?.user?.id;

    if (!userId) throw new Error("User not found");

    const user = await getUserById(userId);

    if (!cart || cart.items.length === 0) {
      return { success: false, message: "Cart is empty", redirectTo: "/cart" };
    }
    if (!user || !user.address) {
      return {
        success: false,
        message: "No shipping address",
        redirectTo: "/shipping-address",
      };
    }
    if (!user.paymentMethod) {
      return {
        success: false,
        message: "No payment method",
        redirectTo: "/payment-method",
      };
    }

    // Create order object
    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.address,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });

    // Create a transaction to create order and order items in database
    const insertedOrderId = await prisma.$transaction(async (tx) => {
      // Create order
      const insertedOrder = await tx.order.create({ data: order });

      // Create order items from the cart items
      for (const item of cart.items as ICartItem[]) {
        const orderItem = {
          ...item,
          price: item.price,
          orderId: insertedOrder.id,
        };

        await tx.orderItem.create({ data: orderItem });
      }
      // Clear the cart
      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          totalPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          itemsPrice: 0,
        },
      });

      return insertedOrder.id;
    });

    if (!insertedOrderId) throw new Error("Order not created");

    return {
      success: true,
      message: "Order created successfully",
      redirectTo: `/order/${insertedOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, message: formatError(error) };
  }
}

// Get order by id
export async function getOrderById(orderId: string) {
  const data = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderitems: true,
      user: { select: { name: true, email: true } },
    },
  });

  return convertToPlainObject(data);
}

// Update order to paid
export async function updateOrderToPaid({
  orderId,
  paymentResult,
}: {
  orderId: string;
  paymentResult?: IPaymentResult;
}) {
  const order = await prisma.order.findFirst({
    where: { id: orderId },
    include: { orderitems: true },
  });

  if (!order) throw new Error("Order not found");
  if (order.isPaid) throw new Error("Order already paid");

  // Transaction to update order and account for product stock
  await prisma.$transaction(async (tx) => {
    // Iterate over products and update stock
    for (const item of order.orderitems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: -item.qty } },
      });
    }

    // Update order to paid
    await tx.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        paymentResult,
      },
    });
  });

  // Get updated order after transaction
  const updatedOrder = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderitems: true,
      user: { select: { email: true, name: true } },
    },
  });
  /*  revalidatePath(`/order/${orderId}`); */

  if (!updatedOrder) throw new Error("Order not found");

  sendPurchaseReceipt({
    order: {
      ...updatedOrder,
      orderitems: updatedOrder.orderitems as ICartItem[],
      shippingAddress: updatedOrder.shippingAddress as IShippingAddress,
      paymentResult: updatedOrder.paymentResult as IPaymentResult,
    },
  });
}

// Get my orders
export async function getMyOrders({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}) {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");

  const data = await prisma.order.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: "desc" },
    include: { orderitems: true },
    skip: (page - 1) * limit, // TODO: test without -1
    take: limit,
  });

  const dataCount = await prisma.order.count({
    where: { userId: session?.user?.id },
  });

  return {
    data,
    totalPages: Math.ceil(dataCount / limit), // TODO: perchè Math.ceil?
  };
}

// Get sales data and order summary
export async function getOrderSummary() {
  // Get count for each resource
  const ordersCount = await prisma.order.count();
  const productsCount = await prisma.product.count();
  const usersCount = await prisma.user.count();
  // Calculate the total sales
  const totalSales = await prisma.order.aggregate({
    _sum: { totalPrice: true },
  });

  // Get Monthly sales data
  const salesDataRaw = await prisma.$queryRaw<
    Array<{ month: string; totalSales: Prisma.Decimal }>
  >`SELECT to_char("created_at", 'MM/YY') as "month", 
    sum("totalPrice") as "totalSales" 
    FROM "Order" 
    GROUP BY to_char("created_at", 'MM/YY')
  `;

  const salesData: ISalesDataType = salesDataRaw.map((item) => ({
    month: item.month,
    totalSales: Number(item.totalSales),
  }));

  // Get latest sales data
  const latestSales = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
    include: {
      user: { select: { name: true } },
    },
  });

  return {
    ordersCount,
    productsCount,
    usersCount,
    totalSales,
    latestSales,
    salesData,
  };
}
