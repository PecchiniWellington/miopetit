import { prisma } from "@/core/prisma/prisma";
import { insertProductSchema } from "@/core/validators";
import { formatValidationError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Create product
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data);

    await prisma.product.create({
      data: product,
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product created successfully",
      data: product,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? formatValidationError(error.message)
          : "An unknown error occurred",
    };
  }
}
