"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ formType = "sign-in" }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="flex min-w-52 items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none"
    >
      {formType === "sign-in"
        ? pending
          ? "Signing in..."
          : "Sign In"
        : pending
          ? "Creating account..."
          : "Sign Up"}
    </Button>
  );
};

export default SubmitButton;
