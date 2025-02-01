"use client";

import { useToast } from "@/hooks/use-toast";
import { CATEGORIES_DEFAULT_VALUES } from "@/lib/constants";

import { ICategory } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import DynamicFormField from "@/components/shared/dynamic-form-field";
import DynamicButton from "@/components/dynamic-button";
import { Form } from "../ui/form";
import {
  categorySchema,
  updateCategorySchema,
} from "@/lib/validators/category.validator";
import {
  createCategory,
  updateCategory,
} from "@/lib/actions/admin/admin.actions";
import SlugFormField from "./product-form/slug-form-field";

const CategoryForm = ({
  type,
  category,
  categoryId,
}: {
  type: "Create" | "Update";
  category?: ICategory;
  categoryId?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<
    z.infer<typeof categorySchema | typeof updateCategorySchema>
  >({
    resolver:
      type === "Update"
        ? zodResolver(updateCategorySchema)
        : zodResolver(categorySchema),
    defaultValues:
      category && type === "Update" ? category : CATEGORIES_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<z.infer<typeof categorySchema>> = async (
    data
  ) => {
    const handleResponse = (res: any, successMessage: string) => {
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
          description: `Category ${data.name} has been ${successMessage.toLowerCase()} successfully`,
        });
        router.push("/admin/categories");
      }
    };

    if (type === "Create") {
      const res = await createCategory(data);
      handleResponse(res, "Category created");
    }

    if (type === "Update") {
      if (!categoryId) {
        router.push("/admin/categories");
        return;
      }
      /* const res = await updateCategory({ ...data, id: categoryId });
      handleResponse(res, "Category updated"); */
    }
  };

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
            schema={categorySchema}
            title="Name"
            placeholder="Enter name"
          />
          {/* Slug */}
          <SlugFormField
            form={form}
            control={form.control}
            name="slug"
            schema={categorySchema}
            title="Slug"
            placeholder="Enter slug"
          />
        </div>

        <div>
          {/* Description */}
          <DynamicFormField
            control={form.control}
            name="description"
            schema={categorySchema}
            title="Description"
            placeholder="Enter description"
            type="textarea"
          />
        </div>

        <div>
          {/* Submit */}
          <DynamicButton isPending={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : `${type} Category`}
          </DynamicButton>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
