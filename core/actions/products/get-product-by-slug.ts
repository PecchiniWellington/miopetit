import { prisma } from "@/core/prisma/prisma";
import { IOrderItem, productSchema } from "@/core/validators";
import { convertToPlainObject, formatDateTime } from "@/lib/utils";

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: { slug },
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
    productCategory:
      product.productCategory?.map((cat) => ({
        id: cat.category.id,
        name: cat.category.name,
        slug: cat.category.slug,
      })) ?? [],
    productUnitFormat: product.productUnitFormat
      ? {
          id: product.productUnitFormat.id,
          slug: product.productUnitFormat.slug,
          unitValue: {
            id: product.productUnitFormat.unitValue.id,
            value: product.productUnitFormat.unitValue.value,
          },
          unitOfMeasure: {
            id: product.productUnitFormat.unitOfMeasure.id,
            code: product.productUnitFormat.unitOfMeasure.code,
            name: product.productUnitFormat.unitOfMeasure.name,
          },
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

  const totalSales = product.orderitems.reduce(
    (acc: number, item: IOrderItem) => acc + item.qty,
    0
  );
  const totalRevenue = product.orderitems.reduce(
    (acc: number, item: IOrderItem) => acc + item.qty * Number(item.price),
    0
  );
  console.log(
    "🚀 ~ file: get-product-by-id.actions.ts ~ line 68 ~ getProductById ~ transformedData",
    transformedData
  );

  const result = productSchema.safeParse(transformedData);

  if (!result.success) {
    console.error(
      "❌ Errore nella validazione dei prodotti:",
      result.error.format()
    );
    throw new Error("Errore di validazione dei prodotti");
  }

  return convertToPlainObject({ ...result.data, totalSales, totalRevenue });
}
