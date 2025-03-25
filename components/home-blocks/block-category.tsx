import { motion } from "framer-motion";
import { Cat, Fish, PawPrint, Rabbit } from "lucide-react";
import Image from "next/image";

const categories = [
  {
    label: "Dogs",
    image: "/images/dog.png",
    icon: <PawPrint className="size-5 text-purple-500" />,
  },
  {
    label: "Cats",
    image: "/images/cat.png",
    icon: <Cat className="size-5 text-purple-500" />,
  },
  {
    label: "Small Animals",
    image: "/images/small-animals.png",
    icon: <Rabbit className="size-5 text-purple-500" />,
  },
  {
    label: "Fish",
    image: "/images/fish.png",
    icon: <Fish className="size-5 text-purple-500" />,
  },
];

const BlockCategory = () => {
  return (
    <section className="relative mx-auto mt-32 w-full max-w-6xl px-6 text-center">
      {/* Decorative Background Shape */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-tr from-pink-50 via-white to-purple-50 opacity-60 blur-xl" />

      <div className="relative z-10 space-y-12">
        <h2 className="text-4xl font-extrabold text-purple-600 drop-shadow-sm">
          Cosa stai cercando?
        </h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-transform hover:scale-[1.03]"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col items-center gap-2 p-4">
                {cat.icon}
                <p className="text-lg font-semibold text-gray-800">
                  {cat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlockCategory;
