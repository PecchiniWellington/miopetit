"use server";

import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { sendPurchaseReceipt } from "@/email";
import { PAGE_SIZE } from "@/lib/constants";

import { Prisma } from "@prisma/client";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import {
  ICartItem,
  IPaymentResult,
  ISalesDataType,
  IShippingAddress,
} from "@/core/validators";
import { orderItemSchema } from "@/core/validators/order-items.validator";
import { convertToPlainObject, formatError } from "@/lib/utils";
import { getMyCart } from "../cart/cart.actions";
import { getUserById } from "../user";

export async function createOrder() {
  try {
    const session = await auth();
    if (!session) throw new Error("User not authenticated");
    const userId = session?.user?.id;
    if (!userId) throw new Error("User not found");
    const user = await getUserById(userId);

    const cart = await getMyCart();

    if (!cart || !("items" in cart) || cart.items.length === 0) {
      return { success: false, message: "Cart is empty", redirectTo: "/cart" };
    }
    if (!user || !user.defaultAddress) {
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

    const order = orderItemSchema.parse({
      userId: user.id,
      shippingAddress: user.defaultAddress,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });

    const insertedOrderId = await prisma.$transaction(async (tx) => {
      const insertedOrder = await tx.order.create({ data: order });

      for (const item of cart.items as ICartItem[]) {
        const orderItem = {
          ...item,
          price: item.price,
          productId: item.productId,
          slug: item.slug ?? "",
          image: item.image ?? "",
          orderId: insertedOrder.id,
        };

        try {
          await tx.orderItem.create({
            data: orderItem,
          });
        } catch (error) {
          return { success: false, message: formatError(error) };
        }
      }
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

  await prisma.$transaction(async (tx) => {
    for (const item of order.orderitems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: -item.qty } },
      });
    }

    await tx.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        paymentResult,
      },
    });
  });

  const updatedOrder = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderitems: true,
      user: { select: { email: true, name: true } },
    },
  });

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

  return convertToPlainObject({
    data,
    totalPages: Math.ceil(dataCount / limit),
  });
}

export async function getOrderSummary() {
  const ordersCount = await prisma.order.count();
  const productsCount = await prisma.product.count();
  const usersCount = await prisma.user.count();
  const totalSales = await prisma.order.aggregate({
    _sum: { totalPrice: true },
  });

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
