import CarouselAnimalsCategory from "@/components/carousels/carousel-animals-catergory";
import DealCountdown from "@/components/deal-countdown";
import IconBoxes from "@/components/icons-boxes";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import SpecialOfferBrand from "@/components/special-offers-brand";
import ViewAllProductButton from "@/components/view-all-products-button";
import {
  getAllProducts,
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import Image from "next/image";

export default async function Home() {
  const latestProducts = await getLatestProducts({
    limit: 12,
  });
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <div className="flex justify-between items-center  gap-4">
        <Image
          src="/images/affari-quindici.png"
          alt="product"
          width={400}
          height={400}
        />
        <Image
          src="/images/migliori-prodotti.png"
          alt="product"
          width={400}
          height={400}
        />
        <Image
          src="/images/prendi-3.png"
          alt="product"
          width={400}
          height={400}
        />
        <Image
          src="/images/quaranta-percento.png"
          alt="product"
          width={400}
          height={400}
        />
        <Image
          src="/images/risparmia-30.png"
          alt="product"
          width={400}
          height={400}
        />
      </div>
      <div className="my-12">
        <h1>Per chi stai comprando?</h1>
        <CarouselAnimalsCategory />
      </div>
      <div>
        <Image
          src="/images/porta-un-amico.png"
          alt="product"
          height="0"
          width="0"
          sizes="100vw"
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div>
        <SpecialOfferBrand data={latestProducts} title="Offerta Royal Canin" />
      </div>
      <ProductList data={latestProducts} title="Newest Products" />
      <ViewAllProductButton />
      <DealCountdown />
      <IconBoxes />
    </>
  );
}
