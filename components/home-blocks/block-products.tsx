import Link from "next/link";
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
        <Link href="/partners/f232254a-b4fc-4b6b-8272-93d54a206b24/shop">
          Vedi tutti i prodotti
        </Link>
      </BrandButton>
    </section>
  );
};

export default BlockProducts;
