"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/core/prisma/prisma";
import { insertProductSchema } from "@/core/validators";
import { updateProductSchema } from "@/core/validators/product.validator";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "@/lib/constants";
import { convertToPlainObject, formatError } from "@/lib/utils";
import { getAllCategories } from "../admin/admin.actions";

// Get latest products
export async function getLatestProducts({
  limit = LATEST_PRODUCTS_LIMIT,
}: {
  limit?: number;
}) {
  const products = await prisma.product.findMany({
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const productsData = products.map((product) => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
  }));
  /* prisma.$disconnect(); */
  return convertToPlainObject(productsData);
}

// Get product by slug
export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
  });
  /* prisma.$disconnect(); */
  return convertToPlainObject(product);
}

// Get product by id with sales data
export async function getProductById(id: string) {
  const product = await prisma.product.findFirst({
    where: { id },
    include: {
      orderitems: true, // Include tutti gli ordini di questo prodotto
    },
  });

  if (!product) return null;

  // Calcola il totale delle unità vendute e il guadagno totale
  const totalSales = product.orderitems.reduce(
    (acc, item) => acc + item.qty,
    0
  );
  const totalRevenue = product.orderitems.reduce(
    (acc, item) => acc + item.qty * Number(item.price),
    0
  );

  return convertToPlainObject({
    ...product,
    totalSales,
    totalRevenue,
  });
}

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
          categoryId: {
            in: categories?.data
              ?.filter((cat) => cat.slug === category)
              .map((cat) => cat.id),
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

  const updatedData = data.map((item) => {
    return {
      ...item,
      category: item.categoryId
        ? (categoryMap?.[item.categoryId][1] ?? "N/A")
        : "N/A",
    };
  });

  return {
    data: updatedData,
    totalPages: Math.ceil(productCount / limit),
    totalProducts: productCount,
  };
  /* prisma.$disconnect(); */
}

// Delete product
export async function deleteProduct(id: string) {
  try {
    const productExist = await prisma.product.findFirst({
      where: { id },
    });

    if (!productExist) {
      return { success: false, error: "Product not found" };
    }

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");

    return { success: true, error: "Product deleted successfully" };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

// Create product
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data);

    await prisma.product.create({
      data: product,
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product created successfully" };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

// Update product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);

    const productExist = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExist) {
      return { success: false, error: "Product not found" };
    }

    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product created successfully" };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

// Get product All Categories
/* export async function getProductCategories() {
  const data = await prisma.product.groupBy({
    by: ["categoryId"],
    _count: true,
  });

  return data;
} */

export async function getProductCategories() {
  const data = await prisma.product.groupBy({
    by: ["categoryId"],
    _count: true,
  });

  const categories = await getAllCategories();
  const categoryMap = categories?.data?.reduce(
    (acc, cat) => {
      acc[cat.id] = { id: cat.id, name: cat.name, slug: cat.slug };
      return acc;
    },
    {} as Record<string, { id: string; name: string; slug: string }>
  );

  const result = data.map((item) => ({
    ...item,
    category: categoryMap?.[item.categoryId!] ?? {
      id: "N/A",
      name: "N/A",
      slug: "N/A",
    },
  }));

  return result;
}

// Get featured products
export async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return convertToPlainObject(products);
}
