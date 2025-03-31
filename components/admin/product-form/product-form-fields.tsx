import DynamicFormField from "@/components/shared/dynamic-form-field";
import { AnimalAge } from "@/core/actions/types";
import { ICategory } from "@/core/validators";
import { IProductFeatureOnProduct } from "@/core/validators/product-feature.validator";
import { ICreateProduct, IProduct } from "@/core/validators/product.validator";
import {
  IUnitOfMeasure,
  IUnitValue,
} from "@/core/validators/unitsFormat.validator";
import { IBrand, IPathology, IProtein } from "@/types/index";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import SlugFormField from "./slug-form-field";
import UploadImage from "./upload-image";

export function ProductFormFields({
  form,
  categories = [],
  brands = [],
  pathologies = [],
  proteins = [],
  unitValues = [],
  unitOfMeasure = [],
  allFeatures = [],
  product,
}: {
  form: UseFormReturn<IProduct | ICreateProduct>;
  categories?: ICategory[];
  brands?: IBrand[];
  pathologies?: IPathology[];
  proteins?: IProtein[];
  unitValues?: IUnitValue[];
  unitOfMeasure?: IUnitOfMeasure[];
  allFeatures?: IProductFeatureOnProduct[];
  product?: IProduct;
}) {
  const getOnlyProteinId =
    product?.productProteins?.map((protein) => protein.id) || [];

  const getOnlyFeatureId =
    product?.productFeature?.map((feature) => feature.id) || [];

  const getOnlyProductCategory =
    product?.productCategory?.map((category) => category.id)[0] || "";

  const getOnlyPathologiesId = product?.productPathologies?.map(
    (feature) => feature.id
  );

  const formatterForSelect = (
    data: Array<ICategory | IBrand | IPathology | IProtein> = []
  ) =>
    Array.isArray(data)
      ? data.map((d) => ({
          value: d.id,
          label: d.name,
        }))
      : [];

  const formatterForUnitValue = Array.isArray(unitValues)
    ? unitValues.map((d) => ({
        value: d.id || "",
        label: d.value?.toString() || "",
      }))
    : [];

  const formatterForUnitOfMeasure = Array.isArray(unitOfMeasure)
    ? unitOfMeasure.map((d) => ({
        value: d.id || "",
        label: d.code,
      }))
    : [];

  const formatterForFeature = Array.isArray(allFeatures)
    ? allFeatures.map(({ productFeature }: IProductFeatureOnProduct) => ({
        value: productFeature.id,
        label: productFeature.name,
      }))
    : [];

  const animalAge = Object.keys(AnimalAge).map((key: string) => ({
    value: key,
    label: key,
  }));
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      console.log("Form changes:", { value, name, type });
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <>
      <div className="flex flex-col gap-5 md:flex-row">
        {/* Name */}
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="name"
          title="Name"
          placeholder="Enter name"
        />
        {/* Slug */}
        <SlugFormField variant="admin" form={form} />
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        {/* Category */}

        <DynamicFormField
          variant="admin"
          type="multiple-select"
          options={formatterForSelect(categories)}
          control={form.control}
          name="productCategory"
          title="Category"
          placeholder="Enter category"
          defaultValue={getOnlyProductCategory}
        />

        {/* Pathologies */}

        <DynamicFormField
          variant="admin"
          type="multiple-select"
          options={formatterForSelect(pathologies)}
          control={form.control}
          name="productPathologies"
          title="Pathologies"
          placeholder="Enter Pathologies"
          defaultValue={getOnlyPathologiesId}
        />
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <DynamicFormField
          variant="admin"
          type="select"
          options={formatterForSelect(brands)}
          control={form.control}
          name="productBrand"
          title="Brand"
          placeholder="Enter brand"
          defaultValue={product?.productBrand?.id}
        />

        {/* Proteins */}
        <DynamicFormField
          variant="admin"
          type="multiple-select"
          options={formatterForSelect(proteins)}
          control={form.control}
          name="productProteins"
          title="Proteins"
          placeholder="Enter proteins"
          defaultValue={getOnlyProteinId}
        />
        {/* Features */}
        <DynamicFormField
          variant="admin"
          type="multiple-select"
          options={formatterForFeature}
          control={form.control}
          name="productFeature"
          title="Features"
          placeholder="Enter features"
          defaultValue={getOnlyFeatureId}
        />
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        {/* Unit Value */}
        <div className="flex w-full">
          <DynamicFormField
            variant="admin"
            type="select"
            options={formatterForUnitValue}
            control={form.control}
            name="productUnitFormat.unitValue"
            title="Unit value"
            defaultValue={product?.productUnitFormat?.unitValue.id || ""}
            placeholder="Enter unit value"
          />

          <DynamicFormField
            variant="admin"
            type="select"
            options={formatterForUnitOfMeasure}
            control={form.control}
            name="productUnitFormat.unitOfMeasure"
            title="Unit of measure"
            defaultValue={product?.productUnitFormat?.unitOfMeasure.id || ""}
            placeholder="Enter unit of measure"
          />
        </div>
        <DynamicFormField
          variant="admin"
          type="select"
          options={animalAge}
          control={form.control}
          name="animalAge"
          title="Animal Age"
          placeholder="Enter animal age"
        />
        {/* Proteins */}
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        {/* Price */}
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="price"
          title="Price"
          placeholder="Enter price"
        />
        <DynamicFormField
          isNumber={true}
          variant="admin"
          control={form.control}
          name="costPrice"
          title="Cost Price"
          placeholder="Enter Cost price"
        />
        <DynamicFormField
          isNumber={true}
          variant="admin"
          control={form.control}
          name="percentageDiscount"
          title="Percentage discount price"
          placeholder="Enter percentage price"
        />

        {/* Stock */}
        <DynamicFormField
          isNumber={true}
          variant="admin"
          control={form.control}
          name="stock"
          title="Stock"
          placeholder="Enter stock"
        />
      </div>
      <div className="">
        {/* Images */}
        Product Images
        <UploadImage
          isFeatured={false}
          multiple
          images={form.watch("images") || []}
          onChange={(data) => {
            form.setValue("images", data.images);
          }}
        />
      </div>
      <div className="">
        {/* isFeatured */}
        Featured Product
        <UploadImage
          isFeatured={true}
          images={[form.watch("banner")].filter((img): img is string => !!img)}
          onChange={(data) => {
            if (data.isFeatured) {
              form.setValue("isFeatured", true);
              form.setValue("banner", data.images[0] || "");
            } else {
              form.setValue("isFeatured", false);
              form.setValue("banner", "");
            }
          }}
        />
      </div>
      <div>
        {/* Description */}
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="shortDescription"
          title="Short Description"
          placeholder="Enter short description"
          type="textarea"
        />
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="description"
          title="Description"
          placeholder="Enter description"
          type="textarea"
        />
      </div>
    </>
  );
}
