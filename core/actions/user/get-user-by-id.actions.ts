import { prisma } from "@/core/prisma/prisma";
import { userSchema } from "@/core/validators/user.validator";
import { convertToPlainObject } from "@/lib/utils";

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return null;

  let parsedAddress = user.defaultAddress;

  // 👇 Parsing sicuro
  try {
    if (typeof user.defaultAddress === "string") {
      parsedAddress = JSON.parse(user.defaultAddress);
    }
  } catch (error) {
    console.warn("⚠️ Errore nel parsing di defaultAddress:", error);
    parsedAddress = null;
  }

  const parsedUser = {
    ...user,
    defaultAddress: parsedAddress,
  };

  const result = userSchema.safeParse(parsedUser);

  if (!result.success) {
    console.error("❌ Errore di validazione utente:", result.error.format());
    return null;
  }

  return convertToPlainObject(result.data);
};
