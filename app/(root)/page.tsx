import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function Home() {
  /* await delay(3000); */
  return (
    <>
      <ProductList data={sampleData.products} title="Newest Products" />
    </>
  );
}
