"use server";
import { prisma } from "@/db/prisma";
import { PAGE_SIZE } from "@/lib/constants";
import { formatError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

// Get all the users
export async function getAllUsers({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}) {
  const data = await prisma.user.findMany({
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
