"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { insertProductSchema } from "../validators";
import { updateProductSchema } from "../validators/product.validator";

// Get latest products
export async function getLatestProducts() {
  const products = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
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

// Get product by id
export async function getProductById(id: string) {
  const product = await prisma.product.findFirst({
    where: {
      id,
    },
  });
  /* prisma.$disconnect(); */
  return convertToPlainObject(product);
}

// Get All products
export async function getAllProducts({
  query,
  page,
  category,
  limit = PAGE_SIZE,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
}) {
  const data = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  const productCount = await prisma.product.count();

  return { data, totalPages: Math.ceil(productCount / limit) };
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
