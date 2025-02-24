"use server";

import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { supportTicketSchema } from "@/core/validators/support-ticket.validator";

import { revalidatePath } from "next/cache";

export async function createSupportTicket(
  prevState: unknown,
  formData: {
    subject: string;
    email: string;
    description: string;
    orderId?: string;
  }
) {
  try {
    const session = await auth();
    const user = session?.user;

    const ticketData = supportTicketSchema.parse({
      subject: formData.subject,
      email: formData.email,
      orderId: formData.orderId,
      description: formData.description,
    });

    await prisma.supportTicket.create({
      data: {
        userId: user?.id || null,
        email: user?.email || "",
        orderId: ticketData?.orderId || null,
        subject: ticketData.subject,
        description: ticketData.description,
      },
    });

    revalidatePath("/support");

    return { success: true, message: "Ticket inviato con successo!" };
  } catch (error) {
    return { success: false, message: "Errore nell'invio del ticket" };
  }
}

export async function getUserTickets() {
  const session = await auth();
  const user = session?.user;

  if (!user) return [];

  return await prisma.supportTicket.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}
