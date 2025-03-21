import BrandBadge from "@/components/shared/brand-components/brand-badge";
import { getAllCategories } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import Link from "next/link";

const prices = [
  { name: "$0 to $50", value: "0-50" },
  { name: "$51 to $100", value: "51-100" },
  { name: "$101 to $200", value: "101-200" },
  {
    name: "$201 & Above",
    value: "201-500",
  } /* TODO: trovare il prodotto più costoso e metterlo al posot di 500 */,
];
const ratings = [4, 3, 2, 1];

const sortOrders = ["newest", "lowest", "highest", "rating"];

export async function generateMetadata(props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
  }>;
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
  } = await props.searchParams;

  const isQuerySet = q && q !== "all" && q.trim() !== "";
  const isCategorySet =
    category && category !== "all" && category.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";
  const isRatingSet = rating && rating !== "all" && rating.trim() !== "";

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search 
              ${isQuerySet ? q : ""} 
              ${isCategorySet ? "Category " + category : ""}
              ${isPriceSet ? "Price " + price : ""}
              ${isRatingSet ? "Rating " + rating : ""}
             
              `,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
}

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort: string;
    page: string;
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

  /* const products = await getAllProducts({
    query: q,
    page: Number(page),
    category,
    price,
    rating,
    sort,
  });
 */
  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (s) params.sort = s;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const categories = await getAllCategories();

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="rounded-md bg-gray-100 p-4">
        {/* Categories links */}
        <div className="mb-2 mt-3 text-xl">Categories</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                href={getFilterUrl({ c: "all" })}
                className={`${(category === "all" || category === "") && "font-bold"}`}
              >
                Any
              </Link>
            </li>
            {categories.data?.map((x: { id: string; name: string }) => (
              <li key={x.id}>
                <Link
                  href={getFilterUrl({ c: x.name })}
                  className={`${category === x.name && "font-bold"}`}
                >
                  {x.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Prices links */}
        <div className="mb-2 mt-3 text-xl">Price</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                href={getFilterUrl({ p: "all" })}
                className={`${price === "all" && "font-bold"}`}
              >
                Any
              </Link>
            </li>
            {prices.map((x) => (
              <li key={x.value}>
                <Link
                  href={getFilterUrl({ p: x.value })}
                  className={`${price === x.value && "font-bold"}`}
                >
                  {x.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Rating links */}
        <div className="mb-2 mt-3 text-xl">Customer Review</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                href={getFilterUrl({ r: "all" })}
                className={`${rating === "all" && "font-bold"}`}
              >
                Any
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  href={getFilterUrl({ r: `${r}` })}
                  className={`${rating === r.toString() && "font-bold"}`}
                >
                  {`${r} Stars & Up`}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="space-y-4 md:col-span-4">
        <div className="flex-between my-4 flex-col md:flex-row">
          <div className="flex items-center">
            {q !== "all" && q !== "" && "Query: " + q + ""}
            {category !== "all" &&
              category !== "" &&
              "Category: " + category + ""}
            {price !== "all" && price !== "" && " Price: " + price + ""}
            {rating !== "all" && rating !== "" && " Rating: " + rating + ""}
            &nbsp;
            {(q !== "all" && q !== "") ||
            (category !== "all" && category !== "") ||
            rating !== "all" ||
            price !== "all" ? (
              <Link href="/search">Clear</Link>
            ) : null}
          </div>
          <div>
            Sort By:{" "}
            {sortOrders.map((s) => (
              <Link
                key={s}
                href={getFilterUrl({ s })}
                className={`mx-2 ${sort === s && "font-bold"}`}
              >
                <BrandBadge
                  variant={sort === s ? "primary" : "default"}
                  label={s}
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {
            /* products.data.length */ [].length === 0 && (
              <div>No Product Found</div>
            )
          }
          {/* products.data.map((product) => ( */
          /*  [].map((product: any) => (
              <BrandProductCard
                product={product}
                key={product.id}
                id={product.id}
                image="https://utfs.io/f/RnH9VIVP0zpxL8Sd59Kp86NzgPOkKSsma1BjXoZe9tA3HMCW"
                name={product.name}
                productBrand={product.productBrand}
                rating={Number(product.rating)}
                reviews={product.numReviews}
                availability="Disponibile in 2 varianti (FAKE)"
                price={Number(product.price)}
                oldPrice={54.99}
                pricePerKg="€4,16/KG (FAKE)"
                
              />
            )) */}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
