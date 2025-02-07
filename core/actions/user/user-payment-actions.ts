"use server";
import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { paymentMethodSchema } from "@/core/validators";
import { formatError } from "@/lib/utils";
import { IPaymentMethod } from "@/types/_index";

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

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { paymentMethod: paymentMethod.type },
    });

    return { success: true, message: "Payment method updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
