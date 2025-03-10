import { prisma } from "@/core/prisma/prisma";
import { createProductSchema } from "@/core/validators";
import { convertToPlainObject } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createProduct(data: unknown) {
  try {
    const product = createProductSchema.safeParse(data);

    if (!product.success) {
      return {
        success: false,
        error: "Validation failed",
        details: product.error.flatten().fieldErrors, // Mostra i campi mancanti
      };
    }

    const rest = product.data;

    let unitValue = await prisma.unitValue.findUnique({
      where: { id: rest.unitValueId ?? undefined },
    });

    if (!unitValue) {
      unitValue = await prisma.unitValue.create({
        data: {
          id: rest.unitValueId ?? undefined,
          value: parseInt(rest.unitValueId ?? "0"),
        },
      });
    }

    let unitMeasure = await prisma.unitOfMeasure.findUnique({
      where: { id: rest.unitOfMeasureId ?? undefined },
    });

    if (!unitMeasure) {
      unitMeasure = await prisma.unitOfMeasure.create({
        data: {
          id: rest.unitOfMeasureId ?? undefined,
          code: rest.unitOfMeasureId ?? "",
        },
      });
    }

    // 🔹 Trova o crea ProductUnitFormat
    const productUnitFormat = await prisma.productUnitFormat.findUnique({
      where: {
        unitValueId_unitMeasureId: {
          unitValueId: unitValue.id,
          unitMeasureId: unitMeasure.id,
        },
      },
    });

    const productUnitFormatId = productUnitFormat
      ? productUnitFormat.id
      : undefined;

    await prisma.product.create({
      data: {
        price: rest.price,
        name: rest.name,
        slug: rest.slug,
        images: rest.images,
        description: rest.description,
        stock: rest.stock ?? undefined,
        isFeatured: rest.isFeatured,
        banner: rest.banner,
        animalAge: rest.animalAge ?? "PUPPY",
        productPathologyId: rest.productPathologyId,
        productBrandId: rest.productBrandId,
        productUnitFormatId: productUnitFormatId,
        categoryType: rest.categoryType,
      },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product created successfully",
      ...convertToPlainObject(product.data),
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
