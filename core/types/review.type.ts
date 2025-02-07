import { z } from "zod";
import { insertReviewSchema } from "../validators/reviews.validator";

export type IReview = z.infer<typeof insertReviewSchema> & {
  id: string;
  createdAt: Date;
  user?: { name: string };
  isVerifiedPurchase: boolean;
};
