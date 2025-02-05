"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ formType = "sign-in" }) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
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
