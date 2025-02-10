import { prisma } from "@/core/prisma/prisma";
import { insertProductSchema } from "@/core/validators";
import { revalidatePath } from "next/cache";

// Create product
export async function createProduct(data: unknown) {
  try {
    // ✅ Validazione con Zod, catturando gli errori
    const product = insertProductSchema.safeParse(data);

    console.log("product", product);

    if (!product.success) {
      return {
        success: false,
        error: "Validation failed",
        details: product.error.flatten().fieldErrors, // Mostra i campi mancanti
      };
    }

    const { productBrand, stock, ...rest } = product.data;

    await prisma.product.create({
      data: {
        ...rest,
        stock: stock ?? undefined,
        productBrandId: productBrand ? product.data.productBrandId : undefined,
      },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product created successfully",
      data: product.data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
