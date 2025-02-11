import { prisma } from "@/core/prisma/prisma";
import { insertProductSchema } from "@/core/validators";
import { revalidatePath } from "next/cache";

// Create product
export async function createProduct(data: unknown) {
  try {
    const product = insertProductSchema.safeParse(data);

    if (!product.success) {
      return {
        success: false,
        error: "Validation failed",
        details: product.error.flatten().fieldErrors, // Mostra i campi mancanti
      };
    }

    const rest = product.data;

    await prisma.product.create({
      data: {
        price: rest.price,
        name: rest.name,
        slug: rest.slug,
        images: rest.images,
        description: rest.description,
        stock: rest.stock ?? undefined,
        isFeatured: rest.isFeatured,
        banner: rest.banner,
        categoryId: rest.categoryId,
        productBrandId: rest.productBrandId,
        productPatologyId: rest.productPatologyId,
        productProteins: {
          create: rest.productProteins?.map((proteinId) => ({
            productProtein: { connect: { id: proteinId } },
          })),
        },
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
