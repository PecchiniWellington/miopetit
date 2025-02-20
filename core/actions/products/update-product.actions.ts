import { prisma } from "@/core/prisma/prisma";
import { updateProductSchema } from "@/core/validators";
import { formatError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data) as {
      id: string;
      name: string;
      slug: string;
      images: string[];
      description: string;
      stock: number | null;
      price: string;
      banner: string | null;
      numReviews: number;
      isFeatured: boolean | null;
      productBrandId: string | null;
      productProteinOnProduct?: string[];
      productPathologyOnProduct?: string[];
      productsFeatureOnProduct?: (string | null)[];
      productCategory?: { id: string; name: string }[];
    };

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
    if (!productUnitFormat) {
      productUnitFormat = await prisma.productUnitFormat.create({
        data: {
          unitValueId: data.unitValueId!, // Usa direttamente l'ID, non `connect`
          unitMeasureId: data.unitOfMeasureId!, // Usa direttamente l'ID, non `connect`
          slug: `${data.unitValueId!}-${data.unitOfMeasureId!}`, // Add slug property
        },
      });
    }

    await prisma.product.update({
      where: { id: product.id },
      data: {
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
