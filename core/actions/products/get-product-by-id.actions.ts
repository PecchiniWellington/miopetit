import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";

// Get product by id with sales data
export async function getProductById(id: string) {
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

  const formattedProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    stock: product.stock,
    price: product.price,
    rating: product.rating,
    numReviews: product.numReviews,
    isFeatured: product.isFeatured,
    banner: product.banner,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    animalAge: product.animalAge,
    totalSales: product.orderitems.reduce((acc, item) => acc + item.qty, 0),
    totalRevenue: product.orderitems.reduce(
      (acc, item) => acc + item.qty * Number(item.price),
      0
    ),

    productCategory: product.productCategory.map((f) => ({
      id: f.category.id,
      name: f.category.name,
      slug: f.category.slug,
      parentId: f.category.parentId,
    })),

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

    productUnitFormat: product.productUnitFormat
      ? {
          id: product.productUnitFormat.id,
          unitValue: product.productUnitFormat.unitValue.value,
          unitOfMeasure: product.productUnitFormat.unitOfMeasure.code,
        }
      : null,
  };

  return convertToPlainObject(formattedProduct);
}
