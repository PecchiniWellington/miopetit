import { prisma } from "@/core/prisma/prisma";
import { IFormattedProduct } from "@/core/validators/product.validator";
import { convertToPlainObject } from "@/lib/utils";

export async function getProductById(
  id: string
): Promise<IFormattedProduct | null> {
  const product = await prisma.product.findFirst({
    where: { id },
    include: {
      orderitems: true,
      productCategory: {
        include: { category: true },
      },
      productBrand: true,
      productPathologyOnProduct: {
        include: { pathology: true },
      },
      productsFeatureOnProduct: {
        include: { productFeature: true },
      },
      productUnitFormat: {
        include: {
          unitOfMeasure: true,
          unitValue: true,
        },
      },
      productProteinOnProduct: {
        include: { productProtein: true },
      },
    },
  });

  if (!product) return null;

  return convertToPlainObject({
    ...product,
    totalSales: product.orderitems.reduce((acc, item) => acc + item.qty, 0),
    totalRevenue: product.orderitems.reduce(
      (acc, item) => acc + item.qty * Number(item.price),
      0
    ),
    productCategory: product.productCategory.map((f) => ({
      category: {
        id: f.category.id,
        name: f.category.name,
        slug: f.category.slug,
        parentId: f.category.parentId ?? null,
      },
      productId: f.productId,
      categoryId: f.categoryId,
    })),
    productBrand: product.productBrand
      ? {
          id: product.productBrand.id,
          name: product.productBrand.name,
        }
      : undefined,
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
    productUnitFormat: product.productUnitFormat
      ? {
          id: product.productUnitFormat.id,
          slug: product.productUnitFormat.slug,
          unitValueId: product.productUnitFormat.unitValueId,
          unitMeasureId: product.productUnitFormat.unitMeasureId,
          unitValue: {
            value: product.productUnitFormat.unitValue.value,
            id: product.productUnitFormat.unitValue.id,
          },
          unitOfMeasure: {
            name: product.productUnitFormat.unitOfMeasure.name,
            code: product.productUnitFormat.unitOfMeasure.code,
            id: product.productUnitFormat.unitOfMeasure.id,
          },
        }
      : undefined,
  });
}
