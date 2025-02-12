import DynamicFormField from "@/components/shared/dynamic-form-field";
import { AnimalAge } from "@/core/actions/types";
import { ICategory } from "@/core/validators";
import { IProductFeatureOnProduct } from "@/core/validators/product-feature.validator";
import {
  IUnitOfMeasure,
  IUnitValue,
} from "@/core/validators/unitsFormat.validator";
import { IBrand, IPathology, IProtein } from "@/types/index";
import SlugFormField from "./slug-form-field";
import UploadImage from "./upload-image";
import UploadImageFeaturedProduct from "./upload-image-featured-product";

export function ProductFormFields({
  form,
  categories,
  brands,
  pathologies,
  proteins,
  unitValues,
  unitOfMeasure,
  allFeatures,
  product,
}: any) {
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
  const formatterForFeature = allFeatures?.map(
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

  const images = form.watch("images");
  const isFeatured: boolean | null = form.watch("isFeatured");
  const banner = form.watch("banner");

  return (
    <>
      <div className="flex flex-col  gap-5 md:flex-row">
        {/* Name */}
        <DynamicFormField
          control={form.control}
          name="name"
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
          title="Category"
          placeholder="Enter category"
        />

        {/* Pathologies */}
        <DynamicFormField
          type="select"
          options={pathologies ? formatterForSelect(pathologies) : []}
          control={form.control}
          name="productPathologyId"
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
          title="Brand"
          placeholder="Enter brand"
        />
        {/* Proteins */}
        <DynamicFormField
          type="multiple-select"
          options={proteins ? formatterForSelect(proteins) : []}
          control={form.control}
          name="productProteinOnProduct"
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
          title="Price"
          placeholder="Enter price"
        />
        {/* Stock */}
        <DynamicFormField
          control={form.control}
          name="stock"
          title="Stock"
          placeholder="Enter stock"
        />
      </div>
      <div className="upload-field flex flex-col  gap-5 md:flex-row">
        {/* Images */}
        <UploadImage form={form} images={images || []} />
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
          title="Description"
          placeholder="Enter description"
          type="textarea"
        />
      </div>
    </>
  );
}
