import { ILatestProduct } from "@/core/validators";
import Image from "next/image";
import CarouselProducts from "./carousels/carousel-products";

interface IProductListProps {
  data: ILatestProduct[];
  title?: string;
  limit?: number;
}

const SpecialOfferBrand = ({ data, title }: IProductListProps) => {
  return (
    <div className="my-12 grid  bg-slate-200 p-12 md:grid-cols-4 md:gap-10">
      <div className="flex flex-col gap-2 md:col-span-1">
        {title && <h1 className="h1-bold">{title}</h1>}
        <Image
          src="/images/royalCanin-deal.webp"
          alt="product"
          height="0"
          width="0"
          sizes="80vw"
          className="size-full object-cover object-center"
        />
        <div>
          <div className="h2-bold">Promozione esclusiva per il tuo cane!</div>
          <p className="mt-2 text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat ut
            laborum voluptatum. Error modi explicabo minus deleniti id.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto md:col-span-3">
        <CarouselProducts data={data} />
      </div>
    </div>
  );
};

export default SpecialOfferBrand;
