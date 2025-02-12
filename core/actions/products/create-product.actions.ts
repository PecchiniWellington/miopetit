import { prisma } from "@/core/prisma/prisma";
import { insertProductSchema } from "@/core/validators";
import { revalidatePath } from "next/cache";

// Create product
export async function createProduct(data: unknown) {
  try {
    const product = insertProductSchema.safeParse(data);

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
        categoryId: rest.categoryId,
        productBrandId: rest.productBrandId,
        productPathologyId: rest.productPathologyId,
        ...(productUnitFormat && {
          productUnitFormat: { connect: { id: productUnitFormat.id } },
        }),
        productProteins: {
          create: rest.productProteins?.map((proteinId) => ({
            productProtein: { connect: { id: proteinId } },
          })),
        },
      },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product created successfully",
      data: product.data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
