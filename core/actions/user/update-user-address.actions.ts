import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { shippingAddressSchema } from "@/core/validators";
import { formatError } from "@/lib/utils";
import { IShippingAddress } from "@/types";

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
