import { IProduct } from "@/core/validators";
import { useMemo } from "react";
import CustomProduct from "./customProduct";

interface IProductListProps {
  product: IProduct[];
  limit?: number;
  userId?: string;

  getProductQuantity: (productId: string) => number;
}

const ProductList = ({
  product,
  limit,
  userId,

  getProductQuantity,
}: IProductListProps) => {
  const memoizedData = useMemo(() => product, [product]);
  const limitedData = limit ? memoizedData.slice(0, limit) : memoizedData;

  return (
    <div className="my-10">
      {product.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {limitedData ? (
            limitedData.map((product: IProduct) => (
              <CustomProduct
                key={product.id}
                product={product}
                getProductQuantity={getProductQuantity(product.id)}
                userId={userId}
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
