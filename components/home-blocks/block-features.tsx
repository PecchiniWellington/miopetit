import { motion } from "framer-motion";
import { Leaf, Package, RefreshCcw } from "lucide-react";

const features = [
  {
    icon: <Leaf className="size-10 text-green-600" />,
    title: "Materiali Sostenibili",
    description:
      "Utilizziamo solo materiali eco-friendly, biodegradabili e riciclati.",
  },
  {
    icon: <Package className="size-10 text-yellow-500" />,
    title: "Imballaggi Ecologici",
    description:
      "Il nostro packaging è compostabile e riduciamo al minimo la plastica.",
  },
  {
    icon: <RefreshCcw className="size-10 text-blue-500" />,
    title: "Economia Circolare",
    description: "Incentiviamo il riciclo e collaboriamo con fornitori green.",
  },
];

const BlockFeatures = () => {
  return (
    <section className="relative mx-auto mt-32 w-full max-w-6xl px-6">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-tr from-green-50 via-white to-purple-50 opacity-60 blur-xl" />

      <div className="relative z-10 space-y-12">
        <h2 className="text-center text-4xl font-extrabold text-purple-600 drop-shadow-sm">
          Perché Siamo Davvero Green? ♻️
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4 rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl"
            >
              {feature.icon}
              <h3 className="text-center text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-center text-sm text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlockFeatures;
