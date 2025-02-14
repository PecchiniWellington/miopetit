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

    console.log("productUnitFormat", data.unitOfMeasureId, data.unitValueId);
    // 🔹 Se non esiste, lo creiamo con gli ID diretti
    if (!productUnitFormat) {
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
        animalAge: product.animalAge || undefined,
        productPathologyId: product.productPathologyId,
        productBrandId: product.productBrandId,

        productProteinOnProduct: {
          deleteMany: {},
          create: product.productProteinOnProduct?.map((proteinId) => ({
            productProtein: { connect: { id: proteinId } },
          })),
        },
        productPathologyOnProduct: {
          deleteMany: {},
          create: product.productPathologyOnProduct?.map((pathologyId) => ({
            pathology: { connect: { id: pathologyId } },
          })),
        },
        productsFeatureOnProduct: {
          deleteMany: {},
          create: (product.productsFeatureOnProduct ?? [])
            .filter(
              (proteinId) => proteinId !== null && proteinId !== undefined
            )
            .map((proteinId) => ({
              productFeature: { connect: { id: proteinId! } },
            })),
        },
        productUnitFormatId: productUnitFormat.id,
      },
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product created successfully" };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof z.ZodError
          ? formatError(error)
          : (error as Error).message,
    };
  }
}
