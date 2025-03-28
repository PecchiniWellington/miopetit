"use server";
import { prisma } from "@/core/prisma/prisma";
import { productSchema } from "@/core/validators";
import { convertToPlainObject, formatDateTime } from "@/lib/utils";
import { z } from "zod";

export type IQueryParams = {
  [key: string]: string;
};

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

async function getMainCategory(categorySlug: string) {
  const category = await prisma.category.findFirst({
    where: {
      slug: categorySlug,
    },
    select: { id: true, parentId: true },
  });

  console.log(
    `🔍 Categoria principale trovata per slug "${categorySlug}":`,
    category
  );

  return convertToPlainObject(category);
}

export async function getAllProductsBySlug({
  query,
  slug,
  skip = 0,
  take = 20,
}: {
  query: IQueryParams;
  slug: string;
  skip?: number;
  take?: number;
}) {
  const mainCategory = await getMainCategory(slug);

  if (!mainCategory) {
    console.warn(`⚠️ Nessuna categoria trovata per slug: ${slug}`);
    return [];
  }

  const subCategoryIds = await getAllSubCategoryIds(mainCategory.id);
  const categoryIds = [mainCategory.id, ...subCategoryIds];

  const where: any = {
    OR: [
      { categoryType: slug },
      {
        productCategory: {
          some: {
            categoryId: { in: categoryIds },
          },
        },
      },
    ],
  };

  if (query.animalAge) where.animalAge = query.animalAge;

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
    where.OR.push({
      name: { contains: search, mode: "insensitive" },
    });
  }

  const data = await prisma.product.findMany({
    where,
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
      productCategory: { select: { category: true } },
      productBrand: { select: { id: true, name: true } },
      productUnitFormat: {
        include: { unitOfMeasure: true, unitValue: true },
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
    orderBy:
      query.sort === "lowest"
        ? { price: "asc" }
        : query.sort === "highest"
          ? { price: "desc" }
          : query.sort === "rating"
            ? { rating: "desc" }
            : { createdAt: "desc" },
    skip,
    take,
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
