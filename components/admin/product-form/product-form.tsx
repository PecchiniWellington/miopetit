"use client";

import DynamicFormField from "@/components/shared/dynamic-form-field";
import { Button } from "@/components/ui/button";
import { createProduct, updateProduct } from "@/core/actions/products";
import {
  ICategory,
  insertProductSchema,
  IProduct,
  updateProductSchema,
} from "@/core/validators";
import { useToast } from "@/hooks/use-toast";
import { PRODUCT_DEFAULT_VALUES } from "@/lib/constants";
import { IBrand, IPathology, IProtein } from "@/types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../ui/form";
import SlugFormField from "./slug-form-field";
import UploadImage from "./upload-image";
import UploadImageFeaturedProduct from "./upload-image-featured-product";

const ProductForm = ({
  type,
  product,
  productId,
  categories,
  brands,
  patologies,
  proteins,
}: {
  type: "Create" | "Update";
  product?: IProduct;
  productId?: string;
  categories?: ICategory[];
  brands?: IBrand[];
  patologies?: IPathology[];
  proteins?: IProtein[];
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
            productProteins:
              product.productProteins?.map(
                (protein) => protein.productProtein.id
              ) || [],
          }
        : PRODUCT_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof insertProductSchema> | z.infer<typeof updateProductSchema>
  > = async (data) => {
    const schema =
      type === "Update" ? updateProductSchema : insertProductSchema;
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      console.log("🔴 ERRORI DI VALIDAZIONE:", parsed.error.format());
      return;
    }
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

  const getOnlyProteinId = product?.productProteins?.map(
    (protein) => protein.productProtein.id
  );
  const formatterForSelect = (
    data: ICategory[] | IBrand[] | IPathology[] | IProtein[]
  ) =>
    data?.map((d: IBrand | ICategory | IPathology | IProtein) => ({
      value: d.id,
      label: d.name,
    }));

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        method="POST"
        onSubmit={form.handleSubmit(
          (data) => {
            console.log("✅ Dati inviati:", data);
            onSubmit(data);
          },
          (errors) => {
            console.log("❌ Errori nel form:", errors);
          }
        )}
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

          <DynamicFormField
            type="select"
            options={categories ? formatterForSelect(categories) : []}
            control={form.control}
            name="categoryId"
            schema={insertProductSchema}
            title="Category"
            placeholder="Enter category"
          />

          {/* Pathologies */}
          <DynamicFormField
            type="select"
            options={patologies ? formatterForSelect(patologies) : []}
            control={form.control}
            name="productPatologyId"
            schema={insertProductSchema}
            title="Pathologies"
            placeholder="Enter category"
          />
        </div>
        <div className="flex flex-col  gap-5 md:flex-row">
          {/* Brand */}
          <DynamicFormField
            type="select"
            options={brands ? formatterForSelect(brands) : []}
            control={form.control}
            name="productBrandId"
            schema={insertProductSchema}
            title="Brand"
            placeholder="Enter brand"
          />
          {/* Proteins */}
          <DynamicFormField
            type="multiple-select"
            options={proteins ? formatterForSelect(proteins) : []}
            control={form.control}
            name="productProteins"
            schema={insertProductSchema}
            title="Proteins"
            placeholder="Enter proteins"
            defaultValue={getOnlyProteinId}
          />
        </div>
        <div className="flex flex-col  gap-5 md:flex-row">
          {/* Brand */}
          <div className="flex w-full">
            <DynamicFormField
              type="select"
              options={brands ? formatterForSelect(brands) : []}
              control={form.control}
              name="productBrandId"
              schema={insertProductSchema}
              title="Unit value"
              placeholder="Enter brand"
            />
            {/* Proteins */}

            <DynamicFormField
              type="select"
              options={brands ? formatterForSelect(brands) : []}
              control={form.control}
              name="productBrandId"
              schema={insertProductSchema}
              title="Unit of measure"
              placeholder="Enter brand"
            />
          </div>
          <DynamicFormField
            type="select"
            options={brands ? formatterForSelect(brands) : []}
            control={form.control}
            name="productBrandId"
            schema={insertProductSchema}
            title="Unit value"
            placeholder="Enter brand"
          />
          {/* Proteins */}
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
