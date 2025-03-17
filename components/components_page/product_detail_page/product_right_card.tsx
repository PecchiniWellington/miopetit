import { AddToCart } from "@/components/product/add-to-cart/add-to-cart";
import ProductPrice from "@/components/product/product-price";
import GenericCard from "@/components/shared/brand-components/brand-card";
import { Badge } from "@/components/ui/badge";
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
  <GenericCard className="flex w-full max-w-sm flex-col space-y-6 rounded-lg border bg-white p-6 shadow-lg dark:bg-gray-800 md:max-w-md lg:max-w-lg">
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
            <Badge className="flex items-center gap-1 bg-green-100 px-3 py-1 text-green-700 dark:bg-green-800 dark:text-green-300">
              <CheckCircle className="size-4" /> Disponibile
            </Badge>
          ) : (
            <Badge className="flex items-center gap-1 bg-red-100 px-3 py-1 text-red-700 dark:bg-red-800 dark:text-red-300">
              <XCircle className="size-4" /> Esaurito
            </Badge>
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
  </GenericCard>
);
