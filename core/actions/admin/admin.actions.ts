"use server";
import { prisma } from "@/core/prisma/prisma";
import {
  categorySchema,
  ICartItem,
  ICategory,
  IPaymentResult,
  IShippingAddress,
  updateUserSchema,
  userSchema,
} from "@/core/validators";
import { sendOrderDeliverEmail } from "@/email";
import { PAGE_SIZE } from "@/lib/constants";
import { convertToPlainObject, formatError } from "@/lib/utils";
import { Prisma, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { updateOrderToPaid } from "../order/order.action";

// Get all the users
export async function getAllUsers({
  role,
  query,
  limit = PAGE_SIZE,
  page,
}: {
  role?: Role;
  query?: string;
  limit?: number;
  page?: number;
  price?: string;
  rating?: string;
  sort?: string;
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
  const userData = await prisma.user.findMany({
    where: {
      ...queryFilter,
      ...(role ? { role } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: limit * ((page ?? 1) - 1),
  });

  const dataCount = await prisma.user.count();

  const { data, success, error } = z.array(userSchema).safeParse(userData);

  if (!success) {
    console.error("❌ Errore nella validazione dei prodotti:", error.format());
    throw new Error("Errore di validazione dei prodotti");
  }

  return {
    data: convertToPlainObject(data),
    totalPages: Math.ceil(dataCount / limit),
    totalUsers: dataCount,
  };

  /* return {
    data,
    totalPages: Math.ceil(dataCount / limit),
    totalUsers: dataCount,
  }; */
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
        role: user.role as Role, // ✅ cast a enum
        status: user.status,
        image: user.image,
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
