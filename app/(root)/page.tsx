import DealCountdown from "@/components/deal-countdown";
import IconBoxes from "@/components/icons-boxes";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductButton from "@/components/view-all-products-button";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";

export default async function Home() {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Products" />
      <ViewAllProductButton />
      <DealCountdown />
      <IconBoxes />
    </>
  );
}
