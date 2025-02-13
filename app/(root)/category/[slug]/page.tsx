import DynamicButton from "@/components/dynamic-button";
import { BadgeStatus } from "@/components/shared/badge-status";
import CustomProduct from "@/components/shared/product/customProduct";
import { getAllProducts } from "@/core/actions/products";
import { getProductCategories } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { STATUS } from "@/lib/constants";
import Link from "next/link";
import FilterProduct from "./filter-product";
import SortProduct from "./sort-product";

/* const sortOrders = ["newest", "lowest", "highest", "rating"]; */

const CategoryType = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort: string;
    page: string;
  }>;
  params: Promise<{ slug: string }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  const { slug } = await props.params;

  const products = await getAllProducts({
    query: q,
    page: Number(page),
    category,
    price,
    rating,
    sort,
  });

  const categories = await getProductCategories();

  /*  const [isSortOpen, setIsSortOpen] = useState(false); */

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
      {/* Sidebar */}
      <div className="flex w-full gap-4">
        <FilterProduct
          categories={categories}
          q={q}
          slug={slug}
          price={price}
          rating={rating}
          sort={sort}
          page={page}
          category={category}
          className="w-full flex-1"
        />
        <SortProduct sort={sort} slug={slug} className="flex-1 md:hidden" />
      </div>

      {/* Contenuto principale */}
      <main className="space-y-6 md:col-span-4">
        {/* Filtri attivi e ordinamento */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Filtri attivi */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            {q !== "all" && (
              <BadgeStatus status={STATUS.PRIMARY}>{q}</BadgeStatus>
            )}
            {category !== "all" && (
              <BadgeStatus status={STATUS.SUCCESS}>{category}</BadgeStatus>
            )}
            {price !== "all" && (
              <BadgeStatus status={STATUS.WARNING}>{price}</BadgeStatus>
            )}
            {rating !== "all" && (
              <BadgeStatus
                status={STATUS.DEFAULT}
              >{`${rating} ⭐ & più`}</BadgeStatus>
            )}
            {(q !== "all" ||
              category !== "all" ||
              price !== "all" ||
              rating !== "all") && (
              <DynamicButton>
                <Link href={`/category/${slug}`}>Reset Filtri</Link>
              </DynamicButton>
            )}
          </div>

          <SortProduct sort={sort} slug={slug} className="hidden md:block" />
        </div>

        {/* Griglia prodotti */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.data.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              Nessun prodotto trovato
            </div>
          ) : (
            products.data.map((product) => (
              <CustomProduct
                key={product.id}
                image={product.images[0]}
                reviews={product.numReviews}
                availability={product.stock > 0 ? "In Stock" : "Out of Stock"}
                name={product.name}
                rating={product.rating as number}
                price={Number(product.price)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default CategoryType;
