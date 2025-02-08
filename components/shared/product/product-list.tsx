import { IProduct } from "@/core/types";
import CustomProduct from "./customProduct";

interface IProductListProps {
  data: IProduct[];
  title: string;
  limit?: number;
}

const ProductList = ({ data, title, limit }: IProductListProps) => {
  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      <div>
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {limitedData ? (
              limitedData.map((product: IProduct) => (
                <CustomProduct
                  key={product.id}
                  image="https://utfs.io/f/RnH9VIVP0zpxL8Sd59Kp86NzgPOkKSsma1BjXoZe9tA3HMCW"
                  name={product.name}
                  brand={product.brand}
                  rating={Number(product.rating)}
                  reviews={product.numReviews}
                  availability="Disponibile in 2 varianti (FAKE)"
                  price={Number(product.price)}
                  oldPrice={54.99}
                  pricePerKg="€4,16/KG (FAKE)"
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
    </div>
  );
};

export default ProductList;
