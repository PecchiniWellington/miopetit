import { prisma } from "@/core/prisma/prisma";
import { productSchema } from "@/core/validators";
import { convertToPlainObject, formatDateTime } from "@/lib/utils";

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: { slug },
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
        select: {
          id: true,
          slug: true,
          unitValue: { select: { value: true } },
          unitOfMeasure: { select: { code: true } },
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

  if (!product) return null;

  const transformedData = {
    ...product,
    productPathologies: product.productPathologyOnProduct.map((p) => ({
      id: p.pathology.id,
      name: p.pathology.name,
    })),
    productProteins: product.productProteinOnProduct.map((p) => ({
      id: p.productProtein.id,
      name: p.productProtein.name,
    })),
    productCategories:
      product.productCategory?.map((cat) => ({
        id: cat.category.id,
        name: cat.category.name,
        slug: cat.category.slug,
      })) ?? [],
    productUnitFormat: product.productUnitFormat
      ? {
          id: product.productUnitFormat.id,
          unitValue: product.productUnitFormat.unitValue.value,
          unitOfMeasure: product.productUnitFormat.unitOfMeasure.code,
          slug: product.productUnitFormat.slug,
        }
      : null,
    productFeature: product.productsFeatureOnProduct.map((f) => ({
      id: f.productFeature.id,
      name: f.productFeature.name,
    })),
    productBrand: product.productBrand
      ? {
          id: product.productBrand.id,
          name: product.productBrand.name,
        }
      : null,
    createdAt: formatDateTime(product.createdAt.toString()).dateTime,
    updatedAt: formatDateTime(product.updatedAt.toString()).dateTime,
  };

  const result = productSchema.safeParse(transformedData);

  if (!result.success) {
    console.error(
      "❌ Errore nella validazione dei prodotti:",
      JSON.stringify(result.error.format(), null, 2)
    );

    throw new Error("Errore di validazione dei prodotti");
  }

  return convertToPlainObject(result.data);
}
