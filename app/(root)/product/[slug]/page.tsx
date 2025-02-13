import NotFound from "@/app/not-found";
import { auth } from "@/auth";
import { AddToCart } from "@/components/shared/product/add-to-cart/add-to-cart";
import ProductImages from "@/components/shared/product/product-image/product-images";
import ProductPrice from "@/components/shared/product/product-price";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getMyCart } from "@/core/actions/cart/cart.actions";

import ProductDetails from "@/components/shared/product/product-details";
import { getProductBySlug } from "@/core/actions/products";
import { ICartItem } from "@/core/validators";
import ReviewList from "./review-list";

const ProductPage = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;

  const session = await auth();
  const userId = session?.user.id;

  const product = await getProductBySlug(slug);
  if (!product) return NotFound();

  const cart = await getMyCart();

  const {
    /* brand, */ /* category, */ /* name, description, */ price,
    stock,
    /* images, */
  } = product;

  const ProductPageLeftImages = () => (
    <div className="col-span-2">
      <ProductImages /* images={images} */ />
    </div>
  );

  const ProductPageRightCard = () => (
    <Card>
      <CardContent className="p-4">
        <div className="mb-2 flex justify-between">
          <div>Price</div>
          <div>
            <ProductPrice value={Number(price)}></ProductPrice>
          </div>
        </div>
        <div className="mb-2 flex justify-between">
          <div>Status</div>
          {stock > 0 ? (
            <Badge variant="outline">In Stock</Badge>
          ) : (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </div>
        {stock > 0 && (
          <div className="flex-center mt-10">
            <AddToCart
              cart={{
                ...cart,
                items: cart?.items as ICartItem[],
                sessionCartId: cart?.id as string,
                itemsPrice: cart?.itemsPrice as unknown as string,
                totalPrice: cart?.totalPrice as unknown as string,
                shippingPrice: cart?.totalPrice as unknown as string,
                taxPrice: cart?.taxPrice as unknown as string,
              }}
              item={{
                productId: product.id.toString(),
                name: product.name,
                slug: product.slug,
                price: product.price.toString(),
                qty: 1,
                image: product.images![0],
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          <ProductPageLeftImages />
          <ProductDetails />
          <div>
            <ProductPageRightCard />
          </div>
        </div>
      </section>
      <section className="mt-10">
        <h2 className="h2-bold">Customer Reviews</h2>
        <ReviewList
          userId={userId || ""}
          productId={product.id.toString()}
          productSlug={product.slug}
        />
      </section>
    </>
  );
};

export default ProductPage;
