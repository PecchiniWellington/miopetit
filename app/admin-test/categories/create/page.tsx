import CategoryForm from "@/components/admin/category-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product",
};

const CreateCategoriesPage = () => {
  return (
    <>
      <h2 className="h2-bold">Create Category</h2>
      <div className="my-8">
        <CategoryForm type="Create" />
      </div>
    </>
  );
};

export default CreateCategoriesPage;
