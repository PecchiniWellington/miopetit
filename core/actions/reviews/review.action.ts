"use server";
import { auth } from "@/auth";

import { prisma } from "@/core/prisma/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { insertReviewSchema, IReview } from "@/core/validators";
import { formatError } from "@/lib/utils";

// Create & Update Reviews
export async function createUpdateReview(
  data: z.infer<typeof insertReviewSchema>
) {
  try {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    // Validate and store the review
    const review = insertReviewSchema.parse({
      ...data,
      userId: session?.user?.id,
    });

    // Get Product that is being reviewed
    const product = await prisma.product.findFirst({
      where: { id: review.productId },
    });

    if (!product) throw new Error("Product not found");

    // Check if the user has already reviewed the product
    const reviewExist = await prisma.review.findFirst({
      where: {
        productId: review.productId,
        userId: review.userId,
      },
    });

    await prisma.$transaction(async (tx) => {
      if (reviewExist) {
        // Update the review
        await tx.review.update({
          where: {
            id: reviewExist.id,
          },
          data: {
            title: review.title,
            description: review.description,
            rating: review.rating,
          },
        });
      } else {
        // Create the review
        await tx.review.create({ data: review });
      }

      //Get AVG rating of the product
      const averageRating = await tx.review.aggregate({
        _avg: { rating: true },
        where: { productId: review.productId },
      });

      // Get number of reviews
      const numReviews = await tx.review.count({
        where: { productId: review.productId },
      });

      // Update the product's rating and total reviews
      await tx.product.update({
        where: { id: review.productId },
        data: {
          rating: averageRating._avg.rating || 0,
          numReviews,
        },
      });
    });
    revalidatePath(`/products/${product.slug}`);
    return { success: true, message: "Review created successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Get All Reviews
export async function getReviews({ productId }: { productId: string }) {
  try {
    const reviews: IReview[] = await prisma.review.findMany({
      where: { productId },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, reviews };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Get Reviews written By current user
export async function getReviewByProductId({
  productId,
}: {
  productId: string;
}) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  return await prisma.review.findFirst({
    where: {
      productId,
      userId: session.user.id,
    },
  });
}
