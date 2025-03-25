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
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

const ConfigCategoryPage = ({
  indispensable,
  mainCategory,
  productFilters,
  products,
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
  products: IProduct[];
  userId?: string;
  myCart: ICart | null;
}) => {
  const searchParams = useSearchParams();
  const sortQuery = searchParams.get("sort") || "newest";

  const sortedProducts = useMemo(() => {
    const sortFn: Record<string, (a: IProduct, b: IProduct) => number> = {
      newest: (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime(),
      lowest: (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0),
      highest: (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0),
      rating: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
    };
    const sortMethod = sortFn[sortQuery] || sortFn.newest;
    return [...products].sort(sortMethod);
  }, [products, sortQuery]);

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
    <div className="flex w-full flex-col gap-6 rounded-xl bg-slate-100 p-6 shadow-xl md:sticky md:top-4">
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
    return products.length === 0 ? (
      <div className="col-span-full text-center text-gray-500">
        Nessun prodotto trovato
      </div>
    ) : (
      <>
        {products.map((product: IProduct) => (
          <BrandProductCard
            userId={userId}
            key={product.id}
            product={product}
            getProductQuantity={product.id ? getProductQuantity(product.id) : 0}
          />
        ))}
      </>
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4">
      <Wand2 className="pointer-events-none absolute right-0 top-0 -z-10 size-40 text-purple-200 blur-xl" />

      {indispensable && (
        <div className="mb-16">
          <section className="mb-12">
            <Indispensable />
          </section>
        </div>
      )}

      <section className="grid w-full grid-cols-1 gap-6 md:grid-cols-5">
        <FilterProvider>
          <aside className="md:col-span-1">
            <AsideFilter />
          </aside>

          <main className="space-y-8 md:col-span-4">
            <div className="rounded-xl bg-slate-100 p-6 shadow-xl">
              <ActiveFilter />
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              <ProductsList products={sortedProducts} />
            </div>
          </main>
        </FilterProvider>
      </section>
    </div>
  );
};

export default ConfigCategoryPage;
