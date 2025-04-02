"use server";
import { prisma } from "@/core/prisma/prisma";
import { IProduct, productSchema } from "@/core/validators";
import { convertToPlainObject, formatDateTime } from "@/lib/utils";
import { z } from "zod";

export async function getAllProductsByBrandSlug({
  brandSlug,
  skip = 0,
  take = 20,
}: {
  brandSlug: string;
  skip?: number;
  take?: number;
}): Promise<{
  brand: { id: string; name: string; image?: string };
  products: IProduct[];
}> {
  // Trova il brand tramite slug
  const brand = await prisma.productBrand.findFirst({
    where: { slug: brandSlug },
    select: { id: true, name: true, image: true },
  });

  if (!brand) {
    console.warn(`⚠️ Nessun brand trovato per slug: ${brandSlug}`);
    return {
      brand: { id: "", name: "Unknown", image: undefined },
      products: [],
    };
  }

  const data = await prisma.product.findMany({
    where: {
      productBrandId: brand.id,
    },
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
    orderBy: { createdAt: "desc" },
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
      "❌ Errore validazione prodotti brand:",
      result.error.format()
    );
    throw new Error("Errore di validazione dei prodotti del brand");
  }

  return convertToPlainObject({
    brand: { ...brand, image: brand.image ?? undefined },
    products: result.data,
  });
}
