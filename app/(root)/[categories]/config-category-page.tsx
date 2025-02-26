/* eslint-disable @typescript-eslint/no-explicit-any */
import CarouselIndispensable from "@/components/carousels/carousel-indispensable";
import CarouselShared from "@/components/carousels/carousel-shared";
import ActiveFilters from "@/components/category/active-filters";
import Filter from "@/components/category/filter";
import SortProduct from "@/components/category/sort-product";
import CustomProduct from "@/components/shared/product/customProduct";
import SmallProductCard from "@/components/shared/product/small-product-card";
import { FilterProvider } from "@/context/filter-context";
import { IProduct } from "@/core/validators";

const ConfigCategoryPage = ({
  indispensable,
  mainCategory,
  productFilters,
  products,
}: any) => {
  /* INDISPENSABLE */
  const Indispensable = () => (
    <CarouselIndispensable
      indispensables={indispensable}
      mainCategory={mainCategory}
    />
  );
  /* CHOOSE FOR YOU */
  const ChooseForYou = () => (
    <CarouselShared title="Scelti per te">
      <SmallProductCard />
    </CarouselShared>
  );

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
  /* PRODUCTS LIST */
  const ProductsList = () =>
    products.length === 0 ? (
      <div className="col-span-full text-center text-gray-500">
        Nessun prodotto trovato
      </div>
    ) : (
        {products.data.map((product: IProduct) => (
          <CustomProduct
            slug={product.slug}
            key={product.id}
            id={product.id}
            brand={product.productBrand?.name}
            image={product.images[0]}
            reviews={product.numReviews}
            availability={
              product.stock && product.stock > 0 ? "In Stock" : "Out of Stock"
            }
            name={product.name}
            rating={product.rating as number}
            price={Number(product.price)}
            product={product}
          />
        ))}
    );

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
          {/*  <aside className="sticky top-2 flex w-full gap-4">
            <AsideFilter />
          </aside> */}

          <main className="space-y-6 md:col-span-4">
            {/*  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <ActiveFilter />
            </div>
 */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
             {/*  <ProductsList /> */}
            </div>
          </main>
        </FilterProvider>
      </section>
    </>
  );
};

export default ConfigCategoryPage;
