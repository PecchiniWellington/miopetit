"use server";

import { prisma } from "@/core/prisma/prisma";
import {
  contributorSchema,
  IContributor,
} from "@/core/validators/contributors.validator";
import ROLES from "@/lib/constants/roles";
import { convertToPlainObject, formatDateTime } from "@/lib/utils";
import { z } from "zod";

interface RawProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  costPrice: number;
  description: string;
  shortDescription: string;
  images: string[];
  stock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  animalAge: "PUPPY" | "ADULT" | "SENIOR";
  categoryType: string;
  percentageDiscount: number;

  productCategory: { category: { id: string; name: string; slug?: string } }[];
  productBrand: { id: string; name: string } | null;
  productUnitFormat: {
    id?: string;
    slug?: string;
    unitValue: { id: string; value: number };
    unitOfMeasure: { id: string; code: string; name: string };
  } | null;
  productPathologyOnProduct: { pathology: { id: string; name: string } }[];
  productProteinOnProduct: { productProtein: { id: string; name: string } }[];
  productsFeatureOnProduct: { productFeature: { id: string; name: string } }[];
}

interface RawContributor extends Omit<IContributor, "products"> {
  products: RawProduct[];
}

function normalizeContributorData(data: RawContributor[]): IContributor[] {
  return data.map((contributor) => ({
    ...contributor,
    products: contributor.products.map((product) => {
      const {
        productCategory,
        productUnitFormat,
        productBrand,
        productPathologyOnProduct,
        productProteinOnProduct,
        productsFeatureOnProduct,
        createdAt,
        updatedAt,
        ...rest
      } = product;

      return {
        ...rest,
        productBrand: productBrand || null,
        productPathologies: productPathologyOnProduct.map((p) => p.pathology),
        productProteins: productProteinOnProduct.map((p) => p.productProtein),
        productCategory: productCategory.map((c) => c.category),
        productUnitFormat: productUnitFormat
          ? {
              id: productUnitFormat.id,
              slug: productUnitFormat.slug,
              unitValue: {
                id: productUnitFormat.unitValue.id,
                value: Number(productUnitFormat.unitValue.value),
              },
              unitOfMeasure: {
                id: productUnitFormat.unitOfMeasure.id,
                code: productUnitFormat.unitOfMeasure.code,
                name: productUnitFormat.unitOfMeasure.name,
              },
            }
          : null,
        productFeature: productsFeatureOnProduct.map((f) => f.productFeature),
        createdAt: formatDateTime(new Date(createdAt).toISOString()).dateTime,
        updatedAt: formatDateTime(new Date(updatedAt).toISOString()).dateTime,
      };
    }),
  }));
}

export async function getAllContributors(
  type?: ROLES.SHELTER | ROLES.RETAILER | ROLES.ASSOCIATION
) {
  const data = await prisma.contributor.findMany({
    where: {
      type,
    },
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

  const arraySchema = z.array(contributorSchema);
  const normalized = normalizeContributorData(
    convertToPlainObject(data) as unknown as RawContributor[]
  );
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
