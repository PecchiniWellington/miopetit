/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/core/prisma/prisma";
import { contributorSchema } from "@/core/validators/contributors.validator";

export async function updateContributor(id: string, data: unknown) {
  const parsed = contributorSchema.partial().safeParse(data);
  if (!parsed.success) throw new Error("Invalid contributor update data");

  // 🔒 Destruttura per rimuovere i campi non aggiornabili
  const {
    id: _id,
    userId,
    userName,
    userEmail,
    user,
    products,
    ...rest
  } = parsed.data;
  const safeData = Object.fromEntries(
    Object.entries(rest).filter(([_, value]) => value !== null)
  );

  const updated = await prisma.contributor.update({
    where: { id },
    data: safeData,
  });

  return updated;
}
