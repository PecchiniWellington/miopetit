import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { createProductSchema } from "@/core/validators";
import ROLES from "@/lib/constants/roles";
import { formatError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createProduct(data: z.infer<typeof createProductSchema>) {
  try {
    const session = await auth();
    const currentContributorId = (
      await prisma.contributor.findFirst({
        where: { userId: session?.user.id },
      })
    )?.id;
    const product = createProductSchema.parse(data);

    const bannerUrl = product.banner;
    const imageUrls = product.images;

    // STEP 1: Verifica/crea ProductUnitFormat (unitValueId + unitMeasureId)
    let productUnitFormatId: string | null = null;

    const unitValueId = product.productUnitFormat?.unitValue?.id || null;
    const unitMeasureId = product.productUnitFormat?.unitOfMeasure?.id || null;

    if (unitValueId && unitMeasureId) {
      const existingFormat = await prisma.productUnitFormat.findUnique({
        where: {
          unitValueId_unitMeasureId: {
            unitValueId,
            unitMeasureId,
          },
        },
      });

      if (existingFormat) {
        productUnitFormatId = existingFormat.id;
      } else {
        const slug = `${unitValueId}-${unitMeasureId}`;
        const newFormat = await prisma.productUnitFormat.create({
          data: {
            unitValueId,
            unitMeasureId,
            slug,
          },
        });
        productUnitFormatId = newFormat.id;
      }
    }

    // STEP 2: Create prodotto
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug || "",
        price: product.price,
        stock: product.stock ?? 0,
        isFeatured: product.isFeatured,
        createdAt: new Date(product.createdAt || new Date()),
        updatedAt: new Date(),
        animalAge: product.animalAge,
        categoryType: product.categoryType || "",
        percentageDiscount: product.percentageDiscount,
        description: product.description,
        shortDescription: product.shortDescription || "", // Added shortDescription
        banner: bannerUrl,
        images: imageUrls,
        productBrandId: product.productBrand?.id || null,
        productUnitFormatId,
        contributorId:
          session?.user.role === ROLES.CONTRIBUTOR
            ? currentContributorId
            : null,
      },
    });

    // STEP 3: Relazioni many-to-many
    await prisma.productCategory.createMany({
      data: product.productCategory.map((category) => ({
        productId: createdProduct.id,
        categoryId: category.id,
      })),
    });

    await prisma.productPathologyOnProduct.createMany({
      data: product.productPathologies.map((p) => ({
        productId: createdProduct.id,
        pathologyId: p.id,
      })),
    });

    await prisma.productProteinOnProduct.createMany({
      data: product.productProteins.map((p) => ({
        productId: createdProduct.id,
        productProteinId: p.id,
      })),
    });

    await prisma.productFeatureOnProduct.createMany({
      data: product.productFeature.map((f) => ({
        productId: createdProduct.id,
        productFeatureId: f.id,
      })),
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
