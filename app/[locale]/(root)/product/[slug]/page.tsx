import { auth } from "@/auth";
import { ConfigProductDetailPage } from "@/components/components_page/product_detail_page";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getProductBySlug } from "@/core/actions/products";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "../../../loading";

const ProductPage = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  const session = await auth();
  let myCart = null;
  if (session?.user?.id) {
    myCart = await getMyCart();
  }

  const productInCart = myCart?.items?.find(
    (item) => item.productId === product?.id
  );
  const productQtyInCart = productInCart ? productInCart.qty : 0;

  if (!product) notFound();

  return (
    <Suspense fallback={<Loading />}>
      <ConfigProductDetailPage
        product={product}
        myCart={myCart}
        userId={session?.user?.id}
        productQtyInCart={productQtyInCart}
      />
    </Suspense>
  );
};

export default ProductPage;
