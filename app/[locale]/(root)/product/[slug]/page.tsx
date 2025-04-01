import { auth } from "@/auth";
import { ConfigProductDetailPage } from "@/components/components_page/product_detail_page";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getProductBySlug } from "@/core/actions/products";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "../../../loading";

const ProductPage = async (props: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
}) => {
  const { slug } = await props.params;
  const searchParams = (await props.searchParams) || {};
  const from = searchParams.from;

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
    <>
      {from && (
        <div className="mb-6 ">
          <Link
            href={`/${from}`}
            className="inline-flex items-center gap-2 rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-200"
          >
            <ArrowLeft className="size-4" />
            Torna alla pagina donazioni
          </Link>
        </div>
      )}
      <Suspense fallback={<Loading />}>
        <ConfigProductDetailPage
          product={product}
          myCart={myCart}
          userId={session?.user?.id}
          productQtyInCart={productQtyInCart}
        />
      </Suspense>
    </>
  );
};

export default ProductPage;
