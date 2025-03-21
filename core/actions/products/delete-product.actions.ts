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

    // STEP 1: Elimina relazioni many-to-many
    await prisma.productCategory.deleteMany({
      where: { productId: id },
    });

    await prisma.productPathologyOnProduct.deleteMany({
      where: { productId: id },
    });

    await prisma.productProteinOnProduct.deleteMany({
      where: { productId: id },
    });

    await prisma.productFeatureOnProduct.deleteMany({
      where: { productId: id },
    });

    // STEP 2: Elimina il prodotto
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}
