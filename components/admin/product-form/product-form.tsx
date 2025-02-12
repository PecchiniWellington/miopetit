"use client";
import { Button } from "@/components/ui/button";
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
}: any) => {
  const { form, onSubmit } = useProductForm({ type, product, productId });

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
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
        />

        <Button disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : `${type} Product`}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
