"use server";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { formatError } from "../../utils";
import { IShippingAddress } from "@/types";

import { shippingAddressSchema } from "@/lib/validators";
import { PAGE_SIZE } from "@/lib/constants";

// Get user by id
export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  console.log("USER", user);

  if (!user) throw new Error("User not found");

  return user;
};

// Update the user's address
export async function updateUserAddress(data: IShippingAddress) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    if (!currentUser) throw new Error("User not found");

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { address },
    });

    return { success: true, message: "Address updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// update the user's profile
export async function updateUserProfile(user: { name: string; email: string }) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    if (!currentUser) throw new Error("User not found");

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { name: user.name, email: user.email },
    });

    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
