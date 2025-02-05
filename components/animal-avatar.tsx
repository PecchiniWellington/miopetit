import Image from "next/image";

const AnimalAvatar = ({ image, name }: { image: string; name: string }) => {
  return (
    <div>
      <div className="relative mx-auto h-full overflow-hidden  rounded-full  ">
        <Image
          src={`/images/${image!}`}
          alt={name}
          height="0"
          width="0"
          sizes="100vw"
          className="size-full object-cover object-center"
        />
      </div>
      <h2 className="mt-2 bg-secondary-900 text-center  text-2xl font-bold text-white">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h2>
    </div>
  );
};

export default AnimalAvatar;
