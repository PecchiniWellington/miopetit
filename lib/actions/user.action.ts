"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { auth, signIn, signOut } from "@/auth";
import { hashSync } from "bcryptjs";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";
import { IPaymentMethod, IShippingAddress } from "@/types";
import { cookies } from "next/headers";

import {
  paymentMethodSchema,
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
} from "@/lib/validators";

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

// Get user by id
export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("User not found");

  return user;
};

// Update the user's address
export async function updateUserAddress(data: IShippingAddress) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    if (!currentUser) throw new Error("User not found");

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { address },
    });

    return { success: true, message: "Address updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

//Update the user's payment method
export async function updateUserPaymentMethod(data: IPaymentMethod) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    if (!currentUser) throw new Error("User not found");

    const paymentMethod = paymentMethodSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { paymentMethod: paymentMethod.type },
    });

    return { success: true, message: "Payment method updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
