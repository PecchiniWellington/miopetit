import { createProduct, updateProduct } from "@/core/actions/products";
import {
  IProduct,
  createProductSchema,
  productSchema,
} from "@/core/validators";
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
  product?: IProduct;
  productId?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  console.log("🔵 Product:", product);
  const schema = type === "Create" ? createProductSchema : productSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues:
      type === "Create"
        ? {}
        : {
            ...product,
            productBrand: product?.productBrand || null,
            productPathologies: product?.productPathologies || [],
            productProteins: product?.productProteins || [],
            productFeature: product?.productFeature || [],
            productCategory: product?.productCategory || [],
            productUnitFormat: product?.productUnitFormat
              ? {
                  id: product.productUnitFormat.id,
                  slug: product.productUnitFormat.slug,
                  unitValue: {
                    id: product.productUnitFormat.unitValue.id,
                    value: product.productUnitFormat.unitValue.value,
                  },
                  unitOfMeasure: {
                    id: product.productUnitFormat.unitOfMeasure.id,
                    code: product.productUnitFormat.unitOfMeasure.code,
                    name: product.productUnitFormat.unitOfMeasure.name,
                  },
                }
              : null,
          },
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

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // Normalize before validation

    const parsed = schema.safeParse({
      ...data,
      percentageDiscount: Number(data.percentageDiscount),
      stock: Number(data.stock),
    });

    if (!parsed.success) {
      console.log("🔴 Validation Errors:", parsed.error.format());
      return;
    }

    if (data.isFeatured && data.banner?.startsWith("blob:")) {
      data.banner = await uploadToBlob(data.banner);
    }

    data.images = await Promise.all(
      data.images.map(async (img: string) =>
        img.startsWith("blob:") ? await uploadToBlob(img) : img
      )
    );

    const res =
      type === "Create"
        ? await createProduct(data as z.infer<typeof createProductSchema>)
        : await updateProduct({
            ...(data as z.infer<typeof productSchema>),
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
        description: `Product ${data.name} ${type === "Create" ? "created" : "updated"} successfully`,
      });
      router.push("/admin/products");
    }
  };

  return { form, onSubmit };
}
