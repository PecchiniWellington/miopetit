import { motion } from "framer-motion";
import { Star } from "lucide-react";

const BlockReviews = ({ contributor }: { contributor: any }) => {
  return (
    <section className="relative mx-auto mt-32 w-full max-w-6xl px-6">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-yellow-100 via-white to-purple-100 opacity-60 blur-xl" />

      <div className="relative z-10 space-y-12 rounded-xl bg-white px-6 py-12 shadow-xl">
        <h2 className="text-center text-4xl font-bold text-purple-600">
          Cosa dicono di noi ⭐
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {contributor.reviews.map((review: any) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * review.id }}
              className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition hover:shadow-xl"
            >
              <div className="mb-3 flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${
                      i < review.rating
                        ? "fill-yellow-400"
                        : "stroke-yellow-400"
                    }`}
                  />
                ))}
              </div>
              <p className="text-center text-sm italic text-gray-700">
                “{review.comment}”
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlockReviews;
