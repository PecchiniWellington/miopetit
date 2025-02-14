import { getAllProducts } from "@/core/actions/products";
import { getProductCategories } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { indispensableCat } from "@/core/db-static/indispensable/indispensable-cat";
import { indispensableDog } from "@/core/db-static/indispensable/indispensable-dog";
import ConfigCategoryPage from "../config-category-page";

const SubCategories = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort: string;
    page: string;
  }>;
  params: Promise<{
    categories: string;
    subCategories: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;
  const { categories, subCategories } = await props.params;

  const products = await getAllProducts({
    query: q,
    page: Number(page),
    category,
    price,
    rating,
    sort,
  });

  const categoriesData = await getProductCategories();

  if (categories === "cani")
    return (
      <>
        <h3>{categories + "-" + subCategories}</h3>
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
  else if (categories === "gatti")
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

export default SubCategories;
