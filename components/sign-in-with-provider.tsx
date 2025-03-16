"use client";

import { signInWithGoogle } from "@/core/actions/auth/auth.actions";
import { useFormStatus } from "react-dom";
import Google from "./icons/Google";
import BrandButton from "./shared/brand-components/brand-button";

export default function SignInButtonWhitProvider({ formType = "sign-in" }) {
  const { pending } = useFormStatus();
  return (
    <BrandButton
      onClick={() => signInWithGoogle()}
      type="submit"
      variant="danger"
      icon={
        <div className="flex items-center justify-center rounded-full bg-white p-1">
          <Google className="min-h-5 min-w-5 shrink-0" />
        </div>
      }
    >
      <span className="font-bold text-white">
        {formType === "sign-in"
          ? pending
            ? "Signing in..."
            : "Sign in with Google"
          : pending
            ? "Creating account..."
            : "Sign Up with Google"}
      </span>
    </BrandButton>
  );
}
