import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";
import { getLatestProducts } from "@/lib/actions/product.actions";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function Home() {
  const latestProducts = await getLatestProducts();
  /* await delay(3000); */
  return (
    <>
      <ProductList data={latestProducts} title="Newest Products" />
    </>
  );
}
