import { ConfigProductDetailPage } from "@/components/components_page/product_detail_page";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getProductBySlug } from "@/core/actions/products";
import { Suspense } from "react";
import Loading from "./loading";

const ProductPage = async (params: Promise<{ slug: string }>) => {
  const { slug } = await params;
  const myCart = await getMyCart();
  const product = await getProductBySlug(slug);

  return (
    <Suspense fallback={<Loading />}>
      <ConfigProductDetailPage product={product} myCart={myCart} />
    </Suspense>
  );
};

export default ProductPage;
