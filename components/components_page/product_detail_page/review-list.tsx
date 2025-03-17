"use client";

import Rating from "@/components/product/rating";
import GenericCard from "@/components/shared/brand-components/brand-card";
import { getReviews } from "@/core/actions/reviews/review.action";
import { IReview } from "@/core/validators";
import useReview from "@/hooks/use-reviews";
import { formatDateTime } from "@/lib/utils";
import { Calendar, User } from "lucide-react";
import Link from "next/link";
import ReviewForm from "./review-form";

const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  const { reviews, setReviews } = useReview(productId);

  const reload = async () => {
    const res = await getReviews({ productId });
    if (res) {
      if (res.reviews) {
        setReviews(res.reviews);
      }
    }
  };

  return (
    <div className="space-y-4">
      {reviews.length === 0 && <div>No reviews yet</div>}
      {userId ? (
        <ReviewForm
          productId={productId}
          userId={userId}
          onReviewSubmitted={reload}
        />
      ) : (
        <div>
          Please{" "}
          <Link
            className="px-2 text-blue-700 hover:text-blue-500 hover:underline"
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            {/* TODO: centralizzare la callback */}
            SignIn{" "}
          </Link>
          to write a review
        </div>
      )}
      <div className="flex flex-col gap-3">
        {/* REVIEWS HERE */}

        <div className="flex flex-col gap-3">
          {reviews.map((review: IReview) => (
            <GenericCard
              title={review.title}
              description={review.description}
              key={review.id}
            >
              <div className="flex space-x-4 text-sm text-gray-400">
                {/* RATING */}
                <Rating value={review.rating} />
                <div className="flex items-center">
                  <User className="mr-1 size-3" />
                  {review.user ? review.user.name : "Anonymous"}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 size-3" />
                  {formatDateTime(review.createdAt.toString()).dateTime}
                </div>
              </div>
            </GenericCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
