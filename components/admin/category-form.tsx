"use client";

import { useToast } from "@/hooks/use-toast";
import { CATEGORIES_DEFAULT_VALUES } from "@/lib/constants";

import DynamicButton from "@/components/dynamic-button";
import DynamicFormField from "@/components/shared/dynamic-form-field";
import {
  createCategory,
  updataCategory,
} from "@/core/actions/admin/admin.actions";
import { categorySchema, ICategory } from "@/core/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../ui/form";
import SlugFormField from "./product-form/slug-form-field";

const CategoryForm = ({
  type,
  category,
  categoryId,
}: {
  type: "Create" | "Update";
  category?: ICategory | null;
  categoryId?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ICategory>({
    resolver: zodResolver(categorySchema),

    defaultValues:
      category && type === "Update" ? category : CATEGORIES_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<ICategory> = async (data) => {
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
          description: `Category ${data.name} has been ${successMessage.toLowerCase()} successfully`,
        });
        router.push("/admin/categories");
      }
    };

    if (type === "Create") {
      const res = await createCategory(data as ICategory);
      handleResponse(res, "Category created");
    }

    if (type === "Update") {
      if (!categoryId) {
        router.push("/admin/categories");
        return;
      }
      const res = await updataCategory({ ...data, id: categoryId });
      handleResponse(res, "Category updated");
    }
  };

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
            title="Name"
            placeholder="Enter name"
          />
          {/* Slug */}
          <SlugFormField form={form} />
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
