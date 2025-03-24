import ProductDetails from "@/components/product/product-details";
import ProductImagesCarousel from "@/components/product/product-image/product-images";
import BrandCard from "@/components/shared/brand-components/brand-card";
import { ICart, IProduct } from "@/core/validators";
import ProductTabs from "./product-tab";
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
      <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <ProductImagesCarousel images={product?.images} />

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

        {/* FAQ */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold">Domande Frequenti</h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>
              <strong>Questo prodotto va bene per tutte le razze?</strong>
              <br />
              Sì, è formulato per cani di tutte le taglie e razze.
            </li>
            <li>
              <strong>È adatto a cani sterilizzati?</strong>
              <br />
              Certo, grazie ai nutrienti bilanciati è adatto anche ai cani
              sterilizzati.
            </li>
            <li>
              <strong>Ha ingredienti naturali?</strong>
              <br />
              Sì, contiene solo ingredienti naturali e senza conservanti
              artificiali.
            </li>
          </ul>
        </div>

        {/* Cross-sell */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold">
            Potrebbero interessarti anche:
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <BrandCard>
              <div className="text-center text-sm">Snack Dentali BIO</div>
              <div className="mt-2 text-center font-bold text-indigo-600">
                €7.99
              </div>
            </BrandCard>
            <BrandCard>
              <div className="text-center text-sm">Ciotola Antiscivolo</div>
              <div className="mt-2 text-center font-bold text-indigo-600">
                €5.49
              </div>
            </BrandCard>
            <BrandCard>
              <div className="text-center text-sm">Spazzola Pelo Lungo</div>
              <div className="mt-2 text-center font-bold text-indigo-600">
                €9.99
              </div>
            </BrandCard>
            <BrandCard>
              <div className="text-center text-sm">Shampoo Delicato</div>
              <div className="mt-2 text-center font-bold text-indigo-600">
                €6.50
              </div>
            </BrandCard>
          </div>
        </div>
      </section>
    </>
  );
};
