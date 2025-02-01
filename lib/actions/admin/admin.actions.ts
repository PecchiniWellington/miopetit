"use server";
import { prisma } from "@/db/prisma";
import { PAGE_SIZE } from "@/lib/constants";
import { formatError } from "@/lib/utils";
import { updateUserSchema } from "@/lib/validators/user.validator";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { updateOrderToPaid } from "../order/order.action";
import { Prisma } from "@prisma/client";
import { ICategory } from "@/types";
import { categorySchema } from "@/lib/validators/category.validator";

// Get all the users
export async function getAllUsers({
  limit = PAGE_SIZE,
  page,
  query,
}: {
  limit?: number;
  page: number;
  query?: string;
}) {
  const queryFilter: Prisma.UserWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          },
        }
      : {};
  const data = await prisma.user.findMany({
    where: {
      ...queryFilter,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: limit * (page - 1),
  });

  const dataCount = await prisma.user.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

// Delete a user
export async function deleteUser(userId: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("User not found");

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    revalidatePath("/admin/users");

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// update a user
export async function updateUser(user: z.infer<typeof updateUserSchema>) {
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });
    if (!userExists) throw new Error("User not found");

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        role: user.role,
      },
    });

    revalidatePath("/admin/users");
    return { success: true, message: "User updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Get All orders
export async function getAllOrders({
  limit = PAGE_SIZE,
  page,
  query,
}: {
  limit?: number;
  page: number;
  query?: string;
}) {
  const queryFilter: Prisma.OrderWhereInput =
    query && query !== "all"
      ? {
          user: {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
        }
      : {};
  const data = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { orderitems: true, user: { select: { name: true } } },
    skip: (page - 1) * limit,
    take: limit,
    where: {
      ...queryFilter,
    },
  });

  const dataCount = await prisma.order.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

// Delete Order
export async function deleteOrder(orderId: string) {
  try {
    const order = await prisma.order.findFirst({
      where: { id: orderId },
      include: { orderitems: true },
    });

    if (!order) throw new Error("Order not found");

    await prisma.$transaction(async (tx) => {
      // Iterate over products and update stock
      for (const item of order.orderitems) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.qty } },
        });
      }

      // Delete order
      await tx.order.delete({ where: { id: orderId } });
    });

    revalidatePath("/admin/orders");
    return { success: true, message: "Order delete successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update COD order to paid

export async function updateOrderToPaidCOD(orderId: string) {
  try {
    await updateOrderToPaid({ orderId });

    revalidatePath(`/order/${orderId}`);
    return { success: true, message: "Order updated to paid" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update COD order to delivered
export async function updateOrderToDeliveredCOD(orderId: string) {
  try {
    const order = await prisma.order.findFirst({
      where: { id: orderId },
    });

    if (!order) throw new Error("Order not found");
    if (!order.isPaid) throw new Error("Order not paid");

    await prisma.order.update({
      where: { id: orderId },
      data: { isDelivered: true, deliveredAt: new Date() },
    });

    revalidatePath(`/order/${orderId}`);
    return { success: true, message: "Order updated to delivered" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function createCategory(category: ICategory) {
  try {
    const data = categorySchema.parse(category);
    console.log("DATA", data);
    await prisma.category.create({
      data,
    });

    revalidatePath("/admin/categories");
    return { success: true, message: "Category created successfully" };
  } catch (error) {
    console.log("SONO QUI?", error);
    return { success: false, message: formatError(error) };
  }
}

/* TODO: */
export async function updateCategory(category: ICategory) {
  try {
    await prisma.category.create({
      data: category,
    });

    revalidatePath("/admin/categories");
    return { success: true, message: "Category created successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function getAllCategories() {
  try {
    const data = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    });

    const dataCount = await prisma.category.count();

    return {
      data,
      totalPages: Math.ceil(dataCount / 4),
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
