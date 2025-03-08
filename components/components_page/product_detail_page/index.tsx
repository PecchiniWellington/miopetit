import ProductDetails from "@/components/product/product-details";
import { ICart, IProduct } from "@/core/validators";
import ProductTabs from "./product-tab";
import { ProductPageLeftImages } from "./product_left_image";
import { ProductPageRightCard } from "./product_right_card";

export const ConfigProductDetailPage = ({
  product,
  myCart,
}: {
  product: IProduct | null;
  myCart: ICart | null;
}) => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-5">
        <ProductPageLeftImages />
        <ProductDetails product={product} />
        <ProductPageRightCard myCart={myCart} product={product} />
      </section>
      <section className="mt-10">
        {product && (
          <ProductTabs
            productId={product.id}
            description={product.description}
          />
        )}
      </section>
    </>
  );
};
