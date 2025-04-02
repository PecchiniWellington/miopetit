// file: get-products-by-main-category.actions.ts

import { IQueryParams } from "@/core/actions/types";
import { prisma } from "@/core/prisma/prisma";
import { productSchema } from "@/core/validators";
import { convertToPlainObject, formatDateTime } from "@/lib/utils";
import { z } from "zod";

const getProductsByMainCategorySchema = z.object({
  mainCategorySlug: z.string().min(1),
  categoryType: z.string().min(1),
  limit: z.number().optional(),
  query: z.record(z.string(), z.string()).optional(),
});

async function getAllSubCategoryIds(parentId: string): Promise<string[]> {
  const subCategories = await prisma.category.findMany({
    where: { parentId },
    select: { id: true },
  });

  if (subCategories.length === 0) return [];

  const subCategoryIds = subCategories.map((c) => c.id);
  const deepSubCategoryIds = await Promise.all(
    subCategoryIds.map((id) => getAllSubCategoryIds(id))
  );

  return subCategoryIds.concat(deepSubCategoryIds.flat());
}

async function findRootCategory(slug: string) {
  let category = await prisma.category.findFirst({
    where: { slug },
    select: { id: true, parentId: true },
  });

  if (!category) return null;

  while (category && category.parentId) {
    category = await prisma.category.findFirst({
      where: { id: category.parentId },
      select: { id: true, parentId: true },
    });
  }

  return category;
}

export async function getProductsByMainCategory(input: {
  mainCategorySlug: string;
  categoryType: string;
  limit?: number;
  query?: IQueryParams;
}) {
  const parsed = getProductsByMainCategorySchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  const { mainCategorySlug, categoryType, limit, query = {} } = parsed.data;

  const mainCategory = await findRootCategory(mainCategorySlug);
  if (!mainCategory) {
    throw new Error("Main category not found");
  }

  const subCategoryIds = await getAllSubCategoryIds(mainCategory.id);
  const allCategoryIds = [mainCategory.id, ...subCategoryIds];

  const where: any = {
    categoryType,
    productCategory: {
      some: {
        categoryId: { in: allCategoryIds },
      },
    },
  };

  if (query.animalAge) {
    where.animalAge = query.animalAge;
  }

  if (query.productBrand) {
    const brand = await prisma.productBrand.findFirst({
      where: { slug: query.productBrand },
      select: { id: true },
    });
    if (brand) where.productBrandId = brand.id;
  }

  if (query.productFormats) {
    const format = await prisma.productUnitFormat.findFirst({
      where: { slug: query.productFormats },
      select: { id: true },
    });
    if (format) where.productUnitFormatId = format.id;
  }

  if (query.productPathologies) {
    const pathology = await prisma.productPathology.findUnique({
      where: { slug: query.productPathologies },
      select: { id: true },
    });
    if (pathology?.id) {
      where.productPathologyOnProduct = {
        some: { pathologyId: pathology.id },
      };
    }
  }

  if (query.productProteins) {
    const protein = await prisma.productProtein.findUnique({
      where: { slug: query.productProteins },
      select: { id: true },
    });
    if (protein?.id) {
      where.productProteinOnProduct = {
        some: { productProteinId: protein.id },
      };
    }
  }

  if (query.price) {
    const [min, max] = query.price.split("-").map(Number);
    where.price = {
      gte: min || 0,
      lte: max || Number.MAX_SAFE_INTEGER,
    };
  }

  if (query.search) {
    const search = query.search.toLowerCase();
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
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
        select: { category: true },
      },
      productBrand: {
        select: { id: true, name: true },
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
        select: { pathology: { select: { id: true, name: true } } },
      },
      productsFeatureOnProduct: {
        select: { productFeature: { select: { id: true, name: true } } },
      },
      productProteinOnProduct: {
        select: { productProtein: { select: { id: true, name: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

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
      costPrice: Number(rest.costPrice),
      productPathologies: productPathologyOnProduct.map((p) => p.pathology),
      productProteins: productProteinOnProduct.map((p) => p.productProtein),
      productCategory: productCategory.map((c) => c.category),
      productUnitFormat: rest.productUnitFormat
        ? {
            id: rest.productUnitFormat.id,
            slug: rest.productUnitFormat.slug,
            unitValue: rest.productUnitFormat.unitValue,
            unitOfMeasure: rest.productUnitFormat.unitOfMeasure,
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
