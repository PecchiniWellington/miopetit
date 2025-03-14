"use client";

import { signInWithGoogle } from "@/core/actions/auth/auth.actions";
import { useFormStatus } from "react-dom";
import Google from "./icons/Google";
import { Button } from "./ui/button";

export default function SignInButtonWhitProvider({ formType = "sign-in" }) {
  const { pending } = useFormStatus();
  return (
    <Button
      onClick={signInWithGoogle}
      type="submit"
      className="flex min-w-52  items-center gap-2 rounded-full bg-gradient-to-r from-orange-200 to-red-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none"
    >
      <div className="flex items-center justify-center rounded-full bg-white p-1">
        <Google className="min-h-5 min-w-5 shrink-0" />
      </div>

      <span className="font-bold text-white">
        {formType === "sign-in"
          ? pending
            ? "Signing in..."
            : "Sign in with Google"
          : pending
            ? "Creating account..."
            : "Sign Up with Google"}
      </span>
    </Button>
  );
}
