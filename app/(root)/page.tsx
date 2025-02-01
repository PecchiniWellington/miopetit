import DealCountdown from "@/components/deal-countdown";
import IconBoxes from "@/components/icons-boxes";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductButton from "@/components/view-all-products-button";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";
import Image from "next/image";

export default async function Home() {
  const latestProducts = await getLatestProducts();
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
      <ProductList
        data={latestProducts}
        title="Newest Products"
        width={100}
        height={100}
      />
      <ViewAllProductButton />
      <DealCountdown />
      <IconBoxes />
    </>
  );
}
