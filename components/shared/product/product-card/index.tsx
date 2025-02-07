import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/_index";
import ProductCardBrand from "./product-card-brand";
import { ProductCardHeader } from "./product-card-header";
import ProductCardName from "./product-card-name";
import ProductCardStar from "./product-card-star";
import { ProductStock } from "./product-card-stock";

const ProductCard = ({ product }: { product: Product }) => {
  const { images, name, slug, brand, price, rating, stock } = product;

  return (
    <Card className="w-full max-w-sm overflow-hidden bg-white">
      <ProductCardHeader images={images} name={name} slug={slug} />
      <CardContent className="grid gap-1 border-t-2 p-4">
        <ProductCardBrand brand={brand} />
        <ProductCardName name={name} slug={slug} />
        <div className="flex-between mt-2 flex-wrap gap-1">
          <ProductCardStar rating={rating} />
          <ProductStock price={price} stock={stock} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
