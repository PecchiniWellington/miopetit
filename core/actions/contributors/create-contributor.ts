import { prisma } from "@/core/prisma/prisma";
import { contributorSchema } from "@/core/validators/contributors.validator";

export async function createContributor(data: unknown) {
  const parsed = contributorSchema.safeParse(data);
  if (!parsed.success) throw new Error("Invalid contributor data");
  const contributor = await prisma.contributor.create({
    data: parsed.data,
  });
  return contributor;
}
