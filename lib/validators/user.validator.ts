import { z } from "zod";

// Schema for updating user profile
export const updateUserProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 character"),
  email: z.string().min(3, "Email must be at least 3 character"),
});
