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
              productBrand: product.productBrand || null,
              productPathologies: product.productPathologies || [],
              productProteins: product.productProteins || [],
              productFeature: product.productFeature || [],
              productCategory: product.productCategory || [],
            }
          : { id: "" },
  });

  const uploadToBlob = async (fileUrl: string): Promise<string> => {
    const file = await fetch(fileUrl).then((r) => r.blob());
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload/images", {
      method: "POST",
      body: formData,
    });
    const json = await res.json();
    return json.url;
  };

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    const parsed = productSchema.safeParse(data);
    if (!parsed.success) {
      console.log("🔴 Validation Errors:", parsed.error.format());
      return;
    }

    console.log("✅ Dati Ricevuti:", data);

    if (data.isFeatured && data.banner?.startsWith("blob:")) {
      data.banner = await uploadToBlob(data.banner);
    }

    data.images = await Promise.all(
      data.images.map(async (img) =>
        img.startsWith("blob:") ? await uploadToBlob(img) : img
      )
    );

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
