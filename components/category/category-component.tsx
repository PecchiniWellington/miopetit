"use client";

import CustomProduct from "@/components/shared/product/customProduct";
import { FilterProvider } from "@/context/filter-context";
import { IProduct } from "@/core/validators";
import ActiveFilters from "./active-filters";
import Filter from "./filter";
import SortProduct from "./sort-product";

const CategoryType = ({
  products,
  categoriesData,
  mainCategory,
}: {
  mainCategory: string;
  products: IProduct[];
  categoriesData: {
    _count: number;
    categoryId: string;
  }[];
}) => {
  return (
    <div className="relative grid grid-cols-1 items-start gap-6 md:grid-cols-5">
      <FilterProvider>
        <aside className="sticky top-2 flex w-full gap-4">
          <Filter categoriesData={categoriesData} className="w-full flex-1" />
          <SortProduct
            mainCategory={mainCategory}
            className="flex-1 md:hidden"
          />
        </aside>

        <main className="space-y-6 md:col-span-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <ActiveFilters />
            <SortProduct
              mainCategory={mainCategory}
              className="hidden md:block"
            />
          </div>

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
      </FilterProvider>
    </div>
  );
};

export default CategoryType;
