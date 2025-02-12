"use client";

import DynamicFormField from "@/components/shared/dynamic-form-field";
import { Button } from "@/components/ui/button";
import { createProduct, updateProduct } from "@/core/actions/products";
import { AnimalAge } from "@/core/actions/types";
import {
  ICategory,
  insertProductSchema,
  IProduct,
  updateProductSchema,
} from "@/core/validators";
import { IProductFeatureOnProduct } from "@/core/validators/product-feature.validator";
import {
  IUnitOfMeasure,
  IUnitValue,
} from "@/core/validators/unitsFormat.validator";
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
  pathologies,
  proteins,
  unitValues,
  unitOfMeasure,
  allFeatures,
}: {
  type: "Create" | "Update";
  product?: IProduct;
  productId?: string;
  categories?: ICategory[];
  brands?: IBrand[];
  pathologies?: IPathology[];
  proteins?: IProtein[];
  unitValues: IUnitValue[];
  unitOfMeasure: IUnitOfMeasure[];
  allFeatures: IProductFeatureOnProduct[];
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
            price: product.price.toString(),
            rating: product?.rating ? Number(product.rating) : undefined,
            isFeatured: product.isFeatured || false,
            banner: product.banner || null,
            categoryId: product.categoryId || null,
            productBrandId: product.productBrandId || null,
            productProteinOnProduct:
              product?.productProteinOnProduct?.map(
                (protein) => protein.productProteinId
              ) || [],
            productFeatureOnProduct:
              product?.productsFeatureOnProduct?.map(
                (feature) => feature.productFeatureId
              ) || [],

            unitValueId: product.productUnitFormat?.unitValueId || undefined,
            unitOfMeasureId:
              product.productUnitFormat?.unitMeasureId || undefined,
            animalAge: product.animalAge || undefined,
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
      console.log("🔴 Validation Errors:", parsed.error.format());
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
          description: res.message,
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

    const res =
      type === "Create"
        ? await createProduct(data)
        : await updateProduct({ ...data, id: productId as string });

    handleResponse(
      res,
      type === "Create" ? "Product created" : "Product updated"
    );
  };

  const images = form.watch("images");
  const isFeatured: boolean | null = form.watch("isFeatured");
  const banner = form.watch("banner");

  const getOnlyProteinId =
    product?.productProteinOnProduct?.map(
      (protein) => protein.productProteinId
    ) || [];

  const getOnlyFeatureId =
    product?.productsFeatureOnProduct?.map(
      (feature) => feature.productFeatureId
    ) || [];

  console.log("getOnlyFeatureId", getOnlyFeatureId);

  const formatterForSelect = (
    data: ICategory[] | IBrand[] | IPathology[] | IProtein[]
  ) =>
    data?.map((d: IBrand | ICategory | IPathology | IProtein) => ({
      value: d.id,
      label: d.name,
    }));

  const formatterForUnitValue = unitValues?.map((d: IUnitValue) => ({
    value: d.id,
    label: d.value.toString(),
  }));
  const formatterForUnitOfMeasure = unitOfMeasure?.map((d: IUnitOfMeasure) => ({
    value: d.id,
    label: d.code,
  }));
  const formatterForFeature = allFeatures.map(
    ({ productFeature }: IProductFeatureOnProduct) => ({
      value: productFeature.id,
      label: productFeature.name,
    })
  );

  console.log("format", formatterForFeature);

  const animalAge = Object.keys(AnimalAge).map((key: string) => ({
    value: key,
    label: key,
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
            options={pathologies ? formatterForSelect(pathologies) : []}
            control={form.control}
            name="productPathologyId"
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
            name="productProteinOnProduct"
            schema={insertProductSchema}
            title="Proteins"
            placeholder="Enter proteins"
            defaultValue={getOnlyProteinId}
          />
          {/* Features */}
          <DynamicFormField
            type="multiple-select"
            options={allFeatures ? formatterForFeature : []}
            control={form.control}
            name="productFeatureOnProduct"
            schema={insertProductSchema}
            title="Features"
            placeholder="Enter features"
            defaultValue={getOnlyFeatureId}
          />
        </div>
        <div className="flex flex-col  gap-5 md:flex-row">
          {/* Unit Value */}
          <div className="flex w-full">
            <DynamicFormField
              type="select"
              options={unitValues ? formatterForUnitValue : []}
              control={form.control}
              name="unitValueId"
              schema={insertProductSchema}
              title="Unit value"
              defaultValue={product?.unitValueId}
              placeholder="Enter unit value"
            />
            {/* UnitOfMeasure */}

            <DynamicFormField
              type="select"
              options={unitOfMeasure ? formatterForUnitOfMeasure : []}
              control={form.control}
              name="unitOfMeasureId"
              schema={insertProductSchema}
              title="Unit of measure"
              placeholder="Enter brand"
              defaultValue={product?.unitOfMeasureId}
            />
          </div>
          <DynamicFormField
            type="select"
            options={animalAge}
            control={form.control}
            name="animalAge"
            schema={insertProductSchema}
            title="Animal Age"
            placeholder="Enter animal age"
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
