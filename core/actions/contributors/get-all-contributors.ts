"use server";
import { prisma } from "@/core/prisma/prisma";
import { contributorSchema } from "@/core/validators/contributors.validator";
import { convertToPlainObject } from "@/lib/utils";
import { z } from "zod";

function normalizeContributorData(data: any[]) {
  return data.map((contributor: any) => ({
    ...contributor,
    products: contributor.products?.map((product: any) => ({
      ...product,

      productBrand: product.productBrand || null,

      productUnitFormat: product.productUnitFormat
        ? {
            id: product.productUnitFormat?.id ?? "",
            slug: product.productUnitFormat?.slug ?? "",
            unitValue: product.productUnitFormat.unitValue,
            unitOfMeasure: product.productUnitFormat.unitOfMeasure,
          }
        : null,

      productCategory:
        product.productCategory?.map(
          (cat: {
            id: string;
            name: string;
            slug?: string | undefined;
            parentId?: string | null | undefined;
          }) => cat.category
        ) ?? [],

      productPathologies:
        product.productPathologyOnProduct?.map((item: any) => item.pathology) ??
        [],

      productProteins:
        product.productProteinOnProduct?.map(
          (item: any) => item.productProtein
        ) ?? [],

      productFeature:
        product.productsFeatureOnProduct?.map(
          (item: any) => item.productFeature
        ) ?? [],
    })),
  }));
}

export async function getAllContributors() {
  const data = await prisma.contributor.findMany({
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      products: {
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
      },
    },
  });

  console.log(
    "🚀 ~ file: get-all-contributors.ts ~ line 15 ~ getAllContributors ~ data",
    convertToPlainObject(data)
  );

  const arraySchema = z.array(contributorSchema);
  const normalized = normalizeContributorData(convertToPlainObject(data));
  const validated = arraySchema.safeParse(normalized);

  if (!validated.success) {
    console.error(
      "❌ Errore validazione contributor con user:",
      validated.error.format()
    );
    throw new Error("Errore validazione contributor");
  }

  return validated.data;
}
