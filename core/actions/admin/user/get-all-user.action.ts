"use server";
import { prisma } from "@/core/prisma/prisma";
import { userSchema } from "@/core/validators";
import { PAGE_SIZE } from "@/lib/constants";
import { convertToPlainObject, formatError } from "@/lib/utils";
import { Prisma, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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

    revalidatePath("/admin/users/all");

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
