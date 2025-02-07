import { prisma } from "@/core/prisma/prisma";
import { formatError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

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
