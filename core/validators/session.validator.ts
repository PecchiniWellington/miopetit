import { z } from "zod";
import { userSchema } from "./user.validator";

export const sessionValidator = z.object({
  sessionToken: z.string().nonempty(),
  userId: z.string().uuid(),
  expires: z.date(),
  user: userSchema,
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
});

export type ISession = z.infer<typeof sessionValidator>;
