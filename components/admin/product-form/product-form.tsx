"use client";

import DynamicFormField from "@/components/shared/dynamic-form-field";
import SearchSelect from "@/components/shared/search-select";
import { Button } from "@/components/ui/button";
import { createProduct, updateProduct } from "@/core/actions/products";
import {
  ICategory,
  ILatestProduct,
  insertProductSchema,
  IUpdateProduct,
  updateProductSchema,
} from "@/core/validators";
import { useToast } from "@/hooks/use-toast";
import { PRODUCT_DEFAULT_VALUES } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from "../../ui/form";
import SlugFormField from "./slug-form-field";
import UploadImage from "./upload-image";
import UploadImageFeaturedProduct from "./upload-image-featured-product";

const ProductForm = ({
  type,
  product,
  productId,
  categories,
}: {
  type: "Create" | "Update";
  product?: ILatestProduct | IUpdateProduct;
  productId?: string;
  categories?: ICategory[];
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
      product && type === "Update"
        ? {
            ...product,
            productBrand: {
              name: product.productBrand?.name || undefined,
              id: product.productBrand?.id || undefined,
            },
          }
        : PRODUCT_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
    data
  ) => {
    const handleResponse = (
      res: { success: boolean; error?: string; message?: string },
      successMessage: string
    ) => {
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
  const isFeatured: boolean | null = form.watch("isFeatured");
  const banner = form.watch("banner");

  const formatCategoriesDataForSelect = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col  gap-5 md:flex-row">
          {/* Name */}
          <DynamicFormField
            control={form.control}
            name="name"
            schema={insertProductSchema}
            title="Name"
            placeholder="Enter name"
          />
          {/* Slug */}
          <SlugFormField form={form} />
        </div>
        <div className="flex flex-col  gap-5 md:flex-row">
          {/* Category */}

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>

                <SearchSelect
                  options={formatCategoriesDataForSelect!}
                  onSelect={(value) => {
                    field.onChange(value);
                  }}
                  placeholder="Choose an animal"
                />
              </FormItem>
            )}
          />
          {/* Brand */}
          {/* <DynamicFormField
            control={form.control}
            name="brand"
            schema={insertProductSchema}
            title="Brand"
            placeholder="Enter brand"
          /> */}
        </div>
        <div className="flex flex-col  gap-5 md:flex-row">
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
        <div className="upload-field flex flex-col  gap-5 md:flex-row">
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
          <Button disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : `${type} Product`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
