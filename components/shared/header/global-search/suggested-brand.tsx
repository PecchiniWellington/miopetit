import Image from "next/image";

const SuggestedBrand = () => {
  return (
    <div>
      <h3 className="border-b pb-2 text-sm font-bold text-gray-700">
        ⭐ BRAND CONSIGLIATI
      </h3>
      <div className="mt-2 flex gap-3">
        {[
          "/images/brands/brand-1.avif",
          "/images/brands/brand-2.avif",
          "/images/brands/brand-3.avif",
        ].map((brand, index) => (
          <Image
            key={index}
            src={brand || "/images/placeholder.jpg"}
            alt="Brand"
            width={50}
            height={50}
            className="rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedBrand;
