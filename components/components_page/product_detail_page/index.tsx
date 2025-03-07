import ProductDetails from "@/components/product/product-details";
import ProductTabs from "./product-tab";
import { ProductPageLeftImages } from "./product_left_image";
import { ProductPageRightCard } from "./product_right_card";

export const ConfigProductDetailPage = ({
  product,
  cart,
}: {
  product: any;
  cart: any;
}) => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-5">
        <ProductPageLeftImages />
        <ProductDetails product={product} />
        <ProductPageRightCard cart={cart} product={product} />
      </section>
      <section className="mt-10">
        <ProductTabs productId={product.id} description={product.description} />
      </section>
    </>
  );
};
