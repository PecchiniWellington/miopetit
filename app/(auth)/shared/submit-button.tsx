"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ formType = "sign-in" }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="default"
      className="w-full primary-gradient min-h-[24px] !text-light-900 border-0.2 border-slate-300"
      disabled={pending}
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
