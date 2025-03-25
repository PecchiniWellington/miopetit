import { prisma } from "@/core/prisma/prisma";
import { contributorSchema } from "@/core/validators/contributors.validator";

export async function updateContributor(id: string, data: unknown) {
  const parsed = contributorSchema.partial().safeParse(data);
  if (!parsed.success) throw new Error("Invalid contributor update data");
  const updated = await prisma.contributor.update({
    where: { id },
    data: parsed.data,
  });
  return updated;
}
