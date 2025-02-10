import { prisma } from "@/core/prisma/prisma";
import { updateProductSchema } from "@/core/validators";
import { formatError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);
    console.log("product", product);

    const productExist = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExist) {
      return { success: false, error: "Product not found" };
    }

    await prisma.product.update({
      where: { id: product.id },
      data: {
        price: product.price,
        name: product.name,
        slug: product.slug,
        images: product.images,
        description: product.description,
        stock: product.stock ?? undefined,
        isFeatured: product.isFeatured,
        banner: product.banner,
        categoryId: product.categoryId,
        productBrandId: product.productBrandId,
      },
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product created successfully" };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}
