import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";
import { ProductCardHeader } from "./product-card-header";
import ProductCardStar from "./product-card-star";
import ProductCardName from "./product-card-name";
import { ProductStock } from "./product-card-stock";
import ProductCardBrand from "./product-card-brand";

const ProductCard = ({ product }: { product: Product }) => {
  const { images, name, slug, brand, price, rating, stock } = product;

  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <ProductCardHeader images={images} name={name} slug={slug} />
      <CardContent className="p-4 grid gap-4">
        <ProductCardBrand brand={brand} />
        <ProductCardName name={name} slug={product.slug} />
        <div className="flex-between gap-4">
          <ProductCardStar rating={product.rating} />
          <ProductStock price={price} stock={stock} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
