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
      costPrice: true,
      shortDescription: true,

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
          unitValue: { select: { id: true, value: true } },
          unitOfMeasure: { select: { id: true, code: true, name: true } },
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

  console.log(
    "🚀 ~ file: get-latest-product.actions.ts ~ line 74 ~ getLatestProducts ~ products",
    products
  );
  const transformedData = products.map(
    ({
      productPathologyOnProduct,
      productProteinOnProduct,
      productCategory,
      productsFeatureOnProduct,
      ...rest
    }) => ({
      ...rest,
      price: rest.price.toString(),
      costPrice: rest.costPrice.toString(),
      productPathologies: productPathologyOnProduct.map((p) => p.pathology),
      productProteins: productProteinOnProduct.map((p) => p.productProtein),
      productCategory: productCategory.map((c) => c.category),

      productUnitFormat: rest.productUnitFormat
        ? {
            id: rest.productUnitFormat.id,
            slug: rest.productUnitFormat.slug,
            unitValue: {
              id: rest.productUnitFormat.unitValue.id,
              value: rest.productUnitFormat.unitValue.value,
            },
            unitOfMeasure: {
              id: rest.productUnitFormat.unitOfMeasure.id,
              code: rest.productUnitFormat.unitOfMeasure.code,
              name: rest.productUnitFormat.unitOfMeasure.name,
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
