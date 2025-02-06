import DynamicButton from "@/components/dynamic-button";
import { BadgeStatus } from "@/components/shared/badge-status";
import ProductCard from "@/components/shared/product/product-card";
import {
  getAllProducts,
  getProductCategories,
} from "@/lib/actions/product.actions";
import { STATUS } from "@/lib/constants";
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

    return `/category/${slug}?${new URLSearchParams(params).toString()}`;
  };

  const categories = await getProductCategories();

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
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
            {categories.map((x) => (
              <li key={x.category.id}>
                <Link
                  href={getFilterUrl({ c: x.category.slug })}
                  className={`${category === x.category.slug && "font-bold"}`}
                >
                  {x.category.name}
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
              <DynamicButton>
                <Link href={`/category/${slug}`}>Clear</Link>
              </DynamicButton>
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
                <BadgeStatus
                  status={sort === s ? STATUS.PRIMARY_ACTIVE : STATUS.PRIMARY}
                >
                  {s}
                </BadgeStatus>
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.data.length === 0 && <div>No Product Found</div>}
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryType;
