import { prisma } from "@/core/prisma/prisma";
import { productSchema } from "@/core/validators";
import { formatError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateProduct(data: z.infer<typeof productSchema>) {
  try {
    const product = productSchema.parse(data);

    const productExist = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExist) {
      return { success: false, error: "Product not found" };
    }

    const bannerUrl = product.banner;
    const imageUrls = product.images;

    // STEP 1: Verifica/crea ProductUnitFormat (unitValue + unitOfMeasure)
    let productUnitFormatId: string | null = null;

    if (
      product.productUnitFormat?.unitValue?.id &&
      product.productUnitFormat?.unitOfMeasure?.id
    ) {
      const existingFormat = await prisma.productUnitFormat.findUnique({
        where: {
          unitValueId_unitMeasureId: {
            unitValueId: product.productUnitFormat.unitValue.id,
            unitMeasureId: product.productUnitFormat.unitOfMeasure.id,
          },
        },
      });

      if (existingFormat) {
        productUnitFormatId = existingFormat.id;
      } else {
        const slug =
          `${product.productUnitFormat.unitValue.value}-${product.productUnitFormat.unitOfMeasure.code}`.toLowerCase();
        const newFormat = await prisma.productUnitFormat.create({
          data: {
            unitValueId: product.productUnitFormat.unitValue.id,
            unitMeasureId: product.productUnitFormat.unitOfMeasure.id,
            slug,
          },
        });
        productUnitFormatId = newFormat.id;
      }
    }

    // STEP 2: Update prodotto
    await prisma.product.update({
      where: { id: product.id },
      data: {
        name: product.name,
        slug: product.slug,
        price: product.price,
        stock: product.stock,
        isFeatured: product.isFeatured,
        createdAt: new Date(product.createdAt || new Date()),
        updatedAt: new Date(),
        animalAge: product.animalAge,
        categoryType: product.categoryType,
        percentageDiscount: product.percentageDiscount,
        description: product.description,
        banner: bannerUrl,
        images: imageUrls,
        productBrandId: product.productBrand?.id || null,
        productUnitFormatId,
      },
    });

    // STEP 3: Reset relazioni many-to-many
    await prisma.productCategory.deleteMany({
      where: { productId: product.id },
    });
    await prisma.productCategory.createMany({
      data: product.productCategory.map((category) => ({
        productId: product.id,
        categoryId: category.id,
      })),
    });

    await prisma.productPathologyOnProduct.deleteMany({
      where: { productId: product.id },
    });
    await prisma.productPathologyOnProduct.createMany({
      data: product.productPathologies.map((p) => ({
        productId: product.id,
        pathologyId: p.id,
      })),
    });

    await prisma.productProteinOnProduct.deleteMany({
      where: { productId: product.id },
    });
    await prisma.productProteinOnProduct.createMany({
      data: product.productProteins.map((p) => ({
        productId: product.id,
        productProteinId: p.id,
      })),
    });

    await prisma.productFeatureOnProduct.deleteMany({
      where: { productId: product.id },
    });
    await prisma.productFeatureOnProduct.createMany({
      data: product.productFeature.map((f) => ({
        productId: product.id,
        productFeatureId: f.id,
      })),
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product updated successfully" };
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
