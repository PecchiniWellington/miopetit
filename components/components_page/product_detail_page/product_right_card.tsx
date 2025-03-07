import { AddToCart } from "@/components/product/add-to-cart/add-to-cart";
import ProductPrice from "@/components/product/product-price";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export const ProductPageRightCard = ({
  product,
  cart,
}: {
  product: any;
  cart: any;
}) => (
  <Card className="w-full max-w-sm rounded-lg border bg-white shadow-lg dark:bg-gray-800 md:max-w-md lg:max-w-lg">
    <CardContent className="flex flex-col space-y-6 p-6">
      {/* Prezzo */}
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
      {product?.stock && product.stock > 0 && (
        <div className="mt-4 flex justify-center">
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
