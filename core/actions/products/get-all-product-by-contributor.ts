import { prisma } from "@/core/prisma/prisma";
import { productSchema } from "@/core/validators";
import { convertToPlainObject, formatDateTime } from "@/lib/utils";
import { z } from "zod";
import { IQueryParams } from "./get-all-product-by-slug";

export async function getProductsByContributor({
  contributorId,
  query,
}: {
  contributorId: string;
  query: IQueryParams;
}) {
  if (!contributorId) {
    throw new Error("Affiliate ID is required");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    contributorId,
  };

  if (query.animalAge) {
    where.animalAge = query.animalAge;
  }

  if (query.productBrand) {
    const productBrand = await prisma.productBrand.findFirst({
      where: { slug: query.productBrand },
      select: { id: true },
    });
    if (productBrand) {
      where.productBrandId = productBrand.id;
    }
  }

  if (query.productFormats) {
    const productFormat = await prisma.productUnitFormat.findFirst({
      where: { slug: query.productFormats },
      select: { id: true },
    });
    if (productFormat) {
      where.productUnitFormatId = productFormat.id;
    }
  }

  if (query.productPathologies) {
    const pathology = await prisma.productPathology.findUnique({
      where: { slug: query.productPathologies },
      select: { id: true },
    });
    if (pathology) {
      where.productPathologyOnProduct = {
        some: {
          pathologyId: pathology.id,
        },
      };
    }
  }

  if (query.productProteins) {
    const protein = await prisma.productProtein.findUnique({
      where: { slug: query.productProteins },
      select: { id: true },
    });
    if (protein) {
      where.productProteinOnProduct = {
        some: {
          productProteinId: protein.id,
        },
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

  let orderBy: { [key: string]: "asc" | "desc" } = { createdAt: "desc" };
  switch (query.sort) {
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

  const data = await prisma.product.findMany({
    where,
    orderBy,
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

  // trasformazione finale
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
