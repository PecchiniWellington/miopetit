import { getAllProductsBySlug } from "@/core/actions/products/get-all-product-by-slug";
import { getFiltersForCategory } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import category from "@/core/db-static/category";
import { indispensableDog } from "@/core/db-static/indispensable/indispensable-dog";
import ConfigCategoryPage from "../../config-category-page";

const MainCategory = async (props: {
  params: Promise<{ subSubCategories: string }>;
}) => {
  const { subSubCategories } = await props.params;

  const productFilters = await getFiltersForCategory(subSubCategories);

  const productBySlug = await getAllProductsBySlug({
    query: "all",
    category: "all",
    price: "all",
    rating: "all",
    sort: "newest",
    page: 1,
    slug: subSubCategories,
  });

  console.log("productFilters", productBySlug);

  return (
    <>
      <ConfigCategoryPage
        indispensable={indispensableDog}
        categories={subSubCategories}
        categoriesData={productFilters}
        products={productBySlug}
        price={1}
        rating={1}
        sort={1}
        page={1}
        category={category}
        q={"all"}
      />
    </>
  );
};

export default MainCategory;
