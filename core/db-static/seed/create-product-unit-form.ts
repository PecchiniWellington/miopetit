import { prisma } from "@/core/prisma/prisma";

// ✅ Funzione per creare i formati unitari dei prodotti
export async function createProductUnitFormats() {
  console.log(`⏳ Creating product unit formats...`);
  const unitValues = await prisma.unitValue.findMany({
    select: { id: true, value: true },
  });
  const unitMeasures = await prisma.unitOfMeasure.findMany({
    select: { id: true, code: true },
  });

  const productUnitFormats = await Promise.all(
    unitValues.map(async (unitValue) => {
      const randomUnitMeasure =
        unitMeasures[Math.floor(Math.random() * unitMeasures.length)];
      return await prisma.productUnitFormat.create({
        data: {
          unitValueId: unitValue.id,
          unitMeasureId: randomUnitMeasure.id,
          slug: `${unitValue.value}-${randomUnitMeasure.code}`.toLowerCase(),
        },
      });
    })
  );
  console.log(`✅ Product unit formats created.`);
  return productUnitFormats;
}
