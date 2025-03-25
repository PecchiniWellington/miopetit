import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";

// Get user by id
export const getUserByUserSlug = async (userSlug: string) => {
  const user = await prisma.user.findUnique({
    where: {
      userSlug,
    },
  });

  /* if (!user) {
    throw new Error("User not found");
  } */

  /* const result = userSchema.safeParse(user);
   */
  /* if (!result.success) {
    console.error(
      "❌ Errore nella validazione dei prodotti:",
      result.error.format()
    );
    throw new Error("Errore di validazione dei prodotti");
  } */

  return convertToPlainObject(user);
};
