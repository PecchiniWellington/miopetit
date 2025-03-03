import { ICart, ILatestProduct } from "@/core/validators";
import { useHybridTranslation } from "@/hooks/useHybridTranslation";
import { useEffect, useState } from "react";
import CustomProduct from "./customProduct";
import product from "@/core/db-static/product";

interface IProductListProps {
  data: ILatestProduct[];
  limit?: number;
  myCart: ICart;
  userId?: string;
  locale?: string;
  getProductQuantity: (productId: string) => number;
}

const ProductList = ({
  data,
  limit,
  myCart,
  userId,
  locale = "en",
  getProductQuantity,
}: IProductListProps) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  const translate = useHybridTranslation();
  const [translations, setTranslations] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const fetchTranslations = async () => {
      const newTranslations: { [key: string]: string } = {};
      for (const category of data || []) {
        newTranslations[category.slug] = await translate(category.slug, locale);
        /* for (const child of category.children || []) {
          newTranslations[child.slug] = await translate(child.slug, locale);
        } */
      }
      setTranslations(newTranslations);
    };

    fetchTranslations();
  }, [data, locale]);
  return (
    <div className="my-10">
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {console.log(
            "translations[product.name]",
            translations[product.name]
          )}
          {limitedData ? (
            limitedData.map((product: ILatestProduct) => (
              <CustomProduct
                key={product.id}
                id={product.id}
                image={product.image[0]}
                name={translations[product.name]}
                productBrand={product?.productBrand?.name}
                rating={Number(product.rating)}
                reviews={product.numReviews}
                availability={product.stock ? true : false}
                price={Number(product.price)}
                oldPrice={54.99}
                pricePerKg="€4,16/KG (FAKE)"
                product={product}
                slug={product.slug}
                myCart={myCart}
                userId={userId}
                getProductQuantity={getProductQuantity(product.id)}
                /*  getProductQuantity={getProductQuantity}
                addToCart={addToCart} */
              />
            ))
          ) : (
            <div>WORKING....</div>
          )}
        </div>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductList;
