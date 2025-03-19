import { createProduct, updateProduct } from "@/core/actions/products";
import { IProduct, productSchema } from "@/core/validators";
import { useToast } from "@/hooks/use-toast";
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
  product?: IProduct & { id: string };
  productId?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues:
      type === "Create"
        ? { id: "" }
        : product
          ? {
              ...product,
              id: product.id ?? "",
              productCategory:
                product.productCategory?.map((cat) => cat.id) || [],
              productPathologies:
                product.productPathologies?.map((p) => p.id) || [],
              productProteins: product.productProteins?.map((p) => p.id) || [],
              productFeature: product.productFeature?.map((f) => f.id) || [],
              productBrand: product.productBrand?.id || "",
              productUnitFormat: product.productUnitFormat
                ? {
                    unitValue: product.productUnitFormat.unitValue.id,
                    unitOfMeasure: product.productUnitFormat.unitOfMeasure.id,
                    id: product.productUnitFormat.id,
                    slug: product.productUnitFormat.slug,
                  }
                : {
                    unitValue: "",
                    unitOfMeasure: "",
                    id: "",
                    slug: "",
                  },
              images: product.images || [],
              banner: product.banner || "",
              isFeatured: product.isFeatured || false,
              animalAge: product.animalAge || "",
              stock: product.stock || 0,
            }
          : { id: "" },
  });

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    const parsed = productSchema.safeParse(data);
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
          });

    if (!res.success) {
      toast({
        className: "bg-red-100 text-red-700 px-5 py-2",
        title: "Error",
        description: res.error,
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
