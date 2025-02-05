import Image from "next/image";

const SingleImageInView = ({ image }: { image: string }) => {
  return (
    <Image
      src={image || "/images/placeholder.jpg"}
      alt="product image" // TODO: Add alt text from BE (SEO)
      width={1000}
      height={1000}
      className="min-h-[300px] object-cover object-center"
    />
  );
};

export default SingleImageInView;
