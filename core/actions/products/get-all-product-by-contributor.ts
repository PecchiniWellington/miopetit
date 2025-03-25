import { prisma } from "@/core/prisma/prisma";
import { productSchema } from "@/core/validators";
import { convertToPlainObject, formatDateTime } from "@/lib/utils";
import { z } from "zod";

export async function getProductsByContributor(affiliateId: string) {
  if (!affiliateId) {
    throw new Error("Affiliate ID is required");
  }

  const data = await prisma.product.findMany({
    where: {
      affiliateId,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      costPrice: true,
      description: true,
      shortDescription: true,
      images: true,
      stock: true,
      rating: true,
      numReviews: true,
      isFeatured: true,
      createdAt: true,
      updatedAt: true,
      animalAge: true,
      categoryType: true,
      percentageDiscount: true,
      productCategory: {
        select: {
          category: true,
        },
      },
      productBrand: {
        select: {
          id: true,
          name: true,
        },
      },
      productUnitFormat: {
        include: {
          unitOfMeasure: true,
          unitValue: true,
        },
      },
      productPathologyOnProduct: {
        select: {
          pathology: { select: { id: true, name: true } },
        },
      },
      productsFeatureOnProduct: {
        select: {
          productFeature: { select: { id: true, name: true } },
        },
      },
      productProteinOnProduct: {
        select: {
          productProtein: { select: { id: true, name: true } },
        },
      },
    },
  });

  const transformedData = data.map(
    ({
      productPathologyOnProduct,
      productProteinOnProduct,
      productCategory,
      productsFeatureOnProduct,
      productUnitFormat,
      ...rest
    }) => ({
      ...rest,
      costPrice: Number(rest.costPrice),
      shortDescription: rest.shortDescription ?? "",
      productPathologies: productPathologyOnProduct.map((p) => p.pathology),
      productProteins: productProteinOnProduct.map((p) => p.productProtein),
      productCategory: productCategory.map((c) => c.category),
      productUnitFormat: productUnitFormat
        ? {
            id: productUnitFormat.id,
            slug: productUnitFormat.slug,
            unitValue: {
              id: productUnitFormat.unitValue.id,
              value: productUnitFormat.unitValue.value,
            },
            unitOfMeasure: {
              id: productUnitFormat.unitOfMeasure.id,
              code: productUnitFormat.unitOfMeasure.code,
              name: productUnitFormat.unitOfMeasure.name,
            },
          }
        : null,
      productFeature: productsFeatureOnProduct.map((f) => f.productFeature),
      createdAt: formatDateTime(rest.createdAt.toString()).dateTime,
      updatedAt: formatDateTime(rest.updatedAt.toString()).dateTime,
    })
  );

  const result = z.array(productSchema).safeParse(transformedData);

  if (!result.success) {
    console.error(
      "❌ Errore nella validazione dei prodotti:",
      result.error.format()
    );
    throw new Error("Errore di validazione dei prodotti");
  }

  return convertToPlainObject(result.data);
}
