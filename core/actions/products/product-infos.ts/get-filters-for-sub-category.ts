// file: get-filters-by-main-category.actions.ts

import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";
import { z } from "zod";

const getFiltersSchema = z.object({
  mainCategorySlug: z.string().min(1),
  subCategorySlug: z.string().optional(),
  categoryType: z.string().min(1),
});

async function getAllSubCategoryIds(
  parentId?: string | null
): Promise<string[]> {
  const subCategories = await prisma.category.findMany({
    where: { parentId },
    select: { id: true },
  });
  const subCategoryIds = subCategories.map((c) => c.id);
  const deepSubCategoryIds = await Promise.all(
    subCategoryIds.map((id) => getAllSubCategoryIds(id))
  );
  return subCategoryIds.concat(deepSubCategoryIds.flat());
}

export async function getFiltersByMainCategory(input: {
  mainCategorySlug: string;
  subCategorySlug?: string;
  categoryType: string;
}) {
  const parsed = getFiltersSchema.safeParse(input);
  if (!parsed.success) throw new Error("Invalid input");

  const { mainCategorySlug, subCategorySlug, categoryType } = parsed.data;

  const mainCategory = await prisma.category.findFirst({
    where: { slug: mainCategorySlug },
    select: { id: true },
  });
  if (!mainCategory) return {};

  const allCategoryIds = [
    mainCategory.id,
    ...(await getAllSubCategoryIds(mainCategory.id)),
  ];

  let filterCategoryIds = allCategoryIds;

  if (subCategorySlug) {
    const subCategory = await prisma.category.findFirst({
      where: { slug: subCategorySlug },
      select: { id: true },
    });

    if (subCategory) {
      filterCategoryIds = [
        subCategory.id,
        ...(await getAllSubCategoryIds(subCategory.id)),
      ];
    }
  }

  const productCategory = await prisma.productCategory.findMany({
    where: { categoryId: { in: filterCategoryIds } },
    select: { productId: true },
  });

  const productIds = productCategory.map((pc) => pc.productId);

  if (productIds.length === 0) return {};

  const filters = await prisma.product.groupBy({
    by: [
      "animalAge",
      "productBrandId",
      "productUnitFormatId",
      "productPathologyId",
    ] as const,
    where: {
      id: { in: productIds },
      categoryType,
    },
    _min: { price: true },
    _max: { price: true },
  });

  const minPrice = Math.min(
    ...filters.map((f) => parseFloat(f._min?.price?.toString() ?? "0"))
  );
  const maxPrice = Math.max(
    ...filters.map((f) => parseFloat(f._max?.price?.toString() ?? "0"))
  );

  const priceRanges = [];
  const step = 10;
  let currentMin = Math.floor(minPrice / step) * step;
  while (currentMin < maxPrice) {
    const currentMax = currentMin + step - 0.01;
    priceRanges.push({
      slug: `${currentMin}-${currentMax > maxPrice ? maxPrice : currentMax}`,
      name: `€${currentMin} - €${currentMax > maxPrice ? maxPrice : currentMax}`,
    });
    currentMin += step;
  }

  const unitFormats = await prisma.productUnitFormat.findMany({
    where: {
      id: {
        in: Array.from(
          new Set(
            filters
              .map((f) => f.productUnitFormatId)
              .filter((id): id is string => id !== null)
          )
        ),
      },
    },
    include: {
      unitValue: true,
      unitOfMeasure: true,
    },
  });

  const convert = convertToPlainObject({
    animalAge: Array.from(new Set(filters.map((f) => f.animalAge))),
    productFormats: unitFormats.map((unit) => ({
      id: unit.id,
      unitValue: unit.unitValue?.value ?? null,
      unitOfMeasure: unit.unitOfMeasure?.code ?? null,
      slug: unit.slug,
    })),
    productBrand: (
      await prisma.productBrand.findMany({
        where: {
          id: {
            in: Array.from(
              new Set(
                filters
                  .map((f) => f.productBrandId)
                  .filter((id): id is string => id !== null)
              )
            ),
          },
        },
        select: { id: true, name: true, slug: true },
      })
    ).map((brand) => ({ id: brand.id, name: brand.name, slug: brand.slug })),
    productPathologies: Array.from(
      new Map(
        (
          await prisma.productPathologyOnProduct.findMany({
            where: { productId: { in: productIds } },
            select: {
              pathologyId: true,
              pathology: { select: { name: true, slug: true } },
            },
          })
        ).map((r) => [
          r.pathologyId,
          { id: r.pathologyId, name: r.pathology.name, slug: r.pathology.slug },
        ])
      ).values()
    ),
    productProteins: Array.from(
      new Map(
        (
          await prisma.productProteinOnProduct.findMany({
            where: { productId: { in: productIds } },
            select: {
              productProteinId: true,
              productProtein: { select: { name: true, slug: true } },
            },
          })
        ).map((r) => [
          r.productProteinId,
          {
            id: r.productProteinId,
            name: r.productProtein.name,
            slug: r.productProtein.slug,
          },
        ])
      ).values()
    ),
    price: priceRanges,
  });

  return convert;
}
