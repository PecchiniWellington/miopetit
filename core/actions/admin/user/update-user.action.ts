"use server";
import { prisma } from "@/core/prisma/prisma";
import { updateUserSchema } from "@/core/validators";
import { formatError } from "@/lib/utils";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateUser(user: z.infer<typeof updateUserSchema>) {
  try {
    if (!user.id) throw new Error("User ID is required");

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

    revalidatePath("/admin/users/all");
    return { success: true, message: "User updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
