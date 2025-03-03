import { ICart, ILatestProduct } from "@/core/validators";
import CustomProduct from "./customProduct";

interface IProductListProps {
  data: ILatestProduct[];
  limit?: number;
  myCart: ICart;
  userId?: string;
  getProductQuantity: (productId: string) => number;
}

const ProductList = ({
  data,
  limit,
  myCart,
  userId,
  getProductQuantity,
}: IProductListProps) => {
  /* const session = useSession(); */

  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div className="my-10">
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {limitedData ? (
            limitedData.map((product: ILatestProduct) => (
              <CustomProduct
                key={product.id}
                id={product.id}
                image={product.image[0]}
                name={product.name}
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
