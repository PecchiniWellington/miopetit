import CustomProduct from "@/components/shared/product/customProduct";
import { IProduct } from "@/core/validators";
import ActiveFilters from "./active-filters";
import Filter from "./filter";
import SortProduct from "./sort-product";

/* const sortOrders = ["newest", "lowest", "highest", "rating"]; */

const CategoryType = async ({
  q,
  slug,
  products,
  price,
  rating,
  sort,
  page,
  category,
  categories,
}: {
  q: string;
  slug: string;
  products: IProduct[];
  price: string;
  rating: string;
  sort: string;
  page: string;
  category: string;

  categories: {
    _count: number;
    categoryId: string;
    category: {
      id: string;
      name: string;
      slug: string;
    };
  }[];
}) => {
  return (
    <div className="relative grid grid-cols-1 items-start gap-6 md:grid-cols-5">
      {/* Sidebar */}
      <aside className="sticky top-2 flex w-full gap-4">
        <Filter
          categories={categories}
          q={"all"}
          slug={slug}
          price={price}
          rating={rating}
          sort={sort}
          page={page}
          category={category}
          className="w-full flex-1"
        />
        <SortProduct sort={sort} slug={slug} className="flex-1 md:hidden" />
      </aside>

      {/* Contenuto principale */}
      <main className="space-y-6 md:col-span-4">
        {/* Filtri attivi e ordinamento */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <ActiveFilters slug={slug} />

          <SortProduct sort={sort} slug={slug} className="hidden md:block" />
        </div>

        {/* Griglia prodotti */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              Nessun prodotto trovato
            </div>
          ) : (
            products.map((product: IProduct) => (
              <CustomProduct
                key={product.id}
                image={product.images[0]}
                reviews={product.numReviews}
                availability={
                  product.stock && product.stock > 0
                    ? "In Stock"
                    : "Out of Stock"
                }
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
