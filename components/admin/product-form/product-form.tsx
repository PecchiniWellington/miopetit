"use client";

import { useToast } from "@/hooks/use-toast";
import { PRODUCT_DEFAULT_VALUES } from "@/lib/constants";
import { insertProductSchema } from "@/lib/validators";
import { updateProductSchema } from "@/lib/validators/product.validator";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../ui/form";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import UploadImage from "./upload-image";
import UploadImageFeaturedProduct from "./upload-image-featured-product";
import DynamicFormField from "@/components/shared/dynamic-form-field";
import SlugFormField from "./slug-form-field";
import DynamicButton from "@/components/dynamic-button";

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<
    z.infer<typeof insertProductSchema | typeof updateProductSchema>
  >({
    resolver:
      type === "Update"
        ? zodResolver(updateProductSchema)
        : zodResolver(insertProductSchema),
    defaultValues:
      product && type === "Update" ? product : PRODUCT_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
    data
  ) => {
    const handleResponse = (res: any, successMessage: string) => {
      if (!res.success) {
        toast({
          className: "bg-red-100 text-red-700 px-5 py-2",
          title: "Error",
          description: res.error || res.message,
        });
      } else {
        toast({
          className: "bg-green-100 text-green-700 px-5 py-2",
          title: successMessage,
          description: `Product ${data.name} has been ${successMessage.toLowerCase()} successfully`,
        });
        router.push("/admin/products");
      }
    };

    if (type === "Create") {
      const res = await createProduct(data);
      handleResponse(res, "Product created");
    }

    if (type === "Update") {
      if (!productId) {
        router.push("/admin/products");
        return;
      }
      const res = await updateProduct({ ...data, id: productId });
      handleResponse(res, "Product updated");
    }
  };

  const images = form.watch("images");
  const isFeatured = form.watch("isFeatured");
  const banner = form.watch("banner");

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col  md:flex-row gap-5">
          {/* Name */}
          <DynamicFormField
            control={form.control}
            name="name"
            schema={insertProductSchema}
            title="Name"
            placeholder="Enter name"
          />
          {/* Slug */}
          <SlugFormField
            form={form}
            control={form.control}
            name="slug"
            schema={insertProductSchema}
            title="Slug"
            placeholder="Enter slug"
          />
        </div>
        <div className="flex flex-col  md:flex-row gap-5">
          {/* Category */}
          <DynamicFormField
            control={form.control}
            name="category"
            schema={insertProductSchema}
            title="Category"
            placeholder="Enter category"
          />
          {/* Brand */}
          <DynamicFormField
            control={form.control}
            name="brand"
            schema={insertProductSchema}
            title="Brand"
            placeholder="Enter brand"
          />
        </div>
        <div className="flex flex-col  md:flex-row gap-5">
          {/* Price */}
          <DynamicFormField
            control={form.control}
            name="price"
            schema={insertProductSchema}
            title="Price"
            placeholder="Enter price"
          />
          {/* Stock */}
          <DynamicFormField
            control={form.control}
            name="stock"
            schema={insertProductSchema}
            title="Stock"
            placeholder="Enter stock"
          />
        </div>
        <div className="upload-field flex flex-col  md:flex-row gap-5">
          {/* Images */}
          <UploadImage form={form} images={images} />
        </div>
        <div className="upload-field">
          {/* isFeatured */}
          Featured Product
          <UploadImageFeaturedProduct
            isFeatured={isFeatured}
            banner={banner}
            form={form}
          />
        </div>
        <div>
          {/* Description */}
          <DynamicFormField
            control={form.control}
            name="description"
            schema={insertProductSchema}
            title="Description"
            placeholder="Enter description"
            type="textarea"
          />
        </div>

        <div>
          {/* Submit */}
          <DynamicButton isPending={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : `${type} Product`}
          </DynamicButton>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
