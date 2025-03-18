import DynamicFormField from "@/components/shared/dynamic-form-field";
import { AnimalAge } from "@/core/actions/types";
import { ICategory } from "@/core/validators";
import { IProductFeatureOnProduct } from "@/core/validators/product-feature.validator";
import { IProduct } from "@/core/validators/product.validator";
import {
  IUnitOfMeasure,
  IUnitValue,
} from "@/core/validators/unitsFormat.validator";
import { IBrand, IPathology, IProtein } from "@/types/index";
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
  form: UseFormReturn<IProduct>;
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
    product?.productCategories?.map((category) => category.id)[0] || "";

  const getOnlyPathologiesId =
    product?.productPathologies?.map((feature) => feature.id) || [];

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

  const images = form.watch("images");
  const isFeatured = form.watch("isFeatured");
  const banner = form.watch("banner");

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
          type="select"
          options={formatterForSelect(categories)}
          control={form.control}
          name="productCategories"
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
        {/* Brand */}
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
            name="productUnitFormat"
            title="Unit value"
            defaultValue={product?.productUnitFormat?.unitValue.toString()}
            placeholder="Enter unit value"
          />
          {/* UnitOfMeasure */}

          <DynamicFormField
            variant="admin"
            type="select"
            options={formatterForUnitOfMeasure}
            control={form.control}
            name="productUnitFormat"
            title="Unit of measure"
            placeholder="Enter brand"
            defaultValue={product?.productUnitFormat?.unitOfMeasure.toString()}
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
        {/* Stock */}
        <DynamicFormField
          variant="admin"
          control={form.control}
          name="stock"
          title="Stock"
          placeholder="Enter stock"
        />
      </div>
      <div className="upload-field flex flex-col gap-5 md:flex-row">
        {/* Images */}
        <UploadImage form={form} image={banner} />
      </div>
      <div className="upload-field">
        {/* isFeatured */}
        Featured Product
        <UploadImage form={form} image={banner} multiple />
        {/* <UploadImageFeaturedProduct
          isFeatured={isFeatured}
          banner={banner}
          form={form}
        /> */}
      </div>
      <div>
        {/* Description */}
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
