"use client";

import Rating from "@/components/shared/product/rating";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getReviews } from "@/core/actions/review.action";
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
    setReviews([...(res.data || [])]);
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
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex-between">
                  <CardTitle>{review.title}</CardTitle>
                </div>
                <CardDescription className="flex space-x-4 text-sm text-gray-400">
                  {review.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
