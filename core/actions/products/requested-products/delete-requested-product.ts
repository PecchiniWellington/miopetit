"use server";
import { prisma } from "@/core/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function deleteRequestedProduct(id: string) {
  if (!id) throw new Error("Missing product ID");

  await prisma.requestedProduct.delete({
    where: { id },
  });

  revalidatePath("/admin/requests"); // o la route giusta per aggiornare la pagina lista
  return { success: true };
}
