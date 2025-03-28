import { IContributor } from "@/core/validators/contributors.validator";
import { motion } from "framer-motion";
import Image from "next/image";
import BrandButton from "../shared/brand-components/brand-button";

const BlockAbout = ({
  showFullDescription,
  contributor,
  setShowFullDescription,
}: {
  showFullDescription: boolean;
  contributor: IContributor;
  setShowFullDescription: (show: boolean) => void;
}) => {
  return (
    <section className="relative mx-auto mt-32 w-full max-w-6xl overflow-hidden rounded-3xl bg-white px-6 py-16 shadow-xl md:px-16">
      {/* BACKGROUND DECOR */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-purple-100/40 via-white/80 to-pink-100/30 backdrop-blur-xl" />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 flex flex-col items-center gap-8 text-center"
      >
        <h2 className="text-4xl font-extrabold text-purple-600 drop-shadow-sm">
          Chi siamo
        </h2>

        <p className="max-w-3xl text-lg text-gray-700">
          {showFullDescription
            ? contributor.descriptionLong
            : (contributor.descriptionLong ?? "").slice(0, 300) + "..."}
        </p>

        {(contributor.descriptionLong ?? "").length > 300 && (
          <BrandButton
            variant="outline"
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-4"
          >
            {showFullDescription ? "Leggi meno" : "Leggi di più"}
          </BrandButton>
        )}
      </motion.div>

      {/* OPTIONAL DECORATIVE IMAGE */}
      <div className="absolute -bottom-16 -right-16 hidden opacity-20 md:block">
        <Image src="/images/logo.svg" alt="Decor" width={300} height={300} />
      </div>
    </section>
  );
};

export default BlockAbout;
