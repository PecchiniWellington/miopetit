import { prisma } from "@/core/prisma/prisma";
import { productSchema } from "@/core/validators";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import { convertToPlainObject, formatDateTime } from "@/lib/utils";
import { z } from "zod";

export async function getLatestProducts({
  limit = LATEST_PRODUCTS_LIMIT,
}: {
  limit?: number;
}) {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      description: true,
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
        select: {
          id: true,
          slug: true,
          unitValue: { select: { value: true } },
          unitOfMeasure: { select: { code: true } },
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
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  /* prisma.$disconnect(); */
  const transformedData = products.map(
    ({
      productPathologyOnProduct,
      productProteinOnProduct,
      productCategory,
      productsFeatureOnProduct,
      ...rest
    }) => ({
      ...rest,
      productPathologies: productPathologyOnProduct.map((p) => p.pathology),
      productProteins: productProteinOnProduct.map((p) => p.productProtein),
      productCategories: productCategory.map((c) => c.category),
      productUnitFormat: rest.productUnitFormat
        ? {
            id: rest.productUnitFormat.id,
            unitValue: rest.productUnitFormat.unitValue.value,
            unitOfMeasure: rest.productUnitFormat.unitOfMeasure.code,
            slug: rest.productUnitFormat.slug,
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
