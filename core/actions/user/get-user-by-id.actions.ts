import { prisma } from "@/core/prisma/prisma";
import { userSchema } from "@/core/validators";
import { convertToPlainObject } from "@/lib/utils";

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

  const result = userSchema.safeParse(user);

  if (!result.success) {
    console.error(
      "❌ Errore nella validazione dei prodotti:",
      result.error.format()
    );
    throw new Error("Errore di validazione dei prodotti");
  }

  return convertToPlainObject(result.data);
};
