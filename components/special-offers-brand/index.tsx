import { Product } from "@/types/index";
import Image from "next/image";
import React from "react";
import CarouselProducts from "../carousels/carousel-products";

interface IProductListProps {
  data: Product[];
  title?: string;
  limit?: number;
}

const SpecialOfferBrand = ({ data, title, limit }: IProductListProps) => {
  return (
    <div className="bg-slate-200 my-12  grid md:grid-cols-4 md:gap-10 p-12">
      <div className="flex flex-col md:col-span-1 gap-2">
        {title && <h1 className="h1-bold">{title}</h1>}
        <Image
          src="/images/royalCanin-deal.webp"
          alt="product"
          height="0"
          width="0"
          sizes="80vw"
          className="w-full h-full object-center object-cover"
        />
        <div className="description">
          <div className="h2-bold">Promozione esclusiva per il tuo cane!</div>
          <p className="text-gray-500 mt-2">
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
