"use client";
import IndispensableList from "@/components/carousels/carousel-indispensable";
import ActiveFilters from "@/components/category/active-filters";
import Filter from "@/components/category/filter";
import SortProduct from "@/components/category/sort-product";
import CustomProduct from "@/components/product/customProduct";
import { FilterProvider } from "@/context/filter-context";
import { ICart, IProduct } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { useCallback, useMemo } from "react";

const ConfigCategoryPage = ({
  indispensable,
  mainCategory,
  productFilters,
  products,
  userId,
  myCart,
}: {
  indispensable: { image: string; href: string; label: string }[];
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
  const memoizedData = useMemo(() => products, [products]);
  console.log("🔍 Products:", memoizedData);
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
  /* INDISPENSABLE */
  const Indispensable = () => (
    <IndispensableList
      indispensables={indispensable}
      mainCategory={mainCategory}
    />
  );
  /* CHOOSE FOR YOU */
  const ChooseForYou = () => <div></div>;

  /* ASIDE FILTER */
  const AsideFilter = () => (
    <>
      <Filter productFilters={productFilters} className="w-full flex-1" />
      <SortProduct mainCategory={mainCategory} className="flex-1 md:hidden" />
    </>
  );

  /* ACTIVE FILTER AND MOBILE FILTER */
  const ActiveFilter = () => (
    <>
      <ActiveFilters />
      <SortProduct mainCategory={mainCategory} className="hidden md:block" />
    </>
  );
  const ProductsList = ({ products }: { products: IProduct[] }) => {
    return memoizedData?.length === 0 ? (
      <div className="col-span-full text-center text-gray-500">
        Nessun prodotto trovato
      </div>
    ) : (
      <>
        {/* product.data?? */}
        {products?.map((product: IProduct) => (
          <CustomProduct
            userId={userId}
            key={product.id}
            product={product}
            getProductQuantity={getProductQuantity(product.id)}
          />
        ))}
      </>
    );
  };
  return (
    <>
      <div className="mb-12 flex flex-col rounded-2xl bg-slate-100 p-6">
        <section className="mb-6">
          <Indispensable />
        </section>
        <section className="mb-6">
          <ChooseForYou />
        </section>
      </div>
      <section className="relative mb-6  grid  w-full grid-cols-1 items-start gap-4  md:grid-cols-5">
        <FilterProvider>
          <aside className="sticky top-2 flex w-full gap-4">
            <AsideFilter />
          </aside>

          <main className="space-y-6 md:col-span-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <ActiveFilter />
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              <ProductsList products={memoizedData} />
            </div>
          </main>
        </FilterProvider>
      </section>
    </>
  );
};

export default ConfigCategoryPage;
