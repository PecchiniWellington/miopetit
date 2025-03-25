import DynamicCarousel from "../carousels/carousel";
import BrandProductCard from "../product/brand-product-card";
import BrandButton from "../shared/brand-components/brand-button";

const BlockProducts = ({ products }: { products: any[] }) => {
  return (
    <section className="mx-auto mt-20 w-full max-w-6xl space-y-8 px-6">
      <h2 className="text-center text-3xl font-bold text-purple-600">
        Prodotti in evidenza
      </h2>
      <div className="w-full">
        {products?.length > 0 && (
          <DynamicCarousel
            data={products}
            itemsPerView={3}
            gap={20}
            renderItem={(products) => (
              <BrandProductCard key={products.id} product={products} />
            )}
          />
        )}
      </div>
      <BrandButton className="mx-auto" variant="primary" size="medium">
        Vedi tutti i prodotti
      </BrandButton>
    </section>
  );
};

export default BlockProducts;
