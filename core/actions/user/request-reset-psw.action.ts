import { prisma } from "@/core/prisma/prisma";
import { sendPasswordResetEmail } from "@/email";
import { formatError } from "@/lib/utils";
import { hashSync } from "bcryptjs";
import crypto from "crypto";

export const requestPasswordReset = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: false,
        message: "Nessun account trovato con questa email",
      };
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiryDate = new Date(Date.now() + 3600000); // Scadenza di 1 ora

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiry: expiryDate,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    await sendPasswordResetEmail({ user, resetUrl });
    return { success: true, message: "Email di reset inviata!" };
  } catch (error) {
    console.log("ERROR", error);
    return { success: false, message: formatError(error) };
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      return { success: false, message: "Token non valido o scaduto" };
    }
    const hashedPassword = hashSync(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { success: true, message: "Password aggiornata con successo!" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};
