import CarouselAnimalsCategory from "@/components/carousels/carousel-animals-catergory";
import CarouselBrands from "@/components/carousels/carousel-brands";
import CarouselProducts from "@/components/carousels/carousel-products";
import DealCountdown from "@/components/deal-countdown";
import IconBoxes from "@/components/icons-boxes";
import Gifts from "@/components/root/gifts";
import PresentationDeals from "@/components/root/presentation-deals";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import SpecialOfferBrand from "@/components/special-offers-brand";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";
import { Product } from "@/types";
import Image from "next/image";

export default async function Home() {
  const latestProducts = await getLatestProducts({
    limit: 12,
  });
  let featuredProducts = await getFeaturedProducts();
  featuredProducts = featuredProducts.map((product: Product) => ({
    ...product,
    categoryId: product.categoryId || null,
    createdAt: product.createdAt || new Date(),
    updatedAt: product.updatedAt || new Date(),
  }));

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <PresentationDeals />
      </div>
      <div className="my-12">
        <h1>Per chi stai comprando?</h1>
        <CarouselAnimalsCategory />
      </div>
      <div className="my-12">
        <IconBoxes />
      </div>
      <div className="mt-12">
        <Image
          src="/images/porta-un-amico.png"
          alt="product"
          height="0"
          width="0"
          sizes="100vw"
          className="size-full object-cover object-center"
        />
      </div>
      <div className="mt-12">
        <SpecialOfferBrand data={latestProducts} title="Offerta Royal Canin" />
      </div>
      <div className="">
        <Gifts />
      </div>
      <DealCountdown />

      <div>
        <h1 className="h2-bold">CANE</h1>
        <div className="border-t-4 border-secondary-800 ">
          <CarouselBrands />
          <div className="bg-slate-100 px-8 py-1">
            <div className="block md:hidden">
              <CarouselProducts data={latestProducts} />
            </div>
            <div className="hidden md:block">
              <ProductList
                data={latestProducts}
                title="I Prodotti più venduti"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h1 className="h2-bold">GATTO</h1>
        <div className="border-t-4 border-secondary-800 ">
          <CarouselBrands />
          <div className="bg-slate-100 px-8 py-1">
            <div className="block md:hidden">
              <CarouselProducts data={latestProducts} />
            </div>
            <div className="hidden md:block">
              <ProductList
                data={latestProducts}
                title="I Prodotti più venduti"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Image
          src="/images/Modo-semplice-per-spedire.png"
          alt="product"
          height="0"
          width="0"
          sizes="100vw"
          className="size-full object-cover object-center"
        />
      </div>

      {/* <ProductList data={latestProducts} title="Newest Products" />
      <ViewAllProductButton /> */}
    </>
  );
}
