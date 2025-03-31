"use server";

import { IQueryParams } from "@/core/actions/products/get-all-product-by-slug";
import { prisma } from "@/core/prisma/prisma";
import { productSchema } from "@/core/validators";
import { convertToPlainObject, formatDateTime } from "@/lib/utils";

export async function countAllProducts(
  contributorId?: string,
  query?: string
): Promise<number> {
  const isUuidQuery =
    query &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      query
    );

  const where = {
    AND: [
      contributorId ? { contributorId } : {},
      query
        ? {
            OR: [
              {
                name: {
                  contains: query,
                  mode: "insensitive" as const,
                },
              },
              ...(isUuidQuery ? [{ id: query }] : []),
            ],
          }
        : {},
    ],
  };

  const totalCount = await prisma.product.count({ where });
  return totalCount;
}

export async function getAllProducts({
  contributorId,
  page = 1,
  limit = 10,
  query,
  filters,
}: {
  contributorId?: string;
  page?: number;
  limit?: number;
  query?: string;
  filters?: IQueryParams;
}) {
  const isUuidQuery =
    query &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      query
    );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    AND: [
      contributorId ? { contributorId } : {},
      query
        ? {
            OR: [
              {
                name: {
                  contains: query,
                  mode: "insensitive" as const,
                },
              },
              ...(isUuidQuery ? [{ id: query }] : []),
            ],
          }
        : {},
    ],
  };

  if (filters?.animalAge) {
    where.AND.push({ animalAge: filters.animalAge });
  }

  if (filters?.productBrand) {
    const brand = await prisma.productBrand.findFirst({
      where: { slug: filters.productBrand },
      select: { id: true },
    });
    if (brand) {
      where.AND.push({ productBrandId: brand.id });
    }
  }

  if (filters?.productFormats) {
    const format = await prisma.productUnitFormat.findFirst({
      where: { slug: filters.productFormats },
      select: { id: true },
    });
    if (format) {
      where.AND.push({ productUnitFormatId: format.id });
    }
  }

  if (filters?.productPathologies) {
    const pathology = await prisma.productPathology.findUnique({
      where: { slug: filters.productPathologies },
      select: { id: true },
    });
    if (pathology) {
      where.AND.push({
        productPathologyOnProduct: {
          some: { pathologyId: pathology.id },
        },
      });
    }
  }

  if (filters?.productProteins) {
    const protein = await prisma.productProtein.findUnique({
      where: { slug: filters.productProteins },
      select: { id: true },
    });
    if (protein) {
      where.AND.push({
        productProteinOnProduct: {
          some: { productProteinId: protein.id },
        },
      });
    }
  }

  if (filters?.price) {
    const [min, max] = filters.price.split("-").map(Number);
    where.AND.push({
      price: {
        gte: min || 0,
        lte: max || Number.MAX_SAFE_INTEGER,
      },
    });
  }

  let orderBy: { [key: string]: "asc" | "desc" } = { createdAt: "desc" };
  switch (filters?.sort) {
    case "lowest":
      orderBy = { price: "asc" };
      break;
    case "highest":
      orderBy = { price: "desc" };
      break;
    case "rating":
      orderBy = { rating: "desc" };
      break;
    case "newest":
    default:
      orderBy = { createdAt: "desc" };
      break;
  }

  const totalCount = await prisma.product.count({ where });

  const products = await prisma.product.findMany({
    where,
    include: {
      contributor: { select: { id: true, name: true, type: true } },
      productCategory: { select: { category: true } },
      productBrand: { select: { id: true, name: true } },
      productUnitFormat: { include: { unitOfMeasure: true, unitValue: true } },
      productPathologyOnProduct: { select: { pathology: true } },
      productsFeatureOnProduct: { select: { productFeature: true } },
      productProteinOnProduct: { select: { productProtein: true } },
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy,
  });

  const normalized = products.map((product) => {
    const transformed = {
      ...product,
      costPrice: Number(product.costPrice),
      price: Number(product.price),
      rating: product.rating ?? 0,
      isFeatured: product.isFeatured ?? false,
      productPathologies: product.productPathologyOnProduct.map(
        (p) => p.pathology
      ),
      productProteins: product.productProteinOnProduct.map(
        (p) => p.productProtein
      ),
      productFeature: product.productsFeatureOnProduct.map(
        (f) => f.productFeature
      ),
      productCategory: product.productCategory.map((c) => c.category),
      productUnitFormat: product.productUnitFormat
        ? {
            id: product.productUnitFormat.id,
            slug: product.productUnitFormat.slug,
            unitValue: {
              id: product.productUnitFormat.unitValue.id,
              value: Number(product.productUnitFormat.unitValue.value),
            },
            unitOfMeasure: {
              id: product.productUnitFormat.unitOfMeasure.id,
              code: product.productUnitFormat.unitOfMeasure.code,
              name: product.productUnitFormat.unitOfMeasure.name,
            },
          }
        : null,
      productBrand: product.productBrand || null,
      createdAt: formatDateTime(product.createdAt.toISOString()).dateTime,
      updatedAt: formatDateTime(product.updatedAt.toISOString()).dateTime,
    };

    const parsed = productSchema.safeParse(transformed);
    if (!parsed.success) {
      console.error(
        "❌ Errore di validazione prodotto:",
        parsed.error.format()
      );
      throw new Error("Errore nella validazione di un prodotto");
    }

    return parsed.data;
  });

  return {
    data: convertToPlainObject(normalized),
    totalPages: Math.ceil(totalCount / limit),
    totalProducts: totalCount,
  };
}
