"use client";

import IndispensableList from "@/components/carousels/carousel-indispensable";
import ActiveFilters from "@/components/category/active-filters";
import Filter from "@/components/category/filter";
import SortProduct from "@/components/category/sort-product";
import BrandProductCard from "@/components/product/brand-product-card";
import { FilterProvider } from "@/context/filter-context";
import { ICart, IProduct } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { Wand2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const ConfigCategoryPage = ({
  indispensable,
  mainCategory,
  productFilters,
  initialProducts,
  userId,
  myCart,
}: {
  indispensable?: { image: string; href: string; label: string }[];
  mainCategory: string;
  productFilters: {
    [key: string]:
      | string
      | number
      | { [key: string]: string | number }
      | Array<string | number | object>;
  };
  initialProducts: IProduct[];
  userId?: string;
  myCart: ICart | null;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    Array.isArray(initialProducts) && initialProducts.length === 20
  );
  const observerRef = useRef<HTMLDivElement | null>(null);

  const buildQueryParams = () => {
    const query: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      query[key] = value;
    });
    return query;
  };

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const { getAllProductsBySlug } = await import(
      "@/core/actions/products/get-all-product-by-slug"
    );
    const newProducts = await getAllProductsBySlug({
      slug: pathname.split("/").pop() || "",
      query: buildQueryParams(),
      skip: page * 20,
      take: 20,
    });

    if (newProducts.length < 20) setHasMore(false);
    setProducts((prev) => [...prev, ...newProducts]);
    setPage((prev) => prev + 1);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, hasMore, page, pathname, searchParams]);

  useEffect(() => {
    setProducts(initialProducts);
    setPage(1);
    setHasMore(Array.isArray(initialProducts) && initialProducts.length === 20);
  }, [initialProducts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loadMore]);

  const [storedValue] = useLocalStorage<{ productId: string; qty: number }[]>(
    "cart",
    []
  );

  const getProductQuantity = useCallback(
    (productId: string) => {
      if (!userId) {
        const product = storedValue.find(
          (item) => item.productId === productId
        );
        return product ? product.qty : 0;
      } else {
        const product = myCart?.items?.find(
          (item) => item.productId === productId
        );
        return product ? product.qty : 0;
      }
    },
    [storedValue, userId, myCart]
  );

  const Indispensable = () => (
    <IndispensableList
      indispensables={indispensable}
      mainCategory={mainCategory}
    />
  );

  const AsideFilter = () => (
    <div className="flex w-full flex-col gap-6 rounded-xl bg-slate-100 p-6 shadow-xl md:sticky md:top-4 ">
      <Filter productFilters={productFilters} className="w-full" />
      <SortProduct className="md:hidden" />
    </div>
  );

  const ActiveFilter = () => (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <ActiveFilters />
      <SortProduct className="hidden md:block" />
    </div>
  );

  const ProductsList = ({ products }: { products: IProduct[] }) => {
    return !Array.isArray(products) || products.length === 0 ? (
      <div className="col-span-full text-center text-gray-500">
        Nessun prodotto trovato
      </div>
    ) : (
      <>
        {products.map((product: IProduct, index: number) => (
          <BrandProductCard
            userId={userId}
            key={index}
            product={{
              ...product,
              price: product.price, // Ensure price remains a number
            }}
            getProductQuantity={product.id ? getProductQuantity(product.id) : 0}
          />
        ))}
      </>
    );
  };

  return (
    <div className="relative mx-auto w-full ">
      <Wand2 className="pointer-events-none absolute right-0 top-0 -z-10 size-40 text-purple-200 blur-xl" />

      {indispensable && (
        <div className="mb-16">
          <section className="mb-12">
            <Indispensable />
          </section>
        </div>
      )}

      <section className="grid w-full grid-cols-1 gap-6 md:grid-cols-8">
        <FilterProvider>
          <aside className=" md:col-span-2 ">
            <AsideFilter />
          </aside>

          <main className="space-y-8 md:col-span-6">
            <div className="rounded-xl bg-slate-100 p-6 shadow-xl">
              <ActiveFilter />
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              <ProductsList products={products} />
            </div>

            {hasMore && (
              <div ref={observerRef} className="flex justify-center">
                {loading ? (
                  <div className="size-8 animate-spin rounded-full border-4 border-gray-300 border-t-purple-500" />
                ) : (
                  <button
                    onClick={loadMore}
                    className="mt-4 rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                  >
                    Carica altri prodotti
                  </button>
                )}
              </div>
            )}

            {!hasMore && (
              <p className="mt-6 text-center text-gray-500">
                Hai visto tutti i prodotti.
              </p>
            )}
          </main>
        </FilterProvider>
      </section>
    </div>
  );
};

export default ConfigCategoryPage;
