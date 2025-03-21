import ProductDetails from "@/components/product/product-details";
import { ICart, IProduct } from "@/core/validators";
import ProductTabs from "./product-tab";
import { ProductPageLeftImages } from "./product_left_image";
import { ProductPageRightCard } from "./product_right_card";

export const ConfigProductDetailPage = ({
  product,
  myCart,
  userId,
  productQtyInCart,
}: {
  product: IProduct | null;
  myCart: ICart | null;
  userId?: string;
  productQtyInCart?: number;
}) => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-5">
        <ProductPageLeftImages images={product?.images} />
        <ProductDetails product={product} />
        <ProductPageRightCard
          myCart={myCart}
          product={product}
          userId={userId}
          productQtyInCart={productQtyInCart}
        />
      </section>
      <section className="mt-10">
        {product && <ProductTabs description={product.description} />}
      </section>
    </>
  );
};
