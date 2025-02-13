import { getAllProducts } from "@/core/actions/products";
import { getProductCategories } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { indispensableCat } from "@/core/db-static/indispensable/indispensable-cat";
import { indispensableDog } from "@/core/db-static/indispensable/indispensable-dog";
import ConfigCategoryPage from "./config-category-page";

const MainCategory = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort: string;
    page: string;
  }>;
  params: Promise<{ categories: string }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;
  const { categories } = await props.params;

  const products = await getAllProducts({
    query: q,
    page: Number(page),
    category,
    price,
    rating,
    sort,
  });

  const categoriesData = await getProductCategories();

  if (categories === "dog")
    return (
      <>
        <ConfigCategoryPage
          indispensable={indispensableDog}
          categories={categories}
          categoriesData={categoriesData}
          products={products}
          price={price}
          rating={rating}
          sort={sort}
          page={page}
          category={category}
          q={q}
        />
      </>
    );
  else if (categories === "cat")
    return (
      <>
        <ConfigCategoryPage
          indispensable={indispensableCat}
          categories={categories}
          categoriesData={categoriesData}
          products={products}
          price={price}
          rating={rating}
          sort={sort}
          page={page}
          category={category}
          q={q}
        />
      </>
    );
  else return <div>Category not found</div>;
};

export default MainCategory;
