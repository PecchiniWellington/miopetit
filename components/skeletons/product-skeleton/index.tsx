import ProductDetailsSkeleton from "./product-skeleton-details";
import ProductCarouselSkeleton from "./product-skeleton-images";
import ProductCardSkeleton from "./product-skeleton-right-card";
import ProductTabsSkeleton from "./product-skeleton-tabs";

const ProductPageSkeleton = () => {
  return (
    <>
      <section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          {/* 📷 Immagini Prodotto */}
          <div className="col-span-2">
            <ProductCarouselSkeleton />
          </div>

          {/* 📄 Dettagli Prodotto */}
          <div className="col-span-2 space-y-4">
            <ProductDetailsSkeleton />
          </div>

          {/* 💰 Card Prezzo */}
          <ProductCardSkeleton />
        </div>
      </section>

      {/* 🏷️ Tabs */}
      <section className="mt-10">
        <ProductTabsSkeleton />
      </section>
    </>
  );
};

export default ProductPageSkeleton;
