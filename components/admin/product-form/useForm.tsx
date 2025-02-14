import { createProduct, updateProduct } from "@/core/actions/products";
import {
  insertProductSchema,
  IProduct,
  updateProductSchema,
} from "@/core/validators";
import { useToast } from "@/hooks/use-toast";
import { PRODUCT_DEFAULT_VALUES } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useProductForm({
  type,
  product,
  productId,
}: {
  type: "Create" | "Update";
  product?: IProduct;
  productId?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const schema = type === "Update" ? updateProductSchema : insertProductSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues:
      product && type === "Update"
        ? {
            ...product,

            productProteinOnProduct:
              product?.productProteinOnProduct?.map(
                (protein) => protein.productProteinId
              ) || [],
            productPathologyOnProduct:
              product?.productPathologyOnProduct?.map(
                (protein) => protein.pathologyId
              ) || [],
            productsFeatureOnProduct:
              product?.productsFeatureOnProduct?.map(
                (feature) => feature.productFeatureId
              ) || [],

            isFeatured: product.isFeatured ?? undefined,
            unitValueId: product.productUnitFormat?.unitValueId || undefined,
            unitOfMeasureId:
              product.productUnitFormat?.unitMeasureId || undefined,
          }
        : PRODUCT_DEFAULT_VALUES,
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      console.log("🔴 Validation Errors:", parsed.error.format());
      return;
    }

    const res =
      type === "Create"
        ? await createProduct(data)
        : await updateProduct({
            ...data,
            id: productId as string,
            productsFeatureOnProduct: data.productsFeatureOnProduct ?? [],
          });

    if (!res.success) {
      toast({
        className: "bg-red-100 text-red-700 px-5 py-2",
        title: "Error",
        description: res.message,
      });
    } else {
      toast({
        className: "bg-green-100 text-green-700 px-5 py-2",
        title: "Success",
        description: `Product ${data.name} updated successfully`,
      });
      router.push("/admin/products");
    }
  };

  return { form, onSubmit };
}
