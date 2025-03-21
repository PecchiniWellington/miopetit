import ProductImages from "@/components/product/product-image/product-images";

export const ProductPageLeftImages = ({ images }: { images?: string[] }) => (
  <div className="col-span-2">
    <ProductImages images={images} />
  </div>
);
