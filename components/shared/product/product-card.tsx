import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductPrice from "./product-price";
import { Product } from "@/types";

const ProductCard = ({ product }: { product: Product }) => {
  const { images, name, slug, brand, price, rating, stock } = product;

  const ProductCardHeader = (
    <CardHeader className="p-0 items-center">
      <Link href={`/product/${slug}`}>
        <Image
          src={images[0] || "/images/placeholder.jpg"}
          alt={name}
          height={300}
          width={300}
          priority={true}
        />
      </Link>
    </CardHeader>
  );

  /* CARD CONTENT */

  const ProductBrand = <div className="text-xs">{brand}</div>;

  const ProductName = (
    <Link href={ROUTES.PRODUCT(slug)}>
      <h2 className="text-sm font-medium">{name}</h2>
    </Link>
  );

  const ProductCardStar = <p>{rating} Stars</p>;

  const ProductStock =
    stock > 0 ? (
      <ProductPrice
        value={Number(price)}
        className="text-lg text-primary-500"
      />
    ) : (
      <p className="text-destructive">Out of stock</p>
    );

  const ProductCardContent = (
    <CardContent className="p-4 grid gap-4">
      {ProductBrand}
      {ProductName}
      <div className="flex-between gap-4">
        {ProductCardStar}
        {ProductStock}
      </div>
    </CardContent>
  );

  /* COMPONENT RETURN */

  return (
    <Card className="w-full max-w-sm overflow-hidden">
      {ProductCardHeader}
      {ProductCardContent}
    </Card>
  );
};

export default ProductCard;
