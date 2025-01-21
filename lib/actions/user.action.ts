"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signInFormSchema } from "../validator";
import { signIn, signOut } from "@/auth";

// Sign in the user with creadentials
export const signInWithCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    await signIn("credentials", user);

    return { success: true, message: "User signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid credentials" };
  }
};

// Sign out the user
export const signOutUser = async () => {
  await signOut();
  return { success: true, message: "User signed out successfully" };
};
