"use server";
import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { productSchema } from "@/core/validators/product.validator";
import { PAGE_SIZE } from "@/lib/constants";
import ROLES from "@/lib/constants/roles";
import { convertToPlainObject, formatDateTime } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { getAllBrands } from "./product-infos.ts";
import { getAllCategories } from "./product-infos.ts/get-product-category.action";

export async function getAllProducts({
  queries = {},
  query,
  limit = PAGE_SIZE,
  page,
  sort,
}: {
  queries?: { [key: string]: string };
  query?: string;
  limit?: number;
  page: number;
  sort?: string;
}) {
  const session = await auth();

  const contributor = await prisma.contributor.findFirst({
    where: {
      users: {
        some: {
          id: session?.user.id,
        },
      },
    },
  });

  console.log(
    "🚀 ~ file: get-all-products.actions.ts ~ line 38 ~ contributor",
    { currentId: contributor?.id, session }
  );
  const queryFilter: Prisma.ProductWhereInput = query
    ? {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const categories = await getAllCategories();
  const brands = await getAllBrands();

  const categoryMap = Object.fromEntries(
    categories?.data?.map((cat) => [cat.slug, cat.id]) || []
  );
  const brandMap = Object.fromEntries(
    brands?.map((brand) => [brand.name, brand.id]) || []
  );

  const validFields = new Set([
    "name",
    "slug",
    "price",
    "rating",
    "stock",
    "animalAge",
    "productBrandId",
    "productPathologyId",
    "productUnitFormatId",
  ]);

  const dynamicFilters: Prisma.ProductWhereInput = {};

  for (const [key, value] of Object.entries(queries)) {
    if (!value || value === "all") continue;

    if (key === "price" && value.includes("-")) {
      const [min, max] = value.split("-").map(Number);
      dynamicFilters.price = {
        gte: min || 0,
        lte: max || Infinity,
      };
    } else if (key === "rating") {
      dynamicFilters.rating = {
        gte: parseInt(value),
      };
    } else if (key === "category" && categoryMap[value]) {
      dynamicFilters.productCategory = {
        some: {
          category: {
            id: categoryMap[value],
          },
        },
      };
    } else if (key === "brand" && brandMap[value]) {
      dynamicFilters.productBrandId = brandMap[value];
    } else if (validFields.has(key)) {
      (dynamicFilters as Record<string, string | number | Prisma.StringFilter>)[
        key
      ] = value;
    }
  }

  const select = {
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
    costPrice: true,
    shortDescription: true,

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
        unitValue: true,
        unitOfMeasure: true,
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
  };
  console.log("CONTRIBUTOR", contributor);

  if (!contributor?.id) {
    return []; // oppure throw o un messaggio vuoto
  }

  const data = await prisma.product.findMany({
    where: {
      ...queryFilter,
      ...dynamicFilters,
      contributorId: contributor.id,
    },
    select,
    orderBy:
      sort === "lowest"
        ? { price: "asc" }
        : sort === "highest"
          ? { price: "desc" }
          : sort === "rating"
            ? { rating: "desc" }
            : { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  console.log("🚀 ~ file: get-all-products.actions.ts ~ line 153 ~ data", data);

  const productCount = await prisma.product.count({
    where: {
      ...queryFilter,
      ...dynamicFilters,
      ...(session?.user.role === ROLES.RETAILER &&
        contributor?.id && {
          contributorId: contributor?.id,
        }),
    },
  });

  const transformedData = data.map(
    ({
      productPathologyOnProduct,
      productProteinOnProduct,
      productCategory,
      productsFeatureOnProduct,
      ...rest
    }) => ({
      ...rest,
      rating: Number(rest.rating ?? 0),
      price: Number(rest.price),
      costPrice: Number(rest.costPrice),
      productPathologies: productPathologyOnProduct.map((p) => p.pathology),
      productProteins: productProteinOnProduct.map((p) => p.productProtein),
      productCategory: productCategory.map((c) => c.category),
      productUnitFormat: rest.productUnitFormat
        ? {
            id: rest.productUnitFormat.id,
            unitValue: rest.productUnitFormat.unitValue,
            unitOfMeasure: rest.productUnitFormat.unitOfMeasure,
            slug: rest.productUnitFormat.slug,
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

  return {
    data: convertToPlainObject(result.data),
    totalPages: Math.ceil(productCount / limit),
    totalProducts: productCount,
  };
}
