"use server";
import { prisma } from "@/core/prisma/prisma";
import { addressSchema } from "@/core/validators/user-address.validator";
import { formatError } from "@/lib/utils";
import { z } from "zod";

// Get user by id
export const getUserAddress = async (userId: string) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: userId },
    });

    /* if (!user) {
    throw new Error("User not found");
  } */

    const { data } = z.array(addressSchema).safeParse(addresses);

    return { success: true, data };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};
