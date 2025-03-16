"use client";
import BrandButton from "@/components/shared/brand-components/brand-button";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ formType = "sign-in" }) => {
  const { pending } = useFormStatus();

  return (
    <BrandButton
      loading={pending}
      type="submit"
      variant="primary"
      iconPosition="left"
    >
      {formType === "sign-in" ? "Sign In" : "Sign Up"}
    </BrandButton>
  );
};

export default SubmitButton;
