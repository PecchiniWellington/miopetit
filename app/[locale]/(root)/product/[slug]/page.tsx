/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddToCart } from "@/components/shared/product/add-to-cart/add-to-cart";
import ProductImages from "@/components/shared/product/product-image/product-images";
import ProductPrice from "@/components/shared/product/product-price";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getMyCart } from "@/core/actions/cart/cart.actions";

import ProductDetails from "@/components/shared/product/product-details";
import { getProductBySlug } from "@/core/actions/products";
import { CheckCircle, XCircle } from "lucide-react";
import { Suspense } from "react";
import Loading from "./loading";
import ProductTabs from "./product-tab";

const ProductPage = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  /* const product = (await getProductBySlug(slug)) as unknown as IProduct; */

  const cart: any = await getMyCart();

  const fetchProductWithDelay = async (slug: string) => {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Ritardo di 5 secondi
    return getProductBySlug(slug);
  };

  const product = await fetchProductWithDelay(slug);

  const ProductPageLeftImages = () => (
    <div className="col-span-2">
      <ProductImages /* images={images} */ />
    </div>
  );

  const ProductPageRightCard = () => (
    <Card className="w-full max-w-sm rounded-lg border bg-white shadow-lg dark:bg-gray-800 md:max-w-md lg:max-w-lg">
      <CardContent className="flex flex-col space-y-6 p-6">
        {/* Prezzo */}
        <div className="flex items-center justify-between text-lg font-semibold text-gray-800 dark:text-gray-300">
          <span>💰 Prezzo</span>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            <ProductPrice value={Number(product.price)} />
          </span>
        </div>
        {/* Disponibilità */}
        <div className="flex items-center justify-between text-lg font-semibold text-gray-800 dark:text-gray-300">
          {/*  <span>📦 Disponibilità</span> */}
          {product?.stock && product.stock > 0 ? (
            <Badge className="flex items-center gap-1 bg-green-100 px-3 py-1 text-green-700 dark:bg-green-800 dark:text-green-300">
              <CheckCircle className="size-4" /> Disponibile
            </Badge>
          ) : (
            <Badge className="flex items-center gap-1 bg-red-100 px-3 py-1 text-red-700 dark:bg-red-800 dark:text-red-300">
              <XCircle className="size-4" /> Esaurito
            </Badge>
          )}
        </div>
        {product?.stock && product.stock > 0 && (
          <div className="mt-4 flex justify-center">
            {/* Pulsante Aggiungi al carrello */}
            <AddToCart
              cart={{
                ...cart,
                items: cart?.items,
                sessionCartId: cart?.id,
                itemsPrice: cart?.itemsPrice,
                totalPrice: cart?.totalPrice,
                shippingPrice: cart?.totalPrice,
                taxPrice: cart?.taxPrice,
              }}
              item={{
                productId: product.id.toString(),
                name: product.name,
                slug: product.slug,
                price: product.price.toString(),
                qty: 1,
                image: Array.isArray(product.image) ? product.image[0] : "",
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Suspense fallback={<Loading />}>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          <ProductPageLeftImages />
          <ProductDetails product={product} />

          <ProductPageRightCard />
        </div>
      </section>
      <section className="mt-10">
        <ProductTabs
          productId={product.id}
          description="Laboris consequat aliquip excepteur occaecat culpa. Nulla amet aliqua non est mollit commodo do cillum. Deserunt in velit laborum adipisicing. Aute duis minim anim id. Enim eiusmod in officia mollit nostrud."
        />
      </section>
    </Suspense>
  );
};

export default ProductPage;
