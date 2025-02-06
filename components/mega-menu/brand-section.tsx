import { motion } from "framer-motion";
import Image from "next/image";

export const BrandSection = ({
  brands,
  mainTitle,
}: {
  brands: string[];
  mainTitle: string;
}) => {
  return (
    <div className="col-span-1">
      <h3 className="mb-4 text-lg font-semibold text-black">
        Top Brand per {mainTitle}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {brands.map((brand, index) => (
          <motion.div
            key={index}
            className="col-span-1 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 + index / 7 }}
          >
            <div className="flex size-20 items-center justify-center rounded-lg border shadow-sm">
              <Image
                src={"/images/placeholder.jpg"} // Qui puoi mettere il logo del brand se disponibile
                alt={brand}
                width={60}
                height={60}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
