import React from "react";
import ProductCard from "./product-card";
import { Product } from "@/types/index";
import CardSkeleton from "../skeleton/card-skeleton";

interface IProductListProps {
  data: Product[];
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {limitedData ? (
              limitedData.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div>SUCA</div>
              /*  <CardSkeleton /> */
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
