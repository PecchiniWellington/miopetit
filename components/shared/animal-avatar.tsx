import Image from "next/image";

const AnimalAvatar = ({
  image,
  name,
  rounded = "rounded-full",
}: {
  image: string;
  name: string;
  rounded?: string;
}) => {
  return (
    <div className="flex-col items-center justify-center gap-4 rounded-lg p-4">
      <div
        className={`relative mx-auto flex justify-center overflow-hidden ${rounded} align-middle`}
      >
        {image && (
          <Image
            priority
            src={`${image}` || "/images/placeholder.jpg"}
            alt={name}
            height={200}
            width={200}
            sizes="100vw"
            className="rounded-full object-cover object-center"
          />
        )}
      </div>
      <h2 className="mt-2  text-center  text-lg font-bold text-secondary-900 opacity-80 sm:w-full  sm:text-xl md:text-xl">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h2>
    </div>
  );
};

export default AnimalAvatar;
