"use server";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import { formatError } from "@/lib/utils";
import { signInFormSchema, signUpFormSchema } from "@/lib/validators";
import { hashSync } from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";

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
    return { success: false, message: formatError(error) };
  }
};

// Sign out the user
export const signOutUser = async () => {
  (await cookies()).delete("sessionCartId");
  await signOut();
  return { success: true, message: "User signed out successfully" };
};

export const signUpUser = async (prevState: unknown, formData: FormData) => {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const p = user.password;

    const hashPassword = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: p,
    });

    return { success: true, message: "User signedUp successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
};
