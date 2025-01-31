"use client";

import { Review } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
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
  const [reviews, setReviews] = useState<Review[]>([]);

  return (
    <div className="space-y-4">
      {reviews.length === 0 && <div>No reviews yet</div>}
      {userId ? (
        <ReviewForm productId={productId} userId={userId} />
      ) : (
        <div>
          Please{" "}
          <Link
            className="text-blue-700 px-2 hover:underline hover:text-blue-500"
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            {/* TODO: centralizzare la callback */}
            SignIn{" "}
          </Link>
          to write a review
        </div>
      )}
      <div className="flex flex-col gap-3">{/* REVIEWS HERE */}</div>
    </div>
  );
};

export default ReviewList;
