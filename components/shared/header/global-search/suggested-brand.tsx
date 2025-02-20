import Image from "next/image";

const SuggestedBrand = () => {
  return (
    <div>
      <h3 className="border-b pb-2 text-sm font-bold text-gray-700">
        ⭐ BRAND CONSIGLIATI
      </h3>
      <div className="mt-2 flex gap-3">
        {["/images/brand1.png", "/images/brand2.png", "/images/brand3.png"].map(
          (brand, index) => (
            <Image
              key={index}
              src={brand || "/images/placeholder.jpg"}
              alt="Brand"
              width={50}
              height={50}
              className="rounded-md"
            />
          )
        )}
      </div>
    </div>
  );
};

export default SuggestedBrand;
