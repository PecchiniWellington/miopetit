import AnimalCategory from "@/components/animals-catergory";
import BestSellingProduct from "@/components/best-selling-products";
import Gifts from "@/components/gifts";
import IconBoxes from "@/components/icons-boxes";
import PresentationDeals from "@/components/presentation-deals";
import SpecialOfferBrand from "@/components/special-offer-brand";
import { getLatestProducts } from "@/core/actions/products";
import Image from "next/image";
import { cache } from "react";

// ✅ Memorizziamo i dati in cache per ridurre i rerender
const fetchLatestProducts = cache(async () => getLatestProducts({ limit: 8 }));
/* const fetchFeaturedProducts = cache(async () => {
  const products = await getFeaturedProducts();
  return products.map((product) => ({
    ...product,
    isFeatured: product.isFeatured ?? false,
    rating: product.rating ?? 0,
    image: [product.images[0] ?? "/images/default-image.jpg"],
  }));
}); */

export default async function Home() {
  const latestProducts = await fetchLatestProducts();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = latestProducts.map((product: any) => ({
    ...product,
    image: ["/images/royal-canin-4.jpg"],
    description: product.description ?? "",
    stock: product.stock ?? null,
    animalAge: product.animalAge ?? "",
    categoryType: product.categoryType ?? "",
    productProteinsId: product.productProteinsId ?? [],
  }));

  return (
    <div>
      {/* ✅ Usiamo Suspense per evitare rendering multipli */}
      {/*  <Suspense fallback={<div>Caricamento prodotti...</div>}>
        {featuredProducts.length > 0 && (
          <ProductCarousel data={featuredProducts} />
        )}
      </Suspense> */}

      <PresentationDeals />

      <div className="mt-2">
        <AnimalCategory />
      </div>

      <div className="my-12">
        <IconBoxes />
      </div>

      <div className="mt-12">
        <Image
          src="/images/porta-un-amico.png"
          alt="product"
          width={1920}
          height={400}
          className="size-full object-cover object-center"
          priority
        />
      </div>

      <div className="mt-12">
        <SpecialOfferBrand data={data} title="Offerta Royal Canin" />
      </div>

      <Gifts />
      <BestSellingProduct latestProducts={latestProducts} animalName="cane" />
      <BestSellingProduct latestProducts={latestProducts} animalName="gatto" />

      <div className="mt-12">
        <Image
          src="/images/Modo-semplice-per-spedire.png"
          alt="product"
          width={1920}
          height={400}
          className="size-full object-cover object-center"
          priority
        />
      </div>
    </div>
  );
}
