import { getReviews } from "@/core/actions/reviews/review.action";
import { IReview } from "@/core/validators";
import { useEffect, useState } from "react";

const offensiveWords = ["cazzo", "badword2", "racistword", "misogynisticword"]; // Sostituisci con un elenco più completo

const filterReviews = (reviews: IReview[]) => {
  return reviews.map((review) => ({
    ...review,
    description: offensiveWords.some((word) =>
      review.description.toLowerCase().includes(word)
    )
      ? "[Contenuto in stato di controllo]: Stiamo verificando il contenuto della recensione, perchè ci sembra di aver rilevato parole offensive]"
      : review.description,
  }));
};

const useReview = (productId: string) => {
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    const loadReviews = async () => {
      if (!productId) return;
      try {
        const res = await getReviews({ productId });
        if (res.data) {
          setReviews(filterReviews(res.data));
        }
      } catch (error) {
        console.error("Error loading reviews:", error);
      }
    };

    loadReviews();
  }, [productId]);

  return { reviews, setReviews };
};

export default useReview;
