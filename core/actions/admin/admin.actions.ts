"use server";
import { prisma } from "@/core/prisma/prisma";
import {
  categorySchema,
  ICartItem,
  ICategory,
  IPaymentResult,
  IShippingAddress,
  userSchema,
} from "@/core/validators";
import { sendOrderDeliverEmail } from "@/email";
import { PAGE_SIZE } from "@/lib/constants";
import { convertToPlainObject, formatError } from "@/lib/utils";
import { Prisma, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { updateOrderToPaid } from "../order/order.action";

import { getContributorByUserId } from "@/core/actions/contributors/get-contributor-by-user-id";

export async function getAllUsersByRoleAndContributor({
  currentUserId,
  currentUserRole,
  role,
  query,
  limit = PAGE_SIZE,
  page = 1,
}: {
  currentUserId: string;
  currentUserRole: Role;
  role?: Role;
  query?: string;
  limit?: number;
  page?: number;
}) {
  let userIdsFilter: string[] | null = null;

  // Se l'utente è un ADMIN, ottieni gli utenti del contributor
  if (currentUserRole === "ADMIN") {
    const contributor = await getContributorByUserId(currentUserId);
    if (!contributor || !contributor.users?.length) {
      return { data: [], totalPages: 0, totalUsers: 0 };
    }

    userIdsFilter = contributor.users.map((u) => u.id);
  }

  const where: Prisma.UserWhereInput = {
    ...(query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          },
        }
      : {}),
    ...(role ? { role } : {}),
    ...(currentUserRole === "ADMIN" && userIdsFilter
      ? { id: { in: userIdsFilter } }
      : {}),
    // se non sei SUPER_ADMIN, puoi vedere solo te stesso o chi è associato a te
    ...(currentUserRole !== "SUPER_ADMIN" && userIdsFilter
      ? { id: { in: userIdsFilter } }
      : {}),
  };

  const userData = await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: limit * (page - 1),
  });

  const totalUsers = await prisma.user.count({ where });

  const sanitizedUserData = userData.map((user) => ({
    ...user,
    createdAt:
      user.createdAt instanceof Date
        ? user.createdAt.toISOString()
        : user.createdAt,
    updatedAt:
      user.updatedAt instanceof Date
        ? user.updatedAt.toISOString()
        : user.updatedAt,
  }));

  const parsed = z.array(userSchema).safeParse(sanitizedUserData);

  if (!parsed.success) {
    console.error(
      "❌ Errore nella validazione degli utenti:",
      parsed.error.format()
    );
    throw new Error("Errore di validazione degli utenti");
  }

  const users = parsed.data.map((user) => ({
    ...convertToPlainObject(user),
    defaultAddress:
      typeof user.defaultAddress === "string"
        ? JSON.parse(user.defaultAddress)
        : user.defaultAddress,
  }));

  return {
    data: users,
    totalPages: Math.ceil(totalUsers / limit),
    totalUsers,
  };
}

// Get all the users

// update a user

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

    const orderUpdated = await prisma.order.update({
      where: { id: orderId },
      include: {
        orderitems: true,
        user: { select: { email: true, name: true } },
      },
      data: { isDelivered: true, deliveredAt: new Date() },
    });

    if (!orderUpdated) throw new Error("Order not found");
    await sendOrderDeliverEmail({
      order: {
        ...orderUpdated,
        orderitems: orderUpdated.orderitems as ICartItem[],
        shippingAddress: orderUpdated.shippingAddress as IShippingAddress,
        paymentResult: orderUpdated.paymentResult as IPaymentResult,
      },
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
    await prisma.category.create({
      data,
    });

    revalidatePath("/admin/categories");
    return { success: true, message: "Category created successfully" };
  } catch (error) {
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

export async function deleteCategory(id: string) {
  try {
    const data = await prisma.category.findFirst({
      where: {
        id: id,
      },
    });

    if (!data) {
      throw new Error("Category not found");
    }
    await prisma.$transaction(async (tx) => {
      // Delete products associated with the category
      await tx.product.deleteMany({
        where: {
          id: id,
        },
      });

      // Delete the category
      await tx.category.delete({
        where: {
          id: id,
        },
      });
    });
    revalidatePath("/admin/categories");
    return { success: true, error: "Category deleted successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function updataCategory(data: z.infer<typeof categorySchema>) {
  try {
    const category = categorySchema.parse(data);
    const existingCategory = await prisma.category.findFirst({
      where: {
        id: category.id,
      },
    });
    if (!existingCategory) throw new Error("Category not found");

    await prisma.category.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        slug: data.slug,
      },
    });
    revalidatePath("/admin/categories");

    return { success: true, message: "Product created successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
