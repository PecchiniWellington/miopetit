import Image from "next/image";
import React from "react";

const AnimalAvatar = ({ image, name }: any) => {
  console.log(`/images${image!}`);
  return (
    <div>
      <div className="rounded-full overflow-hidden relative mx-auto  h-full border-4 border-primary-500">
        <Image
          src={`/images/${image!}`}
          alt={name}
          height="0"
          width="0"
          sizes="100vw"
          className="w-full h-full object-center object-cover"
        />
        {/* <div className="absolute inset-0 flex items-end justify-center top-11">
        <h2 className="bg-gray-900 bg-opacity-50 text-2xl font-bold px-2 text-white">
        {name}
        </h2>
        </div> */}
      </div>
      <h2 className="bg-secondary-900 text-2xl font-bold  mt-2 text-white text-center">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h2>
    </div>
  );
};

export default AnimalAvatar;
