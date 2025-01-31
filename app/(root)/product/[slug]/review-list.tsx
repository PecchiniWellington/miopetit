"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ReviewForm from "./review-form";
import { getReviews } from "@/lib/actions/review.action";
import { Review } from "@/types";
import useReview from "@/hooks/use-reviews";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import Rating from "@/components/shared/product/rating";

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
            className="text-blue-700 px-2 hover:underline hover:text-blue-500"
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
                    <User className="mr-1 h-3 w-3" />
                    {review.user ? review.user.name : "Anonymous"}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDateTime(review.createdAt).dateTime}
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
