/* eslint-disable @typescript-eslint/no-explicit-any */
import CarouselIndispensable from "@/components/carousels/carousel-indispensable";
import CarouselShared from "@/components/carousels/carousel-shared";
import CategoryType from "@/components/category/category-component";
import SmallProductCard from "@/components/shared/product/small-product-card";

const ConfigCategoryPage = ({
  indispensable,
  mainCategory,
  categoriesData,
  products,
}: any) => {
  return (
    <>
      <div className="mb-12 flex flex-col rounded-2xl bg-slate-100 p-6">
        <section className="mb-6">
          <CarouselIndispensable
            indispensables={indispensable}
            animalCategory={mainCategory}
          />
        </section>
        <section className="mb-6"></section>
        <section className="mb-6">
          <CarouselShared title="Scelti per te">
            <SmallProductCard />
          </CarouselShared>
        </section>
      </div>
      <section className="relative mb-6 flex w-full items-center gap-4 ">
        <CategoryType
          mainCategory={mainCategory}
          categoriesData={categoriesData}
          products={products.data}
        />
      </section>
    </>
  );
};

export default ConfigCategoryPage;
