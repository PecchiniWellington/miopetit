"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import { motion } from "framer-motion";
import { Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import ReviewForm from "./review-form";

const reviews = [
  {
    id: 1,
    user: "Marco Rossi",
    rating: 5,
    title: "Ottimo prodotto!",
    description: "Qualità eccellente, il mio cane lo adora. Spedizione veloce!",
    likes: 12,
    dislikes: 1,
  },
  {
    id: 2,
    user: "Anna Bianchi",
    rating: 4,
    title: "Buono, ma migliorabile",
    description: "Il prodotto è buono, ma il packaging era un po' danneggiato.",
    likes: 8,
    dislikes: 2,
  },
  {
    id: 3,
    user: "Luca Verdi",
    rating: 3,
    title: "Normale",
    description: "Mi aspettavo qualcosa di più, ma comunque valido.",
    likes: 4,
    dislikes: 3,
  },
  {
    id: 4,
    user: "Francesca Neri",
    rating: 5,
    title: "Perfetto!",
    description: "Soddisfattissima dell’acquisto, consigliato.",
    likes: 20,
    dislikes: 0,
  },
];

const ReviewsTab = () => {
  const [feedback, setFeedback] = useState<{
    [key: number]: "like" | "dislike" | null;
  }>({});

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* 🔹 Lista delle recensioni con scroll */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex-1 space-y-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          📝 Recensioni
        </h2>

        <div className="max-h-[300px] overflow-y-auto pr-2">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  {review.user}
                </h3>
                <div className="flex items-center gap-1 text-yellow-400">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="size-5" />
                  ))}
                </div>
              </div>

              <p className="mt-2 font-semibold">{review.title}</p>
              <p className="text-gray-600 dark:text-gray-300">
                {review.description}
              </p>

              {/* Feedback sui commenti */}
              <div className="mt-4 flex items-center gap-4">
                <BrandButton
                  variant={feedback[review.id] === "like" ? "confirm" : "flat"}
                  icon={<ThumbsUp className="size-4" />}
                  onClick={() =>
                    setFeedback((prev) => ({
                      ...prev,
                      [review.id]: prev[review.id] === "like" ? null : "like",
                    }))
                  }
                >
                  {review.likes}
                </BrandButton>
                <BrandButton
                  variant={feedback[review.id] === "like" ? "danger" : "flat"}
                  icon={<ThumbsDown className="size-4" />}
                  onClick={() =>
                    setFeedback((prev) => ({
                      ...prev,
                      [review.id]:
                        prev[review.id] === "dislike" ? null : "dislike",
                    }))
                  }
                >
                  {review.dislikes}
                </BrandButton>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 🔹 Form per scrivere recensioni */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex-1 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          ✍️ Scrivi una recensione
        </h2>
        <ReviewForm userId="123" productId="abc" onReviewSubmitted={() => {}} />
      </motion.div>
    </div>
  );
};

export default ReviewsTab;
