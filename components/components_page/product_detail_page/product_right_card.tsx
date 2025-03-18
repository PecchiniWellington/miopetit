import { AddToCart } from "@/components/product/add-to-cart/add-to-cart";
import ProductPrice from "@/components/product/product-price";
import BrandBadge from "@/components/shared/brand-components/brand-badge";
import BrandCard from "@/components/shared/brand-components/brand-card";
import { ICart, IProduct } from "@/core/validators";
import { CheckCircle, XCircle } from "lucide-react";

export const ProductPageRightCard = ({
  product,
  myCart,
  userId,
  productQtyInCart,
}: {
  product: IProduct | null;
  myCart: ICart | null;
  userId?: string;
  productQtyInCart?: number;
}) => (
  <BrandCard className="flex w-full max-w-sm flex-col space-y-6 rounded-lg border bg-white p-6 shadow-lg dark:bg-gray-800 md:max-w-md lg:max-w-lg">
    {/* Prezzo */}
    {product && (
      <>
        <div className="flex items-center justify-between text-lg font-semibold text-gray-800 dark:text-gray-300">
          <span>💰 Prezzo</span>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            <ProductPrice value={Number(product.price)} />
          </span>
        </div>
        <div className="flex items-center justify-between text-lg font-semibold text-gray-800 dark:text-gray-300">
          {product.stock > 0 ? (
            <BrandBadge
              icon={<CheckCircle className="size-4" />}
              variant="success"
              label="Disponibile"
            />
          ) : (
            <BrandBadge
              label="Esaurito"
              variant="danger"
              icon={<XCircle className="size-4" />}
            />
          )}
        </div>
      </>
    )}

    {product?.stock && product.stock > 0 && (
      <div className="mt-4 flex justify-center">
        <AddToCart
          userId={userId}
          myCart={myCart}
          item={{
            productId: product.id.toString(),
            name: product.name,
            slug: product.slug,
            price: product.price.toString(),
            qty: productQtyInCart || 1,
            image: Array.isArray(product.images) ? product.images[0] : "",
          }}
        />
      </div>
    )}
  </BrandCard>
);
