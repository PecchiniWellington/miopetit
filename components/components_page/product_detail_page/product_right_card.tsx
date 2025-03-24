import ApplePay from "@/components/icons/ApplePay";
import GooglePay from "@/components/icons/GooglePay";
import McPay from "@/components/icons/McPay";
import VisaPay from "@/components/icons/VisaPay";
import { AddToCart } from "@/components/product/add-to-cart/add-to-cart";
import ProductPrice from "@/components/product/product-price";
import BrandBadge from "@/components/shared/brand-components/brand-badge";
import BrandCard from "@/components/shared/brand-components/brand-card";
import { ICart, IProduct } from "@/core/validators";
import {
  CheckCircle,
  Clock,
  RefreshCcw,
  ShieldCheck,
  Truck,
  XCircle,
} from "lucide-react";

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
  <BrandCard
    arragementChild="flex flex-col justify-between space-y-4  h-[100%]"
    className="flex w-full min-w-fit max-w-sm flex-col justify-between space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 md:max-w-md lg:max-w-lg"
  >
    {/* Prezzo */}
    {product && (
      <div>
        <div className="flex items-start justify-start  gap-4 text-lg font-semibold text-gray-800 dark:text-gray-300">
          <span className="flex min-w-fit">Prezzo</span>
          <ProductPrice
            isSmall={true}
            price={Number(product.price)}
            percentageDiscount={product.percentageDiscount}
          />
        </div>
        <div className="flex items-center justify-between  text-lg font-semibold text-gray-800 dark:text-gray-300">
          {product && product.stock > 0 ? (
            <BrandBadge
              icon={<CheckCircle className="size-4" />}
              variant="success"
              label="Disponibile"
              className="mt-2"
            />
          ) : (
            <BrandBadge
              label="Esaurito"
              variant="danger"
              icon={<XCircle className="size-4" />}
              className="mt-2"
            />
          )}
        </div>
      </div>
    )}

    {/* Urgenza */}
    <div className=" flex items-center gap-2 rounded-md bg-yellow-50 p-2 text-sm text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
      <Clock className="size-4" />
      Ordina entro le 16:00 per la spedizione oggi!
    </div>

    {/* Trust Badges */}
    <div className="mt-4 flex flex-col space-y-3 text-sm text-gray-700 dark:text-gray-300">
      <div className="flex items-center gap-2">
        <Truck className="size-4 text-indigo-500" />
        Spedizione rapida 24/48h
      </div>
      <div className="flex items-center gap-2">
        <RefreshCcw className="size-4 text-indigo-500" />
        Reso gratuito entro 30 giorni
      </div>
      <div className="flex items-center gap-2">
        <ShieldCheck className="size-4 text-indigo-500" />
        Pagamenti sicuri con crittografia SSL
      </div>
    </div>

    {/* Punti fedeltà */}
    <div className="mt-4 rounded-md bg-indigo-50 p-3 text-center text-sm dark:bg-indigo-900/20">
      🏅 Acquistando questo prodotto guadagni{" "}
      <span className="font-semibold text-indigo-700 dark:text-indigo-300">
        +52 punti fedeltà
      </span>
    </div>

    {/* Metodi di pagamento */}
    <div className="mt-4">
      <h4 className="mb-2 text-sm font-semibold">
        Metodi di pagamento accettati
      </h4>
      <div className="flex gap-2">
        <ApplePay className="h-9 w-14 rounded-xl bg-white p-2 text-gray-700 shadow-lg transition-colors duration-200 hover:text-black " />
        <GooglePay className="h-9 w-14 rounded-xl bg-white p-2 text-gray-700 shadow-lg transition-colors duration-200 hover:text-black " />
        <McPay className="h-9 w-14 rounded-xl bg-white text-gray-700 shadow-lg transition-colors duration-200 hover:text-black" />
        <VisaPay className="h-9 w-14 rounded-xl bg-white text-gray-700 shadow-lg transition-colors duration-200 hover:text-black" />
      </div>
    </div>

    {product?.stock && product.stock > 0 && (
      <div className="mt-[100%] flex justify-center">
        <AddToCart
          userId={userId}
          myCart={myCart}
          item={{
            productId: product?.id?.toString() || "",
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
