import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: { slug },
    include: {
      productCategory: {
        include: { category: true },
      },
      productUnitFormat: {
        include: {
          unitValue: true,
          unitOfMeasure: true,
        },
      },
      productBrand: true,
      productPathologyOnProduct: {
        include: { pathology: true },
      },
      productsFeatureOnProduct: {
        include: { productFeature: true },
      },

      productProteinOnProduct: {
        include: { productProtein: true },
      },
    },
  });

  if (!product) return null;

  return convertToPlainObject({
    ...product,
    productCategory:
      product.productCategory?.map((cat) => ({
        id: cat.category.id,
        name: cat.category.name,
        slug: cat.category.slug,
      })) ?? [],
    productUnitFormat: product.productUnitFormat
      ? {
          unitValue: product.productUnitFormat.unitValue.value,
          unitOfMeasure: product.productUnitFormat.unitOfMeasure.code,
        }
      : null,
    productBrand: product.productBrand
      ? {
          id: product.productBrand.id,
          name: product.productBrand.name,
        }
      : null,
    productPathologies: product.productPathologyOnProduct.map((p) => ({
      id: p.pathology.id,
      name: p.pathology.name,
    })),
    productFeatures: product.productsFeatureOnProduct.map((f) => ({
      id: f.productFeature.id,
      name: f.productFeature.name,
    })),
    productProteins: product.productProteinOnProduct.map((p) => ({
      id: p.productProtein.id,
      name: p.productProtein.name,
    })),
  });
}
