import { prisma } from "@/core/prisma/prisma";
import { updateProductSchema } from "@/core/validators";
import { formatError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);
    console.log("product", product);

    const productExist = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExist) {
      return { success: false, error: "Product not found" };
    }

    let productUnitFormat = await prisma.productUnitFormat.findFirst({
      where: {
        unitValueId: data.unitValueId ?? undefined,
        unitMeasureId: data.unitOfMeasureId ?? undefined,
      },
    });

    // 🔹 Se non esiste, lo creiamo con gli ID diretti
    if (!productUnitFormat && product.unitOfMeasureId && product.unitValueId) {
      productUnitFormat = await prisma.productUnitFormat.create({
        data: {
          unitValueId: data.unitValueId!, // Usa direttamente l'ID, non `connect`
          unitMeasureId: data.unitOfMeasureId!, // Usa direttamente l'ID, non `connect`
        },
      });
    }

    await prisma.product.update({
      where: { id: product.id },
      data: {
        price: product.price,
        name: product.name,
        slug: product.slug,
        images: product.images,
        description: product.description,
        stock: product.stock ?? undefined,
        isFeatured: product.isFeatured,
        banner: product.banner,

        productPathologyId: product.productPathologyId,

        // ✅ Usa `connect` per collegare la categoria
        category: product.categoryId
          ? { connect: { id: product.categoryId } }
          : undefined,

        // ✅ Stessa cosa per il brand e la patologia
        productBrand: product.productBrandId
          ? { connect: { id: product.productBrandId } }
          : undefined,
        productPathology: product.productPathologyId
          ? { connect: { id: product.productPathologyId } }
          : undefined,
        unitOfMeasureId: product.unitOfMeasureId ?? undefined,
        productProteinOnProduct: {
          deleteMany: {}, // ✅ Rimuove i collegamenti esistenti
          create: product.productProteins?.map((proteinId) => ({
            productProtein: { connect: { id: proteinId } },
          })),
        },
      },
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product created successfully" };
  } catch (error) {
    return {
      success: false,
      error: error instanceof z.ZodError ? formatError(error) : error.message,
    };
  }
}
