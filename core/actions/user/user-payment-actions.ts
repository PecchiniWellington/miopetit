"use server";
import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { IPaymentMethod, paymentMethodSchema } from "@/core/validators";
import { formatError } from "@/lib/utils";

//Update the user's payment method
export async function updateUserPaymentMethod(data: IPaymentMethod) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    if (!currentUser) throw new Error("User not found");

    const paymentMethod = paymentMethodSchema.parse(data);

    const userUpdated = await prisma.user.update({
      where: { id: currentUser.id },
      data: { paymentMethod: paymentMethod.type },
    });

    return {
      success: true,
      message: "Payment method updated successfully",
      data: userUpdated,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
