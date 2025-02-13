import BestSellingProduct from "@/components/best-selling-products";
import CarouselAnimalsCategory from "@/components/carousels/carousel-animals-catergory";
import ProductCarousel from "@/components/carousels/featured-product-carousel";
import DealCountdown from "@/components/deal-countdown";
import Gifts from "@/components/gifts";
import IconBoxes from "@/components/icons-boxes";
import PresentationDeals from "@/components/presentation-deals";
import SpecialOfferBrand from "@/components/special-offer-brand";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/core/actions/products";
import { convertToPlainObject } from "@/lib/utils";
import Image from "next/image";

export default async function Home() {
  const images = await fetch(
    "https://api.unsplash.com/photos?client_id=Qy3OtdsgRCtZBUVrvqXYutjDPWN835qsZIJr0Wyd1pM"
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }
    return response.json();
  });

  const p = await getLatestProducts({
    limit: 8,
  });
  const featuredProducts = (await getFeaturedProducts()).map((product) => ({
    ...product,
    isFeatured: product.isFeatured ?? false,
    rating: product.rating ?? 0,
  }));

  const data = p.map((product) => ({
    ...product,
    image: "/images/royal-canin-4.jpg",
  }));
  const latestProducts = convertToPlainObject(data);
  console.log("latestProducts", images);

  return (
    <div>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}

      <PresentationDeals />

      <div className="mt-2">
        <CarouselAnimalsCategory />
      </div>

      <div className="my-12 ">
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

      <BestSellingProduct latestProducts={latestProducts} animalName="cane" />
      <BestSellingProduct latestProducts={latestProducts} animalName="gatto" />

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
    </div>
  );
}
