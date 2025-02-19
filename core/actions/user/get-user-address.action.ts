"use server";
import { prisma } from "@/core/prisma/prisma";
import { formatError } from "@/lib/utils";

// Get user by id
export const getUserAddress = async (userId: string) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: userId },
    });

    /* if (!user) {
    throw new Error("User not found");
  } */

    return { success: true, data: addresses };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};
