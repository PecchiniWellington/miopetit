import { prisma } from "@/core/prisma/prisma";
import { PAGE_SIZE } from "@/lib/constants";

import { convertToPlainObject } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { getAllBrands } from "./product-infos.ts";
import { getAllCategories } from "./product-infos.ts/get-product-category.action";

// Get All products
export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  price,
  rating,
  sort,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
  price?: string;
  rating?: string;
  sort?: string;
}) {
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  const categories = await getAllCategories();

  const categoryFilter: Prisma.ProductWhereInput =
    category && category !== "all"
      ? {
          productCategory: {
            some: {
              category: {
                id: {
                  in: categories?.data
                    ?.filter((cat) => cat.slug === category)
                    .map((cat) => cat.id),
                },
              },
            },
          },
        }
      : {};

  const priceFilter: Prisma.ProductWhereInput =
    price && price !== "all"
      ? {
          price: {
            gte: parseInt(price.split("-")[0]),
            lte: parseInt(price.split("-")[1]),
          },
        }
      : {};
  const ratingFilter: Prisma.ProductWhereInput =
    rating && rating !== "all"
      ? {
          rating: {
            gte: parseInt(rating.split("-")[0]),
          },
        }
      : {};

  const data = await prisma.product.findMany({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    },
    include: {
      productCategory: {
        include: {
          category: true, // ✅ Include gli oggetti completi delle categorie
        },
      },
      productUnitFormat: true,
    },

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

  const productCount = await prisma.product.count();

  const categoryMap = categories?.data?.reduce(
    (acc, cat) => {
      acc[cat.id] = [cat.name, cat.slug];
      return acc;
    },
    {} as Record<string, [string, string]>
  );

  // Fetch all brands
  const brands = await getAllBrands();
  const brandMap = brands?.reduce(
    (acc, brand) => {
      acc[brand.id] = [brand.name, brand.id];
      return acc;
    },
    {} as Record<string, [string, string]>
  );

  const updatedData = data.map((item) => {
    return {
      ...item,
      category: item.productCategory?.length
        ? item.productCategory
            .map((pc) => categoryMap?.[pc.categoryId][0] ?? "N/A")
            .join(", ")
        : "N/A",
      productBrand: item.productBrandId
        ? (brandMap?.[item.productBrandId][0] ?? null)
        : null,
    };
  });
  return {
    data: convertToPlainObject(updatedData),
    totalPages: Math.ceil(productCount / limit),
    totalProducts: productCount,
  };
  /* prisma.$disconnect(); */
}
