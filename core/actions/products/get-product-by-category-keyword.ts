// file: get-products-by-category-keywords.actions.ts

import { prisma } from "@/core/prisma/prisma";
import { productSchema } from "@/core/validators";
import { convertToPlainObject, formatDateTime } from "@/lib/utils";
import { z } from "zod";

const getProductsByCategoryKeywordsSchema = z.object({
  categoryKeywords: z.array(z.string().min(1)),
});

export async function getProductsByCategoryKeywords(input: {
  categoryKeywords: string[];
  limit?: number;
}) {
  const parsed = getProductsByCategoryKeywordsSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  const { categoryKeywords } = parsed.data;

  const products = await prisma.product.findMany({
    where: {
      productCategory: {
        some: {
          category: {
            slug: {
              contains: categoryKeywords[0], // Primo filtro per ottimizzare
            },
          },
        },
      },
    },
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
    orderBy: {
      createdAt: "desc",
    },
    take: input.limit,
  });

  // Filtro extra lato server per assicurarsi che TUTTE le parole chiave siano presenti negli slug delle categorie
  const filteredProducts = products.filter((product) => {
    const combinedSlugs = product.productCategory
      .map((c) => c.category.slug.toLowerCase())
      .join("/");

    return categoryKeywords.every((keyword) =>
      combinedSlugs.includes(keyword.toLowerCase())
    );
  });

  const transformedData = filteredProducts.map(
    ({
      productPathologyOnProduct,
      productProteinOnProduct,
      productCategory,
      productsFeatureOnProduct,
      ...rest
    }) => ({
      ...rest,
      price: rest.price.toString(),
      costPrice: Number(rest.costPrice),
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
