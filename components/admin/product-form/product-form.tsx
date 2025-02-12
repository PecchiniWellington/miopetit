"use client";
import { Button } from "@/components/ui/button";
import { ICategory, IProduct } from "@/core/validators";
import { IProductFeatureOnProduct } from "@/core/validators/product-feature.validator";
import {
  IUnitOfMeasure,
  IUnitValue,
} from "@/core/validators/unitsFormat.validator";
import { IBrand, IPathology, IProtein } from "@/types/index";
import { Form } from "../../ui/form";
import { ProductFormFields } from "./product-form-fields";
import { useProductForm } from "./useForm";

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
  unitValues?: IUnitValue[];
  unitOfMeasure?: IUnitOfMeasure[];
  allFeatures?: IProductFeatureOnProduct[];
}) => {
  const { form, onSubmit } = useProductForm({ type, product, productId });

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
        <ProductFormFields
          form={form}
          categories={categories}
          brands={brands}
          pathologies={pathologies}
          proteins={proteins}
          unitValues={unitValues}
          unitOfMeasure={unitOfMeasure}
          allFeatures={allFeatures}
          product={product}
        />

        <Button disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : `${type} Product`}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
