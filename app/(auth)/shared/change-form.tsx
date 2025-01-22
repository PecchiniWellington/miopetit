import Link from "next/link";
import React from "react";

const ChangeForm = ({ formType = "sign-in" }) => {
  return (
    <div className="text-sm text-center text-muted-foreground">
      {formType === "sign-in"
        ? "Don't have an account? "
        : "Already have an account? "}

      <Link
        href={formType === "sign-in" ? "/sign-up" : "/sign-in"}
        className="underline link"
        target="_self"
      >
        {formType === "sign-in" ? "Sign Up" : "Sign In"}
      </Link>
    </div>
  );
};

export default ChangeForm;
