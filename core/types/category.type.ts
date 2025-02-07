import { z } from "zod";
import { categorySchema } from "../validators/category.validator";

export type ICategory = z.infer<typeof categorySchema> & {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
};
