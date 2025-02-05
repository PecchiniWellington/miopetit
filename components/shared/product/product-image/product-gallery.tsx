import { cn } from "@/lib/utils";
import Image from "next/image";

const ProductGallery = ({
  images,
  current,
  setCurrent,
}: {
  images: string[];
  current: number;
  setCurrent: (index: number) => void;
}) => {
  return (
    <>
      {images.map((image, index) => (
        <div
          key={image}
          onClick={() => setCurrent(index)}
          className={cn(
            "cursor-pointer border mr-2 hover:border-primary-500",
            current === index && "border-primary-500"
          )}
        >
          <Image
            src={image || "/images/placeholder.jpg"}
            alt="product image" // TODO: Add alt text from BE (SEO)
            width={100}
            height={100}
            className="size-20 object-cover object-center"
          />
        </div>
      ))}
    </>
  );
};

export default ProductGallery;
