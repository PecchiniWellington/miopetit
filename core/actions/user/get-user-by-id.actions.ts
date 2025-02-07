import { prisma } from "@/core/prisma/prisma";

// Get user by id
export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  /* if (!user) {
    throw new Error("User not found");
  } */

  return user;
};
